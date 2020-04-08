import is from '@magic/types'

export const getFileEncoding = (file, acceptEncoding) => {
  const encoding = 'buffer'

  if (is.empty(acceptEncoding) || !is.array(acceptEncoding)) {
    return 'deflate'
  }

  if (acceptEncoding.includes('br') && file.br) {
    encoding = 'br'
  } else if (acceptEncoding.includes('gzip') && file.gzip) {
    encoding = 'gzip'
  } else if (acceptEncoding.includes('deflate') && file.deflate) {
    encoding = 'deflate'
  }

  return encoding
}
