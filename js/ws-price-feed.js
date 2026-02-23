/**
 * WebSocket Live Price Feed
 * Connects to Binance WebSocket for real-time prices
 * 
 * Usage:
 *   <script src="/js/ws-price-feed.js"></script>
 *   <script>
 *     // Prices available in window.livePrices
 *     console.log(window.livePrices.BTC);  // 45000.00
 *     console.log(window.livePrices.ETH);  // 2800.00
 *   </script>
 * 
 * For specific pages, add callback:
 *   window.onPriceUpdate = (symbol, price) => { ... }
 */

(function() {
    'use strict';
    
    // Price storage
    window.livePrices = {};
    
    // Default symbols
    const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'xrpusdt', 'adausdt', 'dogeusdt', 'avaxusdt'];
    
    // WebSocket URL
    const WS_URL = 'wss://stream.binance.com:9443/ws/';
    
    let ws = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT = 5;
    
    function connect() {
        // Build streams string
        const streams = symbols.map(s => `${s}@miniTicker`).join('/');
        const url = WS_URL + streams;
        
        console.log('[WS] Connecting to Binance...');
        
        try {
            ws = new WebSocket(url);
            
            ws.onopen = function() {
                console.log('[WS] Connected to Binance');
                reconnectAttempts = 0;
            };
            
            ws.onmessage = function(event) {
                try {
                    const data = JSON.parse(event.data);
                    processTicker(data);
                } catch(e) {
                    // Ignore non-ticker messages
                }
            };
            
            ws.onerror = function(err) {
                console.error('[WS] Error:', err);
            };
            
            ws.onclose = function() {
                console.log('[WS] Disconnected');
                attemptReconnect();
            };
            
        } catch(e) {
            console.error('[WS] Failed to connect:', e);
            attemptReconnect();
        }
    }
    
    function processTicker(data) {
        if (!data.s) return;
        
        // Parse symbol (e.g., "BTCUSDT" -> "BTC")
        const symbol = data.s.replace('USDT', '');
        const price = parseFloat(data.c);
        
        // Store price
        window.livePrices[symbol] = price;
        
        // Notify callback if exists
        if (typeof window.onPriceUpdate === 'function') {
            window.onPriceUpdate(symbol, price);
        }
        
        // Dispatch custom event for other listeners
        window.dispatchEvent(new CustomEvent('priceUpdate', {
            detail: { symbol, price }
        }));
    }
    
    function attemptReconnect() {
        if (reconnectAttempts < MAX_RECONNECT) {
            reconnectAttempts++;
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
            console.log(`[WS] Reconnecting in ${delay}ms (attempt ${reconnectAttempts})`);
            setTimeout(connect, delay);
        } else {
            console.error('[WS] Max reconnect attempts reached');
        }
    }
    
    // Start connection
    if (typeof window !== 'undefined') {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', connect);
        } else {
            connect();
        }
        
        // Expose methods
        window.wsPriceFeed = {
            getPrice: function(symbol) {
                return window.livePrices[symbol];
            },
            getAllPrices: function() {
                return window.livePrices;
            },
            reconnect: function() {
                if (ws) ws.close();
                reconnectAttempts = 0;
                connect();
            }
        };
    }
    
})();
