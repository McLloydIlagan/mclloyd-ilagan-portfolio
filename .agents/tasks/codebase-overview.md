# Portfolio Website — Codebase Overview

**Project:** `mclloyd-ilagan-portfolio` — personal portfolio for Mc Lloyd Silverio Ilagan
**Root:** `c:\Users\LloydIlagan\Desktop\portfolio_website\mclloyd-ilagan-portfolio`
**Investigation type:** read-only (no files modified)
**Generated:** from a full read of every source file, build config, and asset inventory

---

## Summary (answer first)

This is a single-page **React 19 + Vite 8** portfolio styled with **Tailwind CSS v4** (CSS-first, no `tailwind.config.js`), animated with **Framer Motion**, and iconified with **react-icons**. It is a **single-page application** composed of nine stacked content sections plus a fixed navbar, a canvas-based animated background, a footer, and a back-to-top button. All content is driven from one plain-JS data module, `src/data/portfolioData.js`, which exports nine named objects/arrays; each component maps data to UI with a per-component `iconMap` that resolves string icon names to `react-icons` components. The app is deployed to **GitHub Pages** (the `.nojekyll` file, `gh-pages` devDependency, `deploy` script, and `base: '/mclloyd-ilagan-portfolio/'` in `vite.config.js` confirm this).

The most useful things for a new contributor to know up front:

- **No component takes props** except the shared `SectionWrapper`/`SectionTitle` layout primitives. Every content component pulls its data directly from `portfolioData.js` via named imports. Editing content = editing that one data file.
- **Tailwind v4 is configured entirely in `src/index.css`** via `@import "tailwindcss"` plus a custom `:root` theme (CSS variables) and a `@layer utilities` block of glassmorphism/cyberpunk helper classes. There is no JS/PostCSS config file.
- **`src/App.css` is dead code** — leftover from the Vite template, never imported, none of its classes used.
- **Four `src/assets/*` files and `public/icons.svg` are unreferenced** leftover template assets.
- **`Contact.jsx` ships hardcoded EmailJS credentials** (service/template/public key) committed in source; the EmailJS public key is inherently public, but moving IDs to env vars would be cleaner and is flagged below.

---

## 1. Tech stack and tooling

### `package.json` (`c:\...\mclloyd-ilagan-portfolio\package.json`)

- **`"type": "module"`** — ESM throughout. `"private": true`, `version: "0.0.0"`.
- **Runtime dependencies:**
  | Package | Version | Role |
  |---|---|---|
  | `react` / `react-dom` | `^19.2.6` | UI runtime (React 19) |
  | `tailwindcss` + `@tailwindcss/vite` | `^4.3.0` | Styling (Tailwind v4, Vite plugin) |
  | `framer-motion` | `^12.40.0` | Entrance/scroll/hover animations |
  | `react-icons` | `^5.6.0` | Font Awesome icon set |
  | `@emailjs/browser` | `^4.4.1` | Contact form email delivery |
- **Dev dependencies:**
  | Package | Version | Role |
  |---|---|---|
  | `vite` | `^8.0.12` | Build/dev server |
  | `@vitejs/plugin-react` | `^6.0.1` | React fast refresh (uses Oxc) |
  | `eslint` | `^10.3.0` | Lint |
  | `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | various | Lint rules |
  | `globals` | `^17.6.0` | Browser globals for lint |
  | `@types/react`, `@types/react-dom` | `^19.x` | Editor type hints (project is JSX, not TS) |
  | `gh-pages` | `^6.3.0` | Publishes `dist/` to `gh-pages` branch |
- **Scripts:**
  | Script | Command | Purpose |
  |---|---|---|
  | `dev` | `vite` | Local dev server (HMR) |
  | `build` | `vite build` | Production build → `dist/` |
  | `lint` | `eslint .` | Lint the whole project |
  | `preview` | `vite preview` | Preview the built site |
  | `predeploy` | `npm run build` | Auto-runs before `deploy` |
  | `deploy` | `gh-pages -d dist` | Push `dist/` to `gh-pages` branch |

### `vite.config.js` (`c:\...\mclloyd-ilagan-portfolio\vite.config.js`)
- Plugins: `react()` and `tailwindcss()`.
- **`base: '/mclloyd-ilagan-portfolio/'`** — the crucial setting for GitHub Pages deployment from a project subpath. Every absolute URL the app emits for public assets must respect this base; `Hero.jsx` hard-codes the base prefix into the `profile.png` and resume-PDF URLs for exactly this reason (see §6).

### `eslint.config.js` (`c:\...\mclloyd-ilagan-portfolio\eslint.config.js`)
- Flat config. `globalIgnores(['dist'])`.
- Applies to `**/*.{js,jsx}`: extends `js.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`.
- `languageOptions.globals: globals.browser`, JSX parsing enabled.
- No TypeScript-aware rules (project is plain JSX).

### `index.html` (`c:\...\mclloyd-ilagan-portfolio\index.html`)
- `<html lang="en">`; `<div id="root">`; `<script type="module" src="/src/main.jsx">`.
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` — references `public/favicon.svg`.
- SEO meta tags: `description`, `keywords`, `author`; Open Graph `og:title`/`og:description`/`og:type`.
- Google Fonts preconnect + stylesheet: **Inter** (300–800) and **JetBrains Mono** (400–600). These are the two font families used across the app (Inter for body, JetBrains Mono for code-style labels).

### `.gitignore` (`c:\...\mclloyd-ilagan-portfolio\.gitignore`)
- Ignores `node_modules`, `dist`, `dist-ssr`, logs, editor dirs. Standard.

### `README.md` (`c:\...\mclloyd-ilagan-portfolio\README.md`)
- **Unmodified Vite template README** — describes the generic React+Vite template, the React Compiler note, and ESLint expansion. It documents nothing project-specific. A real project README would be a worthwhile addition (see Recommendations).

### Notable config summary
- **Tailwind v4, CSS-first:** no `tailwind.config.js` and no `postcss.config.js` exist. All Tailwind customization lives in `src/index.css` via `@import "tailwindcss"` and CSS layers.
- **Oxc-based React plugin** (`@vitejs/plugin-react`) rather than SWC/Babel.

---

## 2. Entry points and app shell

### Boot sequence
1. `index.html` loads `/src/main.jsx`.
2. `src/main.jsx` (`c:\...\mclloyd-ilagan-portfolio\src\main.jsx`) imports `./index.css` (global theme), then renders `<App />` inside `<StrictMode>` into `#root` via `createRoot(document.getElementById('root'))`.
3. `src/App.jsx` (`c:\...\mclloyd-ilagan-portfolio\src\App.jsx`) is the app shell — a fragment `<>` that lays out the whole page in fixed vertical order (see §6).

### Global styles & theme — `src/index.css` (`c:\...\mclloyd-ilagan-portfolio\src\index.css`)
This single file is the entire design system. It is the **only** imported stylesheet (`main.jsx` imports it). Structure:

- **`@import "tailwindcss";`** — pulls in Tailwind v4.
- **`@layer base`** — defines the theme and global resets:
  - `:root` CSS custom properties (the color tokens every component uses via inline styles and Tailwind arbitrary values):
    - `--color-bg-primary: #020817` (near-black navy), `--color-bg-secondary: #0a1628`, `--color-bg-card: rgba(10,22,40,0.8)`
    - `--color-accent: #00d4ff` (cyan), `--color-accent-2: #0066ff` (blue), `--color-accent-3: #7c3aed` (purple)
    - `--color-text-primary: #e2e8f0`, `--color-text-secondary: #94a3b8`, `--color-border: rgba(0,212,255,0.15)`
  - Global `*` box-sizing reset; `html { scroll-behavior: smooth }`; `body` dark bg + Inter font + `overflow-x: hidden`.
  - Custom webkit scrollbar (cyan thumb) and `::selection` highlight.
- **`@layer utilities`** — reusable component classes (the visual vocabulary of the site):
  - `.glass` / `.glass-hover` — glassmorphism cards (semi-transparent navy + 16px blur + cyan border).
  - `.glow-text`, `.glow-border` — cyan glow shadows.
  - `.gradient-text` — cyan→blue→purple gradient clipped to text.
  - `.gradient-border` — pseudo-element gradient border ring.
  - `.cyber-grid` — faint 50px cyan grid background (used on several sections + Hero).
  - `.section-padding` — `5rem 1.5rem` (responsive to `3.5rem 1rem` under 768px).
  - `.btn-primary` / `.btn-outline` — the two button styles.
- **Keyframes & animation classes** (used directly in JSX or via `CyberBackground`):
  - `@keyframes blink` → `.typing-cursor` (Hero typing effect).
  - `#cyber-canvas` — fixed full-screen canvas styling for the particle background.
  - `@keyframes scanline` → `.scanline` (a thin moving scan line overlay).
  - `@keyframes float` → `.float-animation` (Hero avatar bob).
  - `@keyframes pulseGlow` → `.pulse-glow` (navbar logo, experience dots, avatar ring).
  - `.section-title::after` — cyan underline accent under section headings.
  - `.hex-badge` (clip-path; declared but not observed in use).
  - `@keyframes progressFill` → `.progress-bar` (declared; no `--progress` consumers found — likely vestigial).

### `src/App.css` (`c:\...\mclloyd-ilagan-portfolio\src\App.css`)
- **Dead code.** Contains leftover Vite template rules (`.counter`, `.hero .base/.framework/.vite` 3D logos, `#center`, `#next-steps`, `#docs`, `#spacer`, `.ticks`). A repo-wide search confirms **`App.css` is never imported** — `main.jsx` imports only `./index.css`, and `App.jsx` imports no stylesheet. None of its class names appear in the components. Safe to delete (see Recommendations).

---

## 3. Component inventory

All components live in `c:\...\mclloyd-ilagan-portfolio\src\components\`. Unless noted, components take **no props** and read their content from `src/data/portfolioData.js` via named imports. Animations use Framer Motion; icons use `react-icons/fa`.

| # | Component (file) | Props | Purpose / role | Key UI & behavior | Data source |
|---|---|---|---|---|---|
| 1 | **CyberBackground** (`CyberBackground.jsx`) | none | Animated full-screen background behind all content | `<canvas id="cyber-canvas">` (fixed, z-0, `pointer-events:none`) running a `requestAnimationFrame` loop: 60 drifting particles in cyan/blue, lines drawn between particles <130px apart (network-graph effect), and 8 falling 8-char binary strings. Plus a `.scanline` div overlay. Cleans up `requestAnimationFrame` + resize listener on unmount. | none (self-contained) |
| 2 | **Navbar** (`Navbar.jsx`) | none | Fixed top navigation with scroll-spy + mobile menu | `navLinks` array (8 anchor links). `useEffect` scroll handler sets `scrolled` (>50px → `.glass` bg) and `activeSection` (compares `scrollY` to each section's `offsetTop - 120`, iterated in reverse). Desktop links (`lg:flex`) + "Hire Me" CTA (`sm+`) + hamburger (`lg:hidden`). Mobile menu via `<AnimatePresence>` height animation. All links `preventDefault` + `scrollIntoView({behavior:'smooth'})`. Logo "ML.ilagan" with pulsing shield badge. | local `navLinks` constant |
| 3 | **Hero** (`Hero.jsx`) | none | Full-screen landing hero | Two-column grid: left = status pill ("Available for opportunities"), big name (gradient-text surname), role, **typing effect** (`useTypingEffect` hook cycles 5 phrases, 80ms/type, 2000ms pause, half-speed delete), bio from `personalInfo.bio`, CTAs (Contact Me → smooth scroll; Download Resume → `/mclloyd-ilagan-portfolio/Ilagan_McLloyd_resume.pdf`), social links (GitHub/LinkedIn/mailto). Right = circular profile photo (`/mclloyd-ilagan-portfolio/profile.png`) inside a conic-gradient ring with `.float-animation`, 3 floating badges, and a 3-stat row (3+ Years / 4+ Projects / 2 Certifications — **hardcoded**, not from data). Scroll-down indicator at bottom. | `personalInfo` |
| 4 | **About** (`About.jsx`) | none | "Who I Am" — bio + core competencies | Wrapped in `SectionWrapper`. Left column: glass "Background" card (hardcoded prose) + `aboutPoints` checklist (each a glass row with a cyan check icon). Right column: "Core Competencies" grid (2–3 cols) mapping `coreCompetencies` via local `iconMap` (shield/lock/alert/chart/database/eye → FA icons); colors cycle through `competencyColors`. A blockquote with a "security is a process" quote. | `aboutPoints`, `coreCompetencies` |
| 5 | **Skills** (`Skills.jsx`) | none | Technical skills, grouped into 4 categories | `SectionWrapper` + `SectionTitle`. `motion.div` container with staggered `cardVariants`; 4-column (xl) / 2-column (sm) grid. Each `skillCategories` item → glass card: colored icon header (icon resolved from string via `iconMap`), gradient divider, skill checklist, and a "{n} skills" count badge. Hover handlers toggle colored glow/border via inline style. | `skillCategories` |
| 6 | **Experience** (`Experience.jsx`) | none | Vertical work-experience timeline | `SectionWrapper` + `SectionTitle`. A vertical gradient line + pulsing dots; each `experience` item → glass card with a type pill, role, company, period chip, and a "Key Responsibilities" checklist. Only one entry (Sutherland internship). | `experience` |
| 7 | **Education** (`Education.jsx`) | none | Academic history, 2-up grid | `SectionWrapper` + `SectionTitle`. Each `education` item → glass card; `status==="current"` drives cyan styling + "● Current" badge, `completed` drives purple + "✓ Completed". Icon resolved from `edu.icon` string via local `iconMap`. | `education` |
| 8 | **Certifications** (`Certifications.jsx`) | none | Cert credentials with Credly verification | `SectionWrapper` + `SectionTitle`. 2-up grid; each `certifications` item → glass card: issuer icon, title, description, "Topics Covered" 2-col list, a "Verified Certificate" pill, and a "View on Credly ↗" link to `credlyUrl`. Hover adds colored glow. | `certifications` |
| 9 | **Projects** (`Projects.jsx`) | none | Featured project cards | `SectionWrapper` + `SectionTitle`. Staggered 2-col grid; each `projects` item → glass card: top accent bar, icon + title + tech chips, description, highlights bullets, footer with GitHub "View Code" link and conditional "Live Demo" (only if `project.demo` truthy; otherwise "No live demo" italic text). | `projects` |
| 10 | **Achievements** (`Achievements.jsx`) | none | Achievement highlight cards | `SectionWrapper` + `SectionTitle`. 2–3 col grid of glass cards, each `achievements` item → icon + title + description, spring entrance, hover glow. | `achievements` |
| 11 | **Contact** (`Contact.jsx`) | none | Contact info + validated email form (EmailJS) | Left column: intro text + `contactLinks` (email/phone/GitHub/LinkedIn) as glass link rows, plus (only if not configured) a yellow "Email service not configured" notice. Right column: a form (name/email/subject/message) with client-side validation (required name/email/message, email regex); on submit calls `emailjs.send(...)` with the hardcoded service/template/public key; states `idle|sending|success|error` swap the panel to a success/error card. `isConfigured` is `true` here because real IDs replaced the placeholders. | `personalInfo` (email/phone/github/linkedin) |
| 12 | **Footer** (`Footer.jsx`) | none | Site footer: brand, quick links, contact, copyright | 3-col: brand blurb; "Quick Links" nav (`navLinks`, smooth scroll on click); "Connect" (email/GitHub/LinkedIn). Bottom bar: dynamic copyright year + "Built with ❤ React, Tailwind CSS & Framer Motion". | `personalInfo` + local `navLinks` |
| 13 | **BackToTop** (`BackToTop.jsx`) | none | Floating "scroll to top" button | `useEffect` scroll listener toggles `visible` after 400px; `<AnimatePresence>` fades/scales a gradient button (`fixed bottom-6 right-6`) with `FaArrowUp`; click → `window.scrollTo({top:0, behavior:'smooth'})`. | none |
| 14 | **SectionWrapper** (`SectionWrapper.jsx`) — shared primitive | `id`, `children`, `className?` | Wraps every content section: applies `section-padding`, `z-10`, a max-width container, scroll-reveal (`useInView` once) and `aria-labelledby`. | Re-exported alongside `SectionTitle`. |
| 15 | **SectionTitle** (export of `SectionWrapper.jsx`) | `id`, `label`, `title`, `subtitle?` | Standardized section header: mono label pill, big gradient-underlined title, subtitle. Used by sections 4–11. | none |

**How components fit together:** `SectionWrapper` + `SectionTitle` are the shared layout/heading primitives; sections 4–11 all use them so they share identical spacing, max-width, scroll-reveal, and heading treatment. `CyberBackground` sits behind everything (z-0); all content sections set `relative z-10` (via `SectionWrapper`'s className) so they render above the canvas. `Navbar` (z-50) and `BackToTop` (z-50) float above content; `Footer` is a plain footer with `z-10`.

---

## 4. Data layer

**File:** `c:\...\mclloyd-ilagan-portfolio\src\data\portfolioData.js`
A single plain ES module exporting nine named constants. **No API, no state library, no prop drilling** — each component imports exactly the exports it needs by name. Editing portfolio content is entirely a matter of editing this file.

### Exported schema

```js
// Personal/contact identity — used by Hero, Contact, Footer
export const personalInfo = {
  name, title, tagline, email, phone, github, linkedin, location, bio
};

// string[] — used by About (checklist)
export const aboutPoints = [ /* 4 strings */ ];

// { label: string, icon: string }[] — used by About
//   icon is a STRING key resolved by About's local iconMap:
//   "shield"|"lock"|"alert"|"chart"|"database"|"eye"
export const coreCompetencies = [ /* 6 items */ ];

// { id, title, icon, color, skills: string[] }[] — used by Skills
//   icon is a STRING ("FaShieldAlt"|"FaCode"|"FaDatabase"|"FaTools")
//   resolved by Skills' local iconMap
export const skillCategories = [ /* 4 categories */ ];

// { role, company, period, type, responsibilities: string[] }[] — used by Experience
export const experience = [ /* 1 entry */ ];

// { degree, major, school, period, status, icon }[] — used by Education
//   status: "current" | "completed"
//   icon: string ("FaUniversity"|"FaGraduationCap") resolved by Education's iconMap
export const education = [ /* 2 entries */ ];

// { title, issuer, icon, color, description, topics: string[], credlyUrl }[] — used by Certifications
//   icon: string ("FaGoogle"|"FaCertificate")
export const certifications = [ /* 2 entries */ ];

// { title, description, tech: string[], color, icon, highlights: string[], github, demo }[] — used by Projects
//   icon: string resolved by Projects' iconMap; demo: url | null
export const projects = [ /* 4 entries */ ];

// { title, description, icon, color }[] — used by Achievements
//   icon: string resolved by Achievements' iconMap
export const achievements = [ /* 6 entries */ ];
```

### Key pattern: string-to-icon resolution
Data stores icon as a **string name** (e.g. `"FaShieldAlt"`, `"shield"`). Each consuming component defines its own local `iconMap` object mapping those strings to the imported `react-icons/fa` components, then does `const Icon = iconMap[item.icon] || Fallback`. This `iconMap` pattern is duplicated across **About, Skills, Education, Certifications, Projects, and Achievements**. It keeps the data file free of JSX/component imports (data stays serializable), at the cost of repeating a small mapping object in six components. Adding a new data item that uses a new icon requires editing both the data file and the relevant component's `iconMap`.

### Notable data-content caveats
- **`Hero.jsx` stats are hardcoded** (`3+ / 4+ / 2`), not derived from `projects.length`/`certifications.length`. If project/cert counts change, the hero stats will drift.
- **`About.jsx` prose is hardcoded** in JSX, not from `personalInfo.bio` (only Hero uses `personalInfo.bio`).
- `contactLinks` and `navLinks` are defined as local constants inside `Contact.jsx` and `Navbar.jsx`/`Footer.jsx` respectively rather than in the data file — nav labels are duplicated between `Navbar` and `Footer`.

---

## 5. Assets and public files

### `public/` (`c:\...\mclloyd-ilagan-portfolio\public`)
| File | Size | Used? | Referenced by |
|---|---|---|---|
| `.nojekyll` | 0 B | Yes (deploy) | GitHub Pages marker — disables Jekyll processing so `_`-prefixed/dotfiles ship. |
| `favicon.svg` | 0.5 KB | Yes | `index.html` `<link rel="icon" href="/favicon.svg">` |
| `profile.png` | 204.5 KB | Yes | `Hero.jsx` `src="/mclloyd-ilagan-portfolio/profile.png"` |
| `Ilagan_McLloyd_resume.pdf` | 89.6 KB | Yes | `Hero.jsx` "Download Resume" `href="/mclloyd-ilagan-portfolio/Ilagan_McLloyd_resume.pdf"` |
| `icons.svg` | 4.9 KB | **No** | Not referenced anywhere in source. Likely leftover. |

### `src/assets/` (`c:\...\mclloyd-ilagan-portfolio\src\assets`)
| File | Size | Used? |
|---|---|---|
| `react.svg` | 4 KB | **No** — leftover Vite template logo |
| `vite.svg` | 8.5 KB | **No** — leftover Vite template logo |
| `hero.png` | 12.8 KB | **No** — not imported/referenced |
| `f32da777-ff7b-4d1d-9699-47c81965be53-removebg-preview.png` | 204.5 KB | **No** — leftover removed-background image, not referenced |

> A repo-wide grep for `react.svg`, `vite.svg`, `f32da777`, `hero.png`, and `icons.svg` returned **no matches** in any source file. All four `src/assets` files and `public/icons.svg` are unused.

### Base-path note
`Hero.jsx` correctly prefixes `profile.png` and the resume PDF with the `vite.config.js` base (`/mclloyd-ilagan-portfolio/...`) so they resolve under the GitHub Pages subpath. `index.html`'s favicon uses a root-absolute `/favicon.svg`; Vite rewrites asset URLs in `index.html` during build, but it is worth confirming the favicon resolves correctly in production (see Recommendations).

---

## 6. Composition, navigation, and cross-cutting features

### Page composition (`src/App.jsx`)
The app is a single page rendered as a fragment in this exact order:
```
<>
  CyberBackground        // fixed canvas + scanline, z-0, behind everything
  Navbar                 // fixed top, z-50, scroll-spy
  <main id="main-content">
    Hero                 // #hero, min-h-screen
    About                // #about
    Skills               // #skills
    Experience           // #experience
    Education            // #education
    Certifications       // #certifications
    Projects             // #projects
    Achievements         // #achievements
    Contact              // #contact
  </main>
  Footer
  BackToTop
</>
```
Section order matches the nav link order (Navbar + Footer both list About, Skills, Experience, Education, Certifications, Projects, Achievements, Contact). `Hero` is not in the nav link list but the navbar logo links to `#hero`.

### Navigation behavior
- **Smooth scrolling** is enabled globally via `html { scroll-behavior: smooth }` (index.css) AND each nav/footer link calls `preventDefault()` + `scrollIntoView({ behavior: 'smooth' })` (Navbar `handleNavClick`, Footer inline handler, Hero "Contact Me" inline handler). So smooth scroll works regardless of CSS support.
- **Active-section highlighting (scroll-spy):** `Navbar`'s scroll listener computes which section is in view (compares `window.scrollY` to each section `offsetTop - 120`, reverse iteration) and styles the matching link cyan.
- **Anchor IDs** are set on each `<SectionWrapper id="...">` and on `Hero` (`id="hero"`). Heading IDs follow the `{id}-heading` convention, referenced by `SectionWrapper`'s `aria-labelledby` and `SectionTitle`'s `id`.

### Cross-cutting features
1. **Animated background** (`CyberBackground`) — a single fixed canvas behind all content (z-0); all sections sit at `z-10`. Self-contained animation loop with proper cleanup.
2. **Glassmorphism design system** — the `.glass` / `.glass-hover` utility classes (index.css) are the recurring card style; nearly every component renders `glass rounded-2xl` containers.
3. **Scroll-reveal animations** — two mechanisms:
   - `SectionWrapper` uses `useInView` + `animate` for whole-section fade-up (once).
   - Individual cards use Framer Motion `whileInView` with `viewport={{ once: true }}` for staggered entrance.
4. **Color theming per item** — Skills/Certifications/Projects/Achievements each read a `color` field from data and apply it via inline styles (glow, border, icon background, chips), giving each card a distinct accent while staying within the cyan/blue/purple palette.
5. **Back-to-top** — appears after 400px scroll, smooth-scrolls to top.
6. **Accessibility** is consistently applied: `aria-label`/`aria-labelledby`, `role="list"`/`"listitem"` on grids, `aria-current="page"` on the active nav link, `aria-expanded` on the menu toggle, `aria-live` on the typing text, `aria-invalid`/`aria-describedby` on form fields with `role="alert"` error messages, and `aria-hidden="true"` on decorative icons. `CyberBackground` is `aria-hidden`.

---

## 7. Build / deploy

- **Build:** `npm run build` → `vite build` outputs to `dist/`. `predeploy` runs `build` automatically before `deploy`.
- **Deploy:** `npm run deploy` → `gh-pages -d dist` publishes the `dist/` folder to the `gh-pages` branch. The `gh-pages` package is a devDependency.
- **GitHub Pages evidence:**
  - `public/.nojekyll` — empty file disabling Jekyll on Pages (so hashed/underscore assets and dotfiles are served).
  - `vite.config.js` `base: '/mclloyd-ilagan-portfolio/'` — required for an app served from `https://<user>.github.io/mclloyd-ilagan-portfolio/`.
  - `gh-pages` devDep + `deploy`/`predeploy` scripts.
  - Git history shows iterative feature work directly on `main` (e.g. "feat: configure EmailJS, fix resume download", "security: remove accidentally committed sensitive document"), consistent with a `gh-pages`-from-`main` workflow.
- **README.md** is the unmodified Vite template and documents **none** of this deploy workflow — a contributor would have to infer deployment from the config files (as done above).

---

## Conclusions & recommendations

The codebase is clean, consistently structured, and small enough to hold in your head: one data file, one design-system CSS file, one shell, and ~15 components that each do one thing. The main improvements are housekeeping and a couple of robustness tweaks. Nothing here is broken at runtime; these are quality/ maintainability items. **Recommend only — implement nothing.**

1. **Delete dead code `src/App.css`.** It is never imported and none of its classes are used (leftover Vite template). Removing it eliminates confusion about which stylesheet is active.
2. **Delete unused assets:** `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `src/assets/f32da777-...-removebg-preview.png`, and `public/icons.svg` — all unreferenced (confirmed by repo-wide grep). Saves ~430 KB from the repo.
3. **Centralize navigation and contact data.** `navLinks` is duplicated in `Navbar.jsx` and `Footer.jsx`; `contactLinks` is a local constant in `Contact.jsx`. Move both into `portfolioData.js` so a single edit updates nav/links everywhere. (The Hero stats `3+/4+/2` should likewise be derived from `projects.length` / `certifications.length` to avoid drift.)
4. **Move EmailJS IDs out of source.** `Contact.jsx` hardcodes `EMAILJS_SERVICE_ID` / `TEMPLATE_ID` / `PUBLIC_KEY`. The public key is inherently public (client-side SDK), but service/template IDs in committed source hurt portability and re-deploy-to-different-account workflows. Use Vite env vars (`import.meta.env.VITE_EMAILJS_*` + `.env` / `.env.production`, with `.env` gitignored) and keep the `isConfigured` guard. Consider rotating the keys since the current ones are in git history.
5. **Replace per-component `iconMap` duplication with a shared resolver.** The same string→icon pattern is reimplemented in six components. A single `src/utils/icons.js` exporting a master map (or a helper) would remove the duplication and the "add a new icon = edit data AND component" coupling.
6. **Verify the favicon base path in production.** `index.html` uses `/favicon.svg` (root-absolute) while `Hero.jsx` correctly prefixes asset URLs with the configured base. Confirm the favicon resolves on the deployed Pages URL; if it 404s, prefix it with the base or move it to a `src/assets` import.
7. **Write a real `README.md`.** The current file is the Vite template boilerplate. Document the stack, `dev`/`build`/`lint`/`deploy` commands, the `portfolioData.js`-driven content model, the Tailwind-v4-in-`index.css` setup, the GitHub Pages `base`/`.nojekyll`/`gh-pages` flow, and the EmailJS setup steps (the helpful comment block already in `Contact.jsx` could anchor this).
8. **Consider `.nojekyll`-aware housekeeping:** since deployment already disables Jekyll, the build output is served as-is, which is correct; no action needed, but worth noting in the README so a future contributor doesn't remove it.

### Minor observations (no action required)
- `index.css` defines `.hex-badge` and the `.progress-bar`/`@keyframes progressFill` (with a `--progress` custom property) that have no consumers in the current components — likely vestigial from an earlier iteration; harmless but removable.
- `formRef` is declared in `Contact.jsx` but never read (the form uses controlled state, not the ref) — harmless unused binding.
- `Education.jsx`'s and `Certifications.jsx`'s `iconMap` only contains the icons currently used; if a future education/cert entry references an icon not in the map, the `|| FaGraduationCap` / `|| FaCertificate` fallback covers it.
