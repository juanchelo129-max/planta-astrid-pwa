const CACHE='planta-astrid-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./sw.js'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      return cached || fetch(e.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return response;
      }).catch(()=>caches.match('./index.html'));
    })
  );
});
