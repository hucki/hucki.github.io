const cacheName = "cache-v10";
const precacheResources = [
  "/",
  "/index.html",
  "/css/style.css",
  "/images/grouptripper-autox300.jpg",
  "/images/me-autox50.jpg",
  "/images/me_half-autox200.jpg",
  "/images/necto-autox300.jpg",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
