import fs from '@magic/fs'

export const getCompressed = async fileName => {
  try {
    return await fs.readFile(fileName)
  } catch (e) {
    return false
  }
}
