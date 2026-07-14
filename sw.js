const CACHE_NAME = 'ao-budget-v2'; // ⚠️ הועלה מ-v1 ל-v2 — זה מה שמכריח מחיקה של כל מטמון ישן
const ASSETS = [
  '/AO-TIMLulll/',
  '/AO-TIMLulll/index.html',
  '/AO-TIMLulll/manifest.json'
];

// התקנה ושמירה בזיכרון מטמון
self.addEventListener('install', (event) => {
  self.skipWaiting(); // מפעיל את הגרסה החדשה מיד, בלי לחכות שכל הטאבים ייסגרו
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// הפעלה וניקוי גרסאות ישנות
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    }).then(() => self.clients.claim()) // משתלט מיד על כל הטאבים הפתוחים
  );
});

// טיפול בבקשות (Fetch)
// HTML/ניווט — Network-First: תמיד מנסה קודם רשת (הגרסה העדכנית ביותר),
// ורק אם אין אינטרנט נופל חזרה למטמון. זה מה שמונע את הבעיה של "גרסה תקועה".
// שאר הקבצים (אייקונים וכו') — Cache-First כרגיל, לביצועים מהירים.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isHTML = req.mode === 'navigate' ||
    (req.method === 'GET' && (req.headers.get('accept') || '').includes('text/html'));

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((response) => response || fetch(req))
  );
});
