# anabanana.gt

Corporate website for **ana banana Experiences** (Grupo anabanana, S.A.): a B2B
presence for corporate experiences that transform organizations *desde lo humano*
— across three pillars: **Desarrollo Profesional**, **Bienestar Corporativo** and
**Experiencias de Integración**.

- **Brand system:** [`docs/manual-ana-banana.pdf`](docs/manual-ana-banana.pdf) (v1.0 — 2026) — the authoritative source for identity (palette, type, logo, voice).
- **Refactor tracker:** [`docs/BRAND_REFACTOR_PLAN.md`](docs/BRAND_REFACTOR_PLAN.md) — living plan/progress for the rebrand.
- **Original build spec:** [`docs/ANABANANA_SDD_v2.md`](docs/ANABANANA_SDD_v2.md) — architecture/data model still valid; **its §7 design system (gold "Quiet Authority") is superseded by the brand manual.**

## Stack

| Layer      | Tech                                  |
| ---------- | ------------------------------------- |
| Framework  | Next.js 16 (App Router, RSC)          |
| Language   | TypeScript (strict)                   |
| Styling    | Tailwind CSS v4 (design tokens)       |
| Animation  | Framer Motion                         |
| CMS        | Sanity v3 (GROQ, image CDN)           |
| Forms      | React Hook Form + Zod                 |
| Email      | Resend (transactional)                |
| Hosting    | Vercel                                |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Lint with ESLint                     |

## Environment variables

See [`.env.example`](.env.example). Required for full functionality:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_TOKEN` — Sanity CMS
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — intake-form email
- `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL` — analytics + canonical URL

The site builds and renders without these; CMS-backed content and the intake-form
email simply no-op until they're configured.

## Project structure

```
src/app/            Routes: /, /nosotros, /servicios[/slug], /portafolio[/slug], /contacto
src/app/api/intake  Edge route — Zod validation + Resend notifications
src/components/      home/ · layout/ · contact/ · ui/
src/lib/             Sanity client + GROQ queries, Zod validations
sanity/schemas/      caseStudy · testimonial · service · siteSettings (singleton)
public/brand/        Logo assets
docs/                Software Design Document (SDD v2)
```

The brand logo (`public/brand/ab-*.png` — cream-on-navy lockup, isotipo, etc.) is
wired into the navbar/footer, the app icons (`src/app/icon.png`, `apple-icon.png`),
and the generated social card (`src/app/opengraph-image.tsx`). The `ab-lockup-*`
tiles have baked-in backgrounds — swap for transparent SVG exports when available.

## Fonts

Playfair Display (titulares/citas) + Montserrat (body — the free substitute for
the manual's Gotham/"Ghotam") are self-hosted at build time via `next/font/google`
in [`src/app/layout.tsx`](src/app/layout.tsx) and exposed as `--font-playfair` /
`--font-montserrat` to `@theme` in `globals.css`. No runtime requests to Google.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — Next.js is auto-detected (no `vercel.json` needed); the
   app lives at the repository root.
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Point DNS for `anabanana.gt` at Vercel and configure Resend's SPF/DKIM/DMARC
   records (see SDD §11).
