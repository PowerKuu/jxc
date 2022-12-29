"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testApp = testApp;
var _compiler = require("./compiler");
function testApp() {
  return _compiler.factory("html", null, _compiler.factory("head", null, _compiler.factory("script", null, () => console.log("test"))), _compiler.factory("body", null, _compiler.factory("h1", {
    onclick: s => {
      console.log(s);
    }
  }, "asaasa"), _compiler.factory("p", null, "dette er en test du tror du aser kul")));
}
(0, _compiler.build)({
  "paths": {
    "home": testApp()
  },
  "outDir": "dist"
});