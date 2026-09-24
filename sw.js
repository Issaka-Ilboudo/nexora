const CACHE_NAME = "nexora-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./suivi.html",
  "./accepter-devis.html",
  "./logo-nexora.jpg",
  "./icon-nexora.png",
  "./boutique-en-ligne.png",
  "./site-internet.png",
  "./tunnel-vente.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
