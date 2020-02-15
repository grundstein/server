export const body = req =>
  new Promise((resolve, reject) => {
    try {
      const isJson = req.headers['content-type'] === 'application/json'

      let body = ''

      req.on('data', chunk => (body += chunk))

      req.on('end', () => {
        if (isJson) {
          try {
            body = JSON.parse(body)
          } catch (e) {
            log.error(e)
            reject(e)
            return
          }
        }

        resolve(body)
      })

      req.on('error', reject)
    } catch (e) {
      return e
    }
  })
