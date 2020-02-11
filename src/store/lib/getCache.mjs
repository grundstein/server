import path from 'path'

import fs from '@magic/fs'
import mimes from '@magic/mime-types'

import { getFileContent } from './getFileContent.mjs'

export const getCache = async dirs => {
  const files = {}

  await Promise.all(
    dirs.map(async dir => {
      const contents = await fs.getFiles(dir)

      await Promise.all(
        contents.map(async name => {
          const file = await getFileContent({ name, dir })

          files[file.url] = file
          return file
        }),
      )
    }),
  )

  return files
}
