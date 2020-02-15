import URL from 'url'

import mimes from '@magic/mime-types'
import log from '@magic/log'
import is from '@magic/types'

import { getFileEncoding, getRandomId, sendFile } from './lib/index.mjs'

export const handler = ({ store, api }) => async (req, res) => {
  // remove client ip address as soon as possible
  // to make sure noone can log it.
  // assign random id to make this call traceable in logs.
  req.id = await getRandomId()

  req.headers['x-forwarded-for'] = req.id

  const startTime = log.hrtime()

  let { url } = req
  if (url.endsWith('/')) {
    url = `${url}index.html`
  }

  if (store) {
    const file = store.get(url)

    if (file) {
      sendFile(req, res, file)
      log.timeTaken(startTime, 'static file response took:', `url: ${url}, code: 200`)
      return
    }
  }

  const parsedUrl = URL.parse(req.url)

  if (api && parsedUrl.pathname.startsWith('/api')) {
    const [_, requestVersion, fn] = parsedUrl.pathname.split('/').filter(a => a)

    const versionKeys = Object.keys(api)

    if (!versionKeys.includes(requestVersion)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Api request urls must start with a version. supported: ${versionKeys.join(' ')}`)
      return
    }

    const version = api[requestVersion]
    const lambda = version[`/${fn}`]

    if (!is.fn(lambda)) {
      const apiKeys = Object.keys(version)

      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`function not found. Got: ${fn}. Supported: ${apiKeys.join(' ')}`)
      return
    }

    if (req.method === 'POST') {
      req.body = await middleware.body(req)

      if (is.error(req.body)) {
        log.error('E_REQ_BODY_PARSE', req.body)
        req.body = ''
      }
    }

    const { code = 200, headers = {}, body } = await lambda(req, res)

    res.writeHead(code, headers)
    res.end(body)

    log.timeTaken(startTime, 'api request took')
    return
  }

  res.writeHead(404)
  res.end('404 - not found.')

  log.timeTaken(startTime, 'FILE NOT FOUND. Request took', `${url}, code: 404`)
}
