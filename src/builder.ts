import { execSync } from "child_process"
import { join, resolve } from "path"
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

    //const command = `npx babel routes --extensions ".tsx,.jsx,.ts,.js" --out-file-extension .js --out-dir dist --copy-files --config-file ${babelConfigPath}`

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

    const publicDir = join(input, "public")
    const publicDirExists = fs.existsSync(publicDir)

    if (publicDirExists) {
        fs.cpSync(publicDir, output, {recursive: true})
    }

    for (var dirName of dirs) {
        if (dirName === "public") continue

        const inPath = join(input, dirName)
        const outPath = join(output, dirName)

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

