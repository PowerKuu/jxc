/*
import { join, resolve } from "path"
import { argv, cwd } from "process"
import { build } from "../builder"

//import watch from "node-watch"
import * as liveServer from "@compodoc/live-server"
import { watch } from "fs"

export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes")
    const output = argv[4] ? resolve(cwd(), argv[4]) : join(__dirname, ".dist")

    console.log(`Starting dev server input: ${input}, output: ${output}.`)

    build(input, output)

    const watcher = watch(input, {recursive: true, persistent: true})

    watcher.on("change", () => {
        const date = new Date()
        const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

        console.log(`${formatedDate} - New live server reload.`)

        build(input, output)
    })

    liveServer.start({
        root: output
    })

    console.log(`Edit ${input} for live updates.`)
}

*/ 
