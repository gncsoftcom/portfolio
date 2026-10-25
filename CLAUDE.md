# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, single-page developer portfolio in plain HTML/CSS/vanilla JS — no build step, no package manager, no tests, no external JS libraries (only Google Fonts). Bilingual (Turkish default, English). The user communicates in Turkish.

Deployed via GitHub Pages from the `main` branch root of `gncsoftcom/portfolio` → https://gncsoftcom.github.io/portfolio/. Pushing to `main` redeploys (takes ~1–2 min). Check build status with:

```bash
gh api repos/gncsoftcom/portfolio/pages/builds/latest --jq .status
```

## Running locally

Open `index.html` directly (works over `file://`), or use the `portfolio` preview config in `.claude/launch.json` (a tiny Node static server on port 5500; `.claude/` is gitignored). Keep scripts as classic `<script>` tags — do **not** convert to ES modules or add `fetch()` of local files, as that breaks `file://` usage.

## Architecture

Scripts load in order `js/data.js` → `js/i18n.js` → `js/main.js`, sharing state through globals:

- **`window.SITE_DATA`** (`js/data.js`) — all personal content: name, roles, bio, stats, skills, projects, experience, education, contact, social links, and the KVKK (Turkish privacy law) notice. Translatable fields are `{ tr: "...", en: "..." }` objects; non-translatable fields are plain values. Content edits belong here, not in HTML.
- **`window.I18N`** (`js/i18n.js`) — fixed UI strings keyed like `"nav.about"`, per language. Some values intentionally contain HTML (e.g. `<span class="grad-text">`).
- **`js/main.js`** (single IIFE) — renders everything:
  - Elements with `data-i18n="key"` get `innerHTML` from `I18N[lang]`; `data-i18n-aria` sets `aria-label`; `data-field="name|initials|tagline"` gets data values.
  - Dynamic sections (`#skills`, `#projectList`, `#panel-work`, `#panel-edu`, `#contactList`, `#kvkkBody`, etc.) are rebuilt as HTML strings from `SITE_DATA` on every language switch (`setLang` → `renderI18n` + `renderContent`). The `tx()` helper picks the current language from a `{tr,en}` object; all data-derived strings go through `esc()`.
  - Because content is re-rendered, per-element behaviors (reveal observer, card tilt) are re-attached inside `renderContent()`.
  - Language preference persists in `localStorage` (wrapped in try/catch), falling back to `navigator.language`.

When adding a new translatable piece: put content in `data.js` (`{tr,en}`) or UI text in both `I18N.tr` and `I18N.en`, then either add a `data-i18n` attribute in `index.html` or render it in `renderContent()`.

## Styling conventions

`css/style.css` is one file organized by `/* ==== SECTION ==== */` blocks. Colors/fonts are `:root` custom properties (single dark theme, pink/orange/purple/cyan gradient palette). BEM-ish class names (`card__title`, `nav__link`), state classes prefixed `is-` (`is-visible`, `is-active`, `is-open`). Scroll animations use `.reveal` + `.is-visible` via IntersectionObserver; `prefers-reduced-motion` disables all animation. Mobile-first with breakpoints at 640/768/900/1024px.

## Notes

- The contact form is display-only: it validates and shows a "demo" toast but sends nothing.
- `assets/cv.pdf` is referenced by the CV button (`SITE_DATA.cvUrl`) but is supplied by the user.
- Content in `data.js` is placeholder sample data ("Ahmet Yılmaz") until the user replaces it.
