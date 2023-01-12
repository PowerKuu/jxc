import { join, resolve } from "path"
import { mkdirSync, readFileSync, writeFileSync } from "fs"

import * as crypto from "crypto"

import { minifyCss, minifyJavascript, stringifyValue, trailingSemicolon } from "./utils/utils"

var defaultBundel:Compiler.Bundel = createInitialBundle()
var bundel = defaultBundel

function createInitialBundle():Compiler.Bundel {
    const scriptBundelPath = join(__dirname, "bundel", "js.js")
    const cssBundelPath = join(__dirname, "bundel", "css.css")
    
    const script = minifyJavascript(readFileSync(scriptBundelPath,  {
        "encoding": "utf-8"
    }), true)

    const style = minifyCss(readFileSync(cssBundelPath,  {
        "encoding": "utf-8"
    }))

    return {script, style}
}



function createClientFunctionString(func: Function, defer = false, args:any[] = []) {
    function proccessArgs(args:any[]){
        return stringifyValue(args).slice(1, -1)
    }

    const funcString = func.toString()
    const funcMinifyString = minifyJavascript(funcString, false) ?? funcString
    
    const stringArgs = args.length > 0 ? proccessArgs(args) : ""

    const execString = `(${funcMinifyString})(${stringArgs})`
    const deferString = `window.addEventListener("load",function(){${execString}});`

    return defer ? deferString : execString
}

function getClientVariabel(name:string):string {
    return `window["${name}"]`
}

function getClientFunction(name:string):string {
    return `${getClientVariabel(name)}();`
}

function registerClientVariabel(name:string, value:string) {
    appendScriptBundel(`${getClientVariabel(name)}=${value}`)
}

function registerClientFunction(stringifiedFunction:string, id:string = undefined):string {
    const ID = !!id ? id : crypto.randomUUID()

    registerClientVariabel(ID, `function(){${stringifiedFunction}}`)

    return ID
}


function compileAttributes(element: JSX.Element):string {
    function createAttribute(key:string, value:string) {
        return `${key}=${encapsolateString(String(value))}`
    }
    
    const excludeList = ["id"]
    
    function encapsolateString(str:string) {
        str = str.split("").map((value) => {
            if (value == `"`) return `'`
            if (value == `'`) return `"`
            
            return value
        }).join("")

        return `"${str}"`
    }    

    var attributesArray:string[] = []

    for (var [key, value] of  Object.entries(element.attributes)) {
        if (typeof value == "function") {
            const funcName = registerClientFunction(
                createClientFunctionString(value, false, [element])
            )

            attributesArray.push(
                createAttribute(
                    key,
                    getClientFunction(funcName)
                )
            )

            continue
        }
        
        if (excludeList.includes(key)) continue

        
        if (key === "style" && typeof value !== "string") value = Object.entries(
            value
        ).map(([k, v]) => `"${k}":${v}`).join(';')

        if (Array.isArray(value)) value = value.join(" ")
        attributesArray.push(createAttribute(key, value))
    }

    return attributesArray.join("").trim()
}

function compileChildren(element: JSX.Element):string {
    if (element.children == undefined) return ""
    
    var childrenArray:string[] = []

    for (var child of element.children) {
        if (typeof child == "string") {
            childrenArray.push(child)
            continue
        } 
        else if (element.tag == "script" && typeof child == "function") {
            const execString = createClientFunctionString(
                child, 
                element.attributes.defer
            )

            childrenArray.push(execString)
            continue
        } else if (typeof child == "function") {
            continue
        }

        childrenArray.push(compile(child))
    }

    return childrenArray.join("").trim()
}

export function compile(element: JSX.Element):string {
    var contentString:string = compileChildren(element)
    var attributesString:string = compileAttributes(element)

    return `<${element.tag} id="${element.id}"${attributesString}>${contentString}</${element.tag}>`
}

export function construct(options: Compiler.ConstructionOptions) {
    bundel = defaultBundel

    const compiled = compile(options.element)

    const dirPath = resolve(__dirname, options.outDir)
    const fullPath = join(dirPath, "index.html")

    mkdirSync(dirPath, {recursive: true})

    writeFileSync(fullPath, [
        "<!DOCTYPE html>",
        `<script>${bundel.script}</script>`,
        `<style>${bundel.style}</style>`,
        compiled
    ].join(""))
}

export function factory<Tag extends keyof JSX.IntrinsicElements>(tag:Tag|Function, attributes:JSX.Attributes|null, ...children: JSX.Children[]):JSX.Element {
    // Convert to 1D
    children = [].concat(...children)

    if (typeof tag == "function") return tag({...attributes, children: children})
    
    return {
        tag: tag,
        attributes: attributes ?? {},
        children: children,
        
        id: attributes?.id ?? crypto.randomUUID()
    }
}

export function appendStyleBundel(style:string) {
    bundel.style += style
}

export function appendScriptBundel(script:string, semicolon:boolean = true) {
    bundel.script += trailingSemicolon(script, semicolon)
}


// Helper functions
export function useClient(values: {[key: string]: unknown}) {    
    for (var [key, value] of Object.entries(values)) {   
        registerClientVariabel(key, stringifyValue(value))
    }
}


// Client side
export function id(id:string): HTMLElement {
    return 
}