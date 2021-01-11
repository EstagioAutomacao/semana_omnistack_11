var CACHE_NAME = 'react-pwa';
var urlsToCache = [
  '/',
  '/index.html',
  '/404.html',
  '/favicon.ico',
  '/register-sw.js',
  '/service-worker.js',
  '/asset-manifest.json',
  '/manifest.json',
  '/maskable_icon_x1_512.png',
  '/maskable_icon_x1_192.png',
  '/static/css/main.96cbabe0.chunk.css',
  '/static/media/heroes.b413d9df.png',
  '/static/media/logo.4f957741.svg',
  '/static/js/2.27c3e997.chunk.js',
  '/static/js/3.13c9e47b.chunk.js',
  '/static/js/main.0ccbac42.chunk.js',
  '/static/js/runtime-main.def9cf0b.js',
];

// self.addEventListener('install', (event) => {
//   console.log('Inside the install handler:', event);
// });

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        console.log('Service Worker instalado')
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
});

// self.addEventListener(fetch, (event) => {
//   console.log('Inside the fetch handler:', event);
// });

self.addEventListener ('fetch', function (event) { 
  console.log (event.request.url); 
  event.respondWith ( 
    caches.match(event.request).then(function (response) { 
      console.log('Service Worke fetch');
          return response || fetch ( event.request); 
      }) 
  ); 
});
