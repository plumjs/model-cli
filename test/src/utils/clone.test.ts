import { clone } from '../../../src/utils/clone'
import * as fse from 'fs-extra'

describe('clone ', async () => {
  jest.setTimeout(30000)
  const name = `app-${new Date().getTime().toString()}`
  const cwd = process.cwd()

  beforeAll(async (): Promise<void> => {})

  afterAll(
    async (): Promise<void> => {
      await fse.remove(`${cwd}/${name}`)
    }
  )

  it('clone return true', async (): Promise<void> => {
    const model = 'npm-base-model'
    const res = await clone(model, name, undefined)
    expect(res).toBe(true)
  })

  it('clone return false', async (): Promise<void> => {
    const model = 'npm-base-model'
    const name = 'fms'
    const overwrite = false
    const res = await clone(model, name, overwrite)
    expect(res).toBe(false)
  })
  it('clone err', async (): Promise<void> => {
    const model = 'npm-base-model-error'
    const name = 'fms'
    const overwrite = false
    try {
      await clone(model, name, overwrite)
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
