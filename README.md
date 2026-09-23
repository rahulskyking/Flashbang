# FLASHBANG MEDIA — Website

Premium single-page static website for **FLASHBANG MEDIA PRIVATE LIMITED**
(CIN: U59111WB2026PTC286335) — a gaming ecosystem spanning media, community,
careers and events.

**Products:** GameTout (gaming media / YouTube) · TheGameVoice (gaming news &
editorial). Contact: contact@flashbangmedia.com

## Stack

Plain HTML + CSS + vanilla JavaScript. No build step, no dependencies — deploy
the folder anywhere (Netlify, Vercel, GitHub Pages, S3, any static host).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Live, auto-updating content

The **Work** section pulls **fresh content automatically** in the visitor's
browser:

- **GameTout videos** — from YouTube's public RSS feed
  (`youtube.com/feeds/videos.xml?channel_id=…`, no API key needed).
- **TheGameVoice articles** — parsed from the site's homepage.

Because this is a static site, the browser can't call those hosts directly
(CORS), so [`assets/js/feeds.js`](assets/js/feeds.js) routes requests through
public CORS proxies with automatic fallback, and caches results for 30 minutes.
The page **always renders the curated lists in `data/content.js` first**, then
swaps in live data if a fetch succeeds — so it's instant, SEO-friendly and never
looks broken if a proxy is down. A small green "live" dot appears on a section
once fresh data loads.

To turn this off and always use the curated lists, set `feeds.enabled: false`
in `data/content.js`. For maximum reliability in production, replace the public
proxies in `feeds.js` with your own tiny serverless function (or the official
YouTube Data API).

The **Events** section is curated from real event-coverage videos on the
GameTout channel (IGDC 2025 Chennai, IGDC 2024 Hyderabad, Game Dev Day
Ahmedabad). Add more events by editing the `events` array in `data/content.js`.

## Editing content

**All copy, links, events, videos, articles, stats and social links live in one
file:** [`data/content.js`](data/content.js). Edit that file — the page renders
itself from it, so no HTML changes are needed.

- Leave a value `""` or a list `[]` to hide the related UI (e.g. an empty stat
  value hides that stat; an empty social URL hides that link).
- Only add **real** events, videos and numbers. The structure supports growth —
  add entries as the ecosystem expands.

## Replacing assets

Drop real FLASHBANG / GameTout photography and logos into
[`assets/img/`](assets/img/) using the same filenames referenced in
`data/content.js`, or point the config at new filenames. The current images are
AI-generated placeholders styled to match the brand direction until authentic
media is supplied.

> Image generation hit the per-turn limit at 10 assets, so `gallery-3.jpg` /
> `gallery-4.jpg` referenced as future slots can be added later; the site only
> uses assets that exist in the config.

## Structure

```
index.html            # markup shell (semantic, SEO + OG + JSON-LD)
data/content.js       # ← single source of truth for all content
assets/css/style.css  # design system
assets/js/main.js     # renders content, nav, gallery tabs, reveals, form
assets/img/           # imagery & logo
```

## Notes

- Contact form is static; it opens the visitor's mail client (`mailto:`) to
  `company.email` in the config. Swap in a form backend (Formspree, Netlify
  Forms, etc.) when ready.
- Accessibility: skip link, semantic landmarks, focus states, alt text,
  `prefers-reduced-motion` support.
