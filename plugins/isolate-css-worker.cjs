const postcss = require("postcss")
const postcssModules = require("postcss-modules")({
    generateScopedName: "[name]__[local]___[hash:base64:5]",
    getJSON: () => {}
})

const postcssNano = require("cssnano")({
    preset: "default",
})

const { runAsWorker } = require("synckit")

async function IsolateCss(css, src, preserve) {
    const plugins = []

    plugins.push(postcssNano)
    if (!preserve) plugins.push(postcssModules)

    const runner = postcss(plugins)
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
