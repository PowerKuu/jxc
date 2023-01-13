#!/usr/bin/env node

import { argv } from "process"
import build from "./build"
import dev from "./dev"
//import dev from "./dev"


switch (argv[2].toLowerCase()) {
    case "build":
        build()
        break
    
    case "dev":
        dev()
        break

    default:
        console.log("Use an argument.")
        break
}