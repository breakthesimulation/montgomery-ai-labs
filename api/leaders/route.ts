import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    results: [
      { title: 'Sam Altman discusses AGI timeline at Stanford', url: '#', snippet: 'OpenAI CEO shares views on near-term AI progress.', source: 'fallback', published: null },
      { title: 'Dario Amodei on Claude 4.6 capabilities', url: '#', snippet: 'Anthropic CEO outlines path to advanced AI.', source: 'fallback', published: null },
      { title: 'Elon Musk announces xAI Grok 3 release', url: '#', snippet: 'New version promises improved reasoning.', source: 'fallback', published: null },
      { title: 'Demis Hassabis unveils new DeepMind breakthroughs', url: '#', snippet: 'Google AI lab announces major research results.', source: 'fallback', published: null },
    ],
    query: 'fallback',
  })
}
