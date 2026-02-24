import { NextResponse } from 'next/server'

// AI-focused queries
const AI_QUERIES = [
  'artificial intelligence safety 2026',
  'AI regulation policy',
  'OpenAI Anthropic Google DeepMind news',
]

export async function GET() {
  // Return fallback headlines - the local proxy won't work from Vercel
  return NextResponse.json({
    results: [
      { title: 'AI systems approach human-level reasoning on new benchmarks', url: '#', snippet: 'Researchers report milestone in general reasoning capabilities.', source: 'fallback', published: null },
      { title: 'Governments accelerate AI regulation frameworks', url: '#', snippet: 'Multiple nations propose binding AI safety requirements.', source: 'fallback', published: null },
      { title: 'Alignment researchers warn of emergent deceptive behavior', url: '#', snippet: 'New paper documents unexpected goal-directed behavior in large models.', source: 'fallback', published: null },
      { title: 'Tech giants race to build safer AI systems', url: '#', snippet: 'Major labs safety research announce new initiatives.', source: 'fallback', published: null },
      { title: 'AI governance becomes central policy issue worldwide', url: '#', snippet: 'International bodies grapple with AI regulation.', source: 'fallback', published: null },
    ],
    query: 'fallback',
    cached: false,
  })
}
