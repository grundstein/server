import http from 'http'
import cluster from 'cluster'
import os from 'os'
import path from 'path'

import log from '@magic/log'
import deep from '@magic/deep'
import fs from '@magic/fs'
import mimes from '@magic/mime-types'

import { handler as defaultHandler } from './handler.mjs'
import { store as defaultStore } from './store/index.mjs'

const numCPUs = os.cpus().length

export const runCluster = async (config = {}) => {
  const startTime = log.hrtime()

  const { args, handler = defaultHandler, store = defaultStore } = config

  const { port, staticDir } = args

  await store.init(staticDir)

  log(`Mainthread started. pid: ${process.pid}`)

  const server = http.createServer(handler(store))

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })

  server.listen(port, () => {
    const timeToListen = process.hrtime(startTime)
    log(`server listening to localhost:${port}`)
    log.timeTaken(startTime, 'startup needed')
  })
}
