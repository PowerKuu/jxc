"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const builder_1 = require("../builder");
const fs_1 = require("fs");
exports.default = () => {
    const input = (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[3] ?? "./routes");
    const output = (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[4] ?? "./dist");
    console.log(`Starting dev input: ${input}, output: ${output}.`);
    (0, builder_1.build)(input, output);
    const watcher = (0, fs_1.watch)(input, { recursive: true, persistent: true });
    watcher.on("change", () => {
        const date = new Date();
        const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        console.log(`${formatedDate} - New live server reload.`);
        (0, builder_1.build)(input, output);
    });
    console.log(`Edit ${input} for live updates.`);
};
