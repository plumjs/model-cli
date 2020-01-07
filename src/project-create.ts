import * as inquirer from 'inquirer'
import * as fs from 'fs'
import { models } from './config/config'
import { clone } from './utils/clone'

/**
 * create a new project
 */
export async function projectCreate() {
  const cwd = process.cwd()
  const answers = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'model',
      default: 'npm-base-model',
      choices: Object.values(models),
      message: 'remote model',
    },
    {
      type: 'input',
      name: 'name',
      default: 'helloWorld',
      message: 'Project dir',
    },
    {
      type: 'confirm',
      name: 'overwrite',
      default: false,
      message: answers => `Overwrite ${cwd}/${answers.name}`,
      when: answers => fs.existsSync(`${cwd}/${answers.name}`),
    },
  ])
  const { model, name, overwrite } = answers
  return clone(model, name, overwrite)
}
