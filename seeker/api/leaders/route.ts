import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    results: [
      { title: "Anatoly Yakovenko on Solana TPS Roadmap", url: "#", snippet: "Solana founder discusses 1M TPS goal.", source: "founder", published: null },
      { title: "Raj Gokal on DePIN Opportunities", url: "#", snippet: "Solana co-founder on hardware + crypto convergence.", source: "founder", published: null },
      { title: "Mert Mumtaz on Helium Migration", url: "#", snippet: "Helium moving to Solana for better scalability.", source: "project", published: null },
    ],
    query: "solana leaders",
    cached: false,
  })
}
