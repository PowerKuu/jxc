import { execSync } from "child_process"
import { join, parse, resolve } from "path"
import { construct } from "./compiler"

import * as fs from "fs"

const buildLocation = join(__dirname, ".build")
const babelConfigPath = resolve(__dirname, "../babel.config.js")


const tryCatch = (func:Function) => {
    try {
        return func()
    } catch (error) {
        return
    }
}

export function transpileRoutes(input:string) {
    const output = buildLocation

    const command = [
        "npx", "babel", input,
        "--out-dir", output,
        "--extensions", ".tsx,.jsx,.ts,.js",
        "--out-file-extension", ".js",
        "--copy-files",
        "--config-file", babelConfigPath
    ].join(" ")

    execSync(command)
}

export function evalRoutes(output:string) {
    const input = buildLocation

    const dirs = fs.readdirSync(input, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


    function copyFiles(inPath:string, outPath:string) {
        const paths = fs.readdirSync(inPath, {withFileTypes: true})
        var hasCreatedOut = false

        function insureOutExist() {
            if (hasCreatedOut == false) fs.mkdirSync(outPath, {recursive: true})
            hasCreatedOut = true
        }

        for (var path of paths) {
            const source = join(inPath, path.name)
            const destination = join(outPath, path.name)

            if (path.isDirectory()) {
                copyFiles(source, destination)
                continue
            }

            const pathSplit = path.name.split(".")

            const isClientSide = pathSplit.length >= 3 && pathSplit[0] === "client"
            const isServerSide = pathSplit.length >= 3 && pathSplit[0] === "server"
            const isModuleCss = pathSplit.length >= 3 && pathSplit[pathSplit.length-1] === "css" && pathSplit[pathSplit.length-2] === "module"

            if (isServerSide) continue
            if (parse(path.name).ext == ".js" && isClientSide == false) continue
            if (isModuleCss && isClientSide == false) continue

            insureOutExist()
            fs.copyFileSync(source, destination)
        }
    }

    for (var dirName of dirs) {
        const inPath = join(input, dirName)
        const outPath = dirName === "index" ? output : join(output, dirName)

        copyFiles(inPath, outPath)

        const rootComponent = tryCatch(() => require(join(inPath, "index.js")).default)
        if (!rootComponent) continue

        if (!(typeof rootComponent == "function")) {
            const err = `Path: ${dirName} does not export default a function!`
            throw new Error(err)
        }
        
        const rootElement:JSX.Element = rootComponent()

        if (!rootElement.id) {
            const err = `Path: ${dirName} does not export default an element!`
            throw new Error(err)
        }

        construct({
            outDir: outPath,
            element: rootElement
        })
    }
}

export function build(input:string, output:string) {
    if (fs.existsSync(buildLocation)) fs.rmSync(buildLocation, 
        {recursive: true, force: true}
    )

    fs.mkdirSync(input, {recursive: true})
    fs.mkdirSync(output, {recursive: true})
    fs.mkdirSync(buildLocation, {recursive: true})

    transpileRoutes(input)
    evalRoutes(output)
}

