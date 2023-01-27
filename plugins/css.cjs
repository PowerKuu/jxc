const t = require("@babel/types")
const babelTemplate = require("@babel/template").default

const { createSyncFn } = require("synckit")
const requireResolve = require("require-resolve")

const { parse, resolve } = require("path")
const fs = require("fs")

const appendStyleFunctionName = "appendStyleBundel"

const IsolateCssWorker = createSyncFn(require.resolve("./isolate-css-worker.cjs"))

function CssImportVisitor(callback) {
    return (babelData, { file, options = {} }) => {
        const { node } = babelData

        const importName = parse(node.source.value).base
        const importNameSplit = importName.split(".")


        if (
            importNameSplit.length <= 1 ||
            importNameSplit[importNameSplit.length - 1] !== "css"
        ) return

        const resolved = requireResolve(node.source.value, resolve(file.opts.filename));
        if (!resolved || !resolved.src) throw Error(`No import with name: ${importName}.`)

        callback(
            resolved.src, 
            {...node, ...node.specifiers[0]}, 
            babelData,
            importNameSplit.length >= 3 && importNameSplit[importNameSplit.length - 2] === "module"
        )
    }
}

function createConstAst(tokens, importNode) {
    const node = t.valueToNode(tokens)
    const name = t.identifier(importNode.local.name)

    return babelTemplate("const ID = VALUE")({ ID: name, VALUE: node })
}

function createBundelAst(code) {
    const str = `_compiler.${appendStyleFunctionName}(\`${code}\`)`

    const astString = babelTemplate(str)({})

    return astString
}


module.exports = () => {
    return {
        visitor: {
            ImportDeclaration: {
                exit: CssImportVisitor((src, importNode, babelData, isModule) => {
                    const fileExists = fs.existsSync(src)
                    if (!fileExists) return

                    const rawCss = fs.readFileSync(src, { encoding: "utf-8" })
                    const { css, tokens } = IsolateCssWorker(rawCss, src, !isModule)

                    if (importNode.local) {
                        babelData.replaceWithMultiple([
                            createConstAst(tokens, importNode),
                            createBundelAst(css),
                        ])
                    } else {
                        babelData.replaceWithMultiple([
                            createBundelAst(css),
                        ])
                    }
                })
            }
        }
    }
}