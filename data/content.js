/*
 * FLASHBANG MEDIA — Content configuration
 * ---------------------------------------
 * Edit this one file to update everything. The page renders from here.
 * Leave a value "" or a list [] to hide the related UI.
 */
window.FLASHBANG = {
  company: {
    name: "FLASHBANG MEDIA PRIVATE LIMITED",
    shortName: "FLASHBANG",
    cin: "U59111WB2026PTC286335",
    location: "West Bengal, India",
    email: "contact@flashbangmedia.com",
  },

  // Live auto-refreshing feeds (fetched in the browser via CORS proxy).
  // Set enabled:false to always use the curated lists below.
  feeds: {
    enabled: true,
    youtubeChannelId: "UC9DcR6DZ53xCLYovwrPoHaw", // GameTout
    gameVoiceUrl: "https://thegamevoice.com",
  },

  // Only list links that actually exist. Empty url => hidden.
  social: [
    { label: "YouTube", url: "https://www.youtube.com/@GameTout" },
    { label: "Website", url: "https://thegamevoice.com" },
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "X", url: "" },
  ],

  hero: {
    kicker: "Gaming Media Company",
    titleLead: "We build media",
    titleAccent: "around gaming.",
    subtitle:
      "FLASHBANG MEDIA is a gaming media company connecting audiences, creators and developers across the industry — through GameTout on YouTube and TheGameVoice online.",
    primaryCta: { label: "Our Products", href: "#products" },
    secondaryCta: { label: "Get in Touch", href: "#contact" },
  },

  // Rotating marquee under the hero.
  marquee: ["Gaming Media", "Interviews", "Reviews", "News", "Editorial", "Events", "Podcast", "Community"],

  about: {
    title: "A media company built for the gaming industry.",
    body:
      "FLASHBANG MEDIA covers the people who play, create and shape games. We run two connected platforms — a gaming media channel on YouTube and an editorial news website — bringing interviews, reviews, news and stories to a growing audience across India and beyond.",
    points: [
      { k: "Media", v: "Video coverage, interviews and a gaming podcast through GameTout." },
      { k: "Editorial", v: "News, reviews and industry stories through TheGameVoice." },
      { k: "Community", v: "A growing audience of players, creators and developers." },
      { k: "Events", v: "On the ground at gaming conferences and industry events." },
    ],
    mission:
      "To build meaningful connections across the gaming ecosystem through media, community, events and opportunities.",
    vision:
      "To become a trusted media company connecting gamers, creators, developers and studios across the gaming industry.",
  },

  // The two products. Order controls display.
  products: [
    {
      id: "gametout",
      name: "GameTout",
      tagline: "Gaming Media on YouTube",
      description:
        "Our gaming media and YouTube channel covering the Indian and global game industry — developer interviews, indie game coverage, reviews and the GameTout Gossip podcast.",
      metric: { value: "7K+", label: "YouTube Subscribers" },
      tags: ["Interviews", "Reviews", "Indie Coverage", "Podcast", "Events"],
      cta: { label: "Watch on YouTube", href: "https://www.youtube.com/@GameTout" },
      contactCta: { label: "Collaborate with GameTout", href: "#contact" },
      accent: "#ff3d3d",
      image: "assets/img/gametout.jpg",
    },
    {
      id: "thegamevoice",
      name: "TheGameVoice",
      tagline: "Gaming News & Editorial",
      description:
        "Our gaming news and editorial platform — reviews, impressions, opinions and industry coverage, updated regularly with fresh stories from across the world of games.",
      metric: { value: "Daily", label: "Fresh Articles" },
      tags: ["News", "Reviews", "Impressions", "Opinions", "Industry"],
      cta: { label: "Visit TheGameVoice", href: "https://thegamevoice.com" },
      contactCta: { label: "Media / Editorial enquiry", href: "#contact" },
      accent: "#3d7bff",
      image: "assets/img/thegamevoice.jpg",
    },
  ],

  // Curated GameTout videos — used instantly, then refreshed live from
  // YouTube's RSS feed by feeds.js (falls back to this list on failure).
  videos: [
    { title: "Curve Games CEO Explains The Truth About Publishing Indie Games", category: "Interview", id: "GKN6XZ4wqEc" },
    { title: "This SRI LANKAN Game is an Eye Opener for Indian Game Studios", category: "Feature", id: "kfq7ckUbtmw" },
    { title: "Counter Strike 2 Game is Bad for You", category: "Opinion", id: "RTcZhgZP6jc" },
    { title: "Black Myth: Zhong Kui — Gameplay Trailer Analysis", category: "Analysis", id: "_5KEpSy2Fvg" },
    { title: "Which Controller to Buy? DualSense or Xbox Series X|S", category: "Guide", id: "f7elbgsyCG4" },
    { title: "Kartboard Dash Trailer — Try this Indian Game on Steam", category: "Trailer", id: "XAgLbjcyoj4" },
  ],

  // Event coverage — real IGDC / gaming event videos from the GameTout channel.
  events: [
    {
      name: "IGDC 2025",
      full: "India Game Developer Conference — Chennai",
      year: "2025",
      location: "Chennai, India",
      role: "Full Documentary + Interviews",
      description:
        "Our full on-ground coverage of India's biggest game developer conference — a feature-length documentary, developer interviews and day-by-day highlights.",
      videos: [
        { title: "IGDC 2025 Chennai — Full Documentary", id: "dLS2RyHTH70" },
        { title: "IGDC 2025 Chennai — GameTout Review", id: "tzNqT6NzwP0" },
        { title: "IGDC 2025 — mini Documentary (Day 0 to Day 3)", id: "6rha-9f7U_E" },
      ],
    },
    {
      name: "IGDC 2024",
      full: "India Game Developer Conference — Hyderabad",
      year: "2024",
      location: "Hyderabad, India",
      role: "Documentary + Awards Coverage",
      description:
        "GameTout at IGDC 2024 — a Hindi documentary from the floor, the VIP mixer, and coverage of the IGDC 'BYOG' Awards night.",
      videos: [
        { title: "IGDC 2024 Hyderabad — Hindi Documentary", id: "qSlODa5Jeew" },
        { title: "India GDC 'BYOG' Awards 2024", id: "0lD8Ge76y04" },
        { title: "Quest to IGDC", id: "MvrQh7GxWQI" },
      ],
    },
    {
      name: "Game Dev Day 2025",
      full: "Game Dev Day — Ahmedabad",
      year: "2025",
      location: "Ahmedabad, India",
      role: "Event Coverage",
      description:
        "Covering the community game dev meet in Ahmedabad — talks, local studios and the growing regional dev scene. Is your city next?",
      videos: [
        { title: "Game 'Dev Day' 2025 Ahmedabad — is your City next?", id: "ssVoSP6Ts8g" },
      ],
    },
  ],

  // Real TheGameVoice articles (live images from their CDN).
  articles: [
    {
      title: "A Cozy, Wholesome Return to Roots: Dragon Shelter Demo Review",
      category: "Impressions",
      date: "23 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/329627f4-4d9a-4bcb-a7fe-a1aad41c7606_header%20(1).jpg",
      url: "https://thegamevoice.com/article/dragon-shelter-a-cozy-wholesome-return-to-roots",
    },
    {
      title: "Charming, Slow-Paced, and Full of Gothic Charm — Moonlight Peaks Demo Review",
      category: "Impressions",
      date: "22 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/44db92e4-3bc2-4cee-8e4d-186d79aa2d98_images.jpeg",
      url: "https://thegamevoice.com/article/moonlight-peaks-charming-slow-paced-and-full-of-gothic-charm",
    },
    {
      title: "Quirky, Grotesque, and Genuinely Addictive — Phobies Review",
      category: "Reviews",
      date: "21 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/506bc2df-0542-45cf-b955-7e1b650fc58c_ss_b5c61597d97078d7ea886fc199c509c5c17e1d96.1920x1080.jpg",
      url: "https://thegamevoice.com/article/phobies-review-quirky-grotesque-and-genuinely-addictive-free-to-play",
    },
    {
      title: "The Chicken's Coop: Industry Unpacked — Xbox, Sega, Konami, TGS & more",
      category: "News",
      date: "20 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/c20d0d29-4c13-4823-911c-0332625b1379_Untitled%20design.png",
      url: "https://thegamevoice.com/article/the-chickens-coop-industry-unpacked-xbox-sega-konami-tgs-kojima-capcom-square-enix",
    },
    {
      title: "With ₹10 Crore and One Viral Game: Can 1312 Interactive Justify India's Biggest Publishing Bet?",
      category: "Feature",
      date: "18 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/3015332b-adbf-4aa4-9978-3728cae4ca98_Copy%20of%20Copy%20of%20Copy%20of%20Copy%20of%20Copy%20of%20Copy%20of%20Copy%20of%20Copy%20of%20Add%20a%20heading.png",
      url: "https://thegamevoice.com/article/can-indias-first-pc-and-console-publisher-justify-the-big-bet-1312-interactive-raises-1-million",
    },
    {
      title: "Not Just a Game, But an Intuitive Take on Life Itself: GRIS",
      category: "Opinions",
      date: "16 Sep 2026",
      image: "https://media.thegamevoice.com/uploads/9b048293-4324-4711-87d6-8fc0c2c5f218_979696.jpg",
      url: "https://thegamevoice.com/article/gris-not-just-a-game-but-an-intuitive-take-on-life-itself",
    },
  ],

  // Only verified numbers. Leave value "" to hide.
  stats: [
    { value: "7K+", label: "GameTout Subscribers" },
    { value: "2", label: "Media Platforms" },
    { value: "IGDC", label: "Events Covered" },
    { value: "IN", label: "Based in India" },
  ],

  contactReasons: [
    "Business Partnership",
    "Media Collaboration",
    "Event",
    "Sponsorship",
    "Careers",
    "Other",
  ],
};
