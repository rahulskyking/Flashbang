# FLASHBANG MEDIA — Website

Premium single-page static website for **FLASHBANG MEDIA PRIVATE LIMITED**
(CIN: U59111WB2026PTC286335) — a gaming ecosystem spanning media, community,
careers and events.

**Ecosystem:** GameTout (gaming media / YouTube) · TheGameVoice (news &
editorial) · HireGameDev (upcoming careers platform).

## Stack

Plain HTML + CSS + vanilla JavaScript. No build step, no dependencies — deploy
the folder anywhere (Netlify, Vercel, GitHub Pages, S3, any static host).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

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
