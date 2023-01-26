import { execSync } from "child_process"
import { join, parse, resolve } from "path"
import { construct } from "./compiler"

import * as fs from "fs"

const buildLocation = join(__dirname, ".build")
const babelConfigPath = resolve(__dirname, "../babel.config.js")

const fileClientBlacklist = [".js", ".css"]

const tryCatch = (func:Function) => {
    try {
        return func()
    } catch (error) {
        return
    }
}

export function transpileRoutes(input:string, output = buildLocation, declaration:boolean = false) {
    const babelCommand = [
        "npx", "babel", input,
        "--out-dir", output,
        "--copy-files",
        "--extensions", ".tsx,.jsx,.ts,.js",
        "--out-file-extension", ".js",
        "--config-file", babelConfigPath
    ].join(" ")

    execSync(babelCommand)

    if (!declaration) return

    const tscCommand = [
        "npx", "tsc",
        "--outDir", output,
        "--rootDir", input,
        "--declaration",
        "--emitDeclarationOnly",
        "--isolatedModules",
    ].join(" ")

    //console.log(tscCommand)

    execSync(tscCommand)
}

export function evalRoutes(output:string, input = buildLocation) {
    const dirs = fs.readdirSync(input, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


    function buildPath(inPath:string, outPath:string) {
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
                buildPath(source, destination)
                continue
            }

            const pathSplit = path.name.split(".")

            if (path.name == "index.js"){
                const rootComponent = tryCatch(() => require(source).default)
            
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

                continue
            }

            const isClientSide = pathSplit.length >= 3 && pathSplit[0] === "client"
            const isServerSide = pathSplit.length >= 3 && pathSplit[0] === "server"

            if (isServerSide) continue
            if (fileClientBlacklist.includes(parse(path.name).ext) && isClientSide == false) continue

            insureOutExist()
            fs.copyFileSync(source, destination)
        }
    }

    for (var dirName of dirs) {
        const inPath = join(input, dirName)
        const outPath = dirName === "index" ? output : join(output, dirName)

        buildPath(inPath, outPath)
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