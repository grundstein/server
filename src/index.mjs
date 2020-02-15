import http from 'http'
// import cluster from 'cluster'
// import os from 'os'

import log from '@magic/log'

import defaultStore from '@grundstein/file-store'

import { handler as defaultHandler } from './handler.mjs'

import { initStore, initApi } from './init/index.mjs'

// const numCPUs = os.cpus().length

export const runCluster = async (config = {}) => {
  const startTime = log.hrtime()

  const { args = {}, handler = defaultHandler, fileStore = defaultStore } = config

  const { port = 8080, staticDir, apiDir } = args

  const store = await initStore(staticDir, fileStore)

  const api = await initApi(apiDir)

  const server = http.createServer(handler({ store, api }))

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })

  server.listen(port, () => {
    const timeToListen = process.hrtime(startTime)

    log.success('Mainthread started', `pid: ${process.pid}`)
    log(`server listening to localhost:${port}`)

    log.timeTaken(startTime, 'startup needed:')
  })
}

export default runCluster
