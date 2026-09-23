/* ===================================================================
   FLASHBANG MEDIA — main.js
   Renders the page from window.FLASHBANG (data/content.js)
   =================================================================== */
(function () {
  "use strict";
  var D = window.FLASHBANG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
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

  /* ---------- PILLARS ---------- */
  if (D.pillars) {
    $("#pillars").innerHTML = D.pillars.map(function (x) {
      return '<div class="pillar">' + esc(x) + "</div>";
    }).join("");
  }

  /* ---------- ECOSYSTEM ---------- */
  if (D.ecosystem) {
    $("#ecoGrid").innerHTML = D.ecosystem.map(function (c) {
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
          '<div class="eco-card__img" style="background-image:url(\'' + c.image + "')\"></div>" +
          (soon ? '<span class="badge-soon">Coming Soon</span>' : "") +
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

  /* ---------- INDUSTRY STRIP ---------- */
  if (D.industry) {
    $("#industryTitle").textContent = D.industry.title || "";
    $("#industryBody").textContent = D.industry.body || "";
    $("#industryStrip").innerHTML = (D.industry.images || []).map(function (src, i) {
      return '<figure><img loading="lazy" src="' + src + '" alt="Gaming industry coverage ' + (i + 1) + '"></figure>';
    }).join("");
  }

  /* ---------- EVENTS ---------- */
  if (D.events && D.events.length) {
    $("#eventsList").innerHTML = D.events.map(function (e) {
      var ext = /^https?:/.test(e.cta.href);
      return (
        '<article class="event-card reveal">' +
          '<div class="event-card__media"><img loading="lazy" src="' + e.image + '" alt="' + esc(e.name) + ' event"></div>' +
          '<div class="event-card__body">' +
            '<div class="event-card__meta">' +
              '<span>' + esc(e.year) + "</span>" +
              '<span>' + esc(e.location) + "</span>" +
              '<span class="role">' + esc(e.role) + "</span>" +
            "</div>" +
            '<h3 class="event-card__name">' + esc(e.name) + "</h3>" +
            '<p class="event-card__full">' + esc(e.full) + "</p>" +
            '<p class="event-card__desc">' + esc(e.description) + "</p>" +
            '<a class="btn btn--ghost" href="' + esc(e.cta.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(e.cta.label) + "</a>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    // Timeline (sorted newest first)
    var tl = D.events.slice().sort(function (a, b) { return (b.year || "").localeCompare(a.year || ""); });
    $("#timeline").innerHTML = tl.map(function (e) {
      return (
        '<div class="timeline__item reveal">' +
          '<div class="timeline__year">' + esc(e.year) + "</div>" +
          '<div class="timeline__name">' + esc(e.name) + " — " + esc(e.full) + "</div>" +
          '<div class="timeline__role">' + esc(e.role) + "</div>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- VIDEOS ---------- */
  if (D.videos) {
    $("#videoGrid").innerHTML = D.videos.map(function (v) {
      return (
        '<a class="video-card reveal" href="' + esc(v.url) + '" target="_blank" rel="noopener">' +
          '<div class="video-card__thumb">' +
            '<img loading="lazy" src="' + v.thumb + '" alt="' + esc(v.title) + '">' +
            '<div class="video-card__play"><span>▶</span></div>' +
          "</div>" +
          '<div class="video-card__body">' +
            '<span class="video-card__cat">' + esc(v.category) + "</span>" +
            '<h3 class="video-card__title">' + esc(v.title) + "</h3>" +
            '<span class="video-card__date">' + esc(v.date) + "</span>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ---------- GALLERY + TABS ---------- */
  if (D.gallery) {
    var tags = ["All"].concat(D.gallery.map(function (g) { return g.tag; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    $("#galleryTabs").innerHTML = tags.map(function (t, i) {
      return '<button class="tab' + (i === 0 ? " active" : "") + '" role="tab" data-filter="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");
    $("#galleryGrid").innerHTML = D.gallery.map(function (g) {
      return (
        '<figure class="reveal" data-tag="' + esc(g.tag) + '">' +
          '<img loading="lazy" src="' + g.src + '" alt="' + esc(g.alt) + '">' +
          "<figcaption>" + esc(g.tag) + "</figcaption>" +
        "</figure>"
      );
    }).join("");
    $("#galleryTabs").addEventListener("click", function (ev) {
      var b = ev.target.closest(".tab"); if (!b) return;
      $("#galleryTabs").querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
      b.classList.add("active");
      var f = b.getAttribute("data-filter");
      $("#galleryGrid").querySelectorAll("figure").forEach(function (fig) {
        fig.classList.toggle("hide", f !== "All" && fig.getAttribute("data-tag") !== f);
      });
    });
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
    $("#aboutBody").innerHTML = (D.about.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#mission").textContent = D.about.mission || "";
    $("#vision").textContent = D.about.vision || "";
  }
  if (D.company) {
    $("#aboutLegal").innerHTML =
      "<span><b>" + esc(D.company.name) + "</b></span>" +
      "<span>CIN: " + esc(D.company.cin) + "</span>" +
      (D.company.location ? "<span>Based in " + esc(D.company.location) + "</span>" : "");
    $("#contactEmail").textContent = D.company.email || "";
  }

  /* ---------- CONTACT FORM ---------- */
  if (D.contactReasons) {
    var sel = $("#cReason");
    sel.innerHTML = '<option value="" disabled selected>Select a reason</option>' +
      D.contactReasons.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("");
  }
  var form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $("#formNote");
      if (!form.checkValidity()) {
        form.reportValidity();
        note.style.color = "var(--accent)";
        note.textContent = "Please complete the required fields.";
        return;
      }
      // Static site: compose a mailto so the enquiry reaches FLASHBANG.
      var fd = new FormData(form);
      var subject = "FLASHBANG Enquiry — " + (fd.get("reason") || "General");
      var body =
        "Name: " + fd.get("name") + "\n" +
        "Email: " + fd.get("email") + "\n" +
        "Company: " + (fd.get("company") || "-") + "\n" +
        "Reason: " + fd.get("reason") + "\n\n" +
        fd.get("message");
      var to = (D.company && D.company.email) || "";
      if (to) {
        window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      }
      note.style.color = "var(--accent)";
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

  /* ---------- NAV: scroll state + mobile menu + active links ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 30); };
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

  // Active nav link via IntersectionObserver
  var sections = ["hero", "about", "ecosystem", "events", "media", "contact"];
  var navLinks = {};
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    var id = a.getAttribute("href").slice(1); navLinks[id] = a;
  });
  var secObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        Object.values(navLinks).forEach(function (a) { a.classList.remove("active"); });
        var id = en.target.id;
        // map subsections to nearest nav item
        var target = navLinks[id];
        if (target) target.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (id) { var s = document.getElementById(id); if (s) secObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  // observe existing + dynamically-inserted reveals
  requestAnimationFrame(function () {
    document.querySelectorAll(".reveal").forEach(function (r) { revObserver.observe(r); });
  });

  /* ---------- Hero parallax (respects reduced motion) ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    var heroBg = $("#heroBg");
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = "scale(1.08) translateY(" + y * 0.15 + "px)";
    }, { passive: true });
  }
})();
