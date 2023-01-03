#!/usr/bin/env node

import { resolve } from "path"
import { argv, cwd } from "process"
import { build } from "../builder"

build(resolve(cwd(), argv[1] ?? "./routes"), resolve(cwd(), argv[2] ?? "./dist"))