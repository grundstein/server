import http from 'http'

import { log } from '@grundstein/commons'

import initApi from './api.mjs'
import handler from './handler.mjs'

import gps from '@grundstein/gps'

export const run = async (config = {}) => {
  const startTime = log.hrtime()

  const {
    args = {},
  } = config

  const { dir = 'api' } = args

  const { host, port } = gps.gas

  try {
    const api = await initApi(dir)

    const server = http.createServer(handler(api))

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    server.listen(port, host, () => {
      const timeToListen = process.hrtime(startTime)

      log.success('Mainthread started', `pid: ${process.pid}`)
      log(`server listening to ${host}:${port}`)

      log.timeTaken(startTime, 'startup needed:')
    })
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
