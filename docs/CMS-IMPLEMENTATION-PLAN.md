# CMS Implementation Plan — Payload 3 + Supabase (Postgres + Storage) for anabanana

_Written 2026-08-06 (rev. 3 — supersedes the Sanity-based plan; rev. 3 switches media from AWS S3 to **Supabase Storage's S3-compatible API**), based on [CMS-RESEARCH.md](./CMS-RESEARCH.md). Scope decided by Jorge: **Payload CMS embedded in this Next.js app, Supabase Postgres, Supabase Storage for media** — one vendor for DB + files; non-technical client editors; **entire site editable**; **Spanish admin throughout**._

**Confirmed deployment topology (Jorge, 2026-08-06):** code on **GitHub** (CI + scheduled Actions for backups/cron fallback) · hosting on **Vercel** (serverless — but **Vercel Cron is not used**; job triggers come from Supabase Cron or GitHub Actions) · **all storage in Supabase** (Pro): Postgres for content, Storage for media. The prod Supabase project is the only cloud database; dev is local Postgres.

**Contract for this work** (from `_THE_RULES.md` + global instructions): production-first — no mock data, no silent fallbacks, no "harden later." Jorge drives git: staging lists + commit messages prepared in chat, never executed by the agent. Read `node_modules/next/dist/docs/` before touching any Next.js API (Next 16 differs from convention). Payload docs are the source of truth for Payload APIs — its 3.x line moves fast; verify against payloadcms.com/docs when in doubt.

---

## 0. Infrastructure decisions & blockers before production cutover

| # | Item | Owner | Status / recommendation |
|---|------|-------|--------------------------|
| B1 | **Supabase Pro for production** | ✅ Resolved (2026-08-06) | Jorge's Supabase account is already Pro: no pausing, daily DB backups (7 days), 100 GB storage, raisable upload limit, 250 GB egress. **There is no dev project and none will be created (2026-08-06)** — the prod project is the only Supabase instance. Development therefore runs on **local Postgres** (Docker or `supabase start`); see Phase 1 §5. **Hard rule: Payload's dev push mode never connects to the prod database** — prod receives only generated, reviewed migrations. (Supabase Branching, a Pro feature with per-hour billing, is the cloud alternative if local Postgres ever proves insufficient.) |
| B2 | **Hero video hosting** | Mostly resolved by B1 | Pro lifts the 50 MB upload cap and gives 250 GB/mo egress — Supabase Storage can host it. Sanity-check size/traffic when the asset arrives; a static `public/` asset on Vercel remains the fallback. |
| B3 | **Job-queue trigger for scheduled publishing** | ✅ Resolved (2026-08-06) | **Vercel Cron is not used (Jorge).** Payload's jobs queue just needs a periodic authenticated HTTP hit on `GET /api/payload-jobs/run`; the trigger is **Supabase Cron** (dashboard scheduler on pg_cron + pg_net, already paid for on Pro — verify the HTTP-call recipe at implementation) with a GitHub Actions `schedule` workflow as fallback (already used for backups; note GH cron timing can drift minutes). Scheduling precision no longer depends on any Vercel plan. |
| B4 | `budgetRange` | ✅ Resolved (2026-08-06, Jorge) | **Dropped entirely — the `experiences` collection ships as designed, without it.** Public form already had budget removed; no page renders it. If the client ever wants internal budget records, it's a trivial internal-only select field added later. |
| B5 | Editor account | Partially resolved (2026-08-06, Jorge) | **One editor, single person** — identity not yet known. Dev/seed use placeholders **"Editor Name" / "editor@example.com"** (Jorge's directive). The real name + email are a **hard prerequisite for the Phase 6 production account** — no placeholder identities in prod. Role split stays: Jorge (+ owner) as `admin`, the one client user as `editor`. |

**None of these block Phases 1–5** on a free dev Supabase project and a dev bucket. They block Phase 6 (production cutover).

---

## Phase 1 — Foundation: Payload installed, admin in Spanish, empty but running

**Goal: `/admin` loads in Spanish against a dev Supabase project, zero site pages changed, Sanity fully removed.**

1. **Remove Sanity** (it is 100% orphaned — verified): delete `sanity/`, `sanity.config.ts`, `src/lib/sanity/`; drop deps `sanity`, `next-sanity`, `@sanity/client`, `@sanity/image-url`. Keep the old schemas visible in git history as field-inventory reference only.
2. **Install**: `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-s3`, `sharp`, `graphql`. Pin the newest Payload 3.x (Next ≥16.2.6 officially supported; repo has 16.2.7).
3. **Wire the app shell**:
   - `next.config.ts` → ESM + `withPayload(...)`; replace the `cdn.sanity.io` remotePattern with `<project-ref>.supabase.co` (path `/storage/v1/object/public/**`).
   - Copy the `(payload)` route group verbatim from the official blank template (`admin/[[...segments]]`, `api/[...slug]`, graphql routes, layout). Move existing site pages into a `(site)` route group with the current root layout.
   - `payload.config.ts` at root + `@payload-config` tsconfig alias + `sharp` passed in.
4. **Spanish admin**: `i18n: { fallbackLanguage: 'es', supportedLanguages: { es, en } }` from `@payloadcms/translations`. All labels/descriptions from Phase 2 onward written directly in Spanish.
5. **Database discipline** (per research §2.2; prod is the ONLY Supabase project — see B1):
   - Development runs against **local Postgres** — Docker `postgres` container or the Supabase CLI local stack (`supabase start`). `DATABASE_URL` in `.env.local` points at localhost; Drizzle push mode auto-syncs the schema there. **The prod connection string never appears in a dev environment.**
   - Production: `DATABASE_URL` = the Pro project's **transaction pooler (6543)**, `pool.max` kept low for serverless; `DIRECT_URL` = direct/session connection used **only** by the migrate step. Prod receives schema changes exclusively via generated migrations (`payload migrate:create` locally → `payload migrate && next build` as the Vercel build command). Never mix push and migrations on one DB; never push against prod.
6. **Env contract** (documented in README): `PAYLOAD_SECRET`, `DATABASE_URL`, `DIRECT_URL`, `S3_BUCKET`, `S3_REGION` (project region), `S3_ENDPOINT` (`https://<project-ref>.storage.supabase.co/storage/v1/s3`), `S3_ACCESS_KEY_ID`/`S3_SECRET_ACCESS_KEY` (Dashboard → Project Settings → Storage → S3 Connection; server-side only — these keys bypass RLS), `PREVIEW_SECRET`, `CRON_SECRET`, `NEXT_PUBLIC_SERVER_URL`, plus `RESEND_API_KEY`/`RESEND_TO_EMAIL` (**key pending — Jorge supplies later**; Phase 3½ is designed to run safely without it). The `S3_*` and prod `DATABASE_URL`/`DIRECT_URL` values exist **only** in Vercel/prod env — dev `.env.local` carries localhost Postgres and no S3 vars (local-disk uploads). Fail loudly on missing required env — no placeholder fallbacks (the Resend key is the one documented exception, with its absence surfaced per Phase 3½, never silent).
7. **Types**: `payload generate:types` wired into scripts; generated `payload-types.ts` is the single source of content types (strict TS, non-negotiable).
8. **Users & roles**: `users` auth collection with `role: select('admin' | 'editor')`; access control via **one centralized typed helper module** (`src/access/`) — per Jorge's centralized-authorization rule, no scattered inline role checks. Editors: full content CRUD; admins: users + settings. First admin created at `/admin` first boot.
9. Turbopack note: if admin HMR misbehaves in dev, fall back to `next dev --webpack` (documented escape hatch).

**Acceptance**: `/admin` in Spanish, login works against local Postgres, `npm run build` clean, site pages byte-identical, prod project untouched.

---

## Phase 2 — Content model (the heart of the build)

**Goal: collections + globals covering 100% of rendered content, designed for the editor, in Spanish, with enforced guardrails.** Conventions for every field: Spanish `label` + concrete `admin.description` ("Idealmente 7–14 palabras"); Tabs `Contenido | SEO` on page globals; closed `select`s for anything finite; `defaultValue`s; Spanish messages from custom `validate` functions. Draft-safe/publish-strict comes free with versions.

### 2.1 Media & shared shapes
- **`media` collection** (upload → Supabase Storage via the `s3Storage` plugin: `endpoint` + `forcePathStyle: true` + project-region `region`; bucket marked **Public** in the Supabase dashboard; `disablePayloadAccessControl: true` so Payload emits direct `…/object/public/…` CDN URLs; `clientUploads: true` to clear Vercel's ~4.5 MB server-upload cap). **Dev/prod split**: the `s3Storage` plugin is included in `plugins` only when the S3 env vars are present (i.e. production/preview); local dev uses Payload's default local-disk uploads (`.gitignore`d) — no prod-bucket writes from a dev machine. Frontend reads the URL from the media doc either way, so components don't care. Collection fields: crop + focal point enabled; `alt` (text, **required unless** `decorativa` checkbox — co-validated); optional `credito`. Image size variants generated by sharp at upload — no dependency on Supabase's Pro-gated transform API.
- **Reusable field factories** (`src/fields/`): `seoTab()` (metaTitle ≤60-char guidance, metaDescription ≤155, ogImage upload), `cta()` (etiqueta + destino, both-or-neither validation), `stat()` ({valor, etiqueta}).

### 2.2 Collections
- **`experiences`** (replaces the stale caseStudy shape — mirrors `src/lib/experiences.ts` exactly): título, slug (Spanish-aware slugify hook — accents/ñ), **pilar** (closed select of the 3 pillar slugs — routing/filter contract), tagline, cover (media rel), objetivo, resultados[] (array of text), contenido, contenidoItems[]?, temasIntro?, temas[]?, duración, modalidad, destacada (¿Destacar en inicio?), publishedAt, SEO tab. Versions+drafts+autosave on. List view: cover thumb, título, pilar, estado.
- **`services`** (the 3 pilares; deletion locked via access control): existing SERVICES_DATA fields (título, tagline, descripción, audiencia, deliverables[], outcomes[]), slug constrained to the 3 fixed pillar slugs, **icono** (closed select of approved lucide names → name→component map on the frontend), foto (media rel), CTA copy, SEO tab.
- **`testimonials`**: cita (length warning in description, hard cap where design breaks), autor, cargo, empresa, foto?, destacado, orden. Home renders exactly 3 destacados — enforced by a custom validate on publish (count check) with a clear Spanish message.
- **`clientLogos`**: nombre, logo (media rel; "PNG blanco/monocromo" guidance), orden. Replaces the hardcoded 14-logo array.

### 2.3 Globals (fixed fields — no blocks page-builder)
Payload **globals** are the native singleton: exactly the right shape for pages. All with versions+drafts+autosave.
- **`homePage`**: hero (eyebrow, headline, subheadline, CTA, media slot for the pending video), trust-bar (heading, copy), services-overview copy, featured-experience section (copy + optional manual override relationship; default = destacada), Sembrando-futuro (heading, body, 2 fotos), testimonials heading, SEO tab.
- **`aboutPage`**: hero, historia (lexical locked to párrafo/bold/italic — no headings), esencia/promesa, valores[] (array {icono cerrado, título, texto}, min 5 max 5), arquetipos[] (min 3 max 3), CTA quote + botón, foto, SEO tab. Brand-manual language seeds verbatim.
- **`contactPage`**: page copy, intro del formulario, SEO tab. (Form field labels/options stay in code — validation-coupled; moving them to CMS invites broken states. Documented decision.)
- **`portfolioPage`**: listing header copy, SEO tab.
- **`siteSettings`**: identidad (title template, default meta description, OG defaults), contacto (email, WhatsApp — validated format, single source of truth consumed by footer + contacto), redes ({linkedin, instagram, tiktok, whatsapp} — TikTok added), footer (blurb, CTA-strip heading, entidad de copyright "Grupo anabanana, S.A.", ubicación), navegación (array {etiqueta, destino-interno cerrado} + etiqueta del CTA).

### 2.4 Admin navigation (mirrors the site)
`admin.group` labels in Spanish: **Páginas** (Inicio, Nosotros, Contacto, Portada del portafolio) · **Contenido** (Experiencias, Pilares de servicio, Testimonios, Logos de clientes) · **Configuración** (Ajustes del sitio, Usuarios — admins only via access control). `useAsTitle` + list columns everywhere.

**Acceptance**: every item in CMS-RESEARCH §4.2 has a home; forms read naturally in Spanish; publishing a broken state is impossible; `payload generate:types` output is the only content-type source.

---

## Phase 3 — Seed, then wire pages (in this order)

**Principle: seed first, cut over second — pages never ship an empty-CMS fallback.** Current hardcoded content is the seed corpus (real, client-approved copy — not mock data).

1. **Seed script** (`scripts/seed.ts`, Local API, run via `payload run` against the **local dev DB**; idempotent — upsert by slug/global, so the same script later promotes content to prod): migrates `experiences.ts` (3 experiencias), `SERVICES_DATA` (3 pilares), nav/footer/settings, home copy, nosotros copy (VALORES/ARQUETIPOS **verbatim** — brand-manual language must survive exactly), contacto copy; uploads the 14 brand logos + existing photos to Supabase Storage through the media collection (alt text authored during seeding, not stubbed). Sets `context.disableRevalidate` per the official template pattern. **Human visual review of seeded admin content against the live site before any page is wired** (Dirty George principle).
2. **Data layer** (`src/lib/content/`): one typed accessor per surface using `getPayload` + `unstable_cache` with tags (`global_homePage`, `experiences`, …) — the **only** entry point pages may use (centralization rule). `revalidateTag(tag, 'max')` (Next 16 two-arg form) fired from collection/global `afterChange`/`afterDelete` hooks on publish.
3. **Wire pages** — each page: replace hardcoded consts with the typed accessor; delete the superseded hardcoded source in the same change; verify visually. Order (lowest risk → highest):
   1. `siteSettings` consumers: footer, navbar, layout metadata.
   2. `portafolio` + `portafolio/[slug]` (`generateStaticParams` from `payload.find` slugs; per-slug `generateMetadata` — params awaited).
   3. `servicios/[slug]` (pilares + experiencias del pilar, filtered by the closed pilar value).
   4. `nosotros`.
   5. `contacto` (copy only; form stays code-driven).
   6. Home (largest surface, last): hero, trust bar + logos, services overview, featured experience, Sembrando futuro, testimonials.
4. **Retire** `src/lib/experiences.ts` and `SERVICES_DATA` (delete, not comment out) once consumers are wired.
5. **Missing-content policy**: required global/collection empty at build time → **fail the build with a clear error** — never render placeholder text in production.

**Acceptance**: site renders pixel-identical to pre-migration from CMS data alone; grep finds no orphaned hardcoded copy; publish in admin → page updates via tag revalidation; build fails loudly on missing content.

---

## Phase 3½ — Intake-form persistence + email (added to scope 2026-08-06: "persistence and email are a must")

**Design: the database write is the source of truth; email is a notification layer on top. The route returns success to the lead if and only if persistence succeeded.** This kills the current silent-failure path (today, a missing `RESEND_API_KEY` returns fake success and the lead vanishes).

1. **`intakeSubmissions` collection** (Spanish labels, admin group "Solicitudes"): fields mirroring the Zod intake schema exactly — empresa, nombre de contacto, correo corporativo, teléfono?, tipo de servicio, rango de participantes, fecha tentativa?, formato, objetivo del evento, cómo nos encontró?, consentimiento, fecha de envío — plus `estado` (select: nueva / contactada / cerrada — the one field editors may change, for lightweight lead tracking) and `correoEnviado` (checkbox, system-set). Access control: **no admin-UI creation or field editing** (except `estado`); created only by the API route; deletable by admins only.
2. **Rewrite `/api/intake`**: drop `runtime = "edge"` (Payload's Local API requires Node — this also resolves the Next 16 edge-runtime flag); keep the Zod validation; then `payload.create` the submission (source of truth); then attempt the two Resend emails.
3. **Email behavior with the key pending** (Jorge supplies `RESEND_API_KEY` later): if the key is missing or the send fails, the submission is already safe in the DB — the route logs the error loudly, sets `correoEnviado: false` (visible as a flag in the admin list view, so unnotified leads are findable at a glance), and still returns success to the lead, because their submission *was* received. When the key lands in Vercel env, emails simply start flowing; the `correoEnviado: false` rows show exactly which leads arrived during the gap.
4. Move the email HTML's hardcoded hex values onto the shared brand constants while the file is open (closes the cosmetic flag for this file).

**Acceptance**: a submission with no Resend key configured lands in the admin marked "correo no enviado" and the lead sees success; with a key, both emails send and the flag is true; no code path can lose a validated submission silently.

## Phase 4 — Preview, drafts & scheduled publishing

1. **Draft mode preview route** (`/next/preview` pattern): validates `PREVIEW_SECRET`, `draftMode().enable()`, redirects to the doc's path; `admin.preview` URL functions on every collection/global. Accessors accept `draft: isDraftMode` (draft reads bypass `unstable_cache`).
2. **Server-side Live Preview**: `admin.livePreview` (url per doc, breakpoints for móvil/tablet/escritorio) + `RefreshRouteOnSave` client wrapper in the site layout when draft mode is on; autosave interval lowered (~375 ms) for snappy preview.
3. **Scheduled publish/unpublish**: `schedulePublish: true` + jobs queue (`autoRun` off — serverless). Trigger per B3: **Supabase Cron** job (pg_cron + pg_net) calling `GET /api/payload-jobs/run` every ~5 min with the `Authorization: Bearer ${CRON_SECRET}` header; GitHub Actions `schedule` as fallback. The endpoint's access check validates the bearer secret. If neither trigger is in place at launch, the feature ships disabled with the limitation documented — not half-working.
4. Exit-preview affordance visible on the site while in draft mode.

**Acceptance**: an editor opens Inicio → Vista previa, edits the headline, sees the real site update live at three breakpoints, saves a borrador without publishing, then Publicar → production updates. Scheduling verified if enabled.

---

## Phase 5 — Editor experience polish

1. Lexical lockdown wherever rich text exists: explicit short feature lists (bold/italic/link only, headings only where the design has them).
2. Descriptions pass: every field's Spanish guidance concrete (word counts, aspect ratios, "no oscurecer la foto — el overlay lo aplica el sitio").
3. List views: thumbnails, estado (borrador/publicado), orden columns; sensible default sorts (experiencias by fecha, logos/testimonios by orden).
4. Conditional fields (`admin.condition`) to hide optional sub-groups until relevant (progressive disclosure).
5. Admin branding: "ana banana — Estudio de contenido" + logo mark (small touch, large trust payoff). Spot-check Payload's official `es` translations against the client's dialect (Guatemala); override odd strings via `i18n.translations`.

---

## Phase 6 — Production cutover & ops (B1 resolved — Pro account in hand)

1. **Supabase Pro production project**: generated migrations committed; Vercel build command `payload migrate && next build` using `DIRECT_URL` for the migrate step; runtime on pooler 6543. Confirm daily backups active; document restore procedure in README.
2. **Production Storage bucket** in the production Supabase project: created Public, fresh S3 access keys from its S3 Connection page, `remotePatterns` updated to the production project ref.
3. **Data promotion**: run the idempotent seed against production with prod env (media uploads land in the prod bucket with alt text intact) — or `pg_dump`/restore of the reviewed **local** DB plus a bucket upload of its media. Preferred: the seed run, since it exercises the same code path prod will use, followed by a full visual review of the production site before DNS/announcement ("what was reviewed is what ships" applies to the prod instance itself here).
4. **Backups must cover Storage, not just the DB**: Supabase Storage has **no object versioning — deletes are permanent** — and Supabase's daily backups cover the database. Weekly GitHub Action: `pg_dump` + an S3-protocol sync of the media bucket to artifact/offsite storage.
5. Accounts: the single client editor created with `editor` role using their **real name and email** (B5 — obtain before this step; the dev "Editor Name"/"editor@example.com" placeholder never reaches prod), Jorge + client owner as `admin`. `PAYLOAD_SECRET`/`PREVIEW_SECRET`/`CRON_SECRET` generated fresh for prod; keys documented in the shared vault, never in the repo.
6. Verify `next/image` `qualities` config against the sizes/quality the frontend requests (Next 16 coerces non-listed qualities to 75).

---

## Phase 7 — Onboarding (adoption is won here)

1. **One-page Spanish cheat sheet** (`docs/GUIA-EDITORES.md` + printable): the admin map, borrador → publicar workflow, image rules, "nada es irreversible — historial de versiones", who to contact.
2. 30-minute guided session: each editor performs one real edit end-to-end with Vista previa (their hands, not a demo).
3. Friction log: check-ins at week 1 / 2 / 4 / 8; observed stumbles feed label/description/navigation refinements (onboarding is a loop). Track time-to-first-publish.

---

## Explicitly out of scope (flagged, decided separately)
- ~~Intake-form persistence / edge runtime on the intake route~~ — **moved into scope as Phase 3½** (Jorge, 2026-08-06).
- Cache Components migration; enterprise-gated Payload features (SSO, approval workflows, visual editor); content i18n (site is Spanish-only).
- Hero video / pending client photos (asset delivery, not CMS structure — media slots exist).

## Sequencing summary
Phase 1 (foundation, incl. Sanity removal) → Phase 2 (model) → Phase 3 (seed + wire, page by page) → Phase 3½ (intake persistence + email) → Phase 4 (preview/drafts/scheduling) → Phase 5 (polish) → Phase 6 (cutover — unblocked, Pro account in hand) → Phase 7 (onboarding). Phases 1–5 proceed immediately on local Postgres + local-disk uploads; the prod Supabase project is touched for the first time in Phase 6. Each page cutover in Phase 3 is an independently verifiable, commit-sized unit — Jorge drives each commit.
