export default (req, res) => {
  console.log('api route called, returning hello world')

  return {
    code: 200,
    body: 'hello, world.',
    headers: {
      'Content-Type': 'text/plain',
    },
  }
}
