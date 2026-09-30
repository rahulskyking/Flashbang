/* ===================================================================
   FLASHBANG MEDIA — include.js
   Loads section partials from /sections/*.html into their placeholders,
   then boots the app (main.js -> feeds.js) once the DOM is complete.
   Keeps the site static & deploy-anywhere; must be served over HTTP
   (fetch does not work from the file:// protocol).
   =================================================================== */
(function () {
  "use strict";

  var VER = "v=12"; // bump alongside index.html asset versions to bust cache

  var slots = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  // Fetch every partial in parallel, preserving document order for injection.
  Promise.all(
    slots.map(function (slot) {
      var url = slot.getAttribute("data-include");
      var sep = url.indexOf("?") === -1 ? "?" : "&";
      return fetch(url + sep + VER)
        .then(function (r) {
          if (!r.ok) throw new Error(r.status + " " + url);
          return r.text();
        })
        .then(function (html) { return { slot: slot, html: html }; })
        .catch(function (err) {
          console.error("[include] failed:", err);
          return { slot: slot, html: "" };
        });
    })
  ).then(function (results) {
    // Replace each placeholder with its section markup (no wrapper left behind).
    results.forEach(function (res) { res.slot.outerHTML = res.html; });

    // Boot the app only after all sections exist in the DOM.
    loadScript("assets/js/main.js?" + VER)
      .then(function () { return loadScript("assets/js/feeds.js?" + VER); })
      .catch(function (err) { console.error("[include] boot failed:", err); });
  });
})();
