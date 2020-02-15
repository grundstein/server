import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

export const initApi = async dir => {
  const startTime = log.hrtime()

  const files = await fs.getFiles(dir)

  const api = {}

  await Promise.all(
    files.map(async file => {
      const relativePath = file.replace(dir, '')
      const [_, version, ...pathParts] = relativePath.split(path.sep)

      // initialize this api version if it does not exist yet
      api[version] = api[version] || {}

      // get absolute path for import
      const absPath = path.join(process.cwd(), file)

      const { default: lambda } = await import(absPath)

      // remove the extension from the lambdapath
      const ext = path.extname(file)
      const lambdaPath = pathParts.join('/').replace(ext, '')

      api[version][`/${lambdaPath}`] = lambda
    }),
  )

  log.timeTaken(startTime, 'api init took')

  return api
}
