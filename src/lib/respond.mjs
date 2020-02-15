export const respond = (res, payload = {}) => {
  const { code = 500, body = '500 - Server Error', headers } = payload

  const head = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Content-Encoding': 'identity',
    ...headers,
  }

  res.writeHead(code, head)
  res.end(body)
}
