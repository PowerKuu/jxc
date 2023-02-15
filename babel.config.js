import { parse } from "path"

const packageName = "@klevn/jxc"

//const imports = require("@babel/helper-module-imports")
//imports.addNamespace(path, "source")

export default {
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "classic",
        "pragma": "_compiler.factory",
      }
    ],
    
    [
      "./plugins/prepend.cjs",
      {
        "prepend": `import * as _compiler from "${packageName}"`,
        "accept": (filePath) => {
          const parsedPath = parse(filePath)

          const fileSplit = parsedPath.base.split(".")
          const isClient = fileSplit.length >= 3 && fileSplit[0] === "client"

          return (isClient == false) && (parsedPath.ext === ".tsx" || parsedPath.ext === ".jsx")
        }
      }
    ],

    "./plugins/css.cjs"
  ],

  "presets": ["@babel/preset-typescript"],
}

