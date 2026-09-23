/*
 * FLASHBANG MEDIA — Central content configuration
 * ------------------------------------------------
 * Edit this file to update copy, links, events, videos, articles and stats.
 * Nothing in the site markup needs to change — the page renders from here.
 * Leave a value empty ("") or a list empty ([]) to hide the related UI.
 */
window.FLASHBANG = {
  company: {
    name: "FLASHBANG MEDIA PRIVATE LIMITED",
    shortName: "FLASHBANG",
    cin: "U59111WB2026PTC286335",
    tagline: "Gaming • Media • Community • Careers • Events",
    location: "India",
    email: "hello@flashbangmedia.in", // update with the official address
  },

  // Only list social links that actually exist. Empty url => hidden.
  social: [
    { label: "YouTube", url: "https://www.youtube.com/@GameTout" },
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "X", url: "" },
  ],

  hero: {
    kicker: "Gaming Ecosystem",
    title: "A Gaming Ecosystem Built Around the People Who Play, Create and Shape Games.",
    subtitle:
      "FLASHBANG MEDIA is a gaming ecosystem connecting audiences, creators, developers and the wider gaming industry through media, community, events and career opportunities.",
    primaryCta: { label: "Explore Our Ecosystem", href: "#ecosystem" },
    secondaryCta: { label: "Get in Touch", href: "#contact" },
    image: "assets/img/hero.jpg",
  },

  pillars: ["Gaming", "Media", "Community", "Careers", "Events"],

  ecosystem: [
    {
      id: "gametout",
      name: "GAME TOUT",
      category: "Gaming Media",
      status: "live",
      description:
        "GameTout is FLASHBANG's gaming media and YouTube platform covering the gaming industry through news, interviews, game reviews, event coverage and conversations with developers.",
      metric: { value: "7K+", label: "YouTube Subscribers" },
      tags: ["Gaming News", "Interviews", "Game Reviews", "Event Coverage", "Developer Interviews"],
      cta: { label: "Watch GameTout", href: "https://www.youtube.com/@GameTout" },
      image: "assets/img/gametout.jpg",
    },
    {
      id: "thegamevoice",
      name: "THE GAME VOICE",
      category: "Gaming News & Editorial",
      status: "live",
      description:
        "TheGameVoice is FLASHBANG's gaming news and editorial platform covering gaming news, reviews, articles and stories from the industry.",
      metric: { value: "", label: "" },
      tags: ["Gaming News", "Game Reviews", "Articles", "Industry Stories", "Gaming Updates"],
      cta: { label: "Visit TheGameVoice", href: "https://thegamevoice.com" },
      image: "assets/img/thegamevoice.jpg",
    },
    {
      id: "hiregamedev",
      name: "HIRE GAME DEV",
      category: "Coming Soon",
      status: "soon",
      description:
        "HireGameDev is an upcoming platform focused on connecting gaming talent, developers and opportunities across the gaming industry.",
      metric: { value: "", label: "" },
      tags: ["Gaming Jobs", "Developer Opportunities", "Talent Discovery", "Portfolios", "Studio Hiring", "Gaming Careers"],
      cta: { label: "Coming Soon", href: "#contact" },
      image: "assets/img/hiregamedev.jpg",
    },
  ],

  // Cinematic industry strip
  industry: {
    title: "Inside the Gaming Industry",
    body:
      "FLASHBANG participates in and covers gaming events, conferences and industry activities — documenting the people and studios shaping games in India and beyond.",
    images: [
      "assets/img/gallery-1.jpg",
      "assets/img/event-1.jpg",
      "assets/img/gallery-2.jpg",
      "assets/img/event-2.jpg",
      "assets/img/event-3.jpg",
    ],
  },

  // Only real events. Add entries as they happen.
  events: [
    {
      name: "IGDC",
      full: "India Game Developer Conference",
      year: "2026",
      location: "India",
      role: "Media Coverage",
      description:
        "GameTout on the ground at IGDC — developer interviews, stage coverage and conversations with studios across the Indian gaming industry.",
      image: "assets/img/event-2.jpg",
      cta: { label: "View Event Coverage", href: "https://www.youtube.com/@GameTout" },
    },
  ],

  // GameTout videos. Fill videoUrl + thumbnail as they are published.
  videos: [
    {
      title: "Developer Interview — On the Industry Floor",
      category: "Interview",
      date: "2026",
      thumb: "assets/img/gametout.jpg",
      url: "https://www.youtube.com/@GameTout",
    },
    {
      title: "IGDC Event Coverage",
      category: "Event Coverage",
      date: "2026",
      thumb: "assets/img/event-1.jpg",
      url: "https://www.youtube.com/@GameTout",
    },
    {
      title: "Game Review — Latest Release",
      category: "Review",
      date: "2026",
      thumb: "assets/img/event-3.jpg",
      url: "https://www.youtube.com/@GameTout",
    },
  ],

  // Media gallery grid. tag = one of Videos / Photos / Events / Interviews
  gallery: [
    { src: "assets/img/gallery-1.jpg", tag: "Events", alt: "Esports arena crowd" },
    { src: "assets/img/gallery-2.jpg", tag: "Videos", alt: "Camera operator filming" },
    { src: "assets/img/event-3.jpg", tag: "Interviews", alt: "Developer interview" },
    { src: "assets/img/event-1.jpg", tag: "Events", alt: "Exhibition floor" },
    { src: "assets/img/event-2.jpg", tag: "Events", alt: "Speaker on stage" },
    { src: "assets/img/gametout.jpg", tag: "Videos", alt: "Interview filming" },
  ],

  // Only verified numbers. Leave value "" to hide a stat.
  stats: [
    { value: "7K+", label: "GameTout YouTube Subscribers" },
    { value: "", label: "Events Covered" },
    { value: "", label: "Developers Interviewed" },
    { value: "", label: "Videos Published" },
  ],

  about: {
    title: "Building a Connected Gaming Ecosystem.",
    body: [
      "FLASHBANG MEDIA exists to connect the different parts of the gaming world — the people who play, the creators who cover it, the developers who build it and the studios that ship it.",
      "We operate multiple gaming initiatives designed to work together: gaming media through GameTout, news and editorial through TheGameVoice, and an upcoming careers and talent platform through HireGameDev.",
      "We're a media organisation that actually shows up — at conferences, on exhibition floors and in conversation with the people shaping games.",
    ],
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
    "Gaming Industry",
    "Careers",
    "Other",
  ],
};
