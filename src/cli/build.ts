#!/usr/bin/env node

import { resolve } from "path"
import { argv, cwd } from "process"
import { build } from "../builder"

const input = resolve(cwd(), argv[2] ?? "./routes")
const output = resolve(cwd(), argv[3] ?? "./dist")

console.log(`Starting build proccess input: ${input}, output: ${output}.`)
build(input, output)