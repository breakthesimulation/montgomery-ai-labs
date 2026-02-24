import { NextResponse } from 'next/server'

const PROXY_URL = process.env.SEARXNG_PROXY_URL || 'http://localhost:3458'

const LEADER_QUERIES = [
  'Sam Altman OpenAI 2026',
  'Dario Amodei Anthropic',
  'Elon Musk xAI Grok',
  'Demis Hassabis Google DeepMind',
  'Yann LeCun Meta AI',
]

export async function GET() {
  try {
    const query = LEADER_QUERIES[Math.floor(Math.random() * LEADER_QUERIES.length)]
    const res = await fetch(
      `${PROXY_URL}/search?q=${encodeURIComponent(query)}&format=json&time_range=month`,
      { next: { revalidate: 600 } }
    )
    
    if (!res.ok) throw new Error(`${res.status}`)
    
    const data = await res.json()
    const results = ((data.results || []) as Record<string, string>[]).slice(0, 10).map(r => ({
      title: r.title || '',
      url: r.url || '',
      snippet: r.content || r.snippet || '',
      source: r.engine || 'web',
      published: r.publishedDate || null,
    }))
    
    return NextResponse.json({ results, query })
  } catch (err) {
    return NextResponse.json({ results: [], error: String(err) })
  }
}
