/* ═══════════════════════════════════════════════════════════
   SERVICE WORKER — Heilpraktiker Lernapp
   Strategie: Cache-first für Assets, Network-first für API
   ═══════════════════════════════════════════════════════════ */

const CACHE = 'lernapp-v2';

// Assets die beim Install gecacht werden (App Shell)
const PRECACHE = [
  '/',
  '/index.html',
  '/ios-styles.css',
  '/shared.js',
  '/quiz-data.js',
  '/wissen-data.js',
  '/terminologie-data.js',
  '/pruefung-data.js',
];

// ── Installation: App Shell cachen ──────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(PRECACHE).catch(err => {
        // Einzelne Fehler nicht blockieren
        console.warn('[SW] Precache error:', err);
      });
    })
  );
  self.skipWaiting();
});

// ── Aktivierung: alten Cache löschen ────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: Strategie nach Request-Typ ───────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // API-Calls: Network-first (keine Offline-Fallbacks)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Externe Ressourcen (CDN, Fonts): Cache-first
  if (url.origin !== location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // App Assets: Cache-first, dann Netzwerk + Update im Cache
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // Offline: gecachte Version verwenden

      return cached || fetchPromise;
    })
  );
});
