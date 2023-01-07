import { join, resolve } from "path"
import { argv, cwd } from "process"
import { build } from "../builder"

import watch from "node-watch"
import * as liveServer from "@compodoc/live-server"

export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes")
    const output = argv[4] ? resolve(cwd(), argv[4]) : join(__dirname, ".dist")

    console.log(`Starting dev server input: ${input}, output: ${output}.`)

    watch(input, {recursive: true, delay: 750}, () => {
        build(input, output)
    })

    liveServer.start({
        root: output,
        middleware: [
            (req:any, res:any, next:any) => {
                const date = new Date()
                const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

                console.log(`${formatedDate} - New live server reload.`)
                next()
            },
        ]
    })

    console.log(`Edit ${input} for live updates.`)
}