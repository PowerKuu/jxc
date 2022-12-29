import { Attributes, BuildOptions, Child, Element, Elements } from "./types"

import { minify } from "uglify-js"

import { join, resolve } from "path"
import { mkdirSync, writeFileSync } from "fs"

import * as crypto from "crypto"

const bundel = {
    script: "",
    style: ""
}

function stringifyFunction(func: (...args:any[]) => any, args:any[] = [], defer = false) {
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


function compileAttributes(element: Element<Child<any>>): string {
    function createAttribute(key:string, value:string) {
        return `${key}=${encapsolateString(String(value))}`
    }
    
    const excludeList = ["args"]
    
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



function compileChildren(element: Element<Child<any>>): string {
    var childrenArray:string[] = []

    for (var child of element.children) {
        if (typeof child == "string") {
            childrenArray.push(child)
            continue
        } 
        else if (element.tag == "script") {
            const execString = stringifyFunction(
                child, 
                element.attributes.args,
                element.attributes.defer
            )

            childrenArray.push(execString)
            continue
        }

        childrenArray.push(compile(child))
    }

    return childrenArray.join("").trim()
}

export function compile(element: Element<any>): string {
    var contentString:string = compileChildren(element)
    var attributesString:string = compileAttributes(element)

    return `<${element.tag} id="${element.elementID}"${attributesString}>${contentString}</${element.tag}>`
}


export function build(options: BuildOptions) {
    for (var [path, element] of Object.entries(options.paths)){
        const dirPath = resolve(__dirname, options.outDir, path)
        const fullPath = join(dirPath, "index.html")

        mkdirSync(dirPath, {recursive: true})

        const compiled = compile(element)

        writeFileSync(fullPath, [
            "<!DOCTYPE html>",
            `<script>${bundel.script}</script>`,
            `<style>${bundel.style}</style>`,
            compiled
        ].join("\n"))
    }
}

export function factory<Tag extends keyof Elements>(tag:Tag, attributes:Attributes|null, ...children: Elements[Tag][]):Element<Elements[Tag]> {
    return {
        tag: tag,
        attributes: attributes ?? {},
        children: children,
        
        elementID: crypto.randomUUID()
    }
}

