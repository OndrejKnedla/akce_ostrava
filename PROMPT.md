# AKCE OSTRAVA!!! — Premium Event Website

> **TL;DR**: Build an Awwwards-level dark-themed event website for a Czech concert/festival production company. React + TypeScript + Vite + Tailwind + Framer Motion + Three.js. 7 pages, 6 mock events, Czech language only. Core differentiators: Three.js particle hero, scroll-driven animations on every section, `!!!` brand motif everywhere, Ostrava industrial aesthetic (cyan + navy + furnace orange). This is a **frontend-only SPA** — no backend, no auth, no payments. All data is hardcoded mock. Forms simulate submit with toasts.

---

## ⚠️ CRITICAL CONSTRAINTS (Read First)

**SCOPE BOUNDARIES — what NOT to implement:**
- NO backend, API, database, or server-side logic
- NO authentication or user accounts
- NO real payment processing — ticket buttons open `#` or placeholder URLs in new tab
- NO real form submissions — forms show success toast + reset on submit
- NO real analytics or tracking — social proof toasts use fake demo data
- NO real Instagram feed — use placeholder images
- NO real Google Maps API key — use iframe embed with `q=` parameter (no key needed)
- ALL data is hardcoded in TypeScript files in `src/data/`

**OUTPUT FORMAT:**
- Generate files in the order of the project structure (section 6)
- Start with config files (`package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `index.html`)
- Then data + types, then utils + hooks, then components (ui → layout → sections → pages), then `App.tsx` + `main.tsx`
- Every file must be complete — no `// ... rest of component` shortcuts
- Use `cn()` utility (clsx + tailwind-merge) for all conditional classNames

**ALL WEBSITE CONTENT MUST BE IN CZECH LANGUAGE.**

---

## 1. BRAND IDENTITY: OSTRAVA!!!

Ostrava is a Czech industrial city known as the "Steel Heart of the Republic." Its official marketing brand **"OSTRAVA!!!"** uses three exclamation marks symbolizing energy, self-confidence, and bold humor. The city transformed from coal mines and steel furnaces into a cultural powerhouse — its industrial heritage (blast furnaces, steel mills, the iconic Dolní Vítkovice complex) is now the backdrop for world-class events.

### The "!!!" Design System

The three exclamation marks `!!!` are the DNA of this brand. Integrate them as:

| Usage | Example |
|---|---|
| Brand name | "AKCE OSTRAVA!!!" — "AKCE" + "OSTRAVA" in white/cyan, "!!!" in accent orange |
| Section separators | Three glowing `!` marks between sections, connected by thin lines |
| CTA energy suffix | "Koupit vstupenky!!!" |
| Loading animation | Three `!` appearing one by one with spring bounce (100ms stagger) |
| Background watermark | Oversized, rotated at 15°, 3–5% opacity on dark sections |
| Back-to-top button | Shaped like stacked `!!!` with hover glow |
| 404 page | "Tady nic není!!! Ale akce máme →" |
| Decorative floaters | Small `!!!` marks floating with gentle sine-wave animation throughout the page |

### Color System

```
PRIMARY (Ostrava official city colors):
├── Cyan:        #00AFD2  — Hero accent. CTAs, links, active states, "!!!" marks, glowing borders, focus rings
├── Navy:        #0B3D63  — Depth & authority. Navbar, footer, section backgrounds, secondary elements
├── Ice White:   #EEF7FF  — Blue-tinted white. Light section backgrounds, card surfaces
└── Pure White:  #FFFFFF  — Text on dark backgrounds, clean surfaces

DARK SURFACES:
├── Deep Black:     #0A0A0F  — Primary dark background
├── Elevated Dark:  #111118  — Cards, modals, elevated surfaces (1dp elevation)
└── Mid Dark:       #1A1A24  — Inputs, secondary surfaces (2dp elevation)

ACCENT (use sparingly):
├── Furnace Orange: #FF6B35  — ONLY urgency: last tickets, countdowns, hot deals. Inspired by molten steel.
├── Ember Red:      #E63946  — Sold out badges, critical alerts only
└── Success Green:  #10B981  — Savings badges, confirmations

GRADIENTS:
├── Hero:       linear-gradient(180deg, #0B3D63 0%, #0A0A0F 60%, transparent 100%) + radial #00AFD2 glow at edges
├── CTA:        linear-gradient(135deg, #00AFD2, #0B3D63)
├── CTA hover:  adds box-shadow: 0 0 30px rgba(255,107,53,0.4)
└── Sections:   Alternate dark(#0A0A0F) → navy(#0B3D63) → light(#EEF7FF) for visual rhythm
```

**Color Rules:**
- Site is **primarily dark themed** — no light/dark toggle needed
- Use `#EEF7FF` light sections for breathing room (testimonials, newsletter, about) — max 2–3 per page
- `#00AFD2` is the dominant accent everywhere — links, borders, highlights, interactive states
- `#FF6B35` orange ONLY for urgency elements, never as primary action color
- Text on dark: `#FFFFFF` (headings) / `rgba(255,255,255,0.7)` (body). Text on light: `#0A0A0F` (headings) / `#0B3D63` (body)
- All interactive elements must have visible focus indicators (2px solid `#00AFD2` outline with 2px offset)

### Typography

| Role | Font | Weight | Style | Source |
|---|---|---|---|---|
| Headlines | **Oswald** | 700 | ALL CAPS, letter-spacing: -0.02em | Google Fonts |
| Body | **Inter** | 400/500/600 | Normal case, line-height: 1.6 | Google Fonts |
| Mono/Accent | **JetBrains Mono** | 500/700 | Dates, prices, countdowns, stats | Google Fonts |

- Font loading: `font-display: swap` on all declarations, preload Oswald 700 + Inter 400
- Type scale (desktop): 14 / 16 / 18 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96px
- Mobile: headlines cap at 48px, body min 16px

### Industrial Aesthetic

- **Grain texture**: CSS `::after` pseudo-element with SVG noise filter at 3% opacity on all dark sections
- **Geometric patterns**: Subtle diagonal hatch lines, rivet dots, angular steel-beam shapes as section accents
- **Dolní Vítkovice skyline**: Inline SVG illustration (blast furnaces, chimneys, steel towers, gas holder silhouette) — footer + faded section backgrounds. Style: geometric/minimal, single color with opacity variations
- **Section dividers**: Thin 1px line (`rgba(0,175,210,0.2)`) with centered `!!!` marks, OR industrial girder silhouette SVG

---

## 2. 3D & VISUAL EFFECTS

> **This is what separates the site from generic templates. Every section must have motion and depth.**

### 2.1 Hero — 3D Particle System (Three.js)

Use **Three.js** (npm package `three` + `@types/three`) to create an immersive particle field:

```
PARTICLE SYSTEM SPEC:
├── Count: 2000 particles (desktop lg+), 800 (mobile/tablet), 0 (prefers-reduced-motion)
├── Geometry: BufferGeometry with randomized positions in 3D volume (x: -50..50, y: -30..30, z: -30..30)
├── Primary particles: #00AFD2, size 2-4px, 80% of total
├── Spark particles: #FF6B35, size 3-6px, 15% of total — brighter, slight glow
├── White particles: #FFFFFF, size 1-2px, 5% of total — stars
├── Animation: Slow rotation of entire system (0.0003 rad/frame on Y axis)
├── Mouse interaction: On mousemove, shift camera position slightly (parallax, max ±2 units). Desktop only.
├── Performance: Use Points material (PointsMaterial), single draw call, requestAnimationFrame
├── Fallback: If WebGL unavailable → pure CSS gradient animation with floating CSS dots (10-15 animated divs)
├── Cleanup: Dispose geometry, material, renderer, and remove resize listener on component unmount
└── Loading state: Show CSS gradient background while Three.js initializes (no blank/white flash)
```

**Performance requirements:**
- 60fps on mid-range devices (test with 4x CPU throttle in DevTools)
- Canvas: `position: absolute`, behind hero content, `pointer-events: none`
- `devicePixelRatio` capped at 2
- Lazy-initialize: dynamic `import('three')`, don't start until hero mounts
- Do NOT import all of Three.js — only import `Scene`, `PerspectiveCamera`, `WebGLRenderer`, `BufferGeometry`, `Float32BufferAttribute`, `PointsMaterial`, `Points`, `Color`

### 2.2 Scroll-Driven Animations (Framer Motion)

**IMPORTANT**: Import from `"framer-motion"` (package name is `framer-motion`, not `motion`).

#### Global Scroll Effects

| Effect | Implementation | Details |
|---|---|---|
| **Scroll progress bar** | Fixed `div` at top, `scaleX` driven by `useScroll` | 3px height, `#00AFD2`, `z-index: 9998` |
| **Parallax backgrounds** | `useTransform` on `scrollYProgress` | Background patterns at 0.5x scroll speed |
| **Sticky spotlight** | `position: sticky` + scroll-driven opacity/scale | Featured Event pins for ~150vh (desktop only — see mobile notes) |
| **Horizontal scroll** | `useTransform` vertical→horizontal `translateX` | Desktop only — see section 3.1 for full spec + mobile fallback |

#### Element Animations (trigger via `whileInView`)

| Animation | Properties | Timing |
|---|---|---|
| **Staggered reveal** | `opacity: 0→1`, `y: 40→0`, `scale: 0.95→1` | `duration: 0.6`, `staggerChildren: 0.1`, `ease: [0.25, 0.4, 0.25, 1]` |
| **Text split reveal** | Each char: `opacity: 0→1`, `y: 30→0` | `staggerChildren: 0.03`, spring physics |
| **Counter forge** | Rapid random digits → settle on final | `duration: 2s`, easeOut, trigger once (`once: true`) |
| **Image reveal wipe** | `#00AFD2` overlay slides left→right, exits right | `duration: 0.8`, cubic-bezier |
| **Card 3D tilt** | `rotateX/Y` from cursor position | Max ±5°, `perspective: 800px`, spring. **Desktop only (`@media (hover: hover)`)** |
| **Floating decorations** | `translateY` ±10px oscillation | `duration: 3-4s`, infinite, random delay |

All animations MUST respect `prefers-reduced-motion`: replace with simple `opacity: 0→1` fade (duration 0.3s) or disable entirely.

#### Page Transitions (AnimatePresence + React Router)

```
EXIT:  opacity 1→0, scale 1→0.98, duration 0.2s
FLASH: #00AFD2 overlay opacity 0→0.3→0, duration 0.15s
ENTER: opacity 0→1, scale 0.98→1, duration 0.3s
```

Wrap route outlet in `AnimatePresence mode="wait"`. Each page component gets `motion.div` with `initial`, `animate`, `exit` props. Scroll to top on route change.

### 2.3 Micro-Interactions

| Element | Effect |
|---|---|
| **CTA buttons** | Hover: expanding `box-shadow` glow (`0 0 20px rgba(0,175,210,0.5)`), inner text slot-machine slide-up |
| **Event cards** | Hover: `translateY: -8px`, border `rgba(0,175,210,0.4)`, image `scale: 1.05`, warm shadow |
| **Links** | Underline draws left→right with `#00AFD2` (`scaleX: 0→1`, `transform-origin: left`) |
| **"!!!" hover** | Each `!` wobbles independently — spring rotation ±5° with 80ms stagger |
| **Navbar** | Transparent → after 50px scroll: `backdrop-filter: blur(16px)`, `bg: rgba(10,10,15,0.85)`, smooth 0.3s transition |
| **Toast notifications** | Slide in from right with spring physics, progress bar auto-dismiss 5s |
| **Ticket progress bars** | Animated fill + shimmer gradient sweep (`translateX` -100%→100%) |
| **Countdown digits** | 3D Y-axis rotation flip per digit change (airport departure board) |

### 2.4 Glassmorphism

Apply to: event cards, modals, navbar (on scroll), filter bar, purchase sidebar.

```css
.glass {
  background: rgba(11, 61, 99, 0.12);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(0, 175, 210, 0.12);
  border-radius: 12px;
  transition: border-color 0.3s ease;
}
.glass:hover {
  border-color: rgba(0, 175, 210, 0.35);
}
```

**Fallback**: If `backdrop-filter` unsupported, use solid `rgba(11, 61, 99, 0.85)` background. Test with `@supports`.

### 2.5 Custom Cursor (Desktop Only)

- Default: 8px circle, `#00AFD2`, `mix-blend-mode: normal`
- Over interactive elements: expands to 40px ring, `mix-blend-mode: difference`
- Smooth interpolation: `requestAnimationFrame` with lerp (factor 0.15)
- Detect touch devices: check `window.matchMedia('(hover: hover)').matches` — hide on touch
- Add `cursor: none` to `body` only when custom cursor active
- **Cleanup**: Remove event listeners and cancel rAF on unmount

---

## 3. PAGE STRUCTURE & CONTENT

### Layout Constants

```
MAX_CONTENT_WIDTH: 1280px (xl breakpoint) — centered with auto margins
SECTION_PADDING:   desktop: py-24 px-8 | tablet: py-16 px-6 | mobile: py-12 px-4
CARD_BORDER_RADIUS: 12px
IMAGE_ASPECT_RATIOS:
  - Event card hero:    16:9
  - Event detail hero:  21:9 (cinematic)
  - Gallery thumbnails: 4:3
  - Artist avatars:     1:1 (circular)
  - Instagram grid:     1:1
IMAGE_PLACEHOLDER: Dark gradient (#111118 → #1A1A24) shown while loading
```

### Z-Index Scale

```
z-cursor:         9999
z-progress-bar:   9998
z-modal-overlay:  9000
z-modal:          9001
z-toast:          8000
z-navbar:         7000
z-sticky-bar:     6000  (mobile purchase bar, sticky filter)
z-back-to-top:    5000
z-cookie-banner:  5500
z-floating-decor: 10    (background decorations)
```

### Popup Priority Queue

Multiple overlays can compete for attention. Rules:
1. **Cookie banner** — shows immediately on first visit, persists until dismissed. Non-blocking (bottom bar), does NOT interfere with other popups.
2. **Newsletter popup** — shows after 30s on site, once per session. If cookie banner still visible, wait until it's dismissed + 5s.
3. **Exit intent popup** — shows once per session, only after 15s on page. If newsletter popup was shown < 10s ago, skip.
4. **Social proof toasts** — show max 3 per session, 30–60s intervals. Pause while any modal/popup is open.

Implement via a `usePopupManager` hook or context that tracks `{ cookieDismissed, newsletterShown, exitIntentShown, toastCount }` in a shared store.

### 3.0 Loading & Skeleton States

| Scenario | What user sees |
|---|---|
| Initial page load | Preloader: dark bg `#0A0A0F` + "AKCE OSTRAVA" + animated `!!!` (1.5s min, then fade out) |
| Lazy page loading (`React.lazy`) | Centered spinner: three `!` marks pulsing in sequence |
| Three.js initializing | CSS gradient hero background (same as final gradient) — no flash |
| Images loading | Aspect-ratio box with dark placeholder `#111118`, subtle shimmer animation |
| Google Maps loading | Dark placeholder box with map pin icon + "Načítání mapy..." text |

### 3.1 HOMEPAGE (`/`)

#### Hero Section (100vh)

```
LAYOUT:
┌────────────────────────────────────────────────┐
│  [Three.js particle canvas - full background]  │
│                                                │
│              AKCE                               │
│           OSTRAVA                               │
│              !!!                                │
│                                                │
│     Koncerty · Festivaly · Zážitky             │
│                                                │
│     ┌──┐ ┌──┐ ┌──┐ ┌──┐  ┌──┐ ┌──┐ ┌──┐     │
│     │15│:│03│:│22│:│47│  │ d│:│ h│:│ m│      │
│     └──┘ └──┘ └──┘ └──┘  └──┘ └──┘ └──┘     │
│     ↑ Countdown to nearest event               │
│                                                │
│  [■ Zobrazit akce!!!]  [□ Odběr novinek]       │
│                                                │
│              ↓ (scroll indicator)               │
└────────────────────────────────────────────────┘
```

- Title: split-character reveal on load. "AKCE" white Oswald 64px (mobile: 40px), "OSTRAVA" `#00AFD2` Oswald 96px (mobile: 56px), "!!!" `#FF6B35` with spring bounce (200ms stagger per `!`)
- Countdown: JetBrains Mono, each digit in dark rounded box with `#00AFD2` border, flip animation on change. Format: `DD : HH : MM : SS` with Czech labels underneath (dní, hodin, minut, sekund)
- Primary CTA: "Zobrazit akce!!!" — gradient button, glow pulse
- Secondary CTA: "Odběr novinek" — ghost button, cyan border
- Scroll indicator: three `!` pointing down, pulsing translateY

#### Upcoming Events — "Nejbližší akce!!!"

- Title: split-character scroll-reveal
- **Filter tabs**: "Vše" | "Koncerty" | "Festivaly" | "VIP Akce" — metallic pill toggles, active: cyan glow + filled
- **Desktop (lg+): Horizontal scroll experience**
  - Container `overflow: hidden`, cards in flex row
  - `useTransform` maps vertical scroll progress → horizontal `translateX`
  - 3–4 visible cards, total width exceeds viewport
  - Visual cue: partial card on right edge + arrow hint
  - After all cards scrolled → releases to vertical scroll
  - **Escape hatch**: small "Přeskočit →" link visible in top-right of section. Also: if user doesn't scroll for 3s while in this section, auto-release.
  - `prefers-reduced-motion`: disable scroll-jacking entirely, show regular grid
- **Tablet (md): 2-column grid**, no horizontal scroll
- **Mobile (< md): vertical stack** with horizontal swipe carousel (CSS `scroll-snap-type: x mandatory`)
- **Event card** (glassmorphism + 3D tilt on desktop):

```
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │ [Image 16:9]      │  │
│  │  ┌─────┐          │  │
│  │  │15.03│ date      │  │
│  │  │2026 │ badge     │  │
│  │  └─────┘          │  │
│  └───────────────────┘  │
│  DJ BOBO — GREATEST     │
│  HITS TOUR 2026         │
│  📍 Ostravar Aréna      │
│  od 1 290 Kč            │
│  [🔴 Early Bird do 1.3.]│
│  [Koupit vstupenky!!!]  │
└─────────────────────────┘
```

  - Image: 16:9 aspect ratio, dark gradient overlay at bottom, cyan wipe reveal on viewport enter
  - Date badge: monospace, absolute positioned on image, dark plate + cyan border
  - Urgency badge: pulsing `#FF6B35` / `#E63946` if applicable
- "Zobrazit všechny akce →" link — underline draws on hover

#### Stats — "Ostrava žije!!!"

- Full-width dark strip + grain texture + large faded `!!!` watermark (5% opacity, rotated 15°)
- 4 counters: responsive grid `4 cols (lg+) → 2×2 (md) → 1 col (mobile)`

| Stat | Value | Label |
|---|---|---|
| Návštěvníků | 50 000+ | ročně |
| Akcí | 100+ | uspořádáno |
| Umělců | 30+ | mezinárodních |
| Zkušeností | 10+ | let na scéně |

- Numbers: JetBrains Mono 700, forge counting animation, triggered once by `useInView({ once: true })`
- 200ms stagger between counters

#### Featured Event Spotlight (Sticky Scroll Section)

- **Desktop (lg+):** Pinned for ~150vh scroll distance with `position: sticky`:
  1. `scroll 0–30%`: Background image zooms (scale 1.0 → 1.08)
  2. `scroll 30–50%`: Title fades in + slides up
  3. `scroll 50–70%`: Date, venue, description fade in
  4. `scroll 70–90%`: CTA button fades in with glow
  5. `scroll 90–100%`: Section unpins
- **Mobile/Tablet (< lg):** NO sticky behavior. Render as normal section with simple staggered fade-in reveals. Background image static with dark overlay.
- Dark overlay: radial gradient (lighter center = cinematic spotlight)
- "Zajistit místo!!!" CTA — extra large, animated glow
- Content: nearest upcoming major event (use `featured: true` from data)

#### About Mini — "Proč Ostrava!!!"

- **Light section** (`#EEF7FF` bg) for breathing room
- Copy: *"Ostrava – ocelové srdce republiky. Město, kde se energie cítí v každé ulici, v každém koncertě, v každém okamžiku. My tu energii přeměňujeme v nezapomenutelné zážitky."*
- SVG Dolní Vítkovice skyline as decorative side element
- Three feature cards (responsive: `3 cols → 1 col`):
  - "Světoví umělci" — Lucide icon: `Music`
  - "Ikonická místa" — Lucide icon: `Landmark`
  - "Nezapomenutelné zážitky" — Lucide icon: `Flame`
- Cards: 3D tilt on hover (desktop), glassmorphism on light bg
- "Více o nás →" link

#### Testimonials — "Co říkají návštěvníci"

- Light section (`#EEF7FF`)
- Auto-playing carousel (5s/slide) with prev/next + dot indicators
- Each card: quote, name, event attended, star rating in `#00AFD2`
- Large decorative quotation marks
- Pause auto-play on hover/focus

#### Newsletter — "Buďte první!!!"

- Dark section with CSS-only floating particle dots (15 small animated circles)
- Headline: *"Buďte první, kdo se dozví o nových akcích!!!"*
- Subtext: *"Odběratelé získávají vstupenky o 48 hodin dříve"*
- Inline form: email input (dark bg, cyan focus glow, validate email regex) + "Přihlásit se!!!" button
- On submit: show success toast "Díky za přihlášení!!!" + reset form. No actual API call.
- Incentive badges: "Exkluzivní předprodej" · "Slevy" · "Insider info"

#### Instagram — "Sledujte nás!!!"

- Grid: 6 Unsplash placeholder images (3×2 desktop, 2×3 mobile), 1:1 aspect ratio
- Hover: darken overlay + Instagram icon + slight scale
- "@akceostrava" link

#### Footer

```
┌──────────────────────────────────────────────┐
│  [SVG Dolní Vítkovice skyline - full width]  │
├──────────────────────────────────────────────┤
│  AKCE OSTRAVA!!!         │ Akce             │
│                          │ O nás            │
│  Ocelové srdce zábavy    │ Kontakt          │
│                          │ FAQ              │
│  📧 info@akceostrava.cz  │ Obchodní podmínky│
│  📱 +420 596 123 456     │ Zásady GDPR      │
│                          │                  │
│  [IG] [FB] [TT] [YT]    │                  │
├──────────────────────────────────────────────┤
│  © 2026 RESTARTSTAGE PRODUCTION s.r.o.       │
│  Ocelové srdce zábavy!!!                     │
└──────────────────────────────────────────────┘
```

- Dark navy (`#0B3D63`) background
- Social icons (Lucide: Instagram, Facebook, Youtube + custom TikTok) with cyan hover glow
- Responsive: 2 cols (desktop) → stacks (mobile)
- "Obchodní podmínky" and "Zásady GDPR" link to `#` (placeholder pages, not built)

### 3.2 EVENTS LIST PAGE (`/akce`)

- **Mini hero**: ~40vh, dark gradient, "Všechny akce!!!" title with split-text reveal
- **Sticky filter bar** (glassmorphism, pins below navbar on scroll, z-index: `z-sticky-bar`):

| Filter | Type | Options |
|---|---|---|
| Kategorie | Pill toggle | Vše / Koncert / Festival / Show |
| Datum | Date picker (native `input[type=date]`) | Od – Do |
| Cena | Range slider (custom component) | 0 Kč – 5 000 Kč |
| Místo | Dropdown/select | Dynamicky z dat (all unique venues) |
| Stav | Toggle pills | V prodeji / Vyprodáno |
| Řazení | Dropdown | Datum / Cena / Popularita |

- On mobile (< md): filter bar collapses into "Filtrovat" button → slides open a drawer/sheet
- **Grid**: `3 cols (lg+) → 2 (md) → 1 (mobile)` — uniform card grid
- Cards: staggered reveal + 3D tilt hover + image wipe reveal (reuse `EventCard`)
- Pagination: "Načíst další!!!" button (show 6 per page, load-more pattern — from local array, not API)
- Empty state: simple SVG empty stage + *"Žádné akce neodpovídají filtru. Zkuste jiný výběr."*
- URL state: filters in URL params for shareability (`/akce?kategorie=koncert&razeni=datum`) via `useSearchParams`

### 3.3 EVENT DETAIL PAGE (`/akce/[slug]`)

- **Hero**: full-width event image, 21:9 aspect ratio (cinematic), parallax (image 0.5x scroll speed, desktop only), dark gradient overlay (heavier at bottom)
- **Title**: Massive Oswald, uppercase, text-shadow: `0 2px 20px rgba(0,0,0,0.5)`
- **Info badges row** (metallic pill style, responsive wrap):
  - 📅 "15. března 2026, 20:00" (Czech formatted)
  - 📍 Venue name (clickable → smooth scroll to map)
  - 💰 "od 1 290 Kč"

- **Sticky purchase sidebar**:
  - **Desktop (lg+):** `position: sticky`, right column, `top: 100px`, glassmorphism. Contains: event name, price, urgency text, "Koupit vstupenky!!!" button
  - **Tablet (md–lg):** same but narrower
  - **Mobile (< md):** `position: fixed` bottom bar, full width, glassmorphism, z-index `z-sticky-bar`. Content: "od X Kč" + "Koupit!!!" button. Always visible.

- **Two-column layout (desktop):** Content left (65%), Sticky sidebar right (35%). Mobile: single column + fixed bottom bar.

- **Content sections** (each with scroll-reveal):

  1. **O akci** — Rich description. Pull-quote styling: large `#00AFD2` left border (4px) on key paragraphs.

  2. **Line-up** (conditional: only for festivals/events with lineup data) — Artist cards grid: circular photo (1:1), name, genre tag pill. 3D tilt on hover (desktop). Responsive: `4 cols → 3 → 2`.

  3. **Vstupenky** — Ticket tier cards:

```
  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │  STANDARD   │  │ ★ VIP ★     │  │  PREMIUM    │
  │             │  │ Nejoblíbenější│ │             │
  │  1 290 Kč   │  │  2 490 Kč   │  │  3 990 Kč   │
  │             │  │  ̶2̶ ̶9̶9̶0̶ ̶K̶č̶   │  │             │
  │  ✓ Vstup    │  │  ✓ Vstup    │  │  ✓ Vstup    │
  │  ✓ Stání    │  │  ✓ VIP zóna │  │  ✓ Premium  │
  │             │  │  ✓ Drink     │  │  ✓ Meet&greet│
  │             │  │  ✓ Merch     │  │  ✓ All incl │
  │             │  │             │  │             │
  │ ████████░░ │  │ ██████░░░░ │  │ █████████░ │
  │ Zbývá 340   │  │ Zbývá 85    │  │ Zbývá 12!!! │
  │             │  │             │  │             │
  │ [Koupit]    │  │ [Koupit!!!] │  │ [Koupit]    │
  └─────────────┘  └─────────────┘  └─────────────┘
                   ↑ highlighted with special border + glow
```

  - **Responsive**: `3 cols (lg+) → horizontal scroll with snap (md) → vertical stack (mobile)`
  - Availability bar: animated fill + shimmer sweep
  - Low stock (< 50): `#FF6B35` pulsing text + subtle shake
  - "Ušetříte X Kč!!!" in `#10B981` green
  - "Nejoblíbenější" tag on `highlighted: true` tier
  - Button → `<a href={externalUrl} target="_blank" rel="noopener noreferrer">`

  4. **Místo konání** — Venue photo (16:9), address text, Google Maps `<iframe>` embed (lazy loaded via intersection observer, `loading="lazy"`), transport info (MHD lines, parking options). Use embed URL format: `https://maps.google.com/maps?q={encoded_address}&output=embed`

  5. **Galerie** — Photo grid (CSS grid, 3 cols desktop, 2 tablet, 1 mobile), 4:3 aspect ratio. Click opens lightbox: dark overlay, zoomed image, prev/next arrows, close on ESC + overlay click + × button. Keyboard navigable.

  6. **FAQ** — Accordion with Framer Motion `AnimatePresence` + `layout` for smooth height. Chevron rotation on open.

- **Share row**: WhatsApp (`https://wa.me/?text={encoded}`) | Facebook (`https://www.facebook.com/sharer/sharer.php?u={url}`) | Copy link (Clipboard API → "Zkopírováno!!!" toast) | "Přidat do kalendáře" (.ics download)
- **Related events**: "Mohlo by vás také zajímat!!!" — horizontal carousel (CSS scroll-snap), 3 visible, same `EventCard` component

### 3.4 ABOUT PAGE (`/o-nas`)

- Hero: "O nás!!!" ~40vh, dark gradient
- **Story section**: Alternating text + image blocks with parallax on images (desktop)
- Mock copy:
  - *"RESTARTSTAGE PRODUCTION přináší do Ostravy to nejlepší ze světové zábavy od roku 2016. Začínali jsme s malými klubovými akcemi a dnes plníme největší haly v regionu."*
  - *"Naším posláním je proměnit industriální duši Ostravy v pulzující centrum zábavy. Každý koncert, každý festival, každá show — to je náš způsob, jak říct světu: Ostrava žije!!!"*
- **Timeline** (milestones):

| Rok | Událost |
|---|---|
| 2016 | Založení RESTARTSTAGE PRODUCTION |
| 2018 | První akce v Ostravar Aréně — 5 000 diváků |
| 2020 | Online streaming série "Ostrava z domova" |
| 2022 | Expansion do Dolních Vítkovic — open-air festivaly |
| 2024 | 50 000. návštěvník!!! |
| 2026 | Nejambicióznější sezóna v historii |

  - Desktop: horizontal timeline with scroll-driven dot progression
  - Mobile: vertical timeline with left-side line + dots
- **Team section** (3 mock members):
  - Jakub Novotný — Zakladatel & CEO
  - Tereza Kovářová — Kreativní ředitelka
  - Martin Svoboda — Produkční manažer
  - Cards: placeholder avatar, hover overlay with role + one-sentence bio
- **Partner logos**: 6 placeholder logo rectangles, grayscale → color on hover
- Stats counters (reuse `StatsSection` component)
- CTA: "Spolupracujte s námi!!!" → link to `/kontakt`

### 3.5 CONTACT PAGE (`/kontakt`)

- Split layout: form (left 60%) + info (right 40%). Mobile: stacked (info first, then form).
- **Form fields** (all with dark bg, cyan focus glow, inline validation):
  - Jméno (text, required)
  - Email (email, required, regex validate)
  - Předmět (select: Obecný dotaz / Spolupráce / Reklamace / Jiné)
  - Zpráva (textarea, required, min 10 chars)
  - "Odeslat zprávu!!!" submit button
  - On submit: validate → success toast *"Zpráva odeslána!!! Ozveme se do 24 hodin."* → reset form
- **Contact info:**
  - 📧 info@akceostrava.cz
  - 📱 +420 596 123 456
  - 📍 Stodolní 12, 702 00 Ostrava
  - Socials: IG, FB, TikTok, YT icons
- Google Maps embed (same lazy-load as event detail)
- FAQ accordion at bottom (general FAQs from data)

### 3.6 FAQ PAGE (`/faq`)

- Search input at top: live filtering, debounced 300ms, cyan focus glow
- Categories as tab pills: Vstupenky | Místo konání | Vrácení | VIP | Obecné
- Accordion items with Framer Motion expand/collapse

**General FAQ data (hardcode these):**

| Kategorie | Otázka | Odpověď |
|---|---|---|
| Vstupenky | Kde koupím vstupenky? | Vstupenky zakoupíte přímo přes naše stránky kliknutím na tlačítko "Koupit vstupenky" u vybrané akce. Budete přesměrováni na náš partnerský ticketingový systém. |
| Vstupenky | Mohu vstupenku vrátit? | Vstupenky je možné vrátit nejpozději 14 dní před konáním akce. Kontaktujte nás na info@akceostrava.cz s číslem objednávky. |
| Vstupenky | Jak získám Early Bird slevu? | Early Bird vstupenky jsou k dispozici v omezeném množství do uvedeného data. Sledujte náš newsletter — odběratelé mají přístup o 48 hodin dříve!!! |
| Místo konání | Kde zaparkuji? | Každé místo konání má vlastní parkovací možnosti uvedené v detailu akce. U Ostravar Arény doporučujeme parkoviště P1 (Cinstar). |
| Místo konání | Je místo bezbariérové? | Ano, všechna naše hlavní místa konání (Ostravar Aréna, Dolní Vítkovice) jsou bezbariérově přístupná. Kontaktujte nás předem pro speciální potřeby. |
| VIP | Co zahrnuje VIP vstupenka? | VIP vstupenky zahrnují vstup do VIP zóny s vlastním barem, lepší výhled, a dle akce další benefity (welcome drink, merchandise, meet & greet). Detaily u každé akce. |
| VIP | Stojí VIP za to? | Rozhodně!!! VIP zóna nabízí exkluzivní zážitek — méně lidí, lepší výhled, vlastní bar a toalety. Pro nezapomenutelný večer je to jasná volba. |
| Obecné | Jak vás kontaktuji? | Napište nám na info@akceostrava.cz nebo volejte +420 596 123 456 (Po–Pá 9–17). Nebo použijte kontaktní formulář. |
| Obecné | Pořádáte akce i mimo Ostravu? | Aktuálně se zaměřujeme na Ostravu a okolí. Ostrava má nejlepší industriální venues v ČR — proč chodit jinam?!!! |
| Vrácení | Jaké jsou podmínky vrácení? | Vrácení je možné do 14 dní před akcí za administrativní poplatek 10%. Po tomto termínu vstupenky nelze vrátit, ale můžete je převést na jinou osobu. |

- No results: *"Nenašli jsme odpověď na vaši otázku. Napište nám!!!"* → link to `/kontakt`

### 3.7 404 PAGE

- Dark background + CSS-only floating particles (lightweight — 10 animated divs)
- "404" in massive Oswald (200px desktop, 120px mobile), `#00AFD2`
- "Tady nic není!!!" with spring bounce on each `!`
- "Ale akce máme →" CTA button → homepage
- Below: "Zatím se podívejte na:" + one random `EventCard`

---

## 4. CONVERSION OPTIMIZATION

### Urgency & Scarcity

| Trigger | Element | Animation |
|---|---|---|
| ≤ 50 tickets left | "Poslední vstupenky!!!" badge on card | `scale` pulse 1→1.05, `#E63946` bg, 1.5s loop |
| Availability bar < 20% | Bar turns `#FF6B35` | Shimmer + glow |
| Early bird deadline exists | Countdown timer on card + detail | 3D flip-digit display |
| Sold out (`status: 'sold-out'`) | "Vyprodáno" overlay + blur | Greyscale filter + 40% opacity, no CTA |
| Detail page | "Právě si prohlíží X lidí" | Eye icon + random number 12–47, subtle ±1 every 10s |

### Social Proof

- **Toast notifications**: *"Petr z Ostravy právě koupil 2 vstupenky na DJ Bobo"*
  - Trigger: random 30–60s intervals
  - Max 3 per session (track in popup manager state)
  - Pause while any modal is open
  - Data pool (hardcode 20+ entries):

```typescript
const SOCIAL_PROOF_POOL = [
  { name: 'Petr', city: 'Ostravy', tickets: 2 },
  { name: 'Jana', city: 'Opavy', tickets: 1 },
  { name: 'Tomáš', city: 'Frýdku-Místku', tickets: 3 },
  { name: 'Lucie', city: 'Havířova', tickets: 2 },
  { name: 'Martin', city: 'Karviné', tickets: 1 },
  { name: 'Kateřina', city: 'Ostravy', tickets: 4 },
  { name: 'David', city: 'Brna', tickets: 2 },
  { name: 'Michaela', city: 'Olomouce', tickets: 1 },
  { name: 'Jakub', city: 'Prahy', tickets: 2 },
  { name: 'Tereza', city: 'Ostravy', tickets: 1 },
  { name: 'Ondřej', city: 'Třince', tickets: 2 },
  { name: 'Simona', city: 'Zlína', tickets: 1 },
  { name: 'Pavel', city: 'Nového Jičína', tickets: 3 },
  { name: 'Veronika', city: 'Ostravy', tickets: 2 },
  { name: 'Filip', city: 'Přerova', tickets: 1 },
  { name: 'Markéta', city: 'Opavy', tickets: 2 },
  { name: 'Radek', city: 'Ostravy', tickets: 1 },
  { name: 'Eva', city: 'Frýdku-Místku', tickets: 2 },
  { name: 'Lukáš', city: 'Hradce Králové', tickets: 1 },
  { name: 'Aneta', city: 'Ostravy', tickets: 3 },
];
// Format: "{name} z {city} právě koupil/a {tickets} vstupenky"
```

  - Format: avatar circle with initials + message + event name
- "1 250 lidí už má vstupenku!!!" counter on event detail page

### Exit Intent Popup (Desktop Only)

- Trigger: `mouseleave` on `document` when cursor exits above viewport
- Only after 15s on page, once per session (managed by popup manager)
- Glassmorphism modal with spring scale (`0.9→1.0`):
  - *"Nechcete přijít o [Event Name]?!!"*
  - Event image + date
  - "Koupit vstupenky!!!" primary CTA
  - "Přihlásit k odběru" secondary
  - Close: × button + overlay click + ESC key
  - Focus trap inside modal (keyboard a11y)

### Price Psychology

- Original price: `line-through`, `opacity: 0.5`, smaller font
- "Ušetříte X Kč!!!" green `#10B981` badge next to price
- "Nejoblíbenější" tag on `highlighted: true` tier with special cyan border glow
- VIP card slightly scaled up (1.02) and elevated relative to others

### Newsletter Popup

- After 30s, once per session (popup manager)
- Glassmorphism modal, same visual style as exit intent
- *"Odběratelé dostávají vstupenky o 48 hodin dříve!!!"*
- Email input + "Přihlásit se!!!" CTA
- Close: × + overlay + ESC
- On submit: success toast + close popup

### Sharing

- WhatsApp: `https://wa.me/?text={encodedURIComponent(title + ' ' + url)}`
- Facebook: `https://www.facebook.com/sharer/sharer.php?u={encodedUrl}`
- Copy link: Clipboard API → "Zkopírováno!!!" toast
- Calendar: generate .ics file:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:{ISO date}
DTEND:{ISO date + 3h}
SUMMARY:{event title}
LOCATION:{venue name, address}
DESCRIPTION:{short description}
URL:{event page URL}
END:VEVENT
END:VCALENDAR
```

Timezone: Europe/Prague. Trigger download as `{slug}.ics`.

---

## 5. MOCK DATA

### TypeScript Interfaces

```typescript
// src/types/index.ts

export interface EventData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'koncert' | 'festival' | 'show';
  date: string;        // ISO "2026-03-15"
  time: string;        // "20:00"
  endTime?: string;    // "23:00" (for .ics calculation)
  venue: Venue;
  description: string; // Multiple paragraphs, plain text (render with <p> splits)
  image: string;       // Unsplash URL with w=800
  gallery: string[];   // Unsplash URLs with w=600
  tickets: TicketTier[];
  lineup?: Artist[];
  status: 'on-sale' | 'early-bird' | 'last-tickets' | 'sold-out';
  totalCapacity: number;
  ticketsSold: number;
  earlyBirdDeadline?: string; // ISO date
  featured: boolean;
  faq: FAQItem[];
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  mapQuery: string;     // URL-encoded query for Google Maps embed
  transport: string;    // MHD/parking info
  image?: string;       // Venue photo
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  available: number;
  total: number;
  highlighted?: boolean;
  purchaseUrl: string;  // "#" for mock
}

export interface Artist {
  name: string;
  genre: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number; // 1-5
}
```

### The 6 Events

| # | Title | Venue | Date | Price | Category | Status | Special |
|---|---|---|---|---|---|---|---|
| 1 | DJ Bobo – Greatest Hits Tour 2026 | Ostravar Aréna | 2026-03-15, 20:00 | 1 290 Kč | Koncert | early-bird (do 1.3.) | 3 tiers: 1290/2490/3990 |
| 2 | Boris Brejcha – Reflections Tour | Ostravar Aréna | 2026-05-22, 21:00 | 1 490 Kč | Koncert | on-sale (180 left) | 2 tiers: 1490/2990 |
| 3 | Hradní Oldies Festival 2026 | Slezskoostravský hrad | 2026-07-18, 15:00 | 890 Kč | Festival | on-sale | Lineup. 3 tiers: 890/1890/2890 |
| 4 | Disney On Ice – Into the Magic | Ostravar Aréna | 2026-10-10, 17:00 | 690 Kč | Show | on-sale | 3 tiers: 1290/990/690 |
| 5 | 90s Rave Revival | Fabric Club | 2026-04-05, 22:00 | 490 Kč | Koncert | last-tickets (23 left) | 2 tiers: 490/1290 |
| 6 | Summer Electronic Festival 2026 | Dolní Vítkovice | 2026-08-15, 14:00 | 1 190 Kč | Festival | early-bird (do 30.6.) | 3 tiers: 1190/1590/2990 |

**For each event, generate in the data file:**
- 2–3 paragraph Czech description (brand voice — energetic, proud, use `!!!` sparingly at peaks)
- Complete ticket tier data with features
- 4 gallery Unsplash URLs (use `https://images.unsplash.com/photo-{id}?w=800&h=450&fit=crop`)
- 3–4 FAQ items specific to the event
- Venue with full address, transport info, map query

**Event #1 featured: true** (used in spotlight section).

**Unsplash image themes:**
- Concerts: crowd shots, stage lights, DJ booths, confetti
- Festivals: outdoor stages, daylight crowds, aerial views
- Shows: arena interiors, ice skating, theatrical lighting
- Dolní Vítkovice: industrial architecture, blast furnaces

### Testimonials Data (hardcode 6)

```typescript
// src/data/testimonials.ts — generate these with realistic Czech text
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Petra Nováková',
    event: 'Summer Electronic Festival 2025',
    quote: 'Atmosféra v Dolních Vítkovicích byla naprosto magická. Industriální kulisa s elektronickou hudbou — lepší kombinaci si nedovedu představit. Příští rok jdu znovu!!!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Tomáš Horáček',
    event: 'DJ Bobo Live 2024',
    quote: 'S manželkou jsme si to užili jako za mlada. Skvělá organizace, super zvuk, a ta show! Bobo umí rozjet arénu jako nikdo jiný.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Lucie Šťastná',
    event: 'Hradní Oldies Festival 2025',
    quote: 'Slezskoostravský hrad má úžasnou atmosféru. Village People naživo — splněný sen! VIP vstupenka se rozhodně vyplatila.',
    rating: 4,
  },
  {
    id: '4',
    name: 'Martin Krejčí',
    event: '90s Rave Revival 2025',
    quote: 'Kdo nezažil, nepochopí. Tenhle návrat do 90s byl naprosto autentický. Fabric Club praskal ve švech. Příště beru celou partu!!!',
    rating: 5,
  },
  {
    id: '5',
    name: 'Karolína Dvořáková',
    event: 'Disney On Ice 2025',
    quote: 'Dcerka z toho byla naprosto nadšená, a upřímně — já taky. Krásné kostýmy, skvělé choreografie. Rodinný výlet, který stál za to.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Radek Procházka',
    event: 'Boris Brejcha 2024',
    quote: 'Boris Brejcha je zvukový génius. Ta journey, co předvedl v Ostravar Aréně, byla dvouhodinový trip do jiného světa. Za mě nejlepší akce roku.',
    rating: 5,
  },
];
```

---

## 6. TECHNICAL STACK & ARCHITECTURE

### Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | **React** | 18.x | Functional components, hooks only |
| Language | **TypeScript** | strict mode | All components and data typed |
| Build | **Vite** | 5.x | Fast HMR, code splitting |
| Styling | **Tailwind CSS** | 3.4.x | JS config file (`tailwind.config.js`), NOT v4 CSS config |
| Animations | **framer-motion** | 11.x | Import from `"framer-motion"`. Use for scroll, page, hover animations |
| 3D | **three** | 0.160+ | npm package + `@types/three`. Hero particle system only |
| Routing | **react-router-dom** | 6.x | `createBrowserRouter`, `useParams`, `useSearchParams` |
| Head mgmt | **react-helmet-async** | 2.x | Dynamic `<title>`, meta descriptions, OG tags per page |
| Icons | **lucide-react** | latest | Consistent icon set |
| Utilities | **clsx** + **tailwind-merge** | latest | Combined in `cn()` utility |
| Fonts | **Google Fonts** | CDN | Oswald, Inter, JetBrains Mono via `<link>` in index.html |

### Browser Support

- Chrome/Edge: last 2 versions
- Firefox: last 2 versions
- Safari: 15.4+
- iOS Safari: 15.4+
- `backdrop-filter`: supported in all targets. Add `-webkit-` prefix. Fallback with `@supports` to solid bg.
- WebGL: supported in all targets. Fallback for rare cases (see particle system spec).

### Project Structure

```
/
├── index.html                  # <html lang="cs">, Google Fonts links, OG defaults
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js          # Custom colors, fonts, animations, keyframes
├── postcss.config.js
└── src/
    ├── main.tsx                # createBrowserRouter, RouterProvider, HelmetProvider
    ├── App.tsx                 # Root layout: Navbar + ScrollProgress + Outlet + Footer + overlays
    ├── index.css               # @tailwind directives, @layer for grain texture, cursor, global styles
    ├── types/
    │   └── index.ts            # All interfaces (EventData, TicketTier, Artist, etc.)
    ├── data/
    │   ├── events.ts           # All 6 events with complete data
    │   ├── testimonials.ts     # 6 testimonials
    │   ├── faq.ts              # General FAQ data (10 items)
    │   └── socialProof.ts      # 20 social proof entries (names, cities, ticket counts)
    ├── store/
    │   └── usePopupStore.ts    # Zustand store OR React context for popup state management
    ├── hooks/
    │   ├── useScrollProgress.ts
    │   ├── useCountUp.ts       # Animated counter (random digits → final)
    │   ├── useICalendar.ts     # Generate + download .ics
    │   ├── useMediaQuery.ts    # SSR-safe media query hook
    │   └── useReducedMotion.ts # prefers-reduced-motion detection
    ├── utils/
    │   ├── cn.ts               # clsx + twMerge
    │   ├── formatCzechDate.ts  # "15. března 2026" formatting
    │   └── generateICS.ts      # .ics string generation
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx      # Glassmorphism navbar + mobile hamburger menu
    │   │   ├── MobileMenu.tsx  # Fullscreen overlay menu (slide from right, staggered link reveals)
    │   │   ├── Footer.tsx      # Full footer with skyline SVG
    │   │   ├── ScrollProgress.tsx
    │   │   ├── CustomCursor.tsx
    │   │   ├── Preloader.tsx
    │   │   └── PageTransition.tsx  # motion.div wrapper for route animations
    │   ├── hero/
    │   │   ├── HeroSection.tsx
    │   │   └── ParticleCanvas.tsx  # Three.js (lazy loaded via dynamic import)
    │   ├── events/
    │   │   ├── EventCard.tsx
    │   │   ├── EventGrid.tsx
    │   │   ├── HorizontalScroll.tsx  # Desktop horizontal scroll section
    │   │   ├── FilterBar.tsx
    │   │   ├── TicketTier.tsx
    │   │   ├── Countdown.tsx
    │   │   ├── PurchaseSidebar.tsx   # Desktop sticky sidebar
    │   │   └── MobilePurchaseBar.tsx # Mobile fixed bottom bar
    │   ├── sections/
    │   │   ├── StatsSection.tsx
    │   │   ├── FeaturedSpotlight.tsx
    │   │   ├── AboutMini.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── Newsletter.tsx
    │   │   └── InstagramGrid.tsx
    │   ├── ui/
    │   │   ├── Button.tsx          # Variants: primary, ghost, cta (with glow)
    │   │   ├── GlassCard.tsx
    │   │   ├── SplitText.tsx
    │   │   ├── AnimatedCounter.tsx
    │   │   ├── Accordion.tsx
    │   │   ├── Toast.tsx           # Toast container + individual toast
    │   │   ├── Lightbox.tsx
    │   │   ├── Modal.tsx           # Reusable modal (focus trap, ESC, overlay close)
    │   │   ├── ExitIntentPopup.tsx
    │   │   ├── NewsletterPopup.tsx
    │   │   ├── SocialProofToast.tsx
    │   │   ├── CookieBanner.tsx
    │   │   ├── BackToTop.tsx
    │   │   ├── SkipLink.tsx        # "Přeskočit na obsah" a11y
    │   │   ├── SuspenseFallback.tsx # Loading spinner (three ! marks)
    │   │   └── ImageWithPlaceholder.tsx # Image with aspect ratio + shimmer loading
    │   └── svg/
    │       └── OstravaSkyline.tsx
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── EventsPage.tsx
    │   ├── EventDetailPage.tsx
    │   ├── AboutPage.tsx
    │   ├── ContactPage.tsx
    │   ├── FAQPage.tsx
    │   └── NotFoundPage.tsx
    └── seo/
        └── EventJsonLd.tsx     # JSON-LD Event schema component
```

### Tailwind Config

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ostrava: {
          cyan: '#00AFD2',
          navy: '#0B3D63',
          ice: '#EEF7FF',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          elevated: '#111118',
          mid: '#1A1A24',
        },
        furnace: '#FF6B35',
        ember: '#E63946',
        success: '#10B981',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 175, 210, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 175, 210, 0.6)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

### Mobile Hamburger Menu Detail

The `MobileMenu.tsx` is a critical component. Spec:

- **Trigger**: Hamburger icon (3 lines) in navbar, right side. On click, morphs to × (animated with CSS transition).
- **Overlay**: Fullscreen, `position: fixed`, dark bg `rgba(10,10,15,0.98)`, `z-index: z-modal`
- **Animation**: Slide in from right (translateX 100% → 0), duration 0.3s, ease-out
- **Content**: Centered vertically:
  - "AKCE OSTRAVA!!!" logo at top
  - Nav links stacked: Akce, O nás, Kontakt, FAQ — each animates in with stagger (0.05s delay), slide from right
  - Active page highlighted with `#00AFD2` text + left border
  - Social icons row at bottom
  - Decorative floating `!!!` marks in background (subtle, 5% opacity)
- **Close**: × button + tap outside links area + ESC key + any link click (navigates + closes)
- **Body scroll**: `overflow: hidden` on body while menu open
- **Focus trap**: Tab cycles within menu items

### Performance Requirements

| Metric | Target | How |
|---|---|---|
| LCP | < 2.5s | Preload hero fonts + critical CSS, lazy-load below-fold |
| FID/INP | < 100ms | Defer Three.js init, no main-thread blocking > 50ms |
| CLS | < 0.1 | Explicit aspect ratios on all images, `font-display: swap` |
| FPS | 60fps | GPU transforms only (`transform`, `opacity`), no layout triggers in scroll handlers |
| Initial bundle | < 300KB gzipped | Code-split pages, tree-shake Three.js, lazy components |

**Strategies:**
- `React.lazy` + `Suspense` (with `SuspenseFallback`) for all page components
- Dynamic `import('three')` in `ParticleCanvas` — never in main bundle
- Lazy-load Google Maps iframes via intersection observer
- Images: Unsplash `?w=` for responsive sizes, `loading="lazy"` below fold, `ImageWithPlaceholder` for shimmer
- `will-change: transform` only during active animations
- `prefers-reduced-motion`: disable particles, parallax, 3D tilt, horizontal scroll-jacking, complex transitions → simple fades

### SEO & Meta

- `<html lang="cs">`
- `react-helmet-async` on every page:
  - `<title>` — e.g. "DJ Bobo – Greatest Hits Tour 2026 | AKCE OSTRAVA!!!"
  - `<meta name="description">` — unique per page
  - `<meta property="og:title/description/image/url">`
  - `<link rel="canonical">`
- `EventJsonLd` component on event detail pages (JSON-LD `Event` schema with `name`, `startDate`, `location`, `offers`, `performer`)
- Static `robots.txt` + `sitemap.xml` in `/public/`

### Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Color contrast | All text ≥ 4.5:1 ratio. Note: `#00AFD2` on `#0A0A0F` = 7.2:1 ✓. On `#EEF7FF` = 3.1:1 ✗ — use `#0B3D63` for cyan-on-light text. |
| Focus indicators | `outline: 2px solid #00AFD2`, `outline-offset: 2px` on all interactive elements. Visible on both dark and light backgrounds. |
| Keyboard nav | Full tab order, Enter/Space on buttons, ESC closes modals/menus/lightbox. Arrow keys in carousels. |
| Screen readers | `alt` on images, `aria-label` on icon-only buttons, `aria-live="polite"` on toasts, `role="dialog"` + `aria-modal="true"` on modals |
| Reduced motion | `useReducedMotion()` hook → disable particles, parallax, tilt, horizontal scroll-jacking. All animations become simple opacity fades. |
| Skip navigation | `SkipLink` component: "Přeskočit na obsah" — visually hidden, visible on focus, links to `<main id="main-content">` |
| Forms | Every `<input>` has `<label>`. Error messages linked via `aria-describedby`. |

### GDPR Cookie Banner

- Shows on first visit (check `localStorage` key `cookie-consent`)
- Non-blocking: bottom bar (not modal overlay), z-index `z-cookie-banner`
- Glassmorphism styling, slides up from bottom with spring animation
- Text: *"Používáme cookies pro zlepšení vašeho zážitku na webu."*
- Three options: "Přijmout vše" (primary button) | "Nastavení" (secondary, mock — just shows toast "Funkce bude brzy k dispozici") | "Odmítnout" (text link)
- Persists choice in `localStorage`, never shows again

### Responsive Breakpoints (Tailwind defaults)

```
sm:  640px    — large phones landscape
md:  768px    — tablets portrait
lg:  1024px   — tablets landscape / small desktops
xl:  1280px   — desktops (= max-content-width)
2xl: 1536px   — large desktops
```

Mobile-first: base = mobile, progressively enhance upward.

**Key responsive adaptations:**
| Component | Mobile (< md) | Tablet (md–lg) | Desktop (lg+) |
|---|---|---|---|
| Navbar | Hamburger menu | Hamburger menu | Full horizontal nav |
| Hero title | 40/56px | 56/80px | 64/96px |
| Event cards | 1 col stack or swipe | 2 col grid | Horizontal scroll |
| Stats | 1 col | 2×2 grid | 4 col row |
| Ticket tiers | Vertical stack | Horizontal scroll-snap | 3 col row |
| Spotlight | Normal section, no sticky | Normal section, no sticky | Sticky scroll |
| Purchase bar | Fixed bottom bar | Sticky sidebar | Sticky sidebar |
| Filter bar | Collapse to "Filtrovat" drawer | Full bar | Full bar |
| Gallery | 1 col | 2 cols | 3 cols |

---

## 7. BRAND VOICE (Czech Copy Guidelines)

**Tone**: Bold, energetic, proudly Ostravian, slightly irreverent. Entertainment, not corporate.

**Rules:**
- Use `!!!` at emotional peaks only — NOT on every line (max 2–3 per visible section)
- Mix energy with confidence: bold exclamations + smooth statements
- Use "ty" (informal you), not "vy" (formal)

**Do ✓:**
- "Ostrava žije hudbou!!!"
- "Kde se ocel potkává s beaty"
- "Tohle nechceš propásnout!!!"
- "Ocelové srdce zábavy"
- "Zažij to naživo!!!"
- "Přidej se k tisícům, kteří vědí, kde se to děje"

**Don't ✗:**
- "Vítejte na naší webové stránce!!!" (generic)
- `!!!` in body paragraphs (dilutes impact)
- Formal/corporate: "Společnost XY si Vás dovoluje pozvat..." (NO)
- English words where Czech works fine

---

## 8. BONUS FEATURES

- **Cmd+K / Ctrl+K search**: Glassmorphism modal, search input, live filter events by title. Spring scale open animation. Close: ESC + overlay.
- **Easter egg**: Konami code (↑↑↓↓←→←→BA) → fullscreen spark fireworks with "OSTRAVA!!!" text. Auto-dismiss after 3s.
- **Smooth scroll**: `scroll-behavior: smooth` in CSS + programmatic `scrollIntoView({ behavior: 'smooth' })` for anchor links
- **Back to top `!!!`**: `position: fixed`, bottom-right, appears after 500px scroll. Three stacked `!` with hover glow. Smooth scroll to top.

---

## 9. ANTI-PATTERNS (Don't Do These)

Common mistakes to avoid:

| Anti-pattern | Correct approach |
|---|---|
| String concatenation for classNames (`"btn " + active && "btn-active"`) | Always use `cn()` utility |
| Missing `key` prop in `.map()` lists | Use unique `id` from data, never array index |
| Giant monolithic page components (500+ lines) | Break into focused components, import from sections/ |
| `setTimeout` for animations | Use Framer Motion or CSS animations exclusively |
| Missing cleanup in `useEffect` (Three.js, event listeners, intervals) | Always return cleanup function |
| Importing entire `three` module | Import only needed classes: `import { Scene, ... } from 'three'` |
| Ignoring `prefers-reduced-motion` | Check with `useReducedMotion()` hook, provide fallbacks |
| Hardcoded strings in multiple places | Define in data files, import where needed |
| `cursor: none` on mobile | Check `(hover: hover)` media query before hiding cursor |
| `useEffect` for derived state | Use `useMemo` or compute in render |
| Inline styles for animations | Use Framer Motion props or Tailwind animation classes |
| Missing `rel="noopener noreferrer"` on external links | Always add on `target="_blank"` links |

---

## 10. PRIORITIES (Ranked)

1. **VISUAL SPECTACLE** — 3D particle hero, scroll animations, micro-interactions, cinematic transitions. Must WOW.
2. **OSTRAVA IDENTITY** — `!!!` motif, industrial aesthetic, city colors in every element
3. **CONVERSION** — Every design decision drives toward ticket purchase
4. **MOBILE EXCELLENCE** — Most traffic from social media phones. Touch-first.
5. **PERFORMANCE** — 60fps, sub-3s load, smooth on mid-range phones
6. **ACCESSIBILITY** — WCAG 2.1 AA compliance, keyboard nav, reduced motion support

---

## 11. COMPLETION CHECKLIST

Before considering the output complete, verify ALL of the following:

- [ ] All 7 pages render and route correctly (`/`, `/akce`, `/akce/[slug]`, `/o-nas`, `/kontakt`, `/faq`, `404`)
- [ ] All 6 events have complete data (description, tickets, gallery, FAQ, venue)
- [ ] Three.js particle hero loads and animates (with fallback)
- [ ] Page transitions work via AnimatePresence
- [ ] Scroll progress bar visible at top
- [ ] Navbar: transparent → glassmorphism on scroll
- [ ] Mobile hamburger menu opens/closes with animation
- [ ] Event cards have 3D tilt (desktop) and image wipe reveal
- [ ] Stats section counters animate on scroll
- [ ] Featured spotlight section has sticky scroll behavior (desktop)
- [ ] Countdown timer works with flip digits
- [ ] Ticket tiers display with progress bars and shimmer
- [ ] Filter bar works on events page
- [ ] Lightbox works in event gallery
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Cookie banner shows on first visit
- [ ] Social proof toasts appear periodically
- [ ] Newsletter form validates and shows success toast
- [ ] Contact form validates and shows success toast
- [ ] Share buttons generate correct URLs
- [ ] .ics calendar download works
- [ ] Back-to-top button appears and works
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] `prefers-reduced-motion` disables complex animations
- [ ] Skip link visible on focus
- [ ] All Unsplash images have proper `alt` text
- [ ] `react-helmet-async` sets title/meta per page
- [ ] JSON-LD Event schema on event detail pages
- [ ] No TypeScript errors in strict mode
- [ ] No console errors or warnings

---

**Generate the complete multi-page application with all components, pages, mock data, animations, and 3D effects. Every file must be complete. Make it production-ready, visually spectacular, and worthy of Ostrava's bold spirit!!!**
