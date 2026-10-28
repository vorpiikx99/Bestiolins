/* Bestiolins: keeps the game on the phone so it works without internet */
const CACHE='bestiolins-20261028085222';
const CORE=['./','./index.html','./net.js?v=20261028085222','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
/* 'reload' skips the browser's own short-term cache, so a new version never keeps old files */
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>(k.startsWith('bestiolins-')||k.startsWith('cryptobetes-'))&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
function put(req,res){if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return res;}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(req.mode==='navigate'){
    /* the page: newest version when online, the saved one when offline */
    e.respondWith(fetch(new Request(req.url,{cache:'no-store',credentials:'same-origin'})).then(r=>put('./index.html',r)).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));return;}
  if(url.origin===location.origin&&url.pathname.endsWith('/version.json')){e.respondWith(fetch(new Request(req.url,{cache:'no-store'})));return;}
  if(url.origin===location.origin||url.host==='fonts.googleapis.com'||url.host==='fonts.gstatic.com'){
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>put(req,res))).catch(()=>caches.match(req)));}
});
