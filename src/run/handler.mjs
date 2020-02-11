import mimes from '@magic/mime-types'
import log from '@magic/log'

import { getFileEncoding } from '../lib/index.mjs'

export const handler = store => (req, res) => {
  const startTime = log.hrtime()

  let { url } = req
  if (url.endsWith('/')) {
    url = `${url}index.html`
  }

  const file = store.get(url)

  if (!file) {
    res.writeHead(404)
    res.end('404 - not found.')

    log.timeTaken(startTime, 'FILE NOT FOUND. Request took', `${url}, code: 404`)
    return
  }

  const encoding = getFileEncoding(file, req.headers['accept-encoding'])
  const fileContent = file[encoding]

  if (!fileContent) {
    res.writeHead(404)
    res.end('404 - not found.')

    log.info('NO CONTENT', { url, code: 404 })
    return
  }

  res.writeHead(200, {
    'Content-Type': file.mime,
    'Content-Length': Buffer.byteLength(fileContent),
    'Content-Encoding': encoding,
  })

  res.end(fileContent)

  log.timeTaken(startTime, 'Response took:', `url: ${url}, code: 200`)
}
