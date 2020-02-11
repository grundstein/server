import is from '@magic/types'
import log from '@magic/log'

export const getArgs = config => {
  let port = config.argv['--port']
  if (is.array(port)) {
    port = port[0]
  }

  let dirs = config.argv['--dir']

  if (is.empty(dirs)) {
    dirs = [process.cwd()]
  }

  return {
    port,
    dirs,
  }
}
