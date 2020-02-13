import path from 'path'

import fs from '@magic/fs'
import mimes from '@magic/mime-types'

import { getFileContent } from './getFileContent.mjs'

export const getCache = async dir => {
  const contents = await fs.getFiles(dir)

  const fileArray = await Promise.all(contents.map(getFileContent(dir)))

  return Object.fromEntries(fileArray)
}
