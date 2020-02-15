import log from '@magic/log'

import defaultStore from '@grundstein/file-store'

export const initStore = async (staticDir, fileStore = defaultStore) => {
  const startTime = log.hrtime()

  const store = await fileStore(staticDir)

  log.timeTaken(startTime, 'fileStore init took')

  return store
}
