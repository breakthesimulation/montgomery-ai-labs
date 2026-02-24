import { NextResponse } from 'next/server'

const PROXY_URL = process.env.SEARXNG_PROXY_URL || 'http://localhost:3458'

const AI_QUERIES = [
  'artificial intelligence safety 2026',
  'AI regulation policy',
  'OpenAI Anthropic Google DeepMind',
  'AI existential risk alignment',
  'large language model breakthrough',
]

export async function GET() {
  try {
    const query = AI_QUERIES[Math.floor(Math.random() * AI_QUERIES.length)]
    const res = await fetch(
      `${PROXY_URL}/search?q=${encodeURIComponent(query)}&format=json&time_range=week`,
      { next: { revalidate: 300 } }
    )
    
    if (!res.ok) throw new Error(`Proxy returned ${res.status}`)
    
    const data = await res.json()
    const results = ((data.results || []) as Record<string, string>[]).slice(0, 15).map(r => ({
      title: r.title || '',
      url: r.url || '',
      snippet: r.content || r.snippet || '',
      source: r.engine || 'web',
      published: r.publishedDate || null,
    }))
    
    return NextResponse.json({ results, query, cached: false })
  } catch (err) {
    return NextResponse.json({
      results: [
        { title: 'AI systems approach human-level reasoning on new benchmarks', url: '#', snippet: 'Researchers report milestone in general reasoning capabilities.', source: 'fallback', published: null },
        { title: 'Governments accelerate AI regulation frameworks', url: '#', snippet: 'Multiple nations propose binding AI safety requirements.', source: 'fallback', published: null },
        { title: 'Alignment researchers warn of emergent deceptive behavior', url: '#', snippet: 'New paper documents unexpected goal-directed behavior in large models.', source: 'fallback', published: null },
      ],
      query: 'fallback',
      cached: false,
      error: String(err),
    })
  }
}
