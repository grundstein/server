import URL from 'url'

import mimes from '@magic/mime-types'
import log from '@magic/log'
import is from '@magic/types'

import { formatLog, getFileEncoding, getRandomId, respond, sendFile } from './lib/index.mjs'

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
    if (url.startsWith('/')) {
      url = url.substr(1)
    }
    const file = store.get(url)

    if (file) {
      sendFile(req, res, file)
      formatLog(req, res, startTime, 'static')
      return
    }
  }

  const parsedUrl = URL.parse(req.url)

  if (api && parsedUrl.pathname.startsWith('/api')) {
    const [_, requestVersion, fn] = parsedUrl.pathname.split('/').filter(a => a)

    const versionKeys = Object.keys(api)

    if (!versionKeys.includes(requestVersion)) {
      const code = 404
      const body = `Api request urls must start with a version. supported: ${versionKeys.join(' ')}`

      respond(res, { body, code })

      formatLog(req, res, startTime, 'api')
      return
    }

    const version = api[requestVersion]
    const lambda = version[`/${fn}`]

    if (!is.fn(lambda)) {
      const apiKeys = Object.keys(version)

      const code = 404
      const body = `function not found. Got: ${fn}. Supported: ${apiKeys.join(' ')}`

      respond(res, { body, code })

      formatLog(req, res, startTime, 'api')
      return
    }

    if (req.method === 'POST') {
      req.body = await middleware.body(req)

      if (is.error(req.body)) {
        log.error('E_REQ_BODY_PARSE', req.body)
        req.body = ''
      }
    }

    respond(res, await lambda(req, res))

    formatLog(req, res, startTime, 'api')
    return
  }

  respond(res, { body: '404 - not found.', code: 404 })

  formatLog(req, res, startTime, 404)
}
