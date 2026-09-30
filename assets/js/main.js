/* ===================================================================
   FLASHBANG MEDIA — main.js  (renders from data/content.js)
   =================================================================== */
(function () {
  "use strict";
  var D = window.FLASHBANG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll-reveal engine (defined early so renderers can use it) ---------- */
  var revObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (r) { revObserver.observe(r); });
  }
  // Stagger direct children of a container so they cascade in.
  function stagger(container, step) {
    if (!container) return;
    var kids = container.children, s = step || 80;
    for (var i = 0; i < kids.length; i++) { kids[i].style.transitionDelay = (i * s) + "ms"; }
  }

  // Split an element's text into word spans that rise up (movie-title style).
  function splitWords(el, gradient) {
    if (!el) return;
    var words = (el.textContent || "").trim().split(/\s+/);
    el.innerHTML = words.map(function (w, i) {
      return '<span class="word"><i' + (gradient ? ' class="grad"' : "") +
        ' style="transition-delay:' + (i * 65) + 'ms">' + esc(w) + "</i></span>";
    }).join(" ");
  }

  // Typewriter: retype a heading's text on scroll, preserving <br> and .grad.
  function typewriter(h) {
    if (h.dataset.typed) return;
    h.dataset.typed = "1";
    // Build a token list from child nodes so styling/line-breaks survive.
    var tokens = [];
    Array.prototype.forEach.call(h.childNodes, function (n) {
      if (n.nodeType === 3) tokens.push({ t: "text", s: n.nodeValue, cls: "" });
      else if (n.nodeName === "BR") tokens.push({ t: "br" });
      else tokens.push({ t: "text", s: n.textContent, cls: n.className || "" });
    });
    // Lock height to avoid layout jump while typing.
    h.style.minHeight = h.offsetHeight + "px";
    h.innerHTML = "";
    var caret = document.createElement("span");
    caret.className = "tw-caret";
    h.appendChild(caret);
    var ti = 0;
    function nextToken() {
      if (ti >= tokens.length) { setTimeout(function () { caret.remove(); h.style.minHeight = ""; }, 650); return; }
      var tok = tokens[ti++];
      if (tok.t === "br") { h.insertBefore(document.createElement("br"), caret); return nextToken(); }
      var span = document.createElement("span");
      if (tok.cls) span.className = tok.cls;
      h.insertBefore(span, caret);
      var chars = tok.s.split(""), ci = 0;
      (function typeChar() {
        if (ci >= chars.length) return nextToken();
        span.textContent += chars[ci++];
        setTimeout(typeChar, 26);
      })();
    }
    nextToken();
  }

  /* ---------- HERO ---------- */
  if (D.hero) {
    var h = D.hero;
    $("#heroKicker").textContent = h.kicker || "";
    $("#heroLead").textContent = h.titleLead || "";
    $("#heroAccent").textContent = h.titleAccent || "";
    $("#heroSubtitle").textContent = h.subtitle || "";
    var p = $("#heroPrimary"), s = $("#heroSecondary");
    p.textContent = h.primaryCta.label; p.href = h.primaryCta.href;
    s.textContent = h.secondaryCta.label; s.href = h.secondaryCta.href;

    // Cinematic movie-title rise: split hero title into words that lift up.
    if (!prefersReduce) {
      splitWords($("#heroLead"), false);
      splitWords($("#heroAccent"), true);
      var heroTitleEl = document.querySelector(".hero__title");
      setTimeout(function () { if (heroTitleEl) heroTitleEl.classList.add("animate"); }, 120);
    }
  }

  /* ---------- MARQUEE ---------- */
  if (D.marquee && D.marquee.length) {
    var one = D.marquee.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    $("#marquee").innerHTML = '<div class="marquee__track">' + one + one + "</div>";
  }

  /* ---------- ABOUT ---------- */
  if (D.about) {
    $("#aboutTitle").textContent = D.about.title || "";
    $("#aboutBody").textContent = D.about.body || "";
    $("#mission").textContent = D.about.mission || "";
    $("#vision").textContent = D.about.vision || "";
    $("#aboutPoints").innerHTML = (D.about.points || []).map(function (pt) {
      return '<div class="point reveal"><div class="point__k"><span>' + esc(pt.k) + "</span></div><div class=\"point__v\">" + esc(pt.v) + "</div></div>";
    }).join("");
  }

  /* ---------- PRODUCTS ---------- */
  if (D.products) {
    $("#prodList").innerHTML = D.products.map(function (c) {
      var ext = /^https?:/.test(c.cta.href);
      var metric = c.metric && c.metric.value
        ? '<div class="prod__metric"><b>' + esc(c.metric.value) + "</b><span>" + esc(c.metric.label) + "</span></div>" : "";
      var tags = (c.tags || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      return (
        '<article class="prod reveal" style="--c:' + esc(c.accent || "#ffc400") + '">' +
          '<div class="prod__media">' +
            '<span class="prod__badge">' + esc(c.tagline) + "</span>" +
            '<img loading="lazy" src="' + c.image + '" alt="' + esc(c.name) + '"' +
              (c.imageFallback ? ' onerror="this.onerror=null;this.src=\'' + c.imageFallback + '\'"' : "") + ">" +
          "</div>" +
          '<div class="prod__body">' +
            '<h3 class="prod__name">' + esc(c.name) + "</h3>" +
            '<div class="prod__tagline">' + esc(c.tagline) + "</div>" +
            '<p class="prod__desc">' + esc(c.description) + "</p>" +
            metric +
            '<div class="prod__tags">' + tags + "</div>" +
            '<div class="prod__actions">' +
              '<a class="btn btn--accent" href="' + esc(c.cta.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(c.cta.label) + "</a>" +
              (c.contactCta ? '<a class="btn btn--ghost" href="' + esc(c.contactCta.href) + '">' + esc(c.contactCta.label) + "</a>" : "") +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- VIDEOS (re-usable so live feeds can refresh it) ---------- */
  function renderVideos(list, instant) {
    if (!list || !list.length) return;
    var cls = instant ? "video-card reveal in" : "video-card reveal";
    var grid = $("#videoGrid");
    grid.innerHTML = list.slice(0, 6).map(function (v) {
      var url = v.url || (v.id ? "https://www.youtube.com/watch?v=" + v.id : "https://www.youtube.com/@GameTout");
      var thumb = v.thumb || (v.id ? "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg" : "assets/img/gametout.jpg");
      return (
        '<a class="' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener">' +
          '<div class="video-card__thumb"><img loading="lazy" src="' + esc(thumb) + '" alt="' + esc(v.title) + '"><div class="video-card__play"><span>▶</span></div></div>' +
          '<div class="video-card__body"><span class="video-card__cat">' + esc(v.category) + '</span><h3 class="video-card__title">' + esc(v.title) + "</h3></div>" +
        "</a>"
      );
    }).join("");
    stagger(grid); if (!instant) observeReveals();
  }
  if (D.videos) renderVideos(D.videos);

  /* ---------- ARTICLES (re-usable) ---------- */
  function renderArticles(list, instant) {
    if (!list || !list.length) return;
    var cls = instant ? "article-card reveal in" : "article-card reveal";
    var grid = $("#articleGrid");
    grid.innerHTML = list.slice(0, 6).map(function (a) {
      var img = a.image
        ? '<div class="article-card__thumb"><img loading="lazy" src="' + esc(a.image) + '" alt="' + esc(a.title) + '"></div>'
        : '<div class="article-card__thumb article-card__thumb--empty"></div>';
      var meta = '<span class="article-card__cat">' + esc(a.category || "Article") + "</span>" +
        (a.date ? '<span class="article-card__date">' + esc(a.date) + "</span>" : "");
      return (
        '<a class="' + cls + '" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
          img +
          '<div class="article-card__body">' +
            '<div class="article-card__meta">' + meta + "</div>" +
            '<h3 class="article-card__title">' + esc(a.title) + "</h3>" +
            '<span class="article-card__more">Read on TheGameVoice →</span>' +
          "</div>" +
        "</a>"
      );
    }).join("");
    stagger(grid); if (!instant) observeReveals();
  }
  if (D.articles) renderArticles(D.articles);

  // Expose renderers so feeds.js can swap in fresh, live data (instant = no re-animate).
  window.FBRender = {
    videos: function (l) { renderVideos(l, true); },
    articles: function (l) { renderArticles(l, true); },
  };

  /* ---------- EVENTS ---------- */
  if (D.events && D.events.length) {
    $("#eventsList").innerHTML = D.events.map(function (ev) {
      var clips = (ev.videos || []).map(function (v) {
        var url = "https://www.youtube.com/watch?v=" + v.id;
        var thumb = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
        return (
          '<a class="ev-clip" href="' + esc(url) + '" target="_blank" rel="noopener">' +
            '<div class="ev-clip__thumb"><img loading="lazy" src="' + esc(thumb) + '" alt="' + esc(v.title) + '"><span class="ev-clip__play">▶</span></div>' +
            '<span class="ev-clip__title">' + esc(v.title) + "</span>" +
          "</a>"
        );
      }).join("");
      return (
        '<article class="event reveal">' +
          '<div class="event__head">' +
            '<div class="event__id"><span class="event__year">' + esc(ev.year) + '</span><h3 class="event__name">' + esc(ev.name) + "</h3></div>" +
            '<div class="event__meta">' +
              '<span class="event__full">' + esc(ev.full) + "</span>" +
              '<span class="event__loc">' + esc(ev.location) + "</span>" +
              '<span class="event__role">' + esc(ev.role) + "</span>" +
            "</div>" +
          "</div>" +
          '<p class="event__desc">' + esc(ev.description) + "</p>" +
          '<div class="ev-clips">' + clips + "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- STATS ---------- */
  if (D.stats) {
    $("#statsGrid").innerHTML = D.stats.filter(function (s) { return s.value; }).map(function (s) {
      return '<div class="stat reveal"><div class="stat__value">' + esc(s.value) + '</div><div class="stat__label">' + esc(s.label) + "</div></div>";
    }).join("");
  }

  /* ---------- CONTACT (email only) ---------- */
  if (D.company && D.company.email) {
    var ce = $("#contactEmail"); if (ce) ce.textContent = D.company.email;
    var cel = $("#contactEmailLink"); if (cel) cel.href = "mailto:" + D.company.email;
  }

  /* ---------- FOOTER ---------- */
  if (D.social) {
    $("#footerSocial").innerHTML = D.social.filter(function (s) { return s.url; }).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
    }).join("");
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---------- THEME TOGGLE ---------- */
  var themeBtn = $("#themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("fb-theme", next); } catch (e) {}
  });

  /* ---------- NAV ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var toggle = $("#navToggle"), menu = $("#mobileMenu");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open)); menu.hidden = open;
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); }
  });

  var navLinks = {};
  document.querySelectorAll(".nav__links a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
  var secObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("active"); });
        var t = navLinks[en.target.id]; if (t) t.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["about", "products", "work", "events", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) secObserver.observe(s); });

  /* ---------- REVEAL: stagger grids + observe everything ---------- */
  ["#ecoGrid", "#prodList", "#aboutPoints", "#videoGrid", "#articleGrid", "#eventsList", "#statsGrid"].forEach(function (sel) {
    stagger($(sel));
  });
  requestAnimationFrame(observeReveals);

  /* ---------- CINEMATIC: typewriter on section headings ---------- */
  if (!prefersReduce) {
    var twObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { typewriter(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll("main h2.h-lg").forEach(function (h) { twObserver.observe(h); });
  }
})();
