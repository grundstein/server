export const body = req =>
  new Promise((resolve, reject) => {
    try {
      const isJson = req.headers['content-type'] === 'application/json'

      const bodyParts = []

      req.on('data', chunk => {
        bodyParts.push(chunk)
      })

      req.on('end', () => {
        let body = Buffer.concat(bodyParts).toString()

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
