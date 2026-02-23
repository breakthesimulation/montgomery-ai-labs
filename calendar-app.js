// Solana Ecosystem Calendar - Application Logic
// Loads events from solana-events.json database

let allEvents = [];
let currentFilter = 'all';
let currentDate = new Date(2026, 1, 20); // Start at Feb 2026

// Initialize calendar
document.addEventListener('DOMContentLoaded', async () => {
    await loadEvents();
    setupEventListeners();
    renderCalendar();
    renderUpcomingEvents();
    updateStats();
});

// Load events from JSON file
async function loadEvents() {
    try {
        const response = await fetch('solana-events.json');
        if (!response.ok) throw new Error('Failed to load events');
        const text = await response.text();
        // Strip comments from JSON
        const cleanJson = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
        allEvents = JSON.parse(cleanJson);
        console.log(`Loaded ${allEvents.length} events from database`);
    } catch (error) {
        console.error('Error loading events:', error);
        document.getElementById('calendarDays').innerHTML = 
            '<div class="loading">Error loading events. Please refresh.</div>';
    }
}

// Update statistics
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const total = allEvents.length;
    const upcoming = allEvents.filter(e => e.date >= today).length;
    const verified = allEvents.filter(e => e.verified).length;
    
    document.getElementById('totalEvents').textContent = total;
    document.getElementById('upcomingEvents').textContent = upcoming;
    document.getElementById('verifiedEvents').textContent = verified;
}

// Render upcoming events sidebar
function renderUpcomingEvents() {
    const upcomingList = document.getElementById('upcomingList');
    const today = new Date().toISOString().split('T')[0];
    
    // Get upcoming events, sorted by date
    let upcoming = allEvents
        .filter(event => event.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
    
    // Apply filter if not 'all'
    if (currentFilter !== 'all') {
        upcoming = upcoming.filter(e => e.category === currentFilter).slice(0, 5);
    }
    
    if (upcoming.length === 0) {
        upcomingList.innerHTML = '<div class="no-upcoming">No upcoming events</div>';
        return;
    }
    
    const categoryLabels = {
        network_upgrade: 'Network',
        token_launch: 'Token',
        conference: 'Event',
        hackathon: 'Hackathon',
        validator: 'Validator',
        defi: 'DeFi',
        nft: 'NFT',
        governance: 'Gov',
        partnership: 'Partner',
        other: 'Other'
    };
    
    upcomingList.innerHTML = upcoming.map(event => `
        <div class="upcoming-item ${event.category}" data-date="${event.date}">
            <div class="upcoming-date">${formatDate(event.date)}</div>
            <div class="upcoming-title">${escapeHtml(event.title)}</div>
            <span class="upcoming-category">${categoryLabels[event.category] || event.category}</span>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.upcoming-item').forEach(item => {
        item.addEventListener('click', () => {
            const date = item.dataset.date;
            // Jump to that month
            const eventDate = new Date(date + 'T00:00:00');
            currentDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1);
            renderCalendar();
            showDayDetail(date);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Month navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Today button - jump to current month
    document.getElementById('todayBtn').addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCalendar();
            renderUpcomingEvents();
        });
    });
    
    // Close detail view
    document.getElementById('closeDetail').addEventListener('click', () => {
        document.getElementById('dayDetail').style.display = 'none';
    });
}

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Get today's date for highlighting
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    let calendarHTML = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const fullDateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        calendarHTML += renderDay(fullDateStr, day, true, todayStr);
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === todayStr;
        calendarHTML += renderDay(dateStr, day, false, todayStr, isToday);
    }
    
    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        const fullDateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        calendarHTML += renderDay(fullDateStr, day, true, todayStr);
    }
    
    document.getElementById('calendarDays').innerHTML = calendarHTML;
    
    // Add click listeners to days
    document.querySelectorAll('.calendar-day').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            const date = dayEl.dataset.date;
            showDayDetail(date);
        });
    });
}

// Render a single day
function renderDay(dateStr, dayNum, isOtherMonth, todayStr, isToday = false) {
    const events = getEventsForDate(dateStr);
    let filteredEvents = events;
    
    if (currentFilter !== 'all') {
        filteredEvents = events.filter(e => e.category === currentFilter);
    }
    
    const eventsHTML = filteredEvents.slice(0, 2).map(event => 
        `<div class="day-event ${event.category}">${escapeHtml(event.title)}</div>`
    ).join('');
    
    const moreCount = filteredEvents.length - 2;
    const moreHTML = moreCount > 0 ? `<div class="more-events">+${moreCount} more</div>` : '';
    
    const classes = ['calendar-day'];
    if (isOtherMonth) classes.push('other-month');
    if (isToday) classes.push('today');
    
    return `
        <div class="${classes.join(' ')}" data-date="${dateStr}">
            <div class="day-number">${dayNum}</div>
            <div class="day-events">
                ${eventsHTML}
                ${moreHTML}
            </div>
        </div>
    `;
}

// Get events for a specific date
function getEventsForDate(dateStr) {
    return allEvents.filter(event => event.date === dateStr);
}

// Show day detail modal
function showDayDetail(dateStr) {
    const events = getEventsForDate(dateStr);
    let filteredEvents = events;
    
    if (currentFilter !== 'all') {
        filteredEvents = events.filter(e => e.category === currentFilter);
    }
    
    if (filteredEvents.length === 0) {
        document.getElementById('dayDetail').style.display = 'none';
        return;
    }
    
    // Format date
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('detailDate').textContent = 
        `Events for ${date.toLocaleDateString('en-US', options)}`;
    
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = filteredEvents.map(event => renderEventCard(event)).join('');
    
    document.getElementById('dayDetail').style.display = 'block';
    
    // Scroll to detail
    document.getElementById('dayDetail').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render event card
function renderEventCard(event) {
    const categoryLabels = {
        network_upgrade: 'Network Upgrade',
        token_launch: 'Token Launch',
        conference: 'Conference',
        hackathon: 'Hackathon',
        validator: 'Validator',
        defi: 'DeFi',
        nft: 'NFT',
        governance: 'Governance',
        partnership: 'Partnership',
        other: 'Other'
    };
    
    const urlHTML = event.url ? 
        `<a href="${escapeHtml(event.url)}" target="_blank" class="event-link">View Source →</a>` : '';
    
    const verifiedBadge = event.verified ? 
        `<span class="verified-badge">✓ Verified</span>` : 
        `<span class="tentative-badge">◯ Tentative</span>`;
    
    const sourceHTML = event.source ?
        `<div class="event-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
            </svg>
            ${escapeHtml(event.source)}
        </div>` : '';
    
    return `
        <div class="event-card ${event.category}">
            <div class="event-header">
                <div class="event-title">
                    ${escapeHtml(event.title)}
                    ${verifiedBadge}
                </div>
                <span class="event-badge ${event.category}">${categoryLabels[event.category] || event.category}</span>
            </div>
            <div class="event-description">${escapeHtml(event.description)}</div>
            <div class="event-meta">
                <div class="event-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${formatDate(event.date)}
                </div>
                ${sourceHTML}
                ${urlHTML}
            </div>
        </div>
    `;
}

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
