#!/usr/bin/env node

import { argv } from "process"
import build from "./build"
//import dev from "./dev"


switch (argv[2].toLowerCase()) {
    case "build":
        build()
        break

    default:
        console.log("Use an argument.")
        break
}