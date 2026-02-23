const CACHE_NAME = 'seeker-v1';
const ASSETS = [
  '/seeker/index.html',
  '/seeker/digest.html',
  '/seeker/saved.html',
  '/seeker/settings.html',
  '/seeker/article.html',
  '/seeker/styles.css',
  '/seeker/manifest.json'
];

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  // API requests - network first
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }
  
  // Static assets - cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
