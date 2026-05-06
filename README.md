# portfolio_v2

Hand-built personal portfolio — Nora Povejsil, data scientist & engineer. Vanilla HTML/CSS, no framework, no build step.

**Live:** [npovejsil.github.io](https://npovejsil.github.io) *(or wherever it's hosted)*

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — macOS-style desktop with file/folder icons |
| `about.html` | Bio, résumé, and contact in a frosted-glass macOS window |
| `work.html` | Selected projects and academic work in a sticky-index archival layout |

---

## Design Inspiration

### cargo.site — Template M401

The home and about pages are modeled on [cargo.site](https://cargo.site)'s M401 template:

- Dark `#111111` background with floating macOS-style file icons (home)
- Frosted glass window with traffic-light close buttons (about)
- Fixed nav bar using `mix-blend-mode: difference` so it auto-inverts on dark vs. light sections
- Type system modeled on Diatype Variable (approximated with Inter Tight)

### Readymag

The work page draws from [Readymag](https://readymag.com)'s archival and editorial template aesthetic:

- Sticky left-column index table listing projects and academic work by number, type, and year
- Per-entry "document" cards with a dotted-paper, reference-library feel
- Section kickers (`§`) and metadata rows dividing selected work from academic finals

---

## Tools

| Tool | Use |
|------|-----|
| HTML / CSS | Everything — no preprocessor, no build step |
| [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) | Typography stand-in for Diatype Variable (used in the M401 template) |
| [Claude Code](https://claude.ai/code) | AI pair programming throughout — scaffolding, iteration, and design refinement |

---

## Running locally

No build step. Open `index.html` directly in a browser, or serve with any static file server:

```sh
npx serve .
# or
python3 -m http.server
```

---

## Structure

```
index.html          Home (desktop icons)
about.html          About / résumé (macOS window)
work.html           Selected work (archival sticky-index layout)
css/main.css        All styles — design tokens → layout → per-page
assets/             Icons and project images
docs/               Design reference docs
```
