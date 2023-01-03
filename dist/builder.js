"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.evalRoutes = exports.transpileRoutes = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const compiler_1 = require("./compiler");
const fs = require("fs");
const buildLocation = (0, path_1.join)(__dirname, "babel", ".build");
const createBuildLocation = () => fs.mkdirSync(buildLocation, { recursive: true });
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
    const babelConfigPath = (0, path_1.join)(__dirname, "babel", "babel.config.js");
    //const command = `npx babel routes --extensions ".tsx,.jsx,.ts,.js" --out-file-extension .js --out-dir dist --copy-files --config-file ${babelConfigPath}`
    const command = [
        "npx", "babel", input,
        "--out-dir", output,
        "--extensions", ".tsx,.jsx,.ts,.js",
        "--out-file-extension", ".js",
        "--copy-files",
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
    const publicDir = (0, path_1.join)(input, "public");
    const publicDirExists = fs.existsSync(publicDir);
    if (publicDirExists) {
        fs.cpSync(publicDir, output, { recursive: true });
    }
    for (var dirName of dirs) {
        if (dirName === "public")
            continue;
        const inPath = (0, path_1.join)(input, dirName);
        const outPath = (0, path_1.join)(output, dirName);
        const rootComponent = tryCatch(() => require((0, path_1.join)(inPath, "index.js")).default);
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
    }
}
exports.evalRoutes = evalRoutes;
function build(input, output) {
    fs.rmSync(buildLocation, { recursive: true, force: true });
    createBuildLocation();
    transpileRoutes(input);
    evalRoutes(output);
}
exports.build = build;
createBuildLocation();
