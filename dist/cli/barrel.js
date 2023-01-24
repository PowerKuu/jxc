#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const build_1 = require("./build");
const dev_1 = require("./dev");
const babel_1 = require("./babel");
//import dev from "./dev"
switch (process_1.argv[2].toLowerCase()) {
    case "build":
        (0, build_1.default)();
        break;
    case "babel":
        (0, babel_1.default)();
        break;
    case "dev":
        (0, dev_1.default)();
        break;
    default:
        console.log("Use an argument.");
        break;
}
