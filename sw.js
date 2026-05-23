// --- ФАЙЛ sw.js ---
const CACHE_NAME = 'skladrasklad-v15'; // МЕНЯЙ ЭТУ ЦИФРУ ДЛЯ ОБНОВЛЕНИЯ

const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-64.png',
  './icon-256.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Установка: кешируем все файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
  self.skipWaiting(); // Принудительно активируем новый воркер сразу
});

// Активация: чистим старый кеш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Запросы: сначала кэш, потом сеть
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});