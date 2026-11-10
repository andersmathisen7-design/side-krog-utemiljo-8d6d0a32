"use strict";
const LAGER = "side-098bf0eb";
const FORHAND = ["./","./icon.svg","./kontakt/","./manifest.webmanifest","./melding/","./melding/sendt/","./pwa.js","./style.css","./tomterydding/","./trefelling/"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(LAGER).then((c) => c.addAll(FORHAND)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((n) => Promise.all(n.filter((k) => k.startsWith("side-") && k !== LAGER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((svar) => {
        if (svar.ok && svar.type === "basic") {
          const kopi = svar.clone();
          caches.open(LAGER).then((c) => c.put(req, kopi));
        }
        return svar;
      })
      .catch(() =>
        caches.match(req).then((lagret) => lagret || (req.mode === "navigate" ? caches.match("./") : undefined))
          .then((svar) => svar || new Response("Ingen nettforbindelse", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })),
      ),
  );
});
