import { resolve } from "path"
import { argv, cwd } from "process"
import { watch } from "fs"
import { fork } from "child_process"
import { getNames } from "../utils/utils.js"

const timeoutDuration = 3500

const { __dirname, __filename } = getNames(import.meta)

export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes")
    const output = resolve(cwd(), argv[4] ?? "./dist")

    console.log(`Starting dev input: ${input}, output: ${output}.`)

    var timeout: NodeJS.Timeout | null = null
    function startBuild() {
        if (timeout) clearTimeout(timeout)
        
        timeout = setTimeout(() => {
            const date = new Date()
            const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    
            console.log(`${formatedDate} - New live server reload.`)
    
            fork(resolve(__dirname, "../utils/build-worker.js"), [input, output])
        }, timeoutDuration)
    }

    const watcher = watch(input, {persistent: true, recursive: true})

    startBuild()
    watcher.on("change", () => startBuild())
    watcher.on("error", (err) => console.error(err))

    console.log(`Edit ${input} for live updates.`)
}

