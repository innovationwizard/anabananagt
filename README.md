# anabanana.gt

Corporate website for **Ana Gabriela — Grupo anabanana, S.A.**: a high-authority,
conversion-optimized B2B presence for keynotes, corporate workshops, and executive
consulting. Replaces the legacy WooCommerce storefront.

Full product spec: [`docs/ANABANANA_SDD_v2.md`](docs/ANABANANA_SDD_v2.md).

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

Brand emblem is wired into the navbar/footer, the app icons (`src/app/icon.png`,
`apple-icon.png`), and the generated social card (`src/app/opengraph-image.tsx`).

## Fonts

Playfair Display + Source Sans 3 load via `<link>` tags in
[`src/app/layout.tsx`](src/app/layout.tsx). The commented-out `next/font/google`
imports there are an optional self-hosting optimization for production.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — Next.js is auto-detected (no `vercel.json` needed); the
   app lives at the repository root.
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Point DNS for `anabanana.gt` at Vercel and configure Resend's SPF/DKIM/DMARC
   records (see SDD §11).
