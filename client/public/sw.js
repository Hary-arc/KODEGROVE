const CACHE_NAME = 'codeflow-v2';
const STATIC_CACHE = ['/', '/manifest.json', '/offline.html'];

const API_CACHE = 'api-cache-v2';
const IMAGE_CACHE = 'image-cache-v2';
const FONT_CACHE = 'font-cache-v1';

// Cache size limits
const CACHE_LIMITS = {
  [IMAGE_CACHE]: 50,
  [API_CACHE]: 30,
  [FONT_CACHE]: 10,
};

// Install event - faster installation
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE)),
      self.skipWaiting(),
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.startsWith('codeflow-') && !cacheName.includes('cache-v')) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim(),
    ])
  );
});

// Helper function to clean cache when it exceeds limits
async function cleanCache(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > limit) {
    const keysToDelete = keys.slice(0, keys.length - limit);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Enhanced fetch event with multiple caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle font requests with cache-first strategy
  if (request.destination === 'font' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(async cache => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            cleanCache(FONT_CACHE, CACHE_LIMITS[FONT_CACHE]);
          }
          return networkResponse;
        } catch {
          return new Response('Font not available', { status: 503 });
        }
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(async cache => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            cleanCache(API_CACHE, CACHE_LIMITS[API_CACHE]);
          }
          return networkResponse;
        } catch {
          const cachedResponse = await cache.match(request);
          return (
            cachedResponse ||
            new Response('API not available', {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ error: 'Service unavailable' }),
            })
          );
        }
      })
    );
    return;
  }

  // Handle image requests with cache-first strategy
  if (request.destination === 'image' || url.hostname.includes('unsplash')) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async cache => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            cleanCache(IMAGE_CACHE, CACHE_LIMITS[IMAGE_CACHE]);
          }
          return networkResponse;
        } catch {
          return new Response('Image not available', { status: 503 });
        }
      })
    );
    return;
  }

  // Handle other requests with stale-while-revalidate
  event.respondWith(
    caches.match(request).then(async cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          if (
            networkResponse.ok &&
            (request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'document')
          ) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('/offline.html') || new Response('Offline', { status: 503 });
          }
          return new Response('Network error', { status: 503 });
        });

      return cachedResponse || fetchPromise;
    })
  );
});
