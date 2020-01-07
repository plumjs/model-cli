#!/usr/bin/env node

import * as commander from "commander"
import { projectCreate } from "../src/index"

const program = new commander.Command()
program.version('0.0.1');

program
    .option('-n, --new', 'create a new project')

program.parse(process.argv);

if (program.new) projectCreate()

else program.help()