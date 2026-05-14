const CACHE_NAME = 'ao-budget-v1';
const ASSETS = [
  '/AO-TIMLulll/',
  '/AO-TIMLulll/index.html',
  '/AO-TIMLulll/manifest.json'
];

// התקנה ושמירה בזיכרון מטמון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// הפעלה וניקוי גרסאות ישנות
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// טיפול בבקשות (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
