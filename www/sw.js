const CACHE_NAME = 'bipagem-v1';
const urlsToCache = [
  './',
  './Porjeto_Offline_App.html', 
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignora requisições de envio de dados (POST), deixando passar direto para a rede
  if (event.request.method !== 'GET') {
      return; 
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});