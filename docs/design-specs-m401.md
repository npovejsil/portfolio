# Design Specs — Template M401 (cargo.site)
**URL:** https://0064442.cargo.site/  
**Inspected:** 2026-04-19

---

## 1. Global Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background (dark) | `#111111` | Default page background |
| Background (light) | `#F8F8F8` | Alternating project slides on Work page |
| Text Primary | `rgba(255,255,255,0.85)` | Headings, section labels, project titles |
| Text Secondary | `rgba(255,255,255,0.6)` | Body copy, nav links, dates, descriptions |
| Text Muted | `rgba(255,255,255,0.4)` | De-emphasized content |
| Text Near-White | `rgba(255,255,255,0.95)` | Caption labels on dark backgrounds |
| Accent (default) | `#FF0000` | Accent / brand color (unused visually) |
| HR / Divider | `rgba(255,255,255,0.15)` | Horizontal rules and section separators |
| Link underline | `rgba(127,127,127,0.2)` | Subtle link underline color |

**Note:** On light (`#F8F8F8`) sections the text still renders white because the overlay uses `mix-blend-mode: difference`, which inverts the color automatically.

**Swatch palette (CSS variables on `body`):**
```css
--swatch-1: rgba(255,255,255,0.85);
--swatch-2: rgba(255,255,255,0.75);
--swatch-3: rgba(255,255,255,0.6);
--swatch-4: rgba(255,255,255,0.4);
--swatch-5: rgba(255,255,255,0.25);
--swatch-6: rgba(255,255,255,0.85);
```

### Base Sizing
- **`1rem` = 9.8928px** (set via `--base-size` on `<html>`)
- `html { font-size: var(--base-size); }` → effectively ~9.9px/rem
- All layout and typography values in the CSS use `rem` units

### Typography
**Font Family:** `"Diatype Variable"` (variable font)
- All body copy, captions, nav, headings use this single font
- `font-variation-settings: 'slnt' 0, 'MONO' 0` (normal style, proportional)
- Fallback chain: `-apple-system, "system-ui", Inter, "Segoe UI", Roboto, sans-serif`

---

## 2. Typography Scale

All font sizes are defined as `rem` multiples of the ~9.9px base.

| Style | Size | Weight | Color | Line Height | Letter Spacing |
|-------|------|--------|-------|-------------|----------------|
| `bodycopy` | `1rem` (~9.9px) | 400 | `rgba(255,255,255,0.6)` | 1.25 | -0.004em |
| `h1` | `3.5rem` | 650 | `rgba(255,255,255,0.85)` | 1 | -0.004em |
| `h2` | `1.4rem` | 650 | `rgba(255,255,255,0.85)` | 1.1 | -0.004em |
| `.caption` | `1rem` | 450 | `rgba(255,255,255,0.95)` | 1.25 | 0 |
| `.caption-light` | `1rem` | 450 | `rgba(255,255,255,0.95)` | 1.25 | 0 |

```css
bodycopy {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  font-family: "Diatype Variable";
  line-height: 1.25;
  letter-spacing: -0.004em;
  font-variation-settings: 'slnt' 0, 'MONO' 0;
}

h1 {
  font-size: 3.5rem;
  font-weight: 650;
  color: rgba(255,255,255,0.85);
  line-height: 1;
  letter-spacing: -0.004em;
  margin: 0; padding: 0;
}

h2 {
  font-size: 1.4rem;
  font-weight: 650;
  color: rgba(255,255,255,0.85);
  line-height: 1.1;
  letter-spacing: -0.004em;
  margin: 0; padding: 0;
}

.caption {
  font-size: 1rem;
  font-weight: 450;
  color: rgba(255,255,255,0.95);
  line-height: 1.25;
  letter-spacing: 0;
  display: inline-block;
}

.caption-light {
  font-size: 1rem;
  font-weight: 450;
  color: rgba(255,255,255,0.95);
  line-height: 1.25;
  letter-spacing: 0;
  display: inline-block;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0,0,0,0.5));
}
```

### Links
```css
bodycopy a {
  color: rgba(255,255,255,0.6);
  border-bottom: 0px solid rgba(127,127,127,0.2);
  text-decoration: none;
}

a:active, .linked:active {
  opacity: 0.7;
}
```

### HR / Dividers
```css
hr {
  background: rgba(255,255,255,0.15);
  border: 0;
  height: 1px;
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
```

---

## 3. Layout System

### Page / Viewport
```css
html, body {
  min-height: 100vh;
  margin: 0; padding: 0;
  background-color: #111111;
}

body {
  display: flex;
  flex-direction: column;
  width: 100%;
  -webkit-font-smoothing: antialiased;
}
```

### `.page` (section container)
```css
.page {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-flow: row;
  max-width: 100%;
  width: 100%;
}
```

### `.page-layout` (inner column)
```css
.page-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 100%;
  padding: 0;
}
```

### `.page-content` (content wrapper)
```css
.page-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  text-align: left;
}
```

---

## 4. Navigation Bar

**Visual appearance:** Fixed top bar, transparent background, text uses `mix-blend-mode: difference` (inverts against the page content beneath it), creating a light-on-dark or dark-on-light effect dynamically.

### Structure
```html
<nav id="G0519698989" class="page pinned pinned-top fixed">
  <a id="header" href="#"></a>  <!-- skip-link anchor -->
  <div class="page-layout">
    <div class="page-content">
      <!-- bodycopy -->
        <a class="window-title" href="#"></a>  <!-- spacer element -->
        <a href="#">Cargo® Demo Site</a>
        <a href="/about"><u>About</u></a>,
        <a href="/contact-form"><u>Email</u></a>,
        <a href="https://instagram.com/..."><u>Instagram</u></a>
    </div>
  </div>
</nav>
```

### Styles
```css
#G0519698989.page {
  mix-blend-mode: difference;   /* key effect — text inverts against bg */
  position: fixed;
  top: 0; left: 0; right: 0;
  height: auto; /* ~32px = 3.24rem */
  z-index: 2;
}

#G0519698989 .page-content {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

/* Nav typography */
#G0519698989 bodycopy {
  font-family: "Diatype Variable";
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  line-height: 1.25;
  letter-spacing: -0.004em;
}

#G0519698989 a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
}

/* Nav links use <u> tag for underline */
#G0519698989 a u {
  text-decoration: underline;
}
```

**Layout pattern:**
- Site name left-aligned → gap of ~4 spaces → nav links separated by commas
- `"Cargo® Demo Site"` then `"About, Email, Instagram"` (each wrapped in `<u>`)
- Due to `mix-blend-mode: difference`, these appear white-on-dark or black-on-light

---

## 5. Home Page — Desktop Icon Grid

The homepage centers a gallery of clickable icons (desktop-like file icons) both vertically and horizontally in the viewport.

### Page Settings
```css
#J3987867771.page {
  min-height: var(--viewport-height);    /* 100vh */
}

#J3987867771 .page-content {
  align-items: center;
  text-align: center;
}

#J3987867771 .page-layout {
  align-items: center;
}
```

### Gallery — `gallery-justify`
Icons are laid out using a justify gallery that arranges items horizontally with equal spacing.

```css
/* Each media-item (icon) */
media-item {
  display: flex;
  flex-direction: column;  /* image above caption */
  width: 100px;
  height: auto;            /* ~127px total incl. caption */
  margin-right: 1.5rem;    /* ~14.8px gap between items */
}

/* Icon image */
media-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  display: block;
}

/* Caption below icon */
figcaption.caption {
  margin-top: 0.5rem;
  text-align: center;
}

.caption-light {
  font-size: 1rem;
  font-weight: 450;
  color: rgba(255,255,255,0.95);
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0,0,0,0.5));
}
```

### Icons / Content
| Icon | Image | Link |
|------|-------|------|
| Work | Hard disk drive icon (macOS style PNG) | `#project-a` (anchor to Work page) |
| About me.rtf | Document/RTF icon (red quote marks, file style PNG) | `/about` |
| badge.gif | Animated GIF badge (Dinamo Inside logo, blue) | none |

**Image sources (Cargo CDN, 200×200px):**
- Work: `https://freight.cargo.site/w/200/q/75/i/G2838278201348243894093994197287/HHD.png`
- About me.rtf: `https://freight.cargo.site/w/200/q/75/i/M2834954642042197404659579552039/about.png`
- badge.gif: `https://freight.cargo.site/w/200/q/75/i/G2838279224533797430541693681959/dinamo-inside-badge.gif`

---

## 6. Work Page — Full-Viewport Project Slideshow

The Work page (`/work`) is reached by clicking the "Work" (hard drive) icon. It presents a series of full-viewport stacked sections — one per project — that the user scrolls through vertically. Each section fills 100vh with a large centered artwork image and project metadata at the bottom-left.

### Overall Page Structure

The Work page is built from these layered components (in z-order):

1. **Fixed nav bar** (shared global, `G0519698989`) — `mix-blend-mode: difference`
2. **Fixed project nav arrows** (`Y1894100856`) — fixed, `mix-blend-mode: difference`, pinned top, holds up/down SVG arrow buttons at bottom-right
3. **Home gallery page** (`J3987867771`) — still present but scrolled past
4. **Six project section pages** (`M0792343021`, `Y3232042808`, `L0851166779`, `H0776267412`, `P3093132611`, `U1985436849`) — stacked, full-viewport slides
5. **Closing text page** (`I0865083708`) — centered paragraph on light background
6. **Footer bar** (`P3273737063`) — pinned bottom, `mix-blend-mode: difference`

### Project Section Layout

Each project section is a `.page.stacked-page` with `min-height: 100vh`.
┌─────────────────────────────────────────────────┐
│                                                 │
│         LARGE IMAGE (centered, ~80% vh)         │
│         inset 10rem from all edges              │
│         object-fit: contain                     │
│                                                 │
│─────────────────────────────────────────────────│
│ Project Title                                   │
│ Date                                            │
│                                                 │
│ Description text... [Read More...]              │
└─────────────────────────────────────────────────┘
### Project Background Colors
Pages alternate between dark and light backgrounds:

| Project | Page bg |
|---------|---------|
| Project A | `transparent` → inherits `#111111` |
| Project B | `#F8F8F8` |
| Project C | `transparent` → inherits `#111111` |
| Project D | `#F8F8F8` |
| Project E | `transparent` → inherits `#111111` |
| Project F | `#F8F8F8` |

### Wallpaper / Backdrop Image

Each project image is rendered as a "wallpaper" layer positioned absolutely behind the page content. The image is contained within a padded inner frame:

```css
/* Wallpaper host (position: absolute, inset: 0) */
.wallpaper {
  position: absolute;
  inset: 0;
  background-color: transparent;
}

/* Inner frame — creates the 10rem inset/padding around the image */
.inner {
  position: absolute;
  inset: 10rem;     /* 10rem = ~99px from all 4 edges */
}

/* Image container */
.image-container.single-item {
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
```

**Image sizing formula:**
image-height = calc(100vh - 20rem)   /* viewport height minus top+bottom inset /
image-fit: fit                        / object-fit: contain, limited by height */
At a 687px viewport height with 1rem = 9.9px:
- Image display size ≈ 687 - (20 × 9.9) = ~489px square

**Image shape:** The placeholder images are abstract gradient blobs in a rounded-square shape. The rounding is part of the image artwork itself, not a CSS `border-radius`.

### Project Info Text (Bottom-Left)

The project title, date, and description sit in the `.page-content` area, aligned to the bottom-left of the section using flexbox.

```css
.page-content {
  display: flex;
  flex-direction: row;
  align-items: flex-end;    /* push content to bottom */
  padding: 1rem;
  width: 100%;
  height: 100%;
}

/* Two-column layout inside the page-content */
/* Column 1: project info text (~1/3 viewport width) */
/* Column 2: empty spacer (flex-grow: 1) */
```

**Column structure:**
```css
column-set {
  display: flex;
  flex-direction: row;
  width: 100%;
}

/* Text column */
column-unit:first-child {
  flex-basis: ~36.84rem;   /* ~1/3 of viewport width, fixed */
  flex-grow: 0;
  flex-shrink: 0;
}

/* Spacer column */
column-unit:last-child {
  flex-grow: 1;
}
```

**Project info text styling:**
```css
/* Project title */
span (project name) {
  color: rgba(255,255,255,0.85);  /* brighter */
  font-size: 1rem;
  font-weight: 400;
  font-family: "Diatype Variable";
}

/* Date and description */
{
  color: rgba(255,255,255,0.6);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
}

/* "Read More..." link */
a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
}
```

**Typical project info HTML structure:**
```html
<column-set>
  <column-unit>
    <span>Project A</span>
    <br>
    September 06, 2032
    <br><br>
    Praesent bibendum a elit non efficitur...
    <a href="read-more-example">[Read More...]</a>
  </column-unit>
  <column-unit></column-unit>  <!-- empty spacer -->
</column-set>
```

### Page Navigation Arrows (Bottom-Right)

A fixed overlay page (`Y1894100856`) with `mix-blend-mode: difference` holds the up/down scroll navigation. These are rendered using `<text-icon>` custom elements containing SVG icons (circle with chevron).

```css
/* Nav arrows overlay */
#Y1894100856.page {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  mix-blend-mode: difference;
  pointer-events: none;
}

#Y1894100856 .page-content {
  display: flex;
  flex-direction: row;
  align-items: flex-end;   /* anchored to bottom */
  padding: 1rem;
}

/* The span containing both icons is text-align: right */
/* so it floats to the right side */
span (nav icons container) {
  text-align: right;
  flex-grow: 1;   /* takes all remaining space to push right */
}
```

**Arrow SVG specs (32×32 viewBox, chevron inside circle):**
- Up arrow: `M2 16 C2 23.73 8.27 30 16 30 C23.73 30 30 23.73 30 16 C30 8.27 23.73 2 16 2 Z` (circle) + `M8.63 19.76 L16 12.39 L23.37 19.76` (up chevron)
- Down arrow: Same circle path + `M23.17 12.34 L16 19.51 L8.83 12.34` (down chevron)
- Rendered size: `~16.6×16.6px` (≈1.68rem)
- Color: `rgba(255,255,255,0.6)` (inverted to dark on light pages via blend mode)

### Closing Text Section

After all project slides there is one additional page with centered body text on a light background (`#F8F8F8`):

```css
/* Closing page */
.page (I0865083708) {
  background-color: #F8F8F8;
  min-height: 100vh;
}

.page-content {
  align-items: center;
  text-align: center;
  padding: 1rem;
}

bodycopy {
  text-align: center;
  color: rgba(255,255,255,0.6);  /* appears dark on light bg via blend */
}
```

### Footer Bar

A `pinned-bottom` overlay bar with `mix-blend-mode: difference`:

```css
#P3273737063.page {
  position: absolute;
  bottom: 0;
  mix-blend-mode: difference;
}

.page-content {
  padding: 1rem;
  align-items: flex-start;
}
```

**Footer content:**
© 2032 All Right Reserved    [Scroll to Top]
- All text: `rgba(255,255,255,0.6)`, 1rem, "Diatype Variable"
- "Scroll to Top" is a link with `href="#"`, no underline

---

## 7. About Page — macOS Window Modal

The about page displays content inside a frosted-glass macOS-style window, centered on the page.

### Window Container (`.page-content` on About page)
```css
.page-content {
  background-color: rgba(30, 30, 30, 0.69);
  border: 0.5px solid rgba(255,255,255,0.15);
  border-radius: 1.6rem;
  box-shadow: 0.4rem 0.4rem 2rem 0 rgba(0,0,0,0.25);
  backdrop-filter: blur(2rem);
  width: ~45.5rem;
  padding: 0.8rem 1rem 1rem;
  display: flex;
  flex-direction: row;
}
```

### Page Layout (centering the window)
```css
.page-layout {
  max-width: 45%;
  padding: 5rem 3rem;
  align-items: center;
  justify-content: center;
  display: flex;
}

.page {
  justify-content: center;
}
```

### Window Title Bar
```html
<a href="#">
  <span style="color: rgb(255, 92, 95);">●</span>
  <span style="color: rgb(250, 200, 0);">●</span>
  <span style="color: rgb(52, 199, 89);">●</span>
</a>
📄  About me
<hr>
```

**Traffic light colors:**
| Button | Color |
|--------|-------|
| Close (red) | `rgb(255, 92, 95)` |
| Minimize (yellow) | `rgb(250, 200, 0)` |
| Zoom (green) | `rgb(52, 199, 89)` |

### Two-Column Content Layout

```css
column-set {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  margin-top: 10px;
}

column-unit:not(:last-child) {
  margin-right: 10px;
}

column-unit:first-child {
  width: ~13.8rem;
  flex-grow: 0;
  flex-shrink: 0;
}

column-unit:last-child {
  flex-grow: 1;
}
```

**Sections:** Contact/Studio · Awards · Press · Imperdiets (with 3 columns: label / Upcoming / Previously)

**Section label color:** `rgba(255,255,255,0.85)` (via `<span>`)
**Body text color:** `rgba(255,255,255,0.6)`

---

## 8. Interactive States

```css
a:active,
.linked:active,
.zoomable::part(media):active {
  opacity: 0.7;
}
```

---

## 9. Responsive / Mobile

```css
html {
  --mobile-scale: 1.4;
  --mobile-padding-offset: 0.85;
}

html.mobile {
  font-size: calc(var(--base-size) * 1.4);
  /* → ~9.9px × 1.4 = ~13.85px */
}

.mobile [id] .page-layout {
  max-width: 100%;
}
```

---

## 10. Utility Classes

```css
.small-caps {
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.03em;
}

ol { margin: 0; padding: 0 0 0 2.5em; }
ul { margin: 0; padding: 0 0 0 2.0em; }
blockquote { margin: 0; padding: 0 0 0 2em; }

sub { position: relative; vertical-align: baseline; top: 0.3em; }
sup { position: relative; vertical-align: baseline; top: -0.4em; }
```

---

## 11. Quick-View / Lightbox

```css
.quick-view {
  width: 80%;
  height: 80%;
  padding: 10rem;
  margin: auto;
  position: fixed;
  inset: 0;
  z-index: 5001;
}

.quick-view-background {
  background-color: rgba(0,0,0,0.25);
  backdrop-filter: blur(2rem);
}
```

---

## 12. Asset References

| Asset | URL |
|-------|-----|
| Work icon (home) | `https://freight.cargo.site/w/200/q/75/i/G2838278201348243894093994197287/HHD.png` |
| About me.rtf icon (home) | `https://freight.cargo.site/w/200/q/75/i/M2834954642042197404659579552039/about.png` |
| badge.gif (home) | `https://freight.cargo.site/w/200/q/75/i/G2838279224533797430541693681959/dinamo-inside-badge.gif` |
| Project images (work) | Abstract gradient blobs loaded lazily via Cargo CDN (`freight.cargo.site`) |

---

## 13. Page-by-Page Summary

### Home (`/`)
- Full-viewport centered layout (`min-height: 100vh`, flex center)
- Dark background: `#111111`
- Three macOS-style file/folder icons horizontally in a `gallery-justify`
- Each icon: 100×100px image + label in `.caption-light` style, gap ~1.5rem
- No visible borders or boxes — floating icons on dark background

### Work (`/work`)
- Vertical scroll through 6 full-viewport project slides
- Each slide: 100vh tall, with one large centered artwork image
- Image inset `10rem` from all edges, `object-fit: contain`, fills remaining height
- Project backgrounds alternate: dark (`#111111`) / light (`#F8F8F8`)
- Project title (bright `rgba(255,255,255,0.85)`) + date + excerpt at bottom-left
- Text column is ~1/3 viewport width (`flex-basis: ~36.84rem`, fixed, doesn't grow)
- Nav overlay: `mix-blend-mode: difference` — up/down SVG circle-chevron arrows, bottom-right
- Nav bar and arrows auto-invert color on dark/light sections
- After the 6 projects: a centered-text page and a footer bar pinned at bottom
- Footer: `"© 2032 All Right Reserved"` + `"Scroll to Top"` link

### About (`/about`)
- Same dark background, nav bar visible
- macOS-style frosted window: `rgba(30,30,30,0.69)` bg, `backdrop-filter: blur(2rem)`, `border-radius: 1.6rem`, 0.5px border
- Window width: ~45% of viewport, centered
- Title bar: colored traffic light dots (red/yellow/green), document emoji + page name, then HR
- Content: two-column flex rows (label left ~13.8rem, content right flex-grow)
- Sections: Contact/Studio, Awards, Press, Imperdiets
- Section labels: `rgba(255,255,255,0.85)`, body: `rgba(255,255,255,0.6)`
- Font: `"Diatype Variable"`, 1rem throughout