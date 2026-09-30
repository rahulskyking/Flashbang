/* ===================================================================
   FLASHBANG MEDIA — include.js
   Injects each section's markup (registered by the /sections/*.js files
   into window.FB_SECTIONS) into its placeholder in index.html.

   This runs synchronously from a normal <script> tag, so it works both
   when the site is served over HTTP *and* when index.html is opened
   directly from disk (file://) — no fetch(), no build step required.
   main.js + feeds.js load right after this, once the sections exist.
   =================================================================== */
(function () {
  "use strict";
  var reg = window.FB_SECTIONS || {};
  var slots = document.querySelectorAll("[data-include]");
  Array.prototype.forEach.call(slots, function (slot) {
    var name = slot.getAttribute("data-include");
    var html = reg[name];
    if (html == null) { console.error("[include] missing section:", name); return; }
    slot.outerHTML = html; // replace placeholder with the section markup
  });
})();
