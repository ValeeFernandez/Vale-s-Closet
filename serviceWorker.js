const CACHE_NAME = 'v1_cache_valescloset';
const urlsToCache = [
    '/', // Página principal
    '/index.html', // Página principal
    '/assets/style.css', // Estilos
    '/assets/imagenes/closet2.jpeg', // Imagenes esenciales
    '/assets/imagenes/closet1.png',
    '/assets/imagenes/joyas.jpeg',
    '/assets/imagenes/zapatos.jpeg',
    '/assets/imagenes/Vestido.png',
    '/assets/imagenes/Croptop.png',
    '/assets/imagenes/Panta.png',
    '/assets/imagenes/Falda.png'
];

// Instalación del Service Worker: caching de recursos esenciales
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos cacheados');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('WAAAAAAAAAAAAAAA');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepción de solicitudes de red y uso de caché cuando sea posible
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Si hay una respuesta en caché, devuélvela
            if (cachedResponse) {
                console.log('Wooooooooooooooooooo');
                return cachedResponse;
            }
            // Si no hay respuesta en caché, realiza la solicitud de red
            return fetch(event.request).then((response) => {
                // Cachea la nueva respuesta
                return caches.open(CACHE_NAME).then((cache) => {
                    console.log('OLISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
