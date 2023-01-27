const babel = require("@babel/core")

const helper = require("@babel/helper-module-transforms")


module.exports = () => { 
    return {
        visitor: {
            Program: {
                enter: (path, state) => {
                    const options = state.opts
                    const file = state.file
    
                    if (!options.accept(file.opts.filename)) return

                    const prepend = babel.parse(options.prepend).program.body[0]

                    helper.ensureStatementsHoisted([prepend])

                    path.unshiftContainer("body", prepend)             
                }
            }
        }
    }
}