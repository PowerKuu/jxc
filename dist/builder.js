"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.evalRoutes = exports.transpileRoutes = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const compiler_1 = require("./compiler");
const fs = require("fs");
const buildLocation = (0, path_1.join)(__dirname, ".build");
const babelConfigPath = (0, path_1.resolve)(__dirname, "../babel.config.js");
const fileClientBlacklist = [".js", ".css"];
const tryCatch = (func) => {
    try {
        return func();
    }
    catch (error) {
        return;
    }
};
function transpileRoutes(input) {
    const output = buildLocation;
    const command = [
        "npx", "babel", input,
        "--out-dir", output,
        "--copy-files",
        "--extensions", ".tsx,.jsx,.ts,.js",
        "--out-file-extension", ".js",
        "--config-file", babelConfigPath
    ].join(" ");
    (0, child_process_1.execSync)(command);
}
exports.transpileRoutes = transpileRoutes;
function evalRoutes(output) {
    const input = buildLocation;
    const dirs = fs.readdirSync(input, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    function buildPath(inPath, outPath) {
        const paths = fs.readdirSync(inPath, { withFileTypes: true });
        var hasCreatedOut = false;
        function insureOutExist() {
            if (hasCreatedOut == false)
                fs.mkdirSync(outPath, { recursive: true });
            hasCreatedOut = true;
        }
        for (var path of paths) {
            const source = (0, path_1.join)(inPath, path.name);
            const destination = (0, path_1.join)(outPath, path.name);
            if (path.isDirectory()) {
                buildPath(source, destination);
                continue;
            }
            const pathSplit = path.name.split(".");
            if (path.name == "index.js") {
                const rootComponent = tryCatch(() => require(source).default);
                if (!rootComponent)
                    continue;
                if (!(typeof rootComponent == "function")) {
                    const err = `Path: ${dirName} does not export default a function!`;
                    throw new Error(err);
                }
                const rootElement = rootComponent();
                if (!rootElement.id) {
                    const err = `Path: ${dirName} does not export default an element!`;
                    throw new Error(err);
                }
                (0, compiler_1.construct)({
                    outDir: outPath,
                    element: rootElement
                });
                continue;
            }
            const isClientSide = pathSplit.length >= 3 && pathSplit[0] === "client";
            const isServerSide = pathSplit.length >= 3 && pathSplit[0] === "server";
            if (isServerSide)
                continue;
            if (fileClientBlacklist.includes((0, path_1.parse)(path.name).ext) && isClientSide == false)
                continue;
            insureOutExist();
            fs.copyFileSync(source, destination);
        }
    }
    for (var dirName of dirs) {
        const inPath = (0, path_1.join)(input, dirName);
        const outPath = dirName === "index" ? output : (0, path_1.join)(output, dirName);
        buildPath(inPath, outPath);
    }
}
exports.evalRoutes = evalRoutes;
function build(input, output) {
    if (fs.existsSync(buildLocation))
        fs.rmSync(buildLocation, { recursive: true, force: true });
    fs.mkdirSync(input, { recursive: true });
    fs.mkdirSync(output, { recursive: true });
    fs.mkdirSync(buildLocation, { recursive: true });
    transpileRoutes(input);
    evalRoutes(output);
}
exports.build = build;
