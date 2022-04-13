const cacheName = 'hello-pwa';
const filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './images/wallp.jpg',
  './images/battery-half-solid.svg',
  './images/bicycle-solid.svg',
  './css/ubuntu-regular-webfont.woff2'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
          try {
            const cache = await caches.open(cacheName);
            return cache.addAll(filesToCache);
          } catch (e) {
            console.log(e.message);
          }
      })());
  });
  

/* Serve cached content when offline */
self.addEventListener('fetch', (event) => {
    console.log('ServiceWorker Fetch', event.request.url);
    event.respondWith((async () => {
          try {
              const response = await caches.match(event.request);
              return response || fetch(event.request);
          } catch (e) {
              console.log(e.message);
          }
      })());
  });
  