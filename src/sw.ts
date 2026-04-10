/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  ({ request, url }) =>
    request.mode === "navigate" &&
    !url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/api/v1/"),
  new NetworkFirst({
    cacheName: "todopet-page-cache",
    networkTimeoutSeconds: 3,
  }),
);

registerRoute(
  ({ url, request }) =>
    request.method === "GET" &&
    (url.pathname.startsWith("/api/") || url.pathname.startsWith("/api/v1/")),
  new NetworkFirst({
    cacheName: "todopet-api-cache",
    networkTimeoutSeconds: 5,
  }),
);

registerRoute(
  ({ request, url }) =>
    request.destination === "image" || /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i.test(url.pathname),
  new CacheFirst({
    cacheName: "todopet-image-cache",
  }),
);

registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
  new StaleWhileRevalidate({
    cacheName: "todopet-google-fonts-cache",
  }),
);

setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    return (await caches.match("/offline.html")) ?? Response.error();
  }

  if (event.request.destination === "image") {
    return (await caches.match("/icons/icon-192x192.png")) ?? Response.error();
  }

  return Response.error();
});
