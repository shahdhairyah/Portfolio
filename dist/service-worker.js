const CACHE_VERSION = "v3";
const CACHE_NAME = `shahdhairyah-${CACHE_VERSION}`;

const PRECACHE_URLS = ["/", "/index.html", "/logo.svg", "/logo.png", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* Never interfere with cross-origin requests (analytics, CDN icons, APIs). */
  if (url.origin !== self.location.origin) return;

  /* Network-first for page navigations so deploys are picked up immediately,
     falling back to the cached shell when offline. */
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", clone));
          }
          return response;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  /* Cache-first for immutable, content-hashed build assets; stale-while-
     revalidate for everything else (images, fonts, etc.). */
  const isHashedAsset = /\/assets\/.+\.(?:js|css|woff2?)$/.test(url.pathname);

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      if (isHashedAsset && cached) return cached;
      return cached || network;
    })
  );
});
