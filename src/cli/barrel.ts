import { argv } from "process"
import build from "./build"
import dev from "./dev"


switch (argv[2].toLowerCase()) {
    case "build":
        build()

    case "dev":
        dev()

    default:
        console.log("Use build/dev as an argument.")
}