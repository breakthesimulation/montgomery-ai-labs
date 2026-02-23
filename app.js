// Solana Calendar v2 - Enhanced Application

const EVENTS = [
    // February 2026
    { id: 1, date: "2026-02-19", title: "Jupiter Airdrop Claim Window", description: "Second wave of JUP token claims for early users. Over $50M distributed.", category: "airdrop", time: "12:00 UTC", link: "https://jup.ag" },
    { id: 2, date: "2026-02-20", title: "Solana Foundation DePIN Governance Vote", description: "Community vote on $10M DePIN infrastructure grants for wireless network projects.", category: "governance", time: "00:00 UTC", link: "https://solana.org/governance" },
    { id: 3, date: "2026-02-21", title: "Mad Lads NFT Collection Mint", description: "New collection from Mad Lads team. 5,000 NFTs at 8 SOL with exclusive utility.", category: "nft", time: "18:00 UTC", link: "https://magiceden.io" },
    { id: 4, date: "2026-02-22", title: "Raydium Weekly Trading Competition", description: "10,000 RAY prize pool. Top traders by volume win premium rewards.", category: "trading", time: "00:00 UTC", link: "https://raydium.io" },
    { id: 5, date: "2026-02-23", title: "Solana Mobile Saga 2 Official Launch", description: "Launch of Saga 2 smartphone with enhanced DeFi features and native staking.", category: "launch", time: "15:00 UTC", link: "https://solanamobile.com" },
    { id: 6, date: "2026-02-24", title: "Marinade Finance Token Unlock", description: "Team and investor tokens unlock. 5% of total supply becomes liquid.", category: "unlock", time: "00:00 UTC", link: "https://marinade.finance" },
    { id: 7, date: "2026-02-25", title: "Dexlab IDO: Project X", description: "New permissionless launchpad on Solana. First IDO with 500K tokens available.", category: "launch", time: "14:00 UTC", link: "https://dexlab.space" },
    { id: 8, date: "2026-02-26", title: "SIP-2026: Network Fee Reduction Proposal", description: "Proposal to reduce network fees by 50% for small transactions.", category: "governance", time: "00:00 UTC", link: "https://solana.org" },
    { id: 9, date: "2026-02-27", title: "Tensor NFT Trading Competition", description: "48-hour trading competition. $25K in prizes for top volume traders.", category: "trading", time: "00:00 UTC", link: "https://tensor.trade" },
    { id: 10, date: "2026-02-28", title: "Phantom PHNTM Airdrop Deadline", description: "Last day to claim PHNTM tokens for early Phantom wallet users.", category: "airdrop", time: "23:59 UTC", link: "https://phantom.app" },
    // March 2026
    { id: 11, date: "2026-03-01", title: "Orca AMM V2 Migration Complete", description: "All liquidity pools migrate to concentrated liquidity v2. Claim migrated positions.", category: "launch", time: "08:00 UTC", link: "https://orca.so" },
    { id: 12, date: "2026-03-02", title: "Validator Community: Stake Weight Vote", description: "Validator community votes on superminority requirements and stake weight changes.", category: "governance", time: "00:00 UTC", link: "https://validator.com" },
    { id: 13, date: "2026-03-03", title: "Candy Shop: Generative Art Drop", description: "New generative art collection from digital artist. Free mint for allowlist.", category: "nft", time: "20:00 UTC", link: "https://candyshop.art" },
    { id: 14, date: "2026-03-04", title: "Drift Protocol Trading Competition", description: "Perpetuals trading competition. Top 100 traders share 50,000 DRIFT tokens.", category: "trading", time: "00:00 UTC", link: "https://drift.trade" },
    { id: 15, date: "2026-03-05", title: "Jito Foundation Airdrop Distribution", description: "Remaining 20% of JTO token allocation airdropped to stakers.", category: "airdrop", time: "00:00 UTC", link: "https://jito.network" },
    { id: 16, date: "2026-03-06", title: "Solana Name Service: .sol Domain Vote", description: "Vote on new .sol domain pricing and premium name auctions.", category: "governance", time: "00:00 UTC", link: "https://sns.id" },
    { id: 17, date: "2026-03-07", title: "Magic Eden x Brand Partnership Drop", description: "Partnership collection with major brand. 10,000 NFTs with cross-platform utility.", category: "nft", time: "18:00 UTC", link: "https://magiceden.io" },
    { id: 18, date: "2026-03-08", title: "Friktion Protocol Official Launch", description: "Structured products protocol launches with volatility vaults and options.", category: "launch", time: "16:00 UTC", link: "https://friktion.fi" },
    { id: 19, date: "2026-03-09", title: "Meteora DLMM Double Rewards Week", description: "Double trading rewards for Meteora DLMM pools. 2x MILK emissions.", category: "trading", time: "00:00 UTC", link: "https://meteora.ag" },
    { id: 20, date: "2026-03-10", title: "SolanaPay Merchant Integration", description: "Major retailer announces SolanaPay integration for 500+ stores.", category: "launch", time: "12:00 UTC", link: "https://solanapay.com" },
    { id: 21, date: "2026-03-11", title: "Backpack Wallet EXN Airdrop Claim", description: "Backpack wallet airdrop for early adopters. Claim your EXN tokens.", category: "airdrop", time: "10:00 UTC", link: "https://backpack.exchange" },
    { id: 22, date: "2026-03-12", title: "Solana Foundation Q1 Grant Distribution", description: "$15M allocated to DeFi, NFT, and DePIN projects.", category: "governance", time: "00:00 UTC", link: "https://solana.org/grants" },
    { id: 23, date: "2026-03-13", title: "DeGods III Collection Reveal", description: "DeGods III collection reveal. 5,000 unique pieces with staking utility.", category: "nft", time: "19:00 UTC", link: "https://degods.com" },
    { id: 24, date: "2026-03-14", title: "Step Finance Protocol Upgrade", description: "Major upgrade to portfolio tracking. Zeta integration and new analytics.", category: "launch", time: "14:00 UTC", link: "https://step.finance" },
    { id: 25, date: "2026-03-15", title: "Phoenix Trading Competition", description: "Spot trading competition. Trade any pair to climb the leaderboard.", category: "trading", time: "00:00 UTC", link: "https://phoenix.trade" },
    { id: 26, date: "2026-03-16", title: "SolanaVM Testnet Launch", description: "EVM-compatible rollup launches on testnet. Developers can start testing.", category: "launch", time: "12:00 UTC", link: "https://solanaevm.io" },
    { id: 27, date: "2026-03-17", title: "Audius Governance: Revenue Sharing Vote", description: "Token holder vote on new artist revenue sharing model.", category: "governance", time: "00:00 UTC", link: "https://audius.co" },
    { id: 28, date: "2026-03-18", title: "Jupiter Airdrop Round 3", description: "Third wave of JUP airdrop for aggregated volume users.", category: "airdrop", time: "12:00 UTC", link: "https://jup.ag" },
    { id: 29, date: "2026-03-19", title: "Solana Mobile DApp Store Update", description: "Major DApp store update with new app ratings and discovery features.", category: "launch", time: "15:00 UTC", link: "https://solanamobile.com" },
    { id: 30, date: "2026-03-20", title: "Tensor Marketplace Official Launch", description: "Tensor officially launches marketplace with 0% fees for first month.", category: "launch", time: "18:00 UTC", link: "https://tensor.trade" },
    // More events through April
    { id: 31, date: "2026-03-21", title: "Solana Ecosystem Summit 2026", description: "Annual summit. Keynotes from major protocol founders.", category: "governance", time: "09:00 UTC", link: "https://solana.com/summit" },
    { id: 32, date: "2026-03-22", title: "Mango Markets V2 Launch", description: "Mango V2 relaunch with improved security and new features.", category: "launch", time: "14:00 UTC", link: "https://mango.markets" },
    { id: 33, date: "2026-03-23", title: "Squads V3 Multisig Release", description: "Major update to Squads multisig with improved UX and security.", category: "launch", time: "12:00 UTC", link: "https://squads.so" },
    { id: 34, date: "2026-03-24", title: "Helium Network Migration Complete", description: "Full migration to Solana. IOT and MOBILE tokens on Solana.", category: "launch", time: "00:00 UTC", link: "https://helium.com" },
    { id: 35, date: "2026-03-25", title: "Pyth Network Data Grant Program", description: "New grant program for developers building with Pyth price data.", category: "governance", time: "00:00 UTC", link: "https://pyth.network" },
    { id: 36, date: "2026-03-26", title: "Raydium Fee Switch Activation", description: "Activation of RAY fee switch for protocol revenue sharing.", category: "governance", time: "00:00 UTC", link: "https://raydium.io" },
    { id: 37, date: "2026-03-27", title: "Bonk Token Burn Event", description: "Quarterly BONK burn. Significant supply reduction expected.", category: "airdrop", time: "18:00 UTC", link: "https://bonk.so" },
    { id: 38, date: "2026-03-28", title: "Wormhole Guardian Upgrade", description: "Major upgrade to Wormhole cross-chain messaging protocol.", category: "launch", time: "12:00 UTC", link: "https://wormhole.com" },
    { id: 39, date: "2026-03-29", title: "Solana Mobile Saga 2 Batch 2 Sales", description: "Second batch of Saga 2 phones available. Limited quantities.", category: "launch", time: "10:00 UTC", link: "https://solanamobile.com" },
    { id: 40, date: "2026-03-30", title: "DePIN Summit 2026", description: "DePIN projects summit. Helium, Hivemapper, Render network talks.", category: "governance", time: "09:00 UTC", link: "https://solana.org/depin" },
    { id: 41, date: "2026-03-31", title: "Q1 2026 Ecosystem Report Release", description: "Solana Foundation releases Q1 ecosystem metrics and growth report.", category: "governance", time: "00:00 UTC", link: "https://solana.org/reports" },
    // April 2026
    { id: 42, date: "2026-04-01", title: "Pump.fun Governance Token Launch", description: "PUMP token launch with tokenomics and community distribution.", category: "launch", time: "14:00 UTC", link: "https://pump.fun" },
    { id: 43, date: "2026-04-02", title: "Jito MEV Upgrade", description: "New MEV extraction mechanisms with improved validator rewards.", category: "launch", time: "00:00 UTC", link: "https://jito.network" },
    { id: 44, date: "2026-04-03", title: "Solana Pay SDK 2.0 Release", description: "Major update to Solana Pay SDK for merchant integrations.", category: "launch", time: "12:00 UTC", link: "https://solanapay.com" },
    { id: 45, date: "2026-04-04", title: "Tensor Trending Algorithm Update", description: "New algorithm for NFT trending and discovery.", category: "governance", time: "00:00 UTC", link: "https://tensor.trade" },
    { id: 46, date: "2026-04-05", title: "Staking Rewards Distribution", description: "Monthly staking rewards distribution to all SOL stakers.", category: "airdrop", time: "00:00 UTC", link: "https://solana.org/staking" },
    { id: 47, date: "2026-04-06", title: "Magic EdenCreator Tools Launch", description: "New creator tools for NFT collections on Magic Eden.", category: "launch", time: "16:00 UTC", link: "https://magiceden.io" },
    { id: 48, date: "2026-04-07", title: "Orca Tokenomics Upgrade Vote", description: "Community vote on ORCA tokenomics improvements.", category: "governance", time: "00:00 UTC", link: "https://orca.so" },
    { id: 49, date: "2026-04-08", title: "Solana Foundation Devrel Grants", description: "New round of developer relations grants for tooling projects.", category: "governance", time: "00:00 UTC", link: "https://solana.org/grants" },
    { id: 50, date: "2026-04-09", title: "Dialect Messaging Protocol Update", description: "Major update to Dialect for on-chain messaging.", category: "launch", time: "14:00 UTC", link: "https://dialect.to" }
];

class Calendar {
    constructor() {
        this.date = new Date();
        this.selected = null;
        this.filter = 'all';
        this.init();
    }
    
    init() {
        this.render();
        this.bind();
    }
    
    bind() {
        document.getElementById('prevMonth').onclick = () => { this.date.setMonth(this.date.getMonth() - 1); this.render(); };
        document.getElementById('nextMonth').onclick = () => { this.date.setMonth(this.date.getMonth() + 1); this.render(); };
        document.getElementById('closePanel').onclick = () => this.closePanel();
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filter = btn.dataset.filter;
                this.render();
                if (this.selected) this.showDate(this.selected);
            };
        });
    }
    
    render() {
        const y = this.date.getFullYear();
        const m = this.date.getMonth();
        
        document.getElementById('currentMonth').textContent = 
            new Date(y, m).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const first = new Date(y, m, 1);
        const start = new Date(first);
        start.setDate(start.getDate() - first.getDay());
        
        const days = document.getElementById('calendarDays');
        days.innerHTML = '';
        
        const today = new Date();
        const todayStr = this.dStr(today);
        
        for (let i = 0; i < 42; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const ds = this.dStr(d);
            const events = this.getEvents(ds);
            const filtered = this.filter === 'all' ? events : events.filter(e => e.category === this.filter);
            
            const el = document.createElement('div');
            el.className = 'day';
            if (d.getMonth() !== m) el.classList.add('other-month');
            if (ds === todayStr) el.classList.add('today');
            if (ds === this.selected) el.classList.add('selected');
            
            el.innerHTML = `
                <span class="day-num">${d.getDate()}</span>
                <div class="day-dots">
                    ${filtered.slice(0, 4).map(e => `<span class="day-dot ${e.category}"></span>`).join('')}
                </div>
            `;
            el.onclick = () => this.showDate(ds);
            days.appendChild(el);
        }
    }
    
    showDate(ds) {
        this.selected = ds;
        this.render();
        
        const events = this.getEvents(ds);
        const filtered = this.filter === 'all' ? events : events.filter(e => e.category === this.filter);
        
        const panel = document.getElementById('eventsPanel');
        const dateEl = document.getElementById('panelDate');
        const listEl = document.getElementById('eventsList');
        
        const d = new Date(ds + 'T00:00:00');
        dateEl.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        
        if (filtered.length === 0) {
            listEl.innerHTML = '<p class="no-events">No events for this date.</p>';
        } else {
            listEl.innerHTML = filtered.map(e => `
                <div class="event-card ${e.category}">
                    <div class="event-top">
                        <h4 class="event-title">${e.title}</h4>
                        <span class="event-cat ${e.category}">${e.category}</span>
                    </div>
                    <p class="event-desc">${e.description}</p>
                    <div class="event-meta">
                        <span class="event-time">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                            </svg>
                            ${e.time}
                        </span>
                        ${e.link ? `<a href="${e.link}" target="_blank" class="event-link">Learn more →</a>` : ''}
                    </div>
                </div>
            `).join('');
        }
        
        panel.classList.add('open');
    }
    
    closePanel() {
        this.selected = null;
        document.getElementById('eventsPanel').classList.remove('open');
        this.render();
    }
    
    getEvents(ds) {
        return EVENTS.filter(e => e.date === ds);
    }
    
    dStr(d) {
        return d.toISOString().split('T')[0];
    }
}

document.addEventListener('DOMContentLoaded', () => new Calendar());
