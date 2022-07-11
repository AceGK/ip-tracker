const isIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const isDomain = /^(?:https?:\/\/)?(?:www\.)?(.*)$/

export default async function handler(req, res) {

  let { params } = req.query
  let reqType = ""

  if (params.match(isIP)) {
    reqType = "&ipAddress="
  }
  else if (params.match(isDomain)) {
    reqType = "&domain="
  }
  else {
    return
  }

  const url = `${process.env.IPIFY_URL}apiKey=${process.env.IPIFY_KEY}${reqType}${params}`

  const data = await fetch(url)
    .then(res => res.json())

  res.json(data);
}