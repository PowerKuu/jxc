"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendClientElement = exports.appendScriptBundel = exports.appendStyleBundel = exports.factory = exports.construct = exports.compile = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const crypto = require("crypto");
const utils_1 = require("./utils/utils");
var defaultBundel = createInitialBundle();
var bundel = defaultBundel;
function createInitialBundle() {
    const scriptBundelPath = (0, path_1.join)(__dirname, "bundel", "js.js");
    const cssBundelPath = (0, path_1.join)(__dirname, "bundel", "css.css");
    const script = (0, utils_1.minifyJavascript)((0, fs_1.readFileSync)(scriptBundelPath, {
        "encoding": "utf-8"
    }), true);
    const style = (0, utils_1.minifyCss)((0, fs_1.readFileSync)(cssBundelPath, {
        "encoding": "utf-8"
    }));
    return { script, style };
}
function createClientScope(scope) {
    var scopeString = "";
    for (var [key, value] of Object.entries(scope)) {
        scopeString += `var ${key}=${(0, utils_1.stringifyValue)(value)};`;
    }
    return scopeString;
}
function createClientFunctionString(func, scope, defer = false, args = []) {
    function proccessArgs(args) {
        return (0, utils_1.stringifyValue)(args).slice(1, -1);
    }
    const funcString = func.toString();
    const funcMinifyString = (0, utils_1.minifyJavascript)(funcString, false) ?? funcString;
    const stringArgs = args.length > 0 ? proccessArgs(args) : "";
    const execString = `(function(){${createClientScope(scope)}(${funcMinifyString})(${stringArgs})})()`;
    const deferString = `window.addEventListener("load",function(){${execString}});`;
    return defer ? deferString : `${execString};`;
}
function getClientVariabel(name) {
    return `window["${name}"]`;
}
function getClientFunction(name) {
    return `${getClientVariabel(name)}();`;
}
function registerClientVariabel(name, value) {
    appendScriptBundel(`${getClientVariabel(name)}=${value}`);
}
function registerClientFunction(stringifiedFunction, id = undefined) {
    const ID = !!id ? id : crypto.randomUUID();
    registerClientVariabel(ID, `function(){${stringifiedFunction}}`);
    return ID;
}
function compileAttributes(element) {
    function createAttribute(key, value) {
        return `${key}=${encapsolateString(String(value))}`;
    }
    const excludeList = ["id", "use"];
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
            const funcName = registerClientFunction(createClientFunctionString(value, element.scope, false));
            attributesArray.push(createAttribute(key, getClientFunction(funcName)));
            continue;
        }
        if (excludeList.includes(key))
            continue;
        if (key === "style" && typeof value !== "string")
            value = Object.entries(value).map(([k, v]) => `${k}:${v}`).join(';');
        if (Array.isArray(value))
            value = value.join(" ");
        attributesArray.push(createAttribute(key, value));
    }
    return attributesArray.join("").trim();
}
function compileChildren(element) {
    if (element.children == undefined)
        return "";
    var childrenArray = [];
    for (var child of element.children) {
        if (typeof child == "string") {
            childrenArray.push(child);
            continue;
        }
        else if (element.tag == "script" && typeof child == "function") {
            const execString = createClientFunctionString(child, element.scope, element.attributes.defer);
            childrenArray.push(execString);
            continue;
        }
        else if (typeof child == "function") {
            continue;
        }
        childrenArray.push(compile(child));
    }
    return childrenArray.join("").trim();
}
function compileScope(root) {
    function recursiveMergeScope(element, parentScope) {
        const currentScope = element.attributes.use ?? {};
        const mergedScope = { ...parentScope, ...currentScope };
        element.scope = mergedScope;
        if (!element.children)
            return element;
        element.children = element.children.map((child) => {
            if (typeof child == "string")
                return child;
            if (typeof child == "function")
                return child;
            return recursiveMergeScope(child, mergedScope);
        });
        return element;
    }
    return recursiveMergeScope(root, {});
}
function compile(root) {
    var contentString = compileChildren(root);
    var attributesString = compileAttributes(root);
    return `<${root.tag} id="${root.id}"${attributesString}>${contentString}</${root.tag}>`;
}
exports.compile = compile;
function construct(options) {
    bundel = defaultBundel;
    const scopedElement = compileScope(options.element);
    const compiled = compile(scopedElement);
    const dirPath = (0, path_1.resolve)(__dirname, options.outDir);
    const fullPath = (0, path_1.join)(dirPath, "index.html");
    (0, fs_1.mkdirSync)(dirPath, { recursive: true });
    (0, fs_1.writeFileSync)(fullPath, [
        "<!DOCTYPE html>",
        `<script>${bundel.script}</script>`,
        `<style>${bundel.style}</style>`,
        compiled
    ].join(""));
}
exports.construct = construct;
function factory(tag, attributes, ...children) {
    // Convert to 1D
    children = [].concat(...children);
    if (typeof tag == "function")
        return tag({ ...attributes, children: children });
    return {
        tag: tag,
        attributes: attributes ?? {},
        children: children,
        id: attributes?.id ?? crypto.randomUUID(),
        scope: attributes?.scope ?? {}
    };
}
exports.factory = factory;
function appendStyleBundel(style) {
    bundel.style += style;
}
exports.appendStyleBundel = appendStyleBundel;
function appendScriptBundel(script, semicolon = true) {
    bundel.script += (0, utils_1.trailingSemicolon)(script, semicolon);
}
exports.appendScriptBundel = appendScriptBundel;
function appendClientElement(target, element) {
}
exports.appendClientElement = appendClientElement;
