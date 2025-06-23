const CACHE_NAME = 'fesh-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/form.html',
  '/manifest.json',
  // اگر فایل‌های JS یا عکس داری اینجا اضافه کن
];

// هنگام نصب سرویس ورکر، فایل‌ها را کش کن
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// هنگام فعال شدن، کش‌های قدیمی را پاک کن
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// هنگام درخواست فایل‌ها، ابتدا کش را بررسی کن، اگر نبود از شبکه بگیر
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
