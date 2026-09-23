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
            '<img loading="lazy" src="' + c.image + '" alt="' + esc(c.name) + '">' +
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

  /* ---------- VIDEOS ---------- */
  if (D.videos) {
    $("#videoGrid").innerHTML = D.videos.map(function (v) {
      var url = v.url || (v.id ? "https://www.youtube.com/watch?v=" + v.id : "https://www.youtube.com/@GameTout");
      var thumb = v.thumb || (v.id ? "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg" : "assets/img/gametout.jpg");
      return (
        '<a class="video-card reveal" href="' + esc(url) + '" target="_blank" rel="noopener">' +
          '<div class="video-card__thumb"><img loading="lazy" src="' + esc(thumb) + '" alt="' + esc(v.title) + '"><div class="video-card__play"><span>▶</span></div></div>' +
          '<div class="video-card__body"><span class="video-card__cat">' + esc(v.category) + '</span><h3 class="video-card__title">' + esc(v.title) + "</h3></div>" +
        "</a>"
      );
    }).join("");
  }

  /* ---------- ARTICLES ---------- */
  if (D.articles) {
    $("#articleGrid").innerHTML = D.articles.map(function (a) {
      return (
        '<a class="article-card reveal" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
          '<div class="article-card__thumb"><img loading="lazy" src="' + esc(a.image) + '" alt="' + esc(a.title) + '"></div>' +
          '<div class="article-card__body">' +
            '<div class="article-card__meta"><span class="article-card__cat">' + esc(a.category) + '</span><span class="article-card__date">' + esc(a.date) + "</span></div>" +
            '<h3 class="article-card__title">' + esc(a.title) + "</h3>" +
            '<span class="article-card__more">Read on TheGameVoice →</span>' +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ---------- STATS ---------- */
  if (D.stats) {
    $("#statsGrid").innerHTML = D.stats.filter(function (s) { return s.value; }).map(function (s) {
      return '<div class="stat reveal"><div class="stat__value">' + esc(s.value) + '</div><div class="stat__label">' + esc(s.label) + "</div></div>";
    }).join("");
  }

  /* ---------- CONTACT ---------- */
  if (D.company && D.company.email) {
    $("#contactEmail").textContent = D.company.email;
    $("#contactEmailLink").href = "mailto:" + D.company.email;
  }
  if (D.contactReasons) {
    $("#cReason").innerHTML = '<option value="" disabled selected>Select a reason</option>' +
      D.contactReasons.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("");
  }
  var form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $("#formNote");
      if (!form.checkValidity()) { form.reportValidity(); note.textContent = "Please complete the required fields."; return; }
      var fd = new FormData(form);
      var subject = "FLASHBANG Enquiry — " + (fd.get("reason") || "General");
      var body = "Name: " + fd.get("name") + "\nEmail: " + fd.get("email") + "\nReason: " + fd.get("reason") + "\n\n" + fd.get("message");
      var to = (D.company && D.company.email) || "";
      if (to) window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      note.textContent = "Thanks — your email client should open to send this enquiry.";
      form.reset(); if (D.contactReasons) $("#cReason").selectedIndex = 0;
    });
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
  ["about", "products", "work", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) secObserver.observe(s); });

  /* ---------- REVEAL ---------- */
  var revObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
  }, { threshold: 0.1 });
  requestAnimationFrame(function () { document.querySelectorAll(".reveal").forEach(function (r) { revObserver.observe(r); }); });
})();
