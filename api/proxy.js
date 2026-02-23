const fetch = globalThis.fetch || require('node-fetch');

export default async function handler(req, res) {
  const qs = require('querystring');
  const params = qs.stringify(req.query);
  const path = req.url.split('?')[0].replace('/api/', '');
  const upstream = `http://65.21.149.97:3456/api/${path}?${params}`;
  try {
    const r = await fetch(upstream);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch(e) {
    res.status(502).json({error: 'upstream unavailable'});
  }
}
