const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  '/index.html',
  '/css/style.css',
  '/images/20160707_112632_P7070414.JPG',
  '/images/touch/huckis_128.png',
  '/images/touch/huckis_192.png',
  '/images/touch/huckis_256.png',
  '/images/touch/huckis_384.png',
  '/images/touch/huckis_512.png'
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
