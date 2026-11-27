var C='kinphrase-v7';
var LOCAL=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
var SDK=['app','auth','firestore'].map(function(n){return 'https://www.gstatic.com/firebasejs/10.12.2/firebase-'+n+'-compat.js'});
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all(LOCAL.map(function(u){return c.add(u).catch(function(){})}).concat(SDK.map(function(u){return fetch(u,{mode:'no-cors'}).then(function(r){return c.put(u,r)}).catch(function(){})})));
  }).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  var same=u.origin===self.location.origin;
  var sdk=u.hostname==='www.gstatic.com'&&u.pathname.indexOf('/firebasejs/')===0;
  if(!same&&!sdk)return;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(r).then(function(hit){
      var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(function(){return null});
      if(hit){return hit}
      return net.then(function(res){return res||c.match('index.html')});
    });
  }));
  // 同じファイルの更新は次回起動時に反映（キャッシュ優先）
  if(same){e.waitUntil(fetch(r).then(function(res){if(res&&res.ok)return caches.open(C).then(function(c){return c.put(r,res)})}).catch(function(){}))}
});
