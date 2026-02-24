import { NextResponse } from 'next/server'

export async function GET() {
  // Return fallback data - proxy won't work from Vercel
  return NextResponse.json({
    results: [
      { title: "Solana ETF Decision Expected This Week", url: "#", snippet: "SEC to rule on multiple Solana ETF applications from major issuers.", source: "news", published: null },
      { title: "Jupiter Aggregator Adds 50+ New Trading Pairs", url: "#", snippet: "New meme coins and DeFi tokens now available on Jupiter.", source: "defi", published: null },
      { title: "Raydium Launches Concentrated Liquidity Pools", url: "#", snippet: "Major upgrade brings better capital efficiency to Solana DEXs.", source: "defi", published: null },
      { title: "Marinade Finance Staking V2 Announced", url: "#", snippet: "Auto-compounding and reduced fees for mSOL holders.", source: "defi", published: null },
      { title: "Solana Mobile Saga 2 Coming Soon", url: "#", snippet: "Expected announcement of improved DePIN features.", source: "hardware", published: null },
    ],
    query: "solana crypto",
    cached: false,
  })
}
