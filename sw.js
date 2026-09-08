const CACHE='py-v5-shell';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-180.png','./favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.hostname.includes('binance.com')){e.respondWith(fetch(e.request,{cache:'no-store'}));return}
  if(e.request.mode==='navigate'||e.request.destination==='document'||u.pathname.endsWith('/index.html')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok){const cp=x.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return x})))
});
