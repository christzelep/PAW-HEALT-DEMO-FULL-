const CACHE_NAME = 'pawhealth-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',          // Αν έχεις εξωτερικό CSS
  '/script.js',          // Αν έχεις εξωτερικό JS
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Πρόσθεσε κι άλλα αρχεία που χρειάζονται να είναι cached
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});
