import zopfli from 'node-zopfli-es'

const compressIfResultIsSmaller = buffer => {
  const compressed = {}

  let gzip = zopfli.gzipSync(buffer)
  if (gzip.length < buffer.length) {
    compressed.gzip = gzip
  }

  let deflate = zopfli.deflateSync(buffer)
  if (deflate.length > buffer.length) {
    compressed.deflate = deflate
  }

  return compressed
}
