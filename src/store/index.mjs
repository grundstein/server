import log from '@magic/log'

import { getCache } from './lib/index.mjs'

export const store = {
  cache: {},
  init: async (dir = process.cwd()) => {
    const startTime = log.hrtime()
    store.cache = await getCache(dir)
    log.timeTaken(startTime, 'db cache init took:')
  },
  set: (key, val) => {
    store.cache[key] = val
  },
  get: key => (key ? store.cache[key] : store.cache),
  reset: key => {
    store.cache = {}
  },
}

export default store
