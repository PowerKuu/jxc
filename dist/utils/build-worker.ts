import { build } from "../builder.js"

function run(input:string, output:string) {
    build(input, output)
}

run(process.argv[2], process.argv[3])