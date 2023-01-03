#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const builder_1 = require("../builder");
(0, builder_1.build)((0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[1] ?? "./routes"), (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[2] ?? "./dist"));
