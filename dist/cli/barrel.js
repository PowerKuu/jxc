#!/usr/bin/env node
import { argv } from "process";
import build from "./build.js";
import dev from "./dev.js";
import babel from "./babel.js";
switch (argv[2].toLowerCase()) {
    case "build":
        build();
        break;
    case "babel":
        babel();
        break;
    case "dev":
        dev();
        break;
    default:
        console.log("Use an argument - (dev, build, babel).");
        break;
}
