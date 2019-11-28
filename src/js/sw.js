workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
);

// API responses.
workbox.routing.registerRoute(
  /https:\/\/api\.goodandcheap\.website\/v2/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'content',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60, // 10 minutes
      })
    ]
  })
);

// Images.
workbox.routing.registerRoute(
  /https:\/\/assets\.goodandcheap\.website\/cache/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60, // 1 hour
      })
    ]
  })
);

// Webfonts.
workbox.routing.registerRoute(
  /\/fonts/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60, // 1 hour
      })
    ]
  })
);
