/* ===================================================================
   FLASHBANG MEDIA — feeds.js
   Live, auto-refreshing content for videos + articles.
   -------------------------------------------------------------------
   HOW IT WORKS
   - The page first renders the curated fallback lists from content.js
     (instant, always works, good for SEO).
   - Then this module tries to fetch FRESH data in the browser:
       * GameTout videos  -> YouTube's public RSS feed (no API key)
       * TheGameVoice     -> the site's homepage, parsed for latest articles
   - Static sites can't call those hosts directly (CORS), so we route
     through public CORS proxies with automatic fallback. If every proxy
     fails, the curated lists simply stay in place — nothing breaks.
   - Successful results are cached in localStorage for 30 min so repeat
     visits are instant and resilient to a proxy being down.
   =================================================================== */
(function () {
  "use strict";
  var D = window.FLASHBANG || {};
  var FEEDS = D.feeds || {};
  if (FEEDS.enabled === false) return;

  var CACHE_MIN = 30;
  var YT_CHANNEL_ID = FEEDS.youtubeChannelId || "UC9DcR6DZ53xCLYovwrPoHaw";
  var TGV_URL = FEEDS.gameVoiceUrl || "https://thegamevoice.com";

  // Public CORS proxies, tried in order until one returns content.
  var PROXIES = [
    function (u) { return "https://api.allorigins.win/raw?url=" + encodeURIComponent(u); },
    function (u) { return "https://corsproxy.io/?url=" + encodeURIComponent(u); },
    function (u) { return "https://thingproxy.freeboard.io/fetch/" + u; },
  ];

  function fetchVia(url) {
    // Try each proxy in sequence; resolve with text of first success.
    var i = 0;
    function attempt() {
      if (i >= PROXIES.length) return Promise.reject(new Error("all proxies failed"));
      var proxied = PROXIES[i++](url);
      return fetch(proxied, { headers: { Accept: "text/html,application/xml" } })
        .then(function (r) { if (!r.ok) throw new Error("bad status " + r.status); return r.text(); })
        .then(function (t) { if (!t || t.length < 50) throw new Error("empty"); return t; })
        .catch(function () { return attempt(); });
    }
    return attempt();
  }

  function cacheGet(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (Date.now() - o.t > CACHE_MIN * 60000) return null;
      return o.d;
    } catch (e) { return null; }
  }
  function cacheSet(key, d) {
    try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
  }

  /* ---------- YouTube (RSS) ---------- */
  function parseYouTube(xmlText) {
    var doc = new DOMParser().parseFromString(xmlText, "text/xml");
    var entries = doc.getElementsByTagName("entry");
    var out = [];
    for (var i = 0; i < entries.length && out.length < 6; i++) {
      var e = entries[i];
      var id = text(e, "yt:videoId") || text(e, "videoId");
      var title = text(e, "title");
      if (!id || !title) continue;
      // Skip obvious event docs so the "channel" row stays fresh reviews/news
      out.push({ id: id, title: title, category: guessCategory(title) });
    }
    return out;
  }

  function guessCategory(t) {
    t = (t || "").toLowerCase();
    if (/interview|ft\.|ceo|founder|gossip|podcast/.test(t)) return "Interview";
    if (/review|impression/.test(t)) return "Review";
    if (/trailer/.test(t)) return "Trailer";
    if (/analysis|explained/.test(t)) return "Analysis";
    if (/igdc|conference|event|dev day|awards|documentary/.test(t)) return "Event";
    return "News";
  }

  function text(parent, tag) {
    var n = parent.getElementsByTagName(tag)[0];
    return n ? (n.textContent || "").trim() : "";
  }

  /* ---------- TheGameVoice (HTML parse) ---------- */
  function parseGameVoice(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var links = doc.querySelectorAll('a[href*="/article/"], a[href*="/news/"]');
    var seen = {}, out = [];
    for (var i = 0; i < links.length && out.length < 6; i++) {
      var a = links[i];
      var href = a.getAttribute("href");
      if (!href) continue;
      if (href.indexOf("http") !== 0) href = TGV_URL.replace(/\/$/, "") + href;
      if (seen[href]) continue;
      var img = a.querySelector("img");
      var title = (img && (img.alt || "").trim()) || (a.textContent || "").trim();
      if (!title || title.length < 12) continue;
      var src = img ? (img.getAttribute("src") || img.getAttribute("data-src") || "") : "";
      seen[href] = 1;
      out.push({ title: title, url: href, image: src, category: "Article", date: "" });
    }
    return out;
  }

  /* ---------- Apply results to the DOM (reuse existing renderers) ---------- */
  function markLive(sectionSel) {
    var head = document.querySelector(sectionSel + " .eyebrow");
    if (head && !head.querySelector(".live-dot")) {
      var dot = document.createElement("span");
      dot.className = "live-dot";
      dot.title = "Updated live";
      head.appendChild(dot);
    }
  }

  function refreshVideos() {
    var cached = cacheGet("fb-yt");
    var apply = function (list) {
      if (!list || !list.length || !window.FBRender) return;
      window.FBRender.videos(list);
      markLive("#work");
    };
    if (cached) apply(cached);
    var rss = "https://www.youtube.com/feeds/videos.xml?channel_id=" + YT_CHANNEL_ID;
    fetchVia(rss).then(parseYouTube).then(function (list) {
      if (list && list.length) { cacheSet("fb-yt", list); apply(list); }
    }).catch(function () {});
  }

  function refreshArticles() {
    var cached = cacheGet("fb-tgv");
    var apply = function (list) {
      if (!list || !list.length || !window.FBRender) return;
      window.FBRender.articles(list);
      markLive(".work--articles");
    };
    if (cached) apply(cached);
    fetchVia(TGV_URL).then(parseGameVoice).then(function (list) {
      if (list && list.length) { cacheSet("fb-tgv", list); apply(list); }
    }).catch(function () {});
  }

  // Kick off after initial render.
  if (window.requestIdleCallback) {
    requestIdleCallback(function () { refreshVideos(); refreshArticles(); });
  } else {
    setTimeout(function () { refreshVideos(); refreshArticles(); }, 300);
  }
})();
