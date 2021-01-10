var CACHE_NAME = 'react-pwa';
var urlsToCache = [
  '/',
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
