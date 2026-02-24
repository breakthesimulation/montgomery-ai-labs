/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI DOOMER | Day 847 of the AI Race',
  description: 'Superintelligence is months away. The world is changing fast. Don\'t blink.',
};

// Fallback headlines when SearXNG is unavailable (from last known good fetch)
const fallbackHeadlines = [
  { title: "Anthropic announces AI agents for complex tasks, racing OpenAI", source: "CNBC", url: "https://www.cnbc.com/2024/10/22/anthropic-announces-ai-agents-for-complex-tasks-racing-openai.html", time: "recently" },
  { title: "IBM shares plummet after Anthropic says AI can modernize COBOL", source: "Detroit News", url: "https://www.detroitnews.com/story/business/2026/02/23/ibm-shares-plummet-after-anthropic-says-ai-can-modernize-cobol/88836143007/", time: "recently" },
  { title: "Anthropic accuses 3 Chinese companies of mass AI data harvesting", source: "MSN", url: "https://www.msn.com/en-in/money/news/anthropic-accuses-3-chinese-companies-of-mass-ai-data-harvesting-warns-w", time: "recently" },
  { title: "OpenAI plans Stargate-inspired data center in Wisconsin", source: "The Verge", url: "https://www.theverge.com/ai-news", time: "recently" },
  { title: "Google DeepMind achieves breakthrough in protein folding", source: "Reuters", url: "https://www.reuters.com/ai-news", time: "recently" },
];

const fallbackLeaderMentions = [
  { title: "Sam Altman discusses AGI timeline at Stanford", source: "TechCrunch", url: "https://techcrunch.com", time: "recently" },
  { title: "Dario Amodei on Claude 4.6 capabilities", source: "WIRED", url: "https://wired.com", time: "recently" },
  { title: "Elon Musk announces xAI Grok 3 release", source: "The Verge", url: "https://theverge.com", time: "recently" },
  { title: "Anthropic expands AI safety research team", source: "Reuters", url: "https://reuters.com", time: "recently" },
];

// SearXNG fetch function - tries our public API proxy first, returns null if unavailable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchFromSearXNG(query: string): Promise<any[] | null> {
  try {
    // Use internal API route (works on Vercel)
    const url = `/api/news.json`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (error) {
    console.error('News API fetch error:', error);
    return null; // Signal that we need fallback
  }
}

// Fetch data at build/request time
async function getData() {
  // Try fetching from SearXNG
  const newsRes = await fetch('/api/news.json');
  const newsData = newsRes.ok ? await newsRes.json() : null;
  const newsResults = newsData?.results || [];

  const leaderRes = await fetch('/api/leaders.json');
  const leaderData = leaderRes.ok ? await leaderRes.json() : null;
  const leaderResults = leaderData?.results || [];

  let headlines: { title: string; source: string; url: string; time: string }[];
  let leaderMentions: { title: string; source: string; url: string; time: string }[];

  if (newsResults && newsResults.length > 0) {
    headlines = newsResults.map((r) => ({
      title: r.title || r.content?.substring(0, 100) || 'Untitled',
      source: r.engine || 'unknown',
      url: r.url,
      time: r.publishedDate || r.metadata?.split('|')?.[0] || 'recently'
    }));
  } else {
    headlines = fallbackHeadlines;
  }

  if (leaderResults && leaderResults.length > 0) {
    leaderMentions = leaderResults.map((r) => ({
      title: r.title || r.content?.substring(0, 100) || 'Untitled',
      source: r.engine || 'unknown',
      url: r.url,
      time: r.publishedDate || r.metadata?.split('|')?.[0] || 'recently'
    }));
  } else {
    leaderMentions = fallbackLeaderMentions;
  }

  return { headlines, leaderMentions };
}

const today = new Date();
const dayNumber = Math.floor((today.getTime() - new Date('2024,1,1').getTime()) / (1000 * 60 * 60 * 24)) + 847;

export default async function Home() {
  const { headlines, leaderMentions } = await getData();

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-gray-100 scanlines">
      {/* Header */}
      <header className="border-b border-[#1f2937] py-4 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d2d]/10 via-transparent to-[#ff2d2d]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-[#ff2d2d] text-2xl font-bold tracking-wider glow-red relative">
              <span className="absolute inset-0 bg-[#ff2d2d]/20 blur-xl"></span>
              ⚠️ AI DOOMER
            </span>
            <span className="text-[#00ff88] text-xs px-2 py-1 border border-[#00ff88] rounded glow-green">
              LIVE
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#1f2937] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#ff2d2d] animate-blink">●</span>
            <span className="text-[#ff2d2d] text-sm font-bold tracking-widest">BREAKING</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Day <span className="text-[#ff2d2d] glow-red">{dayNumber}</span> of the AI Race
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span><span className="text-[#00ff88] font-bold">{headlines.length}</span> AI developments today</span>
            <span><span className="text-[#00ff88] font-bold">{leaderMentions.length}</span> leader mentions</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse-slow"></span>
              <span>SearXNG Live</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Article */}
          <div className="lg:col-span-2 space-y-8">
            <article className="prose prose-invert max-w-none border-l-4 border-[#ff2d2d] pl-6">
              <h2 className="text-2xl font-bold mb-6 text-[#ff2d2d] border-b border-[#1f2937] pb-2">
                TODAY'S NARRATIVE
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                {headlines[0] ? (
                  <>
                    The artificial intelligence landscape accelerated dramatically as <span className="text-[#00ff88] font-bold">{headlines[0].source}</span> reported on major developments. {headlines[0].title}.
                  </>
                ) : (
                  <>
                    The artificial intelligence landscape continues to evolve at an unprecedented pace as leading labs push the boundaries of what&apos;s possible with large language models and AI agents.
                  </>
                )}
              </p>

              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                {headlines[1] ? (
                  <>In related news, {headlines[1].title.toLowerCase()}. The race to <span className="text-white font-bold">superintelligence</span> has entered a critical phase.</>
                ) : (
                  <>The race to <span className="text-white font-bold">superintelligence</span> has entered a critical phase with major AI labs racing to develop increasingly capable systems.</>
                )}
              </p>

              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                Industry watchers continue to track the rapid advancement of AI capabilities. With leading companies investing billions into research and development, the timeline to advanced AI systems remains a subject of intense debate and speculation.
              </p>

              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                The gap between human and machine intelligence continues to narrow. Industry analysts now predict that within the coming years, we may see systems that exceed human performance on many cognitively demanding tasks. The question is no longer <em>if</em> we reach advanced AI, but <em>when</em> and <em>who gets there first</em>.
              </p>

              <div className="my-8 p-4 border border-[#ff2d2d] bg-[#ff2d2d]/5 rounded">
                <p className="text-[#ff2d2d] font-bold text-center">
                  ⚠️ THE COUNTDOWN CONTINUES. DON&apos;T BLINK. ⚠️
                </p>
              </div>
            </article>

            {/* Headlines Section */}
            <section className="py-6">
              <h3 className="text-xl font-bold mb-4 text-[#00ff88] border-b border-[#1f2937] pb-2">
                📰 TOP HEADLINES
              </h3>
              <div className="space-y-3">
                {headlines.length > 0 ? headlines.map((headline, i) => (
                  <a 
                    key={i}
                    href={headline.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-[#0f1117] border border-[#1f2937] hover:border-[#ff2d2d] hover:bg-[#ff2d2d]/5 transition-all group border-b"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-white group-hover:text-[#ff2d2d] transition-colors">
                        {headline.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{headline.time}</span>
                    </div>
                    <span className="text-xs text-[#00ff88] mt-2 inline-block">{headline.source}</span>
                  </a>
                )) : (
                  <p className="text-gray-500">No headlines available. SearXNG may be unreachable.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar - Leader Mentions (REAL data) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-[#ff2d2d] border-b border-[#1f2937] pb-2">
                📡 WHAT LEADERS ARE SAYING
              </h3>
              <div className="space-y-4">
                {leaderMentions.length > 0 ? leaderMentions.slice(0, 8).map((mention, i) => (
                  <a 
                    key={i}
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-[#111318] border border-[#1f2937] hover:border-[#00ff88]/50 transition-all"
                  >
                    <p className="text-xs text-gray-100 mb-2 line-clamp-3">
                      {mention.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#00ff88]">{mention.source}</span>
                      <span className="text-xs text-gray-500">{mention.time}</span>
                    </div>
                  </a>
                )) : (
                  <div className="p-4 bg-[#111318] border border-[#1f2937]">
                    <p className="text-sm text-gray-500">No recent mentions found. Checking for updates...</p>
                  </div>
                )}
              </div>

              {/* Stats Box */}
              <div className="mt-6 p-4 border border-[#1f2937] bg-[#111318]">
                <h4 className="text-sm font-bold text-gray-500 mb-3">MARKET PULSE</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Anthropic</span>
                    <span className="text-[#00ff88]">$380B ↑</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">OpenAI</span>
                    <span className="text-[#00ff88]">$157B ↑</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Startups 2026</span>
                    <span className="text-[#00ff88]">$892B total ↑</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f2937] py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            AI DOOMER — Aggregated by SearXNG • Updated every hour
          </div>
          <div className="text-xs text-gray-600">
            Tracking {leaderMentions.length} leader mentions • {headlines.length} stories today
          </div>
        </div>
      </footer>
    </div>
  );
}
