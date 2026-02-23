export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // Reconstruct path + query string
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname; // e.g. /api/prices
    const qs = url.search;     // e.g. ?key=xxx
    const upstream = `http://65.21.149.97:3456${path}${qs}`;

    const r = await fetch(upstream, { signal: AbortSignal.timeout(8000) });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'upstream unavailable', detail: e.message });
  }
}
