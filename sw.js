/* RuneBlade 7.2 — offline shell only. Never caches account, API or match traffic. */
const CACHE = 'runeblade-shell-7.2';
const ROOT = new URL('./', self.registration.scope);
const SHELL = ['', 'config.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
const urls = SHELL.map(p => new URL(p, ROOT).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(urls)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('runeblade-shell-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('Authorization')) return;
  const url = new URL(request.url);
  if (url.origin !== ROOT.origin) return;
  const isGame = request.mode === 'navigate' && (url.pathname === ROOT.pathname || url.pathname === new URL('index.html', ROOT).pathname);
  if (!isGame && !urls.includes(url.href)) return;
  const key = isGame ? ROOT.href : url.href;
  event.respondWith(fetch(request).then(response => {
    if (response.ok && !response.redirected) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(key, copy)).catch(() => {}));
    }
    return response;
  }).catch(async () => (await caches.open(CACHE)).match(key).then(cached => cached || Response.error())));
});
