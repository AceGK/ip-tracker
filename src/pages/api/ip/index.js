export default async function handler(req, res) {

  const url = `${process.env.IPIFY_URL}apiKey=${process.env.IPIFY_KEY}`
  
  const data = await fetch(url)
  .then(res => res.json())

  res.json(data); 
}

