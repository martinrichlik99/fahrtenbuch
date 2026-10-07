var CACHE_NAME='fahrtenbuch-v5';
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png'])}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE_NAME}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(function(r){
    var kopie=r.clone();
    caches.open(CACHE_NAME).then(function(c){c.put(e.request,kopie)});
    return r;
  }).catch(function(){return caches.match(e.request)}));
});
