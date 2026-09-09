/* Service worker mínimo do Road Book Algarve.
   Existe sobretudo para o browser considerar o site "instalável"
   (Chrome/Edge exigem um service worker ativo com um handler de fetch
   para oferecerem o botão automático "Instalar"). Também guarda a
   página principal em cache, para abrir mais depressa e funcionar
   minimamente offline se a ligação falhar. */

const CACHE_NAME = 'roadbook-algarve-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copia = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
