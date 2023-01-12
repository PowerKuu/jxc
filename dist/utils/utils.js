"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyValue = exports.minifyCss = exports.minifyJavascript = exports.trailingSemicolon = void 0;
const uglify_js_1 = require("uglify-js");
const CleanCss = require('clean-css');
const cleanCss = new CleanCss();
function trailingSemicolon(target, semicolon) {
    if (semicolon) {
        return (target.endsWith(";") ? target : `${target};`);
    }
    else {
        return (target.endsWith(";") ? target.slice(0, -1) : target);
    }
}
exports.trailingSemicolon = trailingSemicolon;
function minifyJavascript(str, semicolon) {
    const minified = (0, uglify_js_1.minify)(str, {
        "compress": false,
    });
    if (minified.error)
        return;
    // Remove trailing semicolon
    return trailingSemicolon(minified.code, semicolon);
}
exports.minifyJavascript = minifyJavascript;
function minifyCss(str) {
    const minifed = cleanCss.minify(str);
    if (minifed.errors.length > 0) {
        throw new Error(minifed.errors.join("\n"));
    }
    if (minifed.warnings.length > 0) {
        console.warn("Css warnings:", minifed.warnings.join("\n"));
    }
    return minifed.styles ?? "";
}
exports.minifyCss = minifyCss;
function stringifyValue(value) {
    const stringifyTypes = ["string", "number", "object", "boolean", "bigint", "symbol"];
    const stringTypes = ["function"];
    if (typeof value == "object") {
        // Classes
        if (typeof value.constructor == "function" && Object.getPrototypeOf(value)) {
            // Future create do allot of stuff for class to work
            return stringifyObject(value);
            //value.constructor.toString()
        }
        return stringifyObject(value);
    }
    if (stringifyTypes.includes(typeof value)) {
        return JSON.stringify(value);
    }
    if (stringTypes.includes(typeof value)) {
        if (typeof value == "function") {
            return minifyJavascript(String(value), false);
        }
        return String(value);
    }
    return "undefined";
}
exports.stringifyValue = stringifyValue;
function stringifyObject(object) {
    var str = "";
    var index = 0;
    function appendProperty(key, value) {
        const doTrailingComma = index == Object.entries(object).length;
        var trailingComma = doTrailingComma ? "" : ",";
        str += [JSON.stringify(key), ":", value, trailingComma].join("");
    }
    function appendArray(value) {
        if (!Array.isArray(object))
            return;
        const doTrailingComma = index == object.length;
        var trailingComma = doTrailingComma ? "" : ",";
        str += [value, trailingComma].join("");
    }
    if (Array.isArray(object)) {
        for (var value of object) {
            index += 1;
            appendArray(stringifyValue(value));
        }
        return `[${str}]`;
    }
    else {
        for (var [key, value] of Object.entries(object)) {
            index += 1;
            appendProperty(key, stringifyValue(value));
        }
        return `{${str}}`;
    }
}
