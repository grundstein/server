export const getIp = () => {
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress

  console.log(ip)
}
