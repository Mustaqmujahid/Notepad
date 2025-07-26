const CACHE_NAME = 'mma-notepad-cache-v1';
const urlsToCache = [
  '/',
  'noteapp.html',
  'icon-192.png'
];

// Service Worker ইন্সটল করার সময় প্রয়োজনীয় ফাইলগুলো ক্যাশে সেভ করে রাখে
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// যখনই অ্যাপ কোনো ফাইল খোঁজে, Service Worker প্রথমে ক্যাশে দেখে
// ইন্টারনেট না থাকলেও ক্যাশ থেকে ফাইল লোড করে অ্যাপটি চালু রাখে
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // যদি ক্যাশে ফাইলটি পাওয়া যায়, তাহলে সেটি ব্যবহার করে
        if (response) {
          return response;
        }
        // না পাওয়া গেলে ইন্টারনেট থেকে আনার চেষ্টা করে
        return fetch(event.request);
      })
  );
});