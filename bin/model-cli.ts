#!/usr/bin/env node

import * as commander from "commander"
import { projectCreate } from "../src/index"
const pg = require(`../../package.json`)

const program = new commander.Command()
program.version(pg.version);

program
    .option('-n, --new', 'create a new project')

program.parse(process.argv);

if (program.new) projectCreate()

else program.help()