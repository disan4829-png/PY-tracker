const CACHE = 'py5-shell-v1';
const SHELL = ['./', './index.html', './manifest.json', './favicon-32.png', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache live data — Binance REST/WS or your PY5 backend. Always hit the network.
  if (url.hostname.includes('binance.com') || url.hostname.includes('fapi') || e.request.method !== 'GET') {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Network-first for same-origin app shell files, so a new deploy shows up on next load
  // instead of staying stuck on a cached copy.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Anything else (e.g. a backend on a different origin): network-only, no caching.
  e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
});
