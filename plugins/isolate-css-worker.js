const postcss = require("postcss")
const postcssModules = require("postcss-modules")({
    generateScopedName: "[name]__[local]___[hash:base64:5]",
    getJSON: () => {

    }
})

const { runAsWorker } = require("synckit")

async function IsolateCss(css, src = undefined) {
    const runner = postcss([postcssModules])
    const processed = await runner.process(css, { from: src })

    var processedCss = processed.css
    var processedTokens = {}

    for (var message of processed.messages) {
        if (message.type !== "export") continue
        processedTokens = {...processedTokens, ...message.exportTokens}
    }

    return {css: processedCss, tokens: processedTokens}
}


runAsWorker(IsolateCss)
