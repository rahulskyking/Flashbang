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
    location: "India",
    email: "hello@flashbangmedia.in", // update with the official address
  },

  // Only list links that actually exist. Empty url => hidden.
  social: [
    { label: "YouTube", url: "https://www.youtube.com/@GameTout" },
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "X", url: "" },
  ],

  hero: {
    kicker: "Gaming Ecosystem",
    title: "A gaming ecosystem built around media, community, careers and events.",
    subtitle:
      "FLASHBANG MEDIA connects audiences, creators and developers across the gaming industry — through GameTout, TheGameVoice and upcoming initiatives.",
    primaryCta: { label: "Explore Our Products", href: "#products" },
    secondaryCta: { label: "Get in Touch", href: "#contact" },
    image: "assets/img/hero.jpg",
  },

  pillars: ["Media", "Community", "Careers", "Events"],

  // The products / ecosystem — the core of the page.
  products: [
    {
      id: "gametout",
      name: "GameTout",
      category: "Gaming Media & YouTube",
      status: "live",
      description:
        "Our gaming media and YouTube platform covering the Indian and global game industry — developer interviews, indie game coverage, reviews and the GameTout Gossip podcast.",
      metric: { value: "7K+", label: "YouTube Subscribers" },
      tags: ["Interviews", "Reviews", "Indie Coverage", "Podcast", "Event Coverage"],
      cta: { label: "Watch on YouTube", href: "https://www.youtube.com/@GameTout" },
      image: "assets/img/gametout.jpg",
    },
    {
      id: "thegamevoice",
      name: "TheGameVoice",
      category: "Gaming News & Editorial",
      status: "live",
      description:
        "Our gaming news and editorial platform covering gaming news, reviews, articles and stories from across the industry.",
      metric: { value: "", label: "" },
      tags: ["News", "Reviews", "Articles", "Industry Stories"],
      cta: { label: "Visit TheGameVoice", href: "https://thegamevoice.com" },
      image: "assets/img/thegamevoice.jpg",
    },
    {
      id: "hiregamedev",
      name: "HireGameDev",
      category: "Coming Soon",
      status: "soon",
      description:
        "An upcoming platform connecting gaming talent, developers and studios with opportunities across the gaming industry.",
      metric: { value: "", label: "" },
      tags: ["Gaming Jobs", "Talent", "Studios", "Careers"],
      cta: { label: "Coming Soon", href: "#contact" },
      image: "assets/img/hiregamedev.jpg",
    },
  ],

  // Real GameTout videos (thumbnails pulled live from YouTube).
  videos: [
    {
      title: "Curve Games CEO Explains The Truth About Publishing Indie Games",
      category: "Interview",
      id: "GKN6XZ4wqEc",
    },
    {
      title: "Unleash The Avatar — Indian Game ft. Varun Mayya",
      category: "Interview",
      id: "ntaodYvAfsE",
    },
    {
      title: "This Sri Lankan Game is an Eye Opener for Indian Game Studios",
      category: "Feature",
      id: "kfq7ckUbtmw",
    },
    {
      title: "Black Myth: Zhong Kui — Gameplay Trailer Analysis",
      category: "Analysis",
      id: "_5KEpSy2Fvg",
    },
    {
      title: "$100 Price Tag of GTA 6 — The End of Affordable Gaming?",
      category: "News",
      id: "D5AMIiDg96I",
    },
    {
      title: "Kartboard Dash Trailer — Try this Indian Game on Steam",
      category: "Trailer",
      id: "XAgLbjcyoj4",
    },
  ],

  // Only verified numbers. Leave value "" to hide.
  stats: [
    { value: "7K+", label: "GameTout YouTube Subscribers" },
    { value: "3", label: "Ecosystem Products" },
    { value: "IN", label: "Based in India" },
  ],

  about: {
    title: "This is FLASHBANG MEDIA.",
    body:
      "We're a gaming media company building a connected ecosystem — media through GameTout, news and editorial through TheGameVoice, and an upcoming careers platform through HireGameDev. A media organisation that actually shows up: at events, on the floor, and in conversation with the people who make games.",
    mission:
      "To build meaningful connections across the gaming ecosystem through media, community, events and opportunities.",
    vision:
      "To become a trusted ecosystem connecting gamers, creators, developers, studios and opportunities across the gaming industry.",
  },

  contactReasons: [
    "Business Partnership",
    "Media Collaboration",
    "Event",
    "Sponsorship",
    "Careers",
    "Other",
  ],
};
