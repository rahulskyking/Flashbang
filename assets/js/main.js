/* ===================================================================
   FLASHBANG MEDIA — main.js
   Renders the page from window.FLASHBANG (data/content.js)
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
    $("#heroTitle").textContent = h.title || "";
    $("#heroSubtitle").textContent = h.subtitle || "";
    var p = $("#heroPrimary"), s = $("#heroSecondary");
    p.textContent = h.primaryCta.label; p.href = h.primaryCta.href;
    s.textContent = h.secondaryCta.label; s.href = h.secondaryCta.href;
    if (h.image) $("#heroBg").style.backgroundImage = "url('" + h.image + "')";
  }
  if (D.pillars) {
    $("#heroBrands").innerHTML = D.pillars.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
  }

  /* ---------- PRODUCTS ---------- */
  if (D.products) {
    $("#ecoGrid").innerHTML = D.products.map(function (c) {
      var soon = c.status === "soon";
      var external = /^https?:/.test(c.cta.href);
      var metric = c.metric && c.metric.value
        ? '<div class="eco-card__metric"><b>' + esc(c.metric.value) + "</b><span>" + esc(c.metric.label) + "</span></div>"
        : "";
      var tags = (c.tags || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      var ctaCls = soon ? "eco-card__cta disabled" : "eco-card__cta";
      var target = external ? ' target="_blank" rel="noopener"' : "";
      var arrow = soon ? "" : " →";
      return (
        '<article class="eco-card reveal">' +
          '<div class="eco-card__media">' +
            '<img loading="lazy" src="' + c.image + '" alt="' + esc(c.name) + '">' +
            (soon ? '<span class="badge-soon">Coming Soon</span>' : "") +
          "</div>" +
          '<div class="eco-card__body">' +
            '<span class="eco-card__cat' + (soon ? " soon" : "") + '">' + esc(c.category) + "</span>" +
            '<h3 class="eco-card__name">' + esc(c.name) + "</h3>" +
            '<p class="eco-card__desc">' + esc(c.description) + "</p>" +
            metric +
            '<div class="eco-card__tags">' + tags + "</div>" +
            '<a class="' + ctaCls + '" href="' + esc(c.cta.href) + '"' + target + ">" + esc(c.cta.label) + arrow + "</a>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- VIDEOS (real YouTube thumbnails + links) ---------- */
  if (D.videos) {
    $("#videoGrid").innerHTML = D.videos.map(function (v) {
      var url = v.url || (v.id ? "https://www.youtube.com/watch?v=" + v.id : "https://www.youtube.com/@GameTout");
      var thumb = v.thumb || (v.id ? "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg" : "assets/img/gametout.jpg");
      return (
        '<a class="video-card reveal" href="' + esc(url) + '" target="_blank" rel="noopener">' +
          '<div class="video-card__thumb">' +
            '<img loading="lazy" src="' + esc(thumb) + '" alt="' + esc(v.title) + '">' +
            '<div class="video-card__play"><span>▶</span></div>' +
          "</div>" +
          '<div class="video-card__body">' +
            '<span class="video-card__cat">' + esc(v.category) + "</span>" +
            '<h3 class="video-card__title">' + esc(v.title) + "</h3>" +
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

  /* ---------- ABOUT / MISSION / VISION ---------- */
  if (D.about) {
    $("#aboutTitle").textContent = D.about.title || "";
    $("#aboutBody").textContent = D.about.body || "";
    $("#mission").textContent = D.about.mission || "";
    $("#vision").textContent = D.about.vision || "";
  }
  if (D.company) {
    $("#contactEmail").textContent = D.company.email || "";
  }

  /* ---------- CONTACT FORM ---------- */
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
      form.reset();
      if (D.contactReasons) $("#cReason").selectedIndex = 0;
    });
  }

  /* ---------- FOOTER SOCIAL + YEAR ---------- */
  if (D.social) {
    $("#footerSocial").innerHTML = D.social.filter(function (s) { return s.url; }).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
    }).join("");
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---------- THEME TOGGLE ---------- */
  var themeBtn = $("#themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("fb-theme", next); } catch (e) {}
    });
  }

  /* ---------- NAV: scroll state + mobile menu + active links ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = $("#navToggle"), menu = $("#mobileMenu");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
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
  ["about", "products", "videos", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) secObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  requestAnimationFrame(function () {
    document.querySelectorAll(".reveal").forEach(function (r) { revObserver.observe(r); });
  });
})();
