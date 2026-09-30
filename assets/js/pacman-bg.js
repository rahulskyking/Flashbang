/* ===================================================================
   FLASHBANG MEDIA — pacman-bg.js
   A subtle, always-playing Pac-Man background rendered on a canvas.
   Sits behind all content at very low opacity (set in CSS). Loops
   forever: Pac-Men chomp across horizontal lanes eating dots, with a
   ghost trailing here and there. Honors prefers-reduced-motion.
   =================================================================== */
(function () {
  "use strict";
  var canvas = document.getElementById("pacBg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ACCENT = "#ffc400";
  var GHOST_COLORS = ["#6be5ff", "#ff8ce0", "#9b8cff"];
  var DOT_GAP = 40;      // spacing between dots
  var LANE_GAP = 120;    // vertical spacing between lanes
  var PAC_R = 11;        // pac-man radius
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var W = 0, H = 0, lanes = [];

  function makeLanes() {
    lanes = [];
    var count = Math.max(3, Math.ceil(H / LANE_GAP));
    for (var i = 0; i < count; i++) {
      var y = (i + 0.5) * (H / count);
      var dir = i % 2 === 0 ? 1 : -1;               // alternate direction per lane
      var speed = (16 + (i % 3) * 8) * dir;          // px/sec, varied
      lanes.push({
        y: y,
        x: dir === 1 ? -Math.random() * W : W + Math.random() * W,
        speed: speed,
        dir: dir,
        ghost: (i % 2 === 1),                         // some lanes get a chasing ghost
        ghostColor: GHOST_COLORS[i % GHOST_COLORS.length],
        offset: (i * 13) % DOT_GAP,                  // stagger dot grid per lane
      });
    }
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeLanes();
  }

  function drawPac(x, y, r, dir, mouth) {
    // mouth: 0 (closed) .. ~0.33 (open), in fractions of PI
    ctx.save();
    ctx.translate(x, y);
    if (dir < 0) ctx.scale(-1, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, mouth * Math.PI, (2 - mouth) * Math.PI);
    ctx.closePath();
    ctx.fillStyle = ACCENT;
    ctx.fill();
    ctx.restore();
  }

  function drawGhost(x, y, r, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, -r * 0.15, r, Math.PI, 0);           // rounded head
    ctx.lineTo(r, r * 0.7);
    // wavy skirt
    var feet = 3, step = (2 * r) / feet;
    for (var i = 0; i < feet; i++) {
      var sx = r - i * step;
      ctx.lineTo(sx - step / 2, r * 0.35);
      ctx.lineTo(sx - step, r * 0.7);
    }
    ctx.lineTo(-r, -r * 0.15);
    ctx.closePath();
    ctx.fill();
    // eyes
    ctx.fillStyle = "#0b0b0f";
    ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.15, r * 0.22, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.arc(r * 0.35, -r * 0.15, r * 0.22, 0, 2 * Math.PI); ctx.fill();
    ctx.restore();
  }

  function drawDots(lane) {
    ctx.fillStyle = ACCENT;
    for (var dx = lane.offset; dx < W; dx += DOT_GAP) {
      // dot is "eaten" if Pac-Man has passed it in its travel direction
      var eaten = lane.dir === 1 ? (dx < lane.x - PAC_R) : (dx > lane.x + PAC_R);
      if (eaten) continue;
      ctx.beginPath();
      ctx.arc(dx, lane.y, 2.4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  var last = 0;
  function frame(t) {
    var dt = last ? (t - last) / 1000 : 0;
    last = t;
    ctx.clearRect(0, 0, W, H);
    var mouth = 0.18 + 0.15 * Math.abs(Math.sin(t / 120)); // chomp
    for (var i = 0; i < lanes.length; i++) {
      var L = lanes[i];
      L.x += L.speed * dt;
      // wrap + refill dots
      if (L.dir === 1 && L.x - PAC_R > W + 30) L.x = -30;
      if (L.dir === -1 && L.x + PAC_R < -30) L.x = W + 30;
      drawDots(L);
      if (L.ghost) {
        var gx = L.x - L.dir * 34;                    // trails behind
        drawGhost(gx, L.y, PAC_R * 0.9, L.ghostColor);
      }
      drawPac(L.x, L.y, PAC_R, L.dir, mouth);
    }
    raf = requestAnimationFrame(frame);
  }

  var raf = null;
  function start() {
    if (raf) cancelAnimationFrame(raf);
    if (reduce) {
      // Draw a single calm static frame.
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < lanes.length; i++) { drawDots(lanes[i]); drawPac(lanes[i].x, lanes[i].y, PAC_R, lanes[i].dir, 0.2); }
      return;
    }
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); start(); }, 150);
  }, { passive: true });

  // Pause when tab is hidden (saves battery / CPU).
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    else if (!reduce) { last = 0; raf = requestAnimationFrame(frame); }
  });

  resize();
  start();
})();
