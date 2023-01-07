#!/usr/bin/env node

import { resolve } from "path"
import { argv, cwd } from "process"
import { build } from "../builder"


export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes")
    const output = resolve(cwd(), argv[4] ?? "./dist")

    console.log(`Starting build proccess input: ${input}, output: ${output}.`)
    build(input, output)
}