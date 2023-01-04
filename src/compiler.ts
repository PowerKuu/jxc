import { minify } from "uglify-js"
import { join, resolve } from "path"
import { mkdirSync, writeFileSync } from "fs"

import * as crypto from "crypto"

const defaultBundel = {
    script: "",
    style: ""
}

var bundel = defaultBundel

function stringifyFunction(func: Function, args:any[] = [], defer = false) {
    function proccessArgs(args:any[]){
        return JSON.stringify(args).slice(1, -1)
    }

    const funcString = func.toString()
    const funcMinify = minify(funcString, {
        "compress": false,
    })

    const funcMinifyString = funcMinify.error ? 
    funcString : 
    funcMinify.code.slice(0, -1)
    
    const stringArgs = args ? 
    proccessArgs(args) : 
    ""
    const execString = `(${funcMinifyString})(${stringArgs});`
    const deferString = `window.addEventListener("load",function(){${execString}});`

    return defer ? deferString : execString
}

function registerClientFunction(stringifiedFunction:string):string {
    const randomUUID = crypto.randomUUID()

    bundel.script += `window["${randomUUID}"]=function(){${stringifiedFunction}}`

    return randomUUID
}

function getClientFunction(name:string):string {
    return `window["${name}"]();`
}


function compileAttributes(element: JSX.Element): string {
    function createAttribute(key:string, value:string) {
        return `${key}=${encapsolateString(String(value))}`
    }
    
    const excludeList = ["args", "id"]
    
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
                stringifyFunction(value, [element])
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
        if (Array.isArray(value)) value = value.join(" ")
        attributesArray.push(createAttribute(key, value))
    }

    return attributesArray.join("").trim()
}



function compileChildren(element: JSX.Element): string {
    if (element.children == undefined) return ""
    
    var childrenArray:string[] = []

    for (var child of element.children) {
        if (typeof child == "string") {
            childrenArray.push(child)
            continue
        } 
        else if (element.tag == "script" && typeof child == "function") {
            const execString = stringifyFunction(
                child, 
                element.attributes.args,
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

export function compile(element: JSX.Element): string {
    var contentString:string = compileChildren(element)
    var attributesString:string = compileAttributes(element)

    return `<${element.tag} id="${element.id}"${attributesString}>${contentString}</${element.tag}>`
}


export function construct(options: Compiler.ConstructionOptions) {
    bundel = defaultBundel


    const dirPath = resolve(__dirname, options.outDir)
    const fullPath = join(dirPath, "index.html")

    mkdirSync(dirPath, {recursive: true})
    const compiled = compile(options.element)

    writeFileSync(fullPath, [
        "<!DOCTYPE html>",
        `<script>${bundel.script}</script>`,
        `<style>${bundel.style}</style>`,
        compiled
    ].join("\n"))
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

