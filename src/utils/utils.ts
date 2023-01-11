import { minify as minifyJavascriptUnsafe } from "uglify-js"

const CleanCss = require('clean-css')
const cleanCss = new CleanCss()

export function trailingSemicolon(target:string, semicolon:boolean):string {
    if (semicolon) {
        return (target.endsWith(";") ? target : `${target};`)
    } else {
        return (target.endsWith(";") ? target.slice(0,-1) : target)
    }
}
 
export function minifyJavascript(str:string, semicolon:boolean):string {
    const minified = minifyJavascriptUnsafe(str, {
        "compress": false,
    })
    
    if (minified.error) return

    // Remove trailing ssemicolon}
    
    return trailingSemicolon(minified.code, semicolon)
}

export function minifyCss(str:string):string {
    const minifed = cleanCss.minify(str)

    if(minifed.errors.length > 0){
        throw new Error(minifed.errors.join("\n"))
    }
    if(minifed.warnings.length > 0){
        console.warn("Css warnings:", minifed.warnings.join("\n"))
    }

    return minifed.styles ?? ""
}


export function stringifyValue(value:any) {
    const stringifyTypes = ["string", "number", "object", "boolean", "bigint", "symbol"]
    const stringTypes = ["function"]

    if (typeof value == "object") {
        // Classes
        if (value.__proto__ && !Array.isArray(value)) return stringifyObject({...value, ...value.__proto__})
        return stringifyObject(value)
    } 
    
    if (stringifyTypes.includes(typeof value)) {
        return JSON.stringify(value)
    }

    if (stringTypes.includes(typeof value)) {
        if (typeof value == "function") {
            return minifyJavascript(String(value), false)
        }

        return String(value)
    }

    return "undefined"
}

function stringifyObject(object:Object):string {
    var str = ""
    var index = 0

    function appendProperty(key:string, value:string) {
        const doTrailingComma = index == Object.entries(object).length
        var trailingComma = doTrailingComma ? "" : ","
        str += [key, ":", value, trailingComma].join("")
    }

    function appendArray(value:string) {
        if (!Array.isArray(object)) return

        const doTrailingComma = index == object.length
        var trailingComma = doTrailingComma ? "" : ","
        str += [value, trailingComma].join("")
    }

    if (Array.isArray(object)) {
        for (var value of object) {
            index += 1

            appendArray(stringifyValue(value))
        }


        return `[${str}]`
    } else {
        for (var [key, value] of Object.entries(object)) {
            index += 1
    
            appendProperty(key, stringifyValue(value))
        }

    
        return `{${str}}`
    }
}