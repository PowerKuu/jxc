"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.evalRoutes = exports.transpileRoutes = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const compiler_1 = require("./compiler");
const fs = require("fs");
const buildLocation = (0, path_1.join)(__dirname, ".build");
const babelConfigPath = (0, path_1.resolve)(__dirname, "../babel.config.js");
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
    function copyFiles(inPath, outPath) {
        const paths = fs.readdirSync(inPath, { withFileTypes: true });
        if (paths.length > 0)
            fs.mkdirSync(outPath, { recursive: true });
        for (var path of paths) {
            const source = (0, path_1.join)(inPath, path.name);
            const destination = (0, path_1.join)(outPath, path.name);
            if (path.isDirectory()) {
                copyFiles(source, destination);
                continue;
            }
            const pathSplit = path.name.split(".");
            const isClientSide = pathSplit.length >= 3 && pathSplit[0] == "client";
            const isServerSide = pathSplit.length >= 3 && pathSplit[0] == "server";
            if (isServerSide)
                continue;
            if ((0, path_1.parse)(path.name).ext == ".js" && isClientSide == false)
                continue;
            fs.copyFileSync(source, destination);
        }
    }
    //const publicDir = join(input, "public")
    //const publicDirExists = fs.existsSync(publicDir)
    //if (publicDirExists) {
    //    fs.cpSync(publicDir, join(output, "public"), {recursive: true})
    //}
    for (var dirName of dirs) {
        //if (dirName === "public") continue
        const inPath = (0, path_1.join)(input, dirName);
        const outPath = dirName === "index" ? output : (0, path_1.join)(output, dirName);
        copyFiles(inPath, outPath);
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
    if (fs.existsSync(buildLocation))
        fs.rmSync(buildLocation, { recursive: true, force: true });
    fs.mkdirSync(input, { recursive: true });
    fs.mkdirSync(output, { recursive: true });
    fs.mkdirSync(buildLocation, { recursive: true });
    transpileRoutes(input);
    evalRoutes(output);
}
exports.build = build;
