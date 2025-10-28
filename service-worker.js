const CACHE_NAME = 'disney-quest-cache-v1';
const urlsToCache = [
  '.',
  './index.html',
  './index.tsx',
  './App.tsx',
  './constants.ts',
  './types.ts',
  './services/geminiService.ts',
  './hooks/useGeolocation.ts',
  './components/WelcomeScreen.tsx',
  './components/QuestSelectionScreen.tsx',
  './components/GameScreen.tsx',
  './components/RiddleView.tsx',
  './components/CompletionScreen.tsx',
  './components/MapComponent.tsx',
  './components/icons/SparkleIcon.tsx',
  './components/icons/LightbulbIcon.tsx',
  './components/icons/MapPinIcon.tsx',
  './components/icons/GlobeIcon.tsx',
  './components/icons/MapIcon.tsx',
  './components/icons/QuestIcon.tsx',
  './background.jpg',
  './fantasyland1.jpg',
  './fantasyland2.jpg',
  './fantasyland3.jpg',
  './fantasyland4.jpg',
  './adventureland1.jpg',
  './adventureland2.jpg',
  './adventureland3.jpg',
  './frontierland1.jpg',
  './frontierland2.jpg',
  './frontierland3.jpg',
  './discoveryland1.jpg',
  './discoveryland2.jpg',
  './discoveryland3.jpg',
  './mainstreet1.jpg',
  './mainstreet2.jpg',
  './mainstreet3.jpg',
  './mainstreet4.jpg',
  './pixar1.jpg',
  './pixar2.jpg',
  './pixar3.jpg',
  './avengers1.jpg',
  './avengers2.jpg',
  './avengers3.jpg',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Lato:wght@400;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});