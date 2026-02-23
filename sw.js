// Service Worker for Montgomery AI Trading
const CACHE_NAME = 'montgomery-ai-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/styles/apple.css',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});



// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '📰 Solana Seeker';
  const options = {
    body: data.body || 'New content available',
    icon: '/seeker/icon-192.png',
    badge: '/seeker/badge-72.png',
    tag: 'seeker-notification',
    data: data.url || '/seeker/'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // API calls - network only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'offline', offline: true }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }
  
  // Static assets - cache first
  if (url.pathname.match(/\.(js|css|png|svg|ico)$/) || url.pathname.startsWith('/styles/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }
  
  // HTML pages - network first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          return response || caches.match(OFFLINE_URL);
        });
      })
  );
});
