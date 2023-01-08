const path = require("path")

const package = "@klevn/jxc"

module.exports = {
    "presets": ["@babel/preset-typescript"],
    "plugins": [
      "./plugins/css",
      
      [
        "@babel/plugin-transform-react-jsx",
        {
          "importSource": false, // defaults to react,
          "pragma": "_compiler.factory"
        }
      ],

      [
        "@babel/plugin-transform-modules-commonjs",
        {
          "importInterop": "babel"
        }
      ],

      [
        "babel-plugin-prepend",
        {
          "prepend": `var _compiler = require("${package}")`,
          "accept": (filename) => {
            const fileExt = path.parse(filename).ext
            return fileExt === ".tsx" || fileExt === ".jsx"
          }
        }
      ]
    ]
}