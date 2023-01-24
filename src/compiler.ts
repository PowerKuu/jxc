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

function createClientScope(scope:JSX.Attribute.Use):string {
    var scopeString = ""

    for (var [key, value] of Object.entries(scope)) {
        scopeString += `var ${key}=${stringifyValue(value)};`
    }

    return scopeString
}

function createClientFunctionString(func: Function, scope: JSX.Attribute.Use, defer = false, args:any[] = []) {
    function proccessArgs(args:any[]){
        return stringifyValue(args).slice(1, -1)
    }

    const funcString = func.toString()
    const funcMinifyString = minifyJavascript(funcString, false) ?? funcString

    const stringArgs = args.length > 0 ? proccessArgs(args) : ""

    const execString = `(function(){${createClientScope(scope)}(${funcMinifyString})(${stringArgs})})()`
   
    const deferString = `window.addEventListener("load",function(){${execString}});`

    return defer ? deferString : `${execString};`
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
    
    const excludeList = ["id", "use"]
    
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
                createClientFunctionString(value, element.scope, false)
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
        ).map(([k, v]) => `${k}:${v}`).join(';')

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
                element.scope,
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

function compileScope(root: JSX.Element) {
    function recursiveMergeScope(element:JSX.Element, parentScope:JSX.Attribute.Use) {
        const currentScope = element.attributes.use ?? {}
        const mergedScope = {...parentScope, ...currentScope} 
        
        element.scope = mergedScope

        if (!element.children) return element

        element.children = element.children.map((child) => {
            if (typeof child == "string") return child
            if (typeof child == "function") return child

            return recursiveMergeScope(child, mergedScope)
        })

        return element
    }

    return recursiveMergeScope(root, {})
}

export function compile(root: JSX.Element):string {
    var contentString:string = compileChildren(root)
    var attributesString:string = compileAttributes(root)

    return `<${root.tag} id="${root.id}"${attributesString}>${contentString}</${root.tag}>`
}

export function construct(options: Compiler.ConstructionOptions) {
    bundel = defaultBundel

    const scopedElement = compileScope(options.element)
    const compiled = compile(scopedElement)

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
        
        id: attributes?.id ?? crypto.randomUUID(),

        scope: attributes?.scope ?? {}
    }
}

export function appendStyleBundel(style:string) {
    bundel.style += style
}

export function appendScriptBundel(script:string, semicolon:boolean = true) {
    bundel.script += trailingSemicolon(script, semicolon)
}

export function appendClientElement(target:HTMLElement, element: JSX.Element) {
    
}