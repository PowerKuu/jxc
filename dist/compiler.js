"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;
exports.compile = compile;
exports.factory = factory;
var _uglifyJs = require("uglify-js");
var _path = require("path");
var _fs = require("fs");
var crypto = _interopRequireWildcard(require("crypto"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const bundel = {
  script: "",
  style: ""
};
function stringifyFunction(func, args = [], defer = false) {
  function proccessArgs(args) {
    return JSON.stringify(args).slice(1, -1);
  }
  const funcString = func.toString();
  const funcMinify = (0, _uglifyJs.minify)(funcString, {
    "compress": false
  });
  const funcMinifyString = funcMinify.error ? funcString : funcMinify.code.slice(0, -1);
  const stringArgs = args ? proccessArgs(args) : "";
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
    str = str.split("").map(value => {
      if (value == `"`) return `'`;
      if (value == `'`) return `"`;
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
    if (excludeList.includes(key)) continue;
    if (Array.isArray(value)) value = value.join(" ");
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
    } else if (element.tag == "script") {
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
  return `<${element.tag} id="${element.elementID}"${attributesString}>${contentString}</${element.tag}>`;
}
function build(options) {
  for (var [path, element] of Object.entries(options.paths)) {
    const dirPath = (0, _path.resolve)(__dirname, options.outDir, path);
    const fullPath = (0, _path.join)(dirPath, "index.html");
    (0, _fs.mkdirSync)(dirPath, {
      recursive: true
    });
    const compiled = compile(element);
    (0, _fs.writeFileSync)(fullPath, ["<!DOCTYPE html>", `<script>${bundel.script}</script>`, `<style>${bundel.style}</style>`, compiled].join("\n"));
  }
}
function factory(tag, attributes, ...children) {
  return {
    tag: tag,
    attributes: attributes ?? {},
    children: children,
    elementID: crypto.randomUUID()
  };
}