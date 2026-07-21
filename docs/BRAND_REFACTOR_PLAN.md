# Brand Refactor — Living Plan & Progress Tracker

> **This file is the single source of truth for the brand refactor.** It is
> designed to survive context compaction: if you lose the conversation, read
> this file top-to-bottom and you can resume exactly where work stopped.
> Update the checkboxes and the **Progress Log** after every sub-batch.

- **Goal:** Refactor the entire site to strictly match the new brand manual
  (`docs/manual-ana-banana.pdf`, "Ana Banana Experiences", v1.0 — 2026).
- **Created:** 2026-07-20
- **Owner:** Jorge (drives git — AI never runs `git add/commit/push`).
- **Operating contract:** `_THE_RULES.md` (production-first, no mock data in
  prod logic, strict typing, zero lint suppressions, surface intent don't bake
  interpretations, match existing conventions).

---

## 0. Scope decisions (locked by Jorge, 2026-07-20)

| # | Decision | Answer |
|---|----------|--------|
| S1 | Which pages | **Entire site** — all routes + global tokens + chrome + data layer |
| S2 | Depth | **Full reposition** to "Ana Banana Experiences" (3 pillars, new audience, rewritten copy) |
| S3 | Body font | **Montserrat** as the free, Google-hosted substitute for Gotham ("Ghotam" in the manual), swappable to licensed Gotham later via one CSS variable |

### The core problem this refactor solves
The current site implements a **different brand**: "Ana Gabriela," a personal
keynote speaker, in a **black + warm-gold** "Quiet Authority" palette (built
from `docs/ANABANANA_SDD_v2.md`). The new manual defines **"Ana Banana
Experiences,"** a B2B corporate-experience firm, in a **navy + soft-blue +
electric-blue + lime** palette. **The current gold accent is explicitly shown
as a _forbidden_ use in the manual** ("No contornear o recolorear fuera de la
paleta"). This is a full identity change, not a token tweak.

---

## 1. Brand spec — canonical reference (self-contained)

_Extracted from the manual so this survives even without the PDF in context._

### 1.1 Color palette (manual Ch.05 · Colorimetría) — the ONLY allowed colors
| Name | HEX | RGB | Role in manual |
|------|-----|-----|----------------|
| Lime Glow | `#ECFE79` | 236·254·121 | Highlight/accent, italic emphasis on dark, logo dot |
| Electric Blue | `#2E46D4` | 46·70·212 | Emphasis words, links, interactive |
| Soft Blue | `#99BAD7` | 153·186·215 | Rounded card panels, soft surfaces |
| Deep Navy | `#243054` | 36·48·84 | Primary dark bg + primary text on light |
| Light Gray | `#E2E2E2` | 226·226·226 | Neutral borders/surfaces |

Plus neutrals the manual uses but doesn't name: near-white page background and a
**cream/ivory** for the wordmark on navy. Derived values proposed in §2 (D1).

### 1.2 Typography (manual Ch.05 · Tipografía)
- **Titulares / H1–H4, figures, quotes:** **Playfair** (Playfair Display) —
  high-contrast serif. **Already in use — keep.**
- **Body / paragraph:** **"Ghotam" = Gotham** (humanist geometric sans).
  → Substitute **Montserrat** (Google, geometric, closest free match). Swap via
  `--font-body`. Body 15–18px / line-height 1.6.
- **Labels/eyebrows/captions:** thin letter-spaced uppercase sans (Montserrat).

### 1.3 Logo (manual Ch.05 · Logotipo)
- Full logo = **"ab." serif monogram** (lowercase a+b ligature, final dot) + a
  vertical divider + **"ana banana"** wordmark (Playfair) + **"EXPERIENCES"**
  in spaced capitals below.
- **Isotipo** ("ab." alone) for small sizes (≥22px / 8mm). Full logo min 150px wide.
- Permitted versions: dark-on-light, cream-on-navy, cream-on-soft-blue (with
  **lime** dot), dark-on-light-gray. Clear space = 1× monogram-a height each side.
- **Forbidden:** distortion, low-contrast bg, busy-photo bg, diagonal tilt,
  shadows/effects, **recoloring outside the palette (e.g., gold/yellow outline).**

### 1.4 Brand fundamentals — VERBATIM copy (quote, do not paraphrase)
- **Nombre:** "Ana Banana Experiences" ("ana banana" = human/memorable side;
  "Experiences" = strategic/category side).
- **Esencia:** "Transformar desde lo humano."
- **Mensaje central:** "Las empresas crecen cuando las personas crecen."
- **Promesa de marca:** "Cada experiencia que diseñamos deja a las personas y a
  su organización mejor de lo que las encontramos."
- **Concepto:** "Transformamos organizaciones desde las personas."
- **Qué hacemos:** "Ayudamos a las organizaciones a fortalecer su cultura
  mediante experiencias significativas que desarrollan personas, impulsan el
  bienestar y generan conexiones auténticas."
- **Misión:** "Diseñar experiencias corporativas personalizadas que desarrollan
  personas, promueven el bienestar y fortalecen la cultura de cada organización."
- **Visión:** "Ser una marca referente en Latinoamérica en experiencias
  corporativas, cultura organizacional y bienestar laboral."
- **Posicionamiento:** "Somos la marca que diseña experiencias corporativas
  personalizadas que fortalecen la cultura a través del desarrollo, el bienestar
  y la integración de las personas."
- **Valores:** Humanidad · Conexión · Transformación · Creatividad · Excelencia.
- **Arquetipos:** El Cuidador (define) · El Creador (forma) · El Sabio (autoridad).
- **Manifiesto (cierre):** "las organizaciones más fuertes no son las que más
  exigen, sino las que mejor cuidan."

### 1.5 Offer — the 3 pillars (replaces Keynotes/Talleres/Consultoría)
1. **Desarrollo Profesional** — "Hacer crecer a las personas." Sub-items: Marca
   Personal, LinkedIn Estratégico, Storytelling, Data Storytelling, Cultura
   Organizacional, Liderazgo, Comunicación, Ventas, Negociación, Reputación
   Profesional, Desarrollo de Equipos.
2. **Bienestar Corporativo** — "Cuidar a las personas." Sub-items: Wellness Day,
   Masajes en oficina, Aromaterapia, Yoga Facial, Taller de Automaquillaje, Spa
   Corporativo, Pausas Activas, Activaciones de Bienestar, Bienestar Integral.
3. **Experiencias de Integración** — "Conectar a las personas." Sub-items: Team
   Building, Kick Off, Rallys, Workshops, Actividades Colaborativas, Experiencias
   Temáticas, Dinámicas de Cultura, Activaciones Corporativas.

### 1.6 Audience (manual Ch.03 · Público)
Empresas medianas y grandes. Interlocutores: **Recursos Humanos, Gerencias
Generales, Gerencias de Talento, Equipos de Cultura Organizacional.** Buscan:
fortalecer liderazgo, mejorar comunicación, aumentar engagement, desarrollar
talento, generar bienestar, fortalecer la cultura.

---

## 2. Open decisions & blockers (resolve before/at the noted batch)

### D1 — Semantic color-token mapping ⚠️ NEEDS JORGE SIGN-OFF before Batch 1
One old token (`accent` = gold) currently serves **CTAs, eyebrows, links, and
hovers (~150 usages)**. It cannot map 1:1 to one new color — **lime as text on
white fails WCAG contrast badly**, and navy-on-electric-blue CTAs are low
contrast. So the mapping is **semantic, not a hex swap**. Proposed default:

| Token (keep name) | Old (gold era) | New value | Notes |
|---|---|---|---|
| `--color-primary` | `#0A0F1C` | `#243054` Deep Navy | dark bg + text on light |
| `--color-secondary` | `#1A2332` | `#2C3A61` (navy tint) | cards on dark — *derived, approve* |
| `--color-accent` | `#C9A96E` gold | `#2E46D4` Electric Blue | eyebrows/links/interactive text on light (AA on white) |
| `--color-accent-hover` | `#B8943F` | `#2438A6` (deeper blue) | *derived, approve* |
| `--color-highlight` (NEW) | — | `#ECFE79` Lime | decorative only, on dark / dots / emphasis — **never text on white** |
| `--color-soft` (NEW) | — | `#99BAD7` Soft Blue | soft card panels, audience chips |
| `--color-surface` | `#F7F5F0` warm | `#F6F7F9` cool near-white | light sections |
| `--color-surface-warm` | `#EDE8DF` | `#EDEFF3` | placeholder-media bg — *derived* |
| `--color-text-inverse` | `#F7F5F0` | `#F4F2EA` cream/ivory | wordmark/text on navy (matches manual) |
| `--color-text-primary` | `#0A0F1C` | `#243054` | — |
| `--color-text-muted` | `#6B7280` | `#5C6675` (cooler) | keep-ish |
| `--color-border` | `#E5E1D8` | `#E2E2E2` Light Gray | from palette |
| `--color-border-dark` | `#2A3342` | `#35446B` (navy) | *derived* |

**CTA convention (new):** primary button = **Deep Navy bg + cream text**,
hover → Electric Blue (or lime underline). This means CTAs currently written
`bg-accent text-primary` must change to `bg-primary text-inverse hover:bg-accent`
per-file during Batches 2–5. Lime reserved for one deliberate highlight per view.

**Derived neutrals** (`secondary`, `accent-hover`, `surface-warm`, `border-dark`)
are within-family tints not among the 5 named swatches — approve or replace with
opacity utilities.

### D2 — Logo assets ✅ RESOLVED (2026-07-20)
Jorge provided the 4 valid brand logos in `logos/`. They match the manual's
"Versiones permitidas" exactly. Staged into `public/brand/`:
| File | Content | Use |
|------|---------|-----|
| `ab-lockup-on-navy.png` | full lockup, cream on Deep Navy | navbar + footer (both `bg-primary` navy) |
| `ab-lockup-on-light.png` | full lockup, charcoal + soft-blue dot on light gray | logo on light sections |
| `ab-lockup-on-light-mono.png` | full lockup, charcoal mono on near-white | alt light usage |
| `ab-isotipo-on-softblue.png` | "ab." isotipo, lime dot, soft-blue bg | favicon / small / app icon |

**Caveat (Dirty George):** these are 2000×2000 PNG **tiles with baked-in
backgrounds** (not transparent, not SVG). They blend seamlessly only on a
section whose bg equals the tile's baked color. Navbar + footer are solid
`bg-primary` (Deep Navy `#243054`) so `ab-lockup-on-navy` blends there. **Watch
for a visible square seam in Batch 6 QA;** if it appears, request transparent
SVG exports or key out the background. Old gold assets (`anabananagt_*`) to be
deleted in Batch 6. Favicons still need resizing from `ab-isotipo` (Batch 2/6).

### D3 — Content authority for reposition (Batch 4)
`/nosotros`, `/servicios`, `/portafolio` currently hold Ana-Gabriela-specific
copy (bio, credentials, keynote services, case studies). Full reposition needs
final wording. Use §1.4/§1.5 verbatim where possible; **any net-new claims
(metrics, real case studies, credentials for the firm) must come from Jorge** —
no fabricated facts (RULE 6). Placeholders stay clearly labeled as placeholders.

### D4 — Next.js 16 conventions (Batch 1 pre-flight)
`AGENTS.md`: "This is NOT the Next.js you know." Next `16.2.7`. **Before writing
font/metadata code, read `node_modules/next/dist/docs/`** for the current
`next/font`, `metadata`, and App-Router guidance. Current `layout.tsx` loads
fonts via a live `<link>` with `next/font` commented out — confirm canonical
approach before changing.

---

## 3. Batches & sub-batches (checklist)

> Convention: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked.
> After each sub-batch: run build/lint, tick the box, append to Progress Log.

### BATCH 0 — Foundations & inventory
- [x] 0.1 Read manual end-to-end; extract spec → §1 of this doc
- [x] 0.2 Full codebase inventory (files, token usage, brand strings) → §4
- [x] 0.3 Logo asset audit → **D2 blocker logged**
- [x] 0.4 Draft semantic color mapping → **D1 (needs sign-off)**
- [x] 0.5 Verbatim brand copy captured → §1.4/§1.5
- [x] 0.6 D1 mapping — proceeding on the recommended default (Jorge: "Proceed"); centralized in `globals.css`, easy to adjust
- [x] 0.7 D2 resolved — 4 valid logos staged into `public/brand/`

### BATCH 1 — Design tokens & typography (global)
- [x] 1.0 Pre-flight: read Next 16 font docs → canonical = `next/font/google` + CSS var into `@theme inline`
- [x] 1.1 `globals.css` — palette tokens + D1 mapping; added `--color-highlight`, `--color-soft`, `--color-*` raw palette
- [x] 1.2 `globals.css` `--font-body` → `var(--font-montserrat)`; `--font-display` → `var(--font-playfair)`
- [x] 1.3 `layout.tsx` — adopted `next/font/google` (Playfair_Display normal+italic + Montserrat); removed live `<link>` + commented block; vars on `<html>`
- [x] 1.4 `globals.css` — `::selection` → lime bg + navy text; `.form-input:focus` inherits accent (electric blue)
- [x] 1.5 Verify: `npm run build` ✓ (next/font fetched OK, 17 routes, TS pass); lint 0 errors (1 pre-existing RHF warning); residual gold only in `opengraph-image`/`api/intake` (Batches 2.4/5.3)
- **Accept:** ✅ builds; no gold in tokens/chrome; fonts self-hosted. Note: CTAs still `bg-accent text-primary` (electric-blue bg + navy text = low contrast) until per-component batches fix to `bg-primary text-inverse` — expected intermediate state.

### BATCH 2 — Global chrome + metadata + OG ✅
- [x] 2.1 `navbar.tsx` — isotipo badge (`ab-isotipo-on-softblue`) + "ana banana" wordmark; links/wordmark hover → **lime** (electric blue too dark on navy); CTA → lime bg + navy text, "Conversemos"
- [x] 2.2 `footer.tsx` — isotipo + "ana banana Experiences"; brand line → esencia; CTA strip "Transformemos… desde lo humano" + lime CTA; social hovers → lime; copyright leads with brand, keeps legal entity
- [x] 2.3 `layout.tsx` — metadata → Ana Banana Experiences positioning + essence; siteName/template updated; `lang` es-GT
- [x] 2.4 `opengraph-image.tsx` — navy card + real navy lockup asset + essence line (lime italic); fixed Satori multi-child flex rule
- [x] 2.5 Favicons `icon.png`(512) + `apple-icon.png`(180) regenerated from isotipo via `sips` (old gold emblem replaced)
- **Accept:** ✅ build clean; header/footer/OG/tab all on-brand. Residual gold now only in `api/intake` (Batch 5.3).

### BATCH 3 — Home page ✅
- [x] 3.1 `hero.tsx` — eyebrow (lime), headline = mensaje central with lime italic emphasis, subhead = qué hacemos, CTA lime "Agenda una conversación"
- [x] 3.2 `services-overview.tsx` — 3 keynote cards → **3 pillars** (GraduationCap/Heart/Users, verbatim descriptions, new slugs) per §1.5
- [x] 3.3 `stats-strip.tsx` — lime figures; brand-aligned labels (`XX+` placeholders kept, D3)
- [x] 3.4 `featured-case.tsx` — lime accents; copy reframed to "experiencia"; CTA lime outline
- [x] 3.5 `testimonials.tsx` — placeholders reframed to culture/bienestar; audience roles (RRHH/Talento/Gerencia)
- [~] 3.6 optional manifiesto section — **skipped** (do-less; home already conveys brand)
- [x] 3.7 shared: `section-heading.tsx` (dark tag → lime) + `placeholder-media.tsx` (dark hover/tooltip → lime)
- **Accept:** ✅ `/` reads as ana banana Experiences; pillars correct; build+lint clean.

### BATCH 4 — Interior route pages (reposition, D3) ✅
- [x] 4.1 `servicios/page.tsx` — hub → 3 pillars + verbatim sub-items; lime eyebrow/CTA
- [x] 4.2 `servicios/[slug]/page.tsx` — slugs now `desarrollo-profesional`/`bienestar-corporativo`/`experiencias-de-integracion`; new deliverables/outcomes; dark accents → lime
- [x] 4.3 `nosotros/page.tsx` — full rewrite: historia (manifiesto), esencia, promesa, 5 valores, 3 arquetipos (verbatim), manifiesto-close CTA. Ana-Gabriela bio/credentials removed
- [x] 4.4 `portafolio/page.tsx` + `[slug]/page.tsx` — reframed to "experiencias"; serviceType → pillars; "anabanana"→"ana banana Experiences"; dark accents → lime; placeholders kept labeled
- [x] 4.5 `contacto/page.tsx` — header → brand voice ("Diseñemos una experiencia…")
- **Accept:** ✅ all routes repositioned; new pillar routes generate; old keynote slugs gone. Remaining "keynote" refs only in `validations`/`sanity` (Batch 5).

### BATCH 5 — Forms, API, validation, Sanity (data layer) ✅
- [x] 5.1 `validations/intake.ts` — `serviceType` enum + `SERVICE_LABELS` → 3 pillars; corporate-email gate kept
- [x] 5.2 `intake-form.tsx` — action buttons → lime (electric-blue-on-navy avoided); "Experiencia de interés"/"Detalles de la experiencia"; consent → "ana banana Experiences"; light-bg selected-states kept electric blue (AA ok)
- [x] 5.3 `api/intake/route.ts` — email hex → palette (navy/electric/surface/border); confirmation subject + footer → brand
- [x] 5.4 Sanity: `case-study.ts` serviceType → pillars + title "Experiencia"; `service.ts` icon hint; `sanity.config.ts` studio title
- [x] 5.5 `queries.ts`/`client.ts` — no brand strings (confirmed by grep)
- **Accept:** ✅ enums consistent end-to-end (home hrefs ↔ [slug] ↔ form ↔ CMS); grep shows **0 legacy hex, 0 legacy brand strings** in src/sanity.

### BATCH 6 — Assets, docs, QA, compliance ✅
- [x] 6.1 Wired real logos (isotipo badge in chrome, navy lockup in OG, isotipo favicons); **deleted all 4 old gold assets** (0 remain)
- [x] 6.2 `README.md` — brand description, links (manual + this plan), fonts section (Montserrat/next-font), logo note
- [x] 6.3 `ANABANANA_SDD_v2.md` §7 — added "SUPERSEDED" banner pointing to manual + this plan (history preserved)
- [x] 6.4 QA: `build` ✓ (17 routes) · `lint` 0 errors · all 8 routes HTTP 200 · fonts self-hosted (13 woff2, both vars on `<html>`) · **0 legacy hex, 0 legacy brand strings, 0 legacy leakage** in rendered HTML
- [x] 6.5 Compliance checklist (below)
- **Accept:** ✅ clean build, no residue, routes render on-brand.

**Manual-compliance checklist:**
- [x] Palette — only manual colors + derived navy tints/cream; gold gone everywhere
- [x] Typography — Playfair (display) + Montserrat (Gotham substitute), self-hosted
- [x] Logo — official assets only; isotipo badge (chrome), navy lockup (OG), isotipo (favicon)
- [x] On-dark accents use lime/soft-blue/cream (never electric-blue-on-navy) — AA respected
- [x] No forbidden uses (no gold/off-palette recolor, no distortion, no low-contrast placement)
- [x] Voice/offer — "Transformar desde lo humano", 3 pillars, audience aligned to manual

---

## 4. File inventory (what each batch touches)

**Tokens/fonts:** `src/app/globals.css`, `src/app/layout.tsx`
**Chrome:** `src/components/layout/navbar.tsx`, `.../footer.tsx`
**Home:** `src/app/page.tsx`, `src/components/home/{hero,services-overview,stats-strip,featured-case,testimonials}.tsx`
**Shared UI:** `src/components/ui/{section-heading,placeholder-media}.tsx`
**Routes:** `src/app/{nosotros,servicios,servicios/[slug],portafolio,portafolio/[slug],contacto}/page.tsx`
**Form/API:** `src/components/contact/intake-form.tsx`, `src/lib/validations/intake.ts`, `src/app/api/intake/route.ts`
**SEO/OG/icons:** `src/app/opengraph-image.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`
**Sanity:** `sanity/schemas/{case-study,service,site-settings,testimonial,index}.ts`, `sanity.config.ts`
**Assets:** `public/brand/*` (all 4 off-brand — replace)
**Docs:** `README.md`, `docs/ANABANANA_SDD_v2.md`

**Token-usage heat map (approx. class hits per file — sizing effort):**
intake-form 36 · portafolio/[slug] 29 · servicios/[slug] 23 · footer 19 ·
servicios 19 · globals.css 16 · navbar 15 · hero 14 · portafolio 14 ·
nosotros 13 · placeholder-media 12 · featured-case 11 · services-overview 9 ·
contacto 8 · section-heading 6 · testimonials 6 · stats-strip 3.

**Legacy brand strings live in:** layout, opengraph-image, globals.css,
nosotros, portafolio(+slug), servicios(+slug), api/intake, services-overview,
hero, footer, validations/intake, sanity/case-study, README, SDD.

---

## 5. Progress Log (append newest at top)

- **2026-07-20** — **Batches 3–6 complete → refactor implementation done.**
  Home (hero/pillars/stats/featured/testimonials + shared UI), all interior
  routes (servicios hub+slug repositioned to 3 pillars; nosotros fully rewritten
  to brand esencia/valores/arquetipos; portafolio reframed to "experiencias";
  contacto), and the data layer (intake enum+labels+form, email templates,
  Sanity schemas) all rebranded. Deleted 4 old gold assets; README + SDD updated.
  **QA:** build ✓ (17 routes), lint 0 errors (1 pre-existing RHF warning), all
  routes HTTP 200, fonts self-hosted, **0 legacy hex / brand strings / leakage.**
  Established site-wide conventions: **primary CTA = lime + navy text**,
  **on-dark accents = lime/soft-blue/cream**, **on-light accents = electric blue**.
  **Remaining (needs Jorge — see §6):** real metrics/testimonials/cases (D3),
  visual + responsive screenshot pass, optional transparent-SVG logo exports.
- **2026-07-20** — **Batch 2 complete.** Navbar + footer rebranded (isotipo badge
  + "ana banana" wordmark, lime hovers/CTAs since electric-blue is too dark on
  navy, "Conversemos" CTA). Metadata + OG card + favicons rebranded (OG uses the
  real navy lockup asset; favicons regenerated from isotipo via `sips`). Build
  clean. Established the **on-dark accent rule: use lime/soft-blue/cream, not
  electric blue** — applies to all dark sections in Batches 3–5. **Next: Batch 3.**
- **2026-07-20** — **Batch 1 complete.** Rewrote `globals.css` color tokens to
  the brand palette (semantic names preserved; added `highlight`/`soft`) and
  pointed `--font-display`/`--font-body` at next/font vars. `layout.tsx` now
  uses `next/font/google` (Playfair_Display + Montserrat), live `<link>`
  removed. `npm run build` passes — **next/font fetched fonts at build time in
  this env**, so the old "sandbox has no font access" concern doesn't apply
  here. Lint 0 errors. D2 resolved (logos staged). **Next: Batch 2 (chrome).**
- **2026-07-20** — Batch 0 complete. Read full manual + entire codebase. Wrote
  this plan. Key findings: (1) full identity change, gold is forbidden; (2) all
  logo assets off-brand → D2 blocker; (3) `accent` token needs semantic split →
  D1; (4) Playfair already correct, only body font changes. **Awaiting D1
  sign-off before Batch 1. No code changed yet.**

---

## 6. Resume-here pointer
**Status: all 6 batches implemented and building clean.** The site is fully
refactored to the ana banana Experiences brand. Remaining items are external /
human, not code:

1. **Real content (D3)** — replace `XX+` stats, placeholder testimonials, and
   placeholder portfolio cases with real data from Jorge (no fabrication).
2. **Visual + responsive QA** — screenshot every route (light/dark, mobile) to
   confirm the isotipo badge, lime CTAs, and OG card look right. Best via `/run`
   in an interactive session. Watch: OG navy-tile seam vs `#243054` (low stakes).
3. **Optional** — transparent **SVG** logo exports would let the full lockup
   replace the isotipo badge in the navbar/footer; approve/adjust the derived
   navy tints & CTA convention (D1) if desired.

Nothing blocks a preview deploy. Jorge drives git — nothing has been committed.
