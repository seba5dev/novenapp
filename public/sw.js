// Novenapp Service Worker
// Version 1.0.0

const CACHE_NAME = 'novenapp-v1';
const STATIC_CACHE = 'novenapp-static-v1';
const DYNAMIC_CACHE = 'novenapp-dynamic-v1';

// Archivos esenciales para cachear
const STATIC_ASSETS = [
  '/',
  '/crear',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Instalación del service worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // Activar inmediatamente
  self.skipWaiting();
});

// Activación del service worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Tomar control inmediatamente
  return self.clients.claim();
});

// Estrategia de fetch: Network First, falling back to Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear peticiones GET
  if (request.method !== 'GET') {
    return;
  }

  // No cachear peticiones a APIs externas (Google Apps Script)
  if (url.hostname.includes('script.google.com') ||
    url.hostname.includes('googleapis.com')) {
    return;
  }

  // Estrategia: Network First con fallback a Cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en cache
        if (response && response.status === 200) {
          const responseClone = response.clone();

          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Si falla la red, buscar en cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Si no está en cache y es una navegación, devolver la página principal
          if (request.mode === 'navigate') {
            return caches.match('/');
          }

          // Para otros recursos, devolver una respuesta vacía
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Sincronización en background (opcional)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-leads') {
    event.waitUntil(
      // Aquí puedes implementar lógica para sincronizar leads pendientes
      console.log('[SW] Syncing pending leads...')
    );
  }
});

// Push notifications (opcional para futuras funcionalidades)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización de Novenapp',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver novena',
      },
      {
        action: 'close',
        title: 'Cerrar',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Novenapp', options)
  );
});

// Manejo de clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
