const t = require("@babel/types")
const babelTemplate = require("@babel/template").default
const babel = require("@babel/core")

module.exports = () => {
    return {
        visitor: {
            Program: {
                enter: (path, state) => {
                    const options = state.opts
                    const file = state.file
    
                    if (!options.accept(file.opts.filename)) return
                    path.node.body.unshift(
                        babel.parse(options.prepend).program.body[0]
                    )             
                }
            }
        }
    }
}