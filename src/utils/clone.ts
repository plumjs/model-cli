import { run } from './run'
import * as fse from 'fs-extra'
import { url } from '../config/config'

/**
 * clone from remote repository
 */
export async function clone(
  model: string,
  name: string,
  overwrite: boolean
): Promise<any> {
  const cwd = process.cwd()
  // overwrite is false
  if (overwrite === false) return false

  try {
    // remove original path
    await fse.remove(`${cwd}/${name}`)

    // clone git repo
    await run(`git clone ${url}/${model}.git ${cwd}/${name}`, {
      cwd: cwd,
      stdio: 'inherit',
    })
    // rm .git
    await fse.remove(`${cwd}/${name}/.git`)

    // install dependencies
    await run('npm i', {
      cwd: `${cwd}/${name}`,
      stdio: 'inherit',
    })
    console.log(`Project', ${name}, has been created`)
    return true
  } catch (e) {
    console.log('clone err, e:', e)
  }
}
