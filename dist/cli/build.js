#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const builder_1 = require("../builder");
exports.default = () => {
    const input = (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[3] ?? "./routes");
    const output = (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[4] ?? "./dist");
    console.log(`Starting build proccess input: ${input}, output: ${output}.`);
    (0, builder_1.build)(input, output);
};
