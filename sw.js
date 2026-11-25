const CACHE_NAME = 'yuiharuka-puzzle-v66';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'dragon-fire.png',
  'dragon-water.png',
  'dragon-forest.png',
  'fairy-flower.png',
  'fairy-star.png',
  'phoenix.png',
  'zeus.png',
  'satan.png',
  'lucifer.png',
  'dragon-ancient.png',
  'dragon-emerald.png',
  'dragon-ruby.png',
  'fairy-sapphire.png',
  'dragon-light.png',
  'bg-temple.jpg',
  'bg-wasteland.jpg',
  'bg-volcano.jpg',
  'bg-ice.jpg',
  'bg-sea.jpg',
  'bg-space.jpg',
  'bg-heaven.jpg',
  'bg-demon.jpg',
  'santa-red.webp','santa-blue.webp','santa-green.webp','bg-forest.jpg',
  'bg-fallen.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // ページ本体はネットワーク優先：更新が次の起動で反映される
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('index.html', copy));
          return response;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
