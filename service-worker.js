const cacheName = 'cache-v2';
const precacheResources = [
  '/',
  '/index.html',
  '/css/style.css',
  '/images/20160707_112632_P7070414.JPG',
  '/images/icons/hucki_128x128.png',
  '/images/icons/hucki_192x192.png',
  '/images/icons/hucki_256x256.png',
  '/images/icons/hucki_384x384.png',
  '/images/icons/hucki_512x512.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
