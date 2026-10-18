// 1. שם המטמון ומספר הגרסה. 
// בכל פעם שאתה מעלה עדכון קוד ל-GitHub, פשוט תעלה את המספר (למשל ל-v3.1)
const CACHE_NAME = 'ao-digital-cache-v4';

// 2. רשימת הקבצים לשמירה במטמון עבור מצב Offline
// (נתיבים יחסיים — האתר יושב תחת /AO-TIMLulll/, ונתיב שמתחיל ב-/ החזיר 404 ומנע את התקנת ה-Service Worker)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './icon-192.png',
  './icon-512.png'
];

// שלב ההתקנה (Install) - שמירת הקבצים במטמון החדש וכניסה מיידית לפעולה
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] שומר קבצים במטמון החדש');
        // קובץ אחד שנכשל לא מפיל את כל ההתקנה
        return Promise.all(ASSETS_TO_CACHE.map((url) => cache.add(url).catch(() => null)));
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
  // מטפלים רק בבקשות GET רגילות של האתר עצמו (לא Firebase / גוגל / שרתים חיצוניים)
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

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
        return caches.match(event.request).then((r) => r || caches.match('./index.html'));
      })
  );
});

// ── תזכורות (סוף חודש / יום איפוס) ──
self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { body: event.data ? event.data.text() : '' }; }
  const title = d.title || 'MNTA+';
  event.waitUntil(self.registration.showNotification(title, {
    body: d.body || 'יש לך תזכורת מהתקציב',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    dir: 'rtl',
    lang: 'he',
    tag: d.tag || 'mnta',
    renotify: true,
    data: { url: d.url || self.registration.scope }
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.indexOf(self.registration.scope) === 0 && 'focus' in c) return c.focus();
      }
      return self.clients.openWindow(url);
    })
  );
});
