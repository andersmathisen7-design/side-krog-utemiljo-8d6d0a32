"use strict";
if ("serviceWorker" in navigator && document.currentScript) {
  var rot = new URL("./", document.currentScript.src);
  window.addEventListener("load", function () {
    navigator.serviceWorker.register(new URL("sw.js", rot).href, { scope: rot.href }).catch(function () {});
  });
}
