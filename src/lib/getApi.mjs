import path from 'path'

import fs from '@magic/fs'

export const getApi = async (dir) => {
  const files = await fs.getFiles(dir)

  const versions = {}

  await Promise.all(files.map(async file => {
    const relativePath = file.replace(dir, '')
    const [_, version , ...pathParts] = relativePath.split(path.sep)
    versions[version] = versions[version] || {}

    const absPath = path.join(process.cwd(), file)

    const { default : lambda } = await import(absPath)
    const ext = path.extname(file)
    const lambdaPath = pathParts.join('/').replace(ext, '')
    versions[version][`/${lambdaPath}`] = lambda
  }))

  return versions
}
