const CACHE_NAME = 'qr-service-v1.0.0';
const STATIC_CACHE = 'qr-service-static-v1.0.0';
const DYNAMIC_CACHE = 'qr-service-dynamic-v1.0.0';

// Файлы для кеширования при установке
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/styles/globals.css',
  '/manifest.json'
];

// Файлы, которые должны кешироваться при первом запросе
const DYNAMIC_ASSETS = [
  '/src/components/',
  '/src/lib/',
  '/src/hooks/',
  '/src/types/',
  '/src/assets/'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activated');
        return self.clients.claim();
      })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем запросы к внешним API и ресурсам
  if (url.origin !== location.origin) {
    return;
  }

  // Стратегия Cache First для статических ресурсов
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Стратегия Network First для HTML страниц
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Стратегия Stale While Revalidate для остальных ресурсов
  event.respondWith(staleWhileRevalidate(request));
});

// Проверка, является ли ресурс статическим
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/icons/') ||
    url.pathname.includes('/images/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  );
}

// Стратегия Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache First failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Стратегия Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Возвращаем offline страницу для HTML запросов
    if (request.destination === 'document') {
      const offlineResponse = await caches.match('/index.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Стратегия Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Если сеть недоступна, возвращаем кешированный ответ
    return cachedResponse || new Response('Offline', { status: 503 });
  });

  return cachedResponse || fetchPromise;
}

// Обработка push уведомлений (для будущего использования)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'Открыть',
          icon: '/icons/icon-72x72.png'
        },
        {
          action: 'close',
          title: 'Закрыть',
          icon: '/icons/icon-72x72.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Периодическая синхронизация (для будущего использования)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Здесь можно добавить логику синхронизации данных
  console.log('[SW] Background sync completed');
}
