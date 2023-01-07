#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const build_1 = require("./build");
//import dev from "./dev"
switch (process_1.argv[2].toLowerCase()) {
    case "build":
        (0, build_1.default)();
        break;
    default:
        console.log("Use an argument.");
        break;
}
