// 1. שם המטמון ומספר הגרסה. 
// בכל פעם שאתה מעלה עדכון קוד ל-GitHub, פשוט תעלה את המספר (למשל ל-v3.1)
const CACHE_NAME = 'ao-digital-cache-v3';

// 2. רשימת הקבצים לשמירה במטמון עבור מצב Offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/privacy.html',
  '/icon-192.png',
  '/icon-512.png'
];

// שלב ההתקנה (Install) - שמירת הקבצים במטמון החדש וכניסה מיידית לפעולה
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] שומר קבצים במטמון החדש');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // מתקין את ה-SW החדש מייד ללא המתנה
  );
});

// שלב ההפעלה (Activate) - מוחק את כל הגרסאות הישנות מהמכשיר ולוקח שליטה
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] מוחק מטמון ישן ושבור:', cache);
            return caches.delete(cache); // מנקה מטמון ישן בלבד!
          }
        })
      );
    }).then(() => self.clients.claim()) // תופס שליטה מיידית על הדפדפן
  );
});

// שלב ה-Fetch: אסטרטגיית Network First עבור עדכונים בזמן אמת
self.addEventListener('fetch', (event) => {
  // מטפלים רק בבקשות GET רגילות
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // אם הצלחנו להביא את הגרסה העדכנית מהרשת - נעדכן גם את ה-Cache ברקע
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // אם אין חיבור לאינטרנט (Offline), החזר את הקובץ מה-Cache
        return caches.match(event.request);
      })
  );
});
