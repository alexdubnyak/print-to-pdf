// Service Worker for Print to PDF PWA
const CACHE_NAME = 'print-to-pdf-v2.0.0';
const STATIC_CACHE_NAME = 'print-to-pdf-static-v2.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon.png',
  '/apple-touch-icon.png',
];

// Dynamic cache patterns
const CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\.(?:js|css|woff2?|ttf|eot)$/,
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Service worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error during install:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated successfully');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Error during activation:', error);
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/')
        .then((response) => {
          return response || fetch(request);
        })
        .catch(() => {
          return caches.match('/');
        })
    );
    return;
  }

  // Handle API requests (don't cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Handle static files and assets
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          console.log('[SW] Serving from cache:', request.url);
          return response;
        }

        // Check if request matches cache patterns
        const shouldCache = CACHE_PATTERNS.some(pattern => 
          pattern.test(request.url)
        );

        if (shouldCache) {
          return fetch(request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('[SW] Caching new resource:', request.url);
                  cache.put(request, responseToCache);
                })
                .catch((error) => {
                  console.error('[SW] Error caching resource:', error);
                });

              return response;
            })
            .catch((error) => {
              console.error('[SW] Fetch failed:', error);
              throw error;
            });
        }

        // For non-cacheable requests, just fetch
        return fetch(request);
      })
      .catch((error) => {
        console.error('[SW] Error in fetch handler:', error);
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
        
        throw error;
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'export-pdf') {
    event.waitUntil(
      // Handle offline PDF export queue
      handleOfflineExports()
    );
  }
});

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Print to PDF', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received:', event);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle offline export queue (placeholder)
async function handleOfflineExports() {
  try {
    // Implementation for handling queued exports when back online
    console.log('[SW] Processing offline export queue...');
    
    // This would typically:
    // 1. Read queued export requests from IndexedDB
    // 2. Send them to the server
    // 3. Store results or show notifications
    // 4. Clean up the queue
    
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Error processing offline exports:', error);
    throw error;
  }
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handler
self.addEventListener('error', (event) => {
  console.error('[SW] Service worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service worker script loaded');
