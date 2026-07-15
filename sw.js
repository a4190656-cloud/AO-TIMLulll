// 1. שם המטמון ומספר הגרסה. 
// בכל פעם שתשנה את ה-v2 ל-v3, הדפדפן יתעדכן וימחק את הלוגואים הישנים!
const CACHE_NAME = 'ao-digital-cache-v2';

// 2. רשימת הקבצים שיוצגו גם ללא חיבור לאינטרנט (Offline)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/privacy.html',
  '/icon-192.png',
  '/icon-512.png'
];

// שלב ההתקנה (Install) - שמירת הקבצים החדשים במטמון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] שומר קבצים במטמון החדש');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // מאלץ את ה-SW החדש להיכנס לפעולה מייד
  );
});

// שלב ההפעלה (Activate) - ניקוי כל ה-Cache הישן והשבור מהמכשיר
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] מוחק מטמון ישן ושבור:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // לוקח שליטה על הדפים פתוחים מייד ומעדכן אותם
  );
});

// שלב בקשת הקבצים (Fetch) - החזרת הקובץ מהמטמון, ואם הוא לא שם - משיכה מהרשת
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});
