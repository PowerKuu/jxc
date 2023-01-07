"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const builder_1 = require("../builder");
const node_watch_1 = require("node-watch");
const liveServer = require("@compodoc/live-server");
exports.default = () => {
    const input = (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[3] ?? "./routes");
    const output = process_1.argv[4] ? (0, path_1.resolve)((0, process_1.cwd)(), process_1.argv[4]) : (0, path_1.join)(__dirname, ".dist");
    console.log(`Starting dev server input: ${input}, output: ${output}.`);
    (0, node_watch_1.default)(input, { recursive: true, delay: 750 }, () => {
        (0, builder_1.build)(input, output);
    });
    liveServer.start({
        root: output,
        middleware: [
            (req, res, next) => {
                const date = new Date();
                const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
                console.log(`${formatedDate} - New live server reload.`);
                next();
            },
        ]
    });
    console.log(`Edit ${input} for live updates.`);
};
