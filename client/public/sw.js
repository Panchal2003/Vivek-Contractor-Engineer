const CACHE_NAME = 'vivek-contractors-v3'
const APP_SHELL_FILES = [
  '/',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key)
            }
            return Promise.resolve()
          })
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  // Do not cache API requests; always go to network.
  const requestUrl = new URL(event.request.url)
  if (requestUrl.pathname.startsWith('/api/')) {
    return
  }

  // Range requests (video/audio chunks) return 206 and cannot be cached with Cache.put.
  if (event.request.headers.has('range')) {
    return
  }

  if (requestUrl.origin !== self.location.origin) {
    return
  }

  // Network-first to avoid serving stale JS/CSS bundles after deployments.
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone))
        }
        return networkResponse
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) {
          return cachedResponse
        }
        return caches.match('/')
      })
  )
})