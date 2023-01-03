"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = exports.construct = exports.compile = void 0;
const uglify_js_1 = require("uglify-js");
const path_1 = require("path");
const fs_1 = require("fs");
const crypto = require("crypto");
const defaultBundel = {
    script: "",
    style: ""
};
var bundel = defaultBundel;
function stringifyFunction(func, args = [], defer = false) {
    function proccessArgs(args) {
        return JSON.stringify(args).slice(1, -1);
    }
    const funcString = func.toString();
    const funcMinify = (0, uglify_js_1.minify)(funcString, {
        "compress": false,
    });
    const funcMinifyString = funcMinify.error ?
        funcString :
        funcMinify.code.slice(0, -1);
    const stringArgs = args ?
        proccessArgs(args) :
        "";
    const execString = `(${funcMinifyString})(${stringArgs});`;
    const deferString = `window.addEventListener("load",function(){${execString}});`;
    return defer ? deferString : execString;
}
function registerClientFunction(stringifiedFunction) {
    const randomUUID = crypto.randomUUID();
    bundel.script += `window["${randomUUID}"]=function(){${stringifiedFunction}}`;
    return randomUUID;
}
function getClientFunction(name) {
    return `window["${name}"]();`;
}
function compileAttributes(element) {
    function createAttribute(key, value) {
        return `${key}=${encapsolateString(String(value))}`;
    }
    const excludeList = ["args"];
    function encapsolateString(str) {
        str = str.split("").map((value) => {
            if (value == `"`)
                return `'`;
            if (value == `'`)
                return `"`;
            return value;
        }).join("");
        return `"${str}"`;
    }
    var attributesArray = [];
    for (var [key, value] of Object.entries(element.attributes)) {
        if (typeof value == "function") {
            const funcName = registerClientFunction(stringifyFunction(value, [element]));
            attributesArray.push(createAttribute(key, getClientFunction(funcName)));
            continue;
        }
        if (excludeList.includes(key))
            continue;
        if (Array.isArray(value))
            value = value.join(" ");
        attributesArray.push(createAttribute(key, value));
    }
    return attributesArray.join("").trim();
}
function compileChildren(element) {
    var childrenArray = [];
    for (var child of element.children) {
        if (typeof child == "string") {
            childrenArray.push(child);
            continue;
        }
        else if (element.tag == "script" || typeof child == "function") {
            const execString = stringifyFunction(child, element.attributes.args, element.attributes.defer);
            childrenArray.push(execString);
            continue;
        }
        childrenArray.push(compile(child));
    }
    return childrenArray.join("").trim();
}
function compile(element) {
    var contentString = compileChildren(element);
    var attributesString = compileAttributes(element);
    return `<${element.tag} id="${element.id}"${attributesString}>${contentString}</${element.tag}>`;
}
exports.compile = compile;
function construct(options) {
    bundel = defaultBundel;
    const dirPath = (0, path_1.resolve)(__dirname, options.outDir);
    const fullPath = (0, path_1.join)(dirPath, "index.html");
    (0, fs_1.mkdirSync)(dirPath, { recursive: true });
    const compiled = compile(options.element);
    (0, fs_1.writeFileSync)(fullPath, [
        "<!DOCTYPE html>",
        `<script>${bundel.script}</script>`,
        `<style>${bundel.style}</style>`,
        compiled
    ].join("\n"));
}
exports.construct = construct;
function factory(tag, attributes, ...children) {
    // If component
    if (typeof tag == "function")
        return tag({ ...attributes, children });
    return {
        tag: tag,
        attributes: attributes ?? {},
        children: children,
        id: crypto.randomUUID()
    };
}
exports.factory = factory;
