const CACHE_NAME = 'pokecatch-cache-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/src/main.tsx',
  '/src/ui/App.tsx',
  '/src/styles/global.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : undefined)))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(network => {
        const copy = network.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return network;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
