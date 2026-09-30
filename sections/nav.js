window.FB_SECTIONS = window.FB_SECTIONS || {};
window.FB_SECTIONS["nav"] = `<!-- ===================== NAV ===================== -->
<header class="nav" id="nav">
  <div class="container nav__inner">
    <a class="brand" href="#top" aria-label="FLASHBANG MEDIA home">
      <img src="assets/img/logo.png" alt="" class="brand__mark" width="30" height="30" />
      <span class="brand__name">FLASHBANG<span class="brand__dot">.</span></span>
    </a>
    <nav class="nav__links" aria-label="Primary">
      <a href="#about">About</a>
      <a href="#products">Products</a>
      <a href="#work">Work</a>
      <a href="#events">Events</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="nav__right">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      </button>
      <a href="#contact" class="btn btn--accent nav__cta">Let's talk</a>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu" hidden>
    <a href="#about">About</a>
    <a href="#products">Products</a>
    <a href="#work">Work</a>
    <a href="#events">Events</a>
    <a href="#contact">Contact</a>
    <a href="#contact" class="btn btn--accent">Let's talk</a>
  </div>
</header>
`;
