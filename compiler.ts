import { Attributes, BuildOptions, Child, Element, Elements } from "./types"

import { minify } from "uglify-js"

import { join } from "path"
import { mkdirSync, writeFileSync } from "fs"

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
        "compress": false
    })

    const funcMinifyString = funcMinify.error ? 
    funcMinify :
    // Remove trailing semicolon 
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

    var attributesArray = []

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
    var childrenArray = []

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
        const dirPath = join(__dirname, options.outDir, path)
        const fullPath = join(dirPath, "index.html")

        mkdirSync(dirPath, {recursive: true})

        const compiled = compile(element)

        writeFileSync(fullPath, [
            "<!DOCTYPE html>",
            `<script>${bundel.script}</script>`,
            `<style>${bundel.style}</style>`,
            compiled
        ].join(""))
    }
}

export function factory<Tag extends keyof Elements>(tag:Tag, attributes:Attributes, ...children: Elements[Tag][]):Element<Elements[Tag]> {
    return {
        tag: tag,
        attributes: attributes,
        children: children,
        
        elementID: crypto.randomUUID()
    }
}

export function testApp() {
    return factory("html", {},
        factory("head", {}, 
            factory("script", {defer: true, args: []}, () => {
                console.log("test")
            })
        ),
        factory("body", {}, 
            factory("h1",{onclick: (s) => {console.log(this.event)}}, "this is an exsample"),
            factory("p", {}, "dette er en test du tror du er kul")
        ),
    )
}


build({
    outDir: "/dist",

    paths: {
        "home": testApp()
    }
})


