// Validator Dashboard - Real-time Stats

// Configuration
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
const YOUR_VOTE_ADDRESS = "YourValidatorVoteAddressHere"; // Replace with your validator's vote address

// Demo data for display (real implementation would fetch from RPC)
const DEMO_VALIDATORS = [
    { rank: 1, name: "Coinbase Cloud", commission: 8, uptime: 99.99, stake: 45000000, apy: 6.2, vote: "CerutQ8wBnP4vS2yB3Z" },
    { rank: 2, name: "Phantom", commission: 8, uptime: 99.98, stake: 42000000, apy: 6.2, vote: "3b6a27bcb" },
    { rank: 3, name: "Paradigm", commission: 7, uptime: 99.99, stake: 38000000, apy: 6.3, vote: "6mohTht" },
    { rank: 4, name: "Jump Crypto", commission: 10, uptime: 99.97, stake: 35000000, apy: 6.1, vote: "JupP4J" },
    { rank: 5, name: "Staked.us", commission: 5, uptime: 99.95, stake: 31000000, apy: 6.4, vote: "StakeUs" },
    { rank: 6, name: "Lido", commission: 10, uptime: 99.98, stake: 28000000, apy: 6.1, vote: "LidoFi" },
    { rank: 7, name: "BlazeStake", commission: 7, uptime: 99.96, stake: 24000000, apy: 6.2, vote: "BlazeS" },
    { rank: 8, name: "Rocket Pool", commission: 12, uptime: 99.94, stake: 20000000, apy: 6.0, vote: "Rocket" },
    { rank: 9, name: "Everstake", commission: 5, uptime: 99.97, stake: 18000000, apy: 6.4, vote: "EverS" },
    { rank: 10, name: "Serum DAO", commission: 6, uptime: 99.95, stake: 15000000, apy: 6.3, vote: "SerumD" },
];

class ValidatorDashboard {
    constructor() {
        this.connected = false;
        this.alerts = [];
        this.init();
    }
    
    init() {
        this.updateConnectionStatus('connecting');
        this.loadValidatorData();
        this.loadLeaderSchedule();
        this.loadValidatorsComparison();
        
        // Auto-refresh every 30 seconds
        setInterval(() => this.refresh(), 30000);
    }
    
    updateConnectionStatus(status) {
        const dot = document.getElementById('connectionStatus');
        const text = document.getElementById('connectionText');
        
        dot.className = 'status-dot';
        
        if (status === 'connected') {
            dot.classList.add('connected');
            text.textContent = 'Connected';
            this.connected = true;
        } else if (status === 'error') {
            dot.classList.add('error');
            text.textContent = 'Connection Error';
            this.connected = false;
        } else {
            text.textContent = 'Connecting...';
        }
    }
    
    async loadValidatorData() {
        // In production, this would fetch from Solana RPC
        // For demo, using simulated data
        
        const validator = {
            name: "validator.com",
            status: "active",
            commission: 8,
            uptime: 99.94,
            stakeWeight: "12.4M SOL",
            rank: 47,
            voteAddress: YOUR_VOTE_ADDRESS,
            lastLeaderSlot: 185000000 + Math.floor(Math.random() * 1000)
        };
        
        // Update UI
        document.getElementById('validatorName').textContent = validator.name;
        
        const statusEl = document.getElementById('validatorStatus');
        statusEl.textContent = validator.status.toUpperCase();
        statusEl.className = `validator-status ${validator.status}`;
        
        document.getElementById('commission').textContent = validator.commission + '%';
        document.getElementById('uptime').textContent = validator.uptime + '%';
        document.getElementById('stakeWeight').textContent = validator.stakeWeight;
        document.getElementById('rank').textContent = '#' + validator.rank;
        document.getElementById('voteAddress').textContent = validator.voteAddress.slice(0, 16) + '...';
        document.getElementById('lastLeader').textContent = validator.lastLeaderSlot.toLocaleString();
        
        this.updateConnectionStatus('connected');
        this.addAlert('info', 'Validator data loaded successfully');
    }
    
    loadLeaderSchedule() {
        const scheduleEl = document.getElementById('leaderSchedule');
        
        // Simulated leader schedule
        const currentEpoch = 550;
        const schedule = [];
        
        for (let i = 0; i < 5; i++) {
            const epoch = currentEpoch + i;
            const isYours = i === 1; // Your validator is leader in epoch 2
            
            schedule.push({
                epoch: epoch,
                leader: isYours ? "validator.com" : DEMO_VALIDATORS[i].name,
                slots: isYours ? `${1000 + i * 50} - ${1050 + i * 50}` : `${500 + i * 100} - ${550 + i * 100}`,
                isYours: isYours
            });
        }
        
        scheduleEl.innerHTML = schedule.map(item => `
            <div class="schedule-item ${item.isYours ? 'yours' : ''}">
                <span class="epoch">Epoch ${item.epoch}</span>
                <span class="leader">${item.leader} ${item.isYours ? '(YOU)' : ''}</span>
                <span class="slots">${item.slots} slots</span>
            </div>
        `).join('');
    }
    
    loadValidatorsComparison() {
        const tbody = document.getElementById('validatorsTable');
        
        tbody.innerHTML = DEMO_VALIDATORS.map(v => `
            <tr class="${v.vote === 'CerutQ8wBnP4vS2yB3Z' ? 'yours' : ''}">
                <td class="rank">#${v.rank}</td>
                <td>${v.name}</td>
                <td class="commission">${v.commission}%</td>
                <td class="uptime">${v.uptime}%</td>
                <td class="stake">${(v.stake / 1000000).toFixed(1)}M</td>
                <td class="apy">${v.apy}%</td>
            </tr>
        `).join('');
    }
    
    addAlert(type, message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const alert = { type, message, time };
        this.alerts.unshift(alert);
        
        // Keep only last 20 alerts
        this.alerts = this.alerts.slice(0, 20);
        
        this.renderAlerts();
    }
    
    renderAlerts() {
        const listEl = document.getElementById('alertsList');
        
        listEl.innerHTML = this.alerts.map(a => `
            <div class="alert-item alert-${a.type}">
                <span class="alert-time">${a.time}</span>
                <span class="alert-text">${a.message}</span>
            </div>
        `).join('');
    }
    
    async refresh() {
        if (!this.connected) return;
        
        console.log('Refreshing validator data...');
        
        // Simulate data refresh
        const uptime = (99.90 + Math.random() * 0.1).toFixed(2);
        document.getElementById('uptime').textContent = uptime + '%';
        
        // Check for alerts
        if (parseFloat(uptime) < 99.5) {
            this.addAlert('warning', `Uptime dropped to ${uptime}%`);
        }
        
        this.addAlert('info', 'Data refreshed');
    }
    
    // API methods for external calls
    async getValidatorStats() {
        return {
            name: "validator.com",
            commission: 8,
            uptime: parseFloat(document.getElementById('uptime').textContent),
            stakeWeight: document.getElementById('stakeWeight').textContent,
            rank: parseInt(document.getElementById('rank').textContent.replace('#', ''))
        };
    }
    
    async getLeaderSchedule() {
        const items = document.querySelectorAll('.schedule-item');
        const schedule = [];
        
        items.forEach(item => {
            const parts = item.querySelectorAll('span');
            schedule.push({
                epoch: parts[0].textContent,
                leader: parts[1].textContent,
                slots: parts[2].textContent
            });
        });
        
        return schedule;
    }
    
    async getTopValidators() {
        return DEMO_VALIDATORS;
    }
}

// Initialize
let dashboard;

document.addEventListener('DOMContentLoaded', () => {
    dashboard = new ValidatorDashboard();
    
    // Refresh button
    document.getElementById('refreshSchedule').addEventListener('click', () => {
        dashboard.loadLeaderSchedule();
        dashboard.addAlert('info', 'Leader schedule refreshed');
    });
});

// Export for external access
window.ValidatorDashboard = ValidatorDashboard;
