/* LuxOkna lite service worker — offline fallback for navigations. */
const CACHE = 'luxokna-v1'
const ASSETS = [
  '/',
  '/icon.svg',
  '/apple-icon.png',
  '/manifest.webmanifest',
  '/offline.html',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() =>
        caches.match('/offline.html').then((r) => r || new Response('offline', { status: 503 })),
      ),
    )
  }
})
