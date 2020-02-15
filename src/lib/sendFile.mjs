import log from '@magic/log'

import { getFileEncoding } from './getFileEncoding.mjs'

export const sendFile = (req, res, file) => {
  const encoding = getFileEncoding(file, req.headers['accept-encoding'])
  const fileContent = file[encoding]

  if (!fileContent) {
    res.writeHead(404)
    res.end('404 - not found.')

    log.error('NO CONTENT', { url, code: 404 })
    return
  }

  res.writeHead(200, {
    'Content-Type': file.mime,
    'Content-Length': Buffer.byteLength(fileContent),
    'Content-Encoding': encoding,
  })

  res.end(fileContent)
}
