#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const build_1 = require("./build");
const dev_1 = require("./dev");
switch (process_1.argv[2].toLowerCase()) {
    case "build":
        (0, build_1.default)();
    case "dev":
        (0, dev_1.default)();
    default:
        console.log("Use build/dev as an argument.");
}
