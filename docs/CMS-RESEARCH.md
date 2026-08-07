# CMS Research — World-Class Editorial Experience for anabanana

_Compiled 2026-08-06. Research streams: (A) editorial UI/UX best practices for non-technical editors, (B) platform specifics verified against official docs for the chosen stack, (C) local audit of the repo and the bundled Next.js 16 docs in `node_modules/next/dist/docs/`._

**Decisions (Jorge, 2026-08-06):** editors are Ana's non-technical team · **everything** on the site becomes editable · admin experience in **Spanish throughout** · **Stack: Payload CMS 3.x embedded in the Next.js app, Supabase Postgres, Supabase Storage (S3-compatible API) for media** — one vendor for DB + files. This supersedes the earlier "complete the Sanity setup" direction; the existing Sanity scaffold becomes removal work. **Topology confirmed:** code on GitHub, deploys to Vercel (Vercel Cron not used), all storage in Supabase (account is Pro; prod is the only cloud project — dev runs on local Postgres).

---

## 1. What makes an editor experience world-class (platform-agnostic)

The single recurring insight across every source: the admin backend is usually an afterthought — a raw database form — while great editor experience (EX) is deliberately *designed*. The principles, in priority order for this project:

### 1.1 Mental-model alignment
Non-technical editors think "the headline on the homepage," not "the title field on the home_page record." The CMS navigation must mirror the site: pages grouped as pages, site-wide things (nav, footer, contact info) as one obvious "Configuración" place, repeating content (portafolio, testimonios, logos) as lists. In Payload terms: admin **groups** ordering collections/globals around the site's structure, never around raw table names.
_Sources: sanity.io/guides/create-an-effective-editor-experience; builder.io/m/knowledge-center/visual-editing_

### 1.2 Curated guardrails over raw flexibility
"Build a curated experience, implementing intentional defaults and smart guardrails." Unlimited options cause decision fatigue and off-brand output; over-restriction causes abandonment. The middle path that wins for small marketing sites: **fixed-field page documents** (editor cannot break layout, every field has a clear label) for core pages, plus ordinary collections for repeating content. A free-form blocks-based page builder is *not* recommended here — this site's pages have fixed, designed layouts.
_Sources: sanity.io/learn/course/page-building; thebcms.com/blog/structured-content-vs-page-builders; contentful.com/blog/defensive-design-and-content-model-validation_

### 1.3 The editor's language, literally
Field labels, descriptions, validation messages, and admin navigation all in Spanish. Every field gets a description with concrete guidance ("Idealmente 7–14 palabras"). Booleans phrased as questions ("¿Destacar en la página de inicio?"). Fields named by meaning ("Testimonio", "Resultado destacado"), never by presentation or developer jargon (slug, array, boolean → "Dirección web", "Lista", "Sí/No").
_Sources: Sanity EX guide; tbw.rangle.io/headless-cms-playbook/content-modelling/best-practices-for-content-modelling_

### 1.4 Preview is trust; fidelity is non-negotiable
Live preview is the single highest-leverage EX feature for non-technical users — otherwise they edit forms "completely divorced from visual design." Critical caveat from practitioners: **preview must render with the production components and CSS** — "mismatched previews train authors to distrust the tool." Payload's Live Preview renders the actual Next.js app in an iframe, so fidelity comes free.
_Sources: tbw.rangle.io/headless-cms-playbook/authoring-experience/live-preview; prismic.io/blog/visual-editing-headless-cms; sebastientaggart.com/post/building-the-ultimate-content-editor-experience-in-a-cms_

### 1.5 Fear-free editing
Draft vs. published must be an explicit, visible mental model: draft = safe to play, publish = intentional labeled action. Version history/rollback is the mechanism that gives editors "confidence to experiment" — Payload versions provide it; the job is to *teach* it ("nada es irreversible"). Guardrails should make it **impossible to break the site**: constrained fields, required-on-publish validation, no raw HTML.
_Sources: experro.com/blog/content-versioning-rollback-headless-cms; Taggart (above)_

### 1.6 Progressive disclosure
Show only what's needed; put rare/advanced controls (SEO overrides) behind collapsed groups. NN/g primary sources: [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/), [Reduce Cognitive Load in Forms](https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/). In Payload: **Tabs** (e.g. "Contenido" / "SEO") and **Collapsible** fields instead of long flat forms.

### 1.7 Validation & guardrails doctrine
- **Start strict** — "easier to lift overly strict validation than to compensate for unwanted results" (Contentful's defensive-design doctrine). Selects/radios instead of free text wherever options are finite.
- **Hard limits map to real design breakpoints** (hero headline length before wrap breaks); soft guidance lives in field descriptions with concrete targets. SEO fields get ~60-char title / ~155-char description guidance.
- **Custom messages, in Spanish, adjacent to the field** — NN/g error-reporting guidelines (lab-based): inline, next to the field, say what's wrong *and* how to fix it, color + icon, never tooltip-only. Payload custom `validate` functions return the message string to show.
- **Validate co-occurring pairs** (CTA text + CTA destination).
- Payload nuance: draft saves skip validation by default (good — drafts are the sandbox); **publish** enforces it. That maps exactly to the draft-safe / publish-strict mental model.
_Sources: contentful.com/blog/defensive-design-and-content-model-validation; nngroup.com/articles/errors-forms-design-guidelines (reviewed Dec 2024)_

### 1.8 Media UX
- **Focal point over manual cropping** — editor marks the important area once, every crop derives from it. Payload uploads support crop + focal point (requires `sharp` in config); must be enabled *and taught*.
- **Alt text enforced at the upload level**: `alt` field on the media collection, required — this is also what the project's own SDD demands. Refinement: a "¿Imagen decorativa?" escape hatch rather than silent empty alt.
- **Reusable assets**: one media library; client logos as documents referenced everywhere ("update once, update everywhere"), not duplicated per page.
- Aspect-ratio guidance ("horizontal 16:9, sujeto centrado") belongs in field descriptions.
_Sources: wieni.com on focal points; OpenCities image best practices_

### 1.9 List views & wayfinding
Configure `admin.useAsTitle` and list columns per collection so lists show meaningful title + thumbnail + status. Editors navigate by recognition, not recall.

### 1.10 Accessibility of the authoring experience
W3C **ATAG 2.0**: (Part A) the authoring UI itself accessible — Payload admin's responsibility, largely met; (Part B) the tool helps authors *produce* accessible content — our responsibility: enforced alt text, curated rich-text features so editors can't produce broken semantics, structured fields that emit semantic HTML.
_Source: w3.org/TR/ATAG20_

### 1.11 Onboarding: the first 4–8 weeks decide adoption
- Embed guidance where the work happens (field descriptions) — beats external manuals.
- One-page Spanish cheat sheet ("contrato editorial"): who edits what, image rules, publish workflow. One page, not a manual.
- Training decks are the anti-pattern; guided workflows + safe previews are what stick. Industry expectation: 8–16 weeks to full independence; live preview compresses this most.
- Onboarding is a loop: observe friction in the first weeks, refine admin layout and field help accordingly.
_Sources: enterprisecms.org guides; webstacks.com EX comparison_

### 1.12 Why clients abandon their CMS (failure modes to design against)
Convergent agency findings (opinion-grade evidence, but highly consistent):
1. **Structural friction** — CMS too restrictive or poorly structured, simple updates feel slow.
2. **Developer dependency persists** — hero-image swap still needs a dev → disengagement. (Full-site editability, this project's chosen scope, is the direct antidote.)
3. **No content owner or cadence** — content goes stale even with a good CMS.
4. **Freedom without guardrails** → broken pages → lockdown → cycle restarts.
5. **Onboarding cliff** — platforms rate "easy" after mastery but get abandoned during the first weeks.

---

## 2. Platform facts: Payload 3.x + Supabase + S3 (verified against official docs, 2026-08-06)

### 2.1 Compatibility & installation into the existing app
- Requirements: Node 20.9+; Next.js **≥ 16.2.6 officially supported** (repo has 16.2.7 ✓); React 19 is Payload 3's native target. Use the newest Payload 3.x — full Next 16/Turbopack support consolidated around Payload ~3.73 (third-party report; official floor is the install doc's Next ≥16.2.6).
- Packages: `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-s3`, `sharp`, `graphql`.
- `next.config` wrapped in `withPayload` (must be ESM). Copy the `(payload)` route group from the official blank template (`admin/[[...segments]]`, `api/[...slug]`, graphql routes, layout) — "do not regenerate, will never change." Existing site pages move into their own route group. `payload.config.ts` at root with the `@payload-config` tsconfig alias; `sharp` passed into the config (required for resizing/crop/focal point).
- Turbopack caveats (Next 16 defaults to Turbopack): the historical breakers (#14354 withPayload webpack injection, #14419 admin HMR, #15429 RSC prod builds) are fixed in current versions; escape hatch if dev HMR misbehaves: `next dev --webpack`.

### 2.2 Database: Supabase Postgres — connection discipline ⚠
- Adapter: `postgresAdapter({ pool: { connectionString } })`. Options: `push`, `migrationDir`, `idType`, `readReplicas`, `blocksAsJSON`.
- **Two connection strings, two jobs** (from Supabase's documented pooler semantics; the split itself is community-verified practice, not in Payload docs):
  - Runtime on Vercel serverless → **transaction pooler, port 6543** ("ideal for serverless"; no prepared statements — fine for Payload's node-postgres). Keep `pool.max` low (1–5) since each serverless instance opens its own pool (community practice).
  - **Migrations and dev push → direct 5432 / session pooler** — transaction mode can hang or fail on migration transactions. Pattern: separate `DIRECT_URL` env used only by migrate steps. Direct connection is IPv6-only without the IPv4 add-on; session pooler is the IPv4-friendly fallback.
- **Migrations are mandatory in prod Postgres** (Payload docs verbatim: "a fundamental aspect"). Dev uses Drizzle push (auto-sync, default on — never mix push and migrations on the same DB); prod workflow: `payload migrate:create` locally → `payload migrate && build` as the Vercel build command.

### 2.3 Supabase free tier is NOT production-viable ⚠ (decision needed)
Verified on supabase.com/pricing (2026-08-06):
- **"Free projects are paused after 1 week of inactivity"** — a paused DB is unreachable; the site's content queries would 500 and the admin would be down until manually restored.
- **No backups on the free tier.** 500 MB DB, 5 GB egress/mo, 2 active projects, 60 direct/200 pooled connections.
- **Pro ($25/mo)**: no pausing, daily backups kept 7 days, 8 GB disk, 250 GB egress.
- Verdict: free tier is fine for **development**; for the client's production site the floor is **Supabase Pro ($25/mo)** — or accept a keep-alive cron + scheduled `pg_dump` as a hack with stated risk. This is the honest cost of the "free CMS" trade: the subscription moved from Sanity to the database. Pausing takes **Storage down too** (§2.4), so with media also on Supabase the whole site's images depend on this decision, not just content queries.

### 2.4 Media: Supabase Storage via its S3-compatible API + `@payloadcms/storage-s3`
Verified against supabase.com/docs (2026-08-06). Same Payload plugin as AWS S3; one vendor for DB + files.
- **Endpoint**: `https://<project-ref>.storage.supabase.co/storage/v1/s3` (docs-recommended direct storage host). **Access keys**: Dashboard → Project Settings → Storage → S3 Connection; keys are server-side only, have full access to all buckets, and **bypass RLS** — exactly right for a server-side CMS, no bucket policies needed for the write path. `forcePathStyle: true` is required; region = the project's region.
- Payload config is the documented S3-compatible pattern (official docs show it for R2; a Payload-blog community guide and independent writeups confirm it against Supabase specifically): `s3Storage({ bucket, config: { credentials, region, endpoint, forcePathStyle: true } })`. The plugin auto-disables local storage (mandatory on Vercel's ephemeral filesystem); the original upload **and every sharp-generated size** go to the bucket.
- **Serving**: mark the bucket **Public**; objects serve from `https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<path>` with CDN caching. Set `disablePayloadAccessControl: true` so Payload emits direct URLs (no serverless hop per image). Next.js `images.remotePatterns` changes from `cdn.sanity.io` to the `<ref>.supabase.co` host.
- **Supabase's image-transform API is Pro-gated — and unnecessary here**: Payload generates its own size variants via sharp at upload time, and Vercel's image optimizer handles responsive resizing. No dependency on the Pro feature.
- **Quotas**: Free — 1 GB storage, **50 MB max upload**, 5 GB unified egress/mo; Pro — 100 GB storage, raisable upload limit, 250 GB egress. The 50 MB cap and egress matter for the pending hero video.
- **Gotchas**: **no S3 object versioning — deletes are permanent** (backups must therefore include storage, not just the DB); Vercel's ~4.5 MB request-body cap on server-side uploads → enable the plugin's `clientUploads: true`; a **paused free project takes Storage down with the database** (public URLs stop serving), reinforcing §2.3's production verdict.

### 2.5 Admin UI in Spanish — fully supported
- Spanish is an **official admin translation**: `i18n: { fallbackLanguage: 'es', supportedLanguages: { es, en } }` with locales from `@payloadcms/translations/languages/*`.
- Labels/descriptions accept locale records (`label: { es: 'Título', en: 'Title' }`) or plain strings — for a Spanish-only team, plain Spanish strings are simplest. Custom validators localize via `req.t`; custom strings via `i18n.translations`.

### 2.6 Editorial features — all MIT-free, none enterprise-gated (verified)
- **Drafts & versions**: `versions: { drafts: true }` adds draft/published/changed status; `maxPerDoc` default 100; draft reads via `draft: true`.
- **Autosave**: `drafts: { autosave: { interval } }` (default 800 ms) + `showSaveDraftButton` — continuous safety net.
- **Scheduled publish AND unpublish**: `versions.drafts.schedulePublish` — free (was the Growth-gated feature on Sanity). Requires the **Jobs Queue** to be processed: on serverless, no `autoRun`; *any* periodic scheduler hits `GET /api/payload-jobs/run` gated by `CRON_SECRET`. Vercel Cron is the docs' example but is **not used in this project (Jorge, 2026-08-06)** — the trigger will be Supabase Cron (pg_cron + pg_net, included on Pro; verify recipe at implementation) or a GitHub Actions schedule.
- **Live Preview**: `admin.livePreview: { url, collections, breakpoints }` — iframe of the real site. For App Router server components: **server-side live preview** via `RefreshRouteOnSave` (`@payloadcms/live-preview-react`) + page fetching with `draft: true`; lower autosave interval (~375 ms) for snappier preview.
- **Preview URLs + Next draft mode**: `admin.preview` builds a URL to a preview route that checks `PREVIEW_SECRET`, calls `draftMode().enable()`, redirects.
- **Access control**: auth is a core collection (`auth: true`); per-operation + per-field functions (`user.role === 'admin'`, `_status`-based publish gating). **Unlimited users and roles, free** — the driver for leaving Sanity's free tier confirmed.
- **Field types**: Tabs, Group, Collapsible, Row, Array, Blocks, Select/Radio (closed lists), Relationship, Upload, Rich Text, plus `admin.description` help text and `admin.condition` for conditional fields; full hook set (`beforeChange`, `afterChange`, …).
- **Lexical rich text lockdown**: `lexicalEditor({ features: () => [/* explicit short list */] })` — returning an explicit array (e.g. only Bold/Italic/Link) is how the toolbar gets locked down for brand consistency.
- **Enterprise-gated (avoid depending on)**: SSO, multi-step Publishing Workflows (distinct from plain drafts), A/B testing, AI features, Visual Editor (click-element-to-field overlays, "coming soon"), multi-player editing, audit logs (version history itself is free).

### 2.7 Querying from Next.js: Local API
- `getPayload({ config })` → `payload.find/findByID/findGlobal` — **direct DB function calls in server components, no HTTP layer**. `payload generate:types` gives fully typed results end-to-end.
- **Local API calls are not auto-cached by Next** (they aren't `fetch`). The official website template's verified pattern: wrap reads in `unstable_cache(..., { tags })`, and revalidate from collection **`afterChange`/`afterDelete` hooks** calling `revalidatePath`/`revalidateTag` on publish — guarded by `context.disableRevalidate` during seeding.
- `generateStaticParams` = `payload.find({ select: { slug: true }, limit: 1000 })`.

### 2.8 Ops
- Seeding: standalone script using the Local API (`payload run ./seed.ts`) or a seed endpoint — the official template's `src/endpoints/seed/` is the reference shape.
- Env contract: `PAYLOAD_SECRET`, `DATABASE_URL` (pooler 6543), `DIRECT_URL` (migrations), `S3_BUCKET/REGION/ENDPOINT/ACCESS_KEY_ID/SECRET_ACCESS_KEY` (Supabase Storage S3 Connection values), `PREVIEW_SECRET`, `CRON_SECRET`, `NEXT_PUBLIC_SERVER_URL`.
- First admin user via `/admin` first-boot screen or seed script. Sharp works on Vercel.
- **Licensing verified: Payload core is MIT** (LICENSE.md, 2018-2026 Payload CMS, LLC).

---

## 3. Next.js 16 constraints (from `node_modules/next/dist/docs/`, per AGENTS.md warning)

- **Two coexisting caching models.** This repo does **not** enable `cacheComponents`, so the "previous model" applies: `fetch` is NOT cached by default; **non-fetch async work — exactly what Payload's Local API is — caches via `unstable_cache`**. This aligns perfectly with the official Payload website template's pattern (§2.7). The alternative (`cacheComponents: true`, `'use cache'`, stable `cacheTag`/`cacheLife`) remains optional and is not required.
- **`revalidateTag(tag, profile)` now requires a second argument** (e.g. `'max'`); single-arg form deprecated — Payload `afterChange` hooks must use the two-arg form. New `updateTag` is Server-Actions-only. Docs' own CMS guidance: tags + longer cache durations + revalidate on change.
- **All request APIs are async-only**: `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` return Promises; sync access fully removed. Existing repo pages already comply. OG-image functions now also receive `params` as a Promise.
- **Draft Mode**: `await draftMode()` → `.enable()/.disable()` in route handlers — matches Payload's preview-route pattern.
- **next/image deltas**: `minimumCacheTTL` default now 4h; `qualities` default `[75]` (non-listed `quality` props coerced); `remotePatterns` currently allows `cdn.sanity.io` — must be replaced with the `<project-ref>.supabase.co` storage host.
- Route handlers uncached by default; `middleware.ts` → `proxy.ts` rename; edge runtime discouraged (the intake route's `runtime = "edge"` is worth revisiting during migration — Payload Local API cannot run on edge anyway).

---

## 4. Repo audit: what the CMS must absorb

### 4.1 Existing scaffold status → now removal work
- The partial Sanity scaffold (4 schemas, 8 orphaned GROQ queries, `client.ts`, `sanity.config.ts`, deps `sanity`/`next-sanity`/`@sanity/client`/`@sanity/image-url`) is **100% unwired — nothing imports it** (verified by grep). Under the Payload decision it is all **deleted**, and its schemas serve only as field-inventory reference.
- The stale-schema finding still matters as a design input: pages actually render the `Experience` model from `src/lib/experiences.ts` (slug, pillar, title, tagline, cover, objetivo, resultados[], contenido, contenidoItems?, temasIntro?, temas?, duracion, modalidad) — the old `caseStudy` shape (challenge/solution/industry/budgetRange) is pre-pivot and must NOT be carried into Payload collections.
- `experiences.ts` header comment (verbatim): _"Replaced by Sanity content once the CMS is wired (deferred)."_ — the intent (CMS-managed experiences) survives; the vendor changed.

### 4.2 Content surfaces the CMS must cover (full inventory)
Nosotros page (story, 5 valores, 3 arquetipos, esencia/promesa) · "Sembrando futuro" home section · nav links + CTA · footer (links, blurb, 4 social URLs incl. TikTok, copyright entity "Grupo anabanana, S.A.", location) · per-page SEO metadata + OG · home hero (eyebrow, headline, subheadline, CTA, trust-bar copy) · 14 client logos (hardcoded array in `hero.tsx`, files in `public/brands/`) · services overview section · featured experience section · testimonials (3 hardcoded placeholders) · `servicios/[slug]` pillar content (`SERVICES_DATA` record: title, tagline, description, audience, deliverables, outcomes) · portafolio listing copy + the 3 experiences · contacto page copy + WhatsApp number · all section labels/CTA copy on detail pages · layout metadata (title template, description, OG locale es_GT).

### 4.3 Stated intent (verbatim, from project docs)
- SDD Objective 3: _"**Empower** her team to manage content (case studies, testimonials, media) via a headless CMS — no dev dependency for updates."_ (The SDD names Sanity as the vendor; the empowerment objective is the intent that survives the vendor change.)
- SDD: _"Alt text on all images"_ required.
- CHANGES plan open client questions: **#3** confirm content self-management; **#7** keep or drop `budgetRange` (internal).

### 4.4 Adjacent findings (not CMS, but surfaced by the audit)
- Intake form submissions are **email-only via Resend, nothing persisted**, and if `RESEND_API_KEY` is unset it **silently returns success** — conflicts with the project's no-silent-failure contract. With Postgres now in the stack, persisting intake submissions (a Payload collection) becomes nearly free — flagged as a plan option.
- OG image and intake emails hardcode brand hex values outside the token system.
- Pending client assets: hero video, 2 pillar photos, 2 Sembrando-futuro photos.

---

## 5. Synthesis: the ten commitments for this build

1. Spanish everywhere: `fallbackLanguage: 'es'` + all labels/descriptions/validation messages written in Spanish.
2. Admin mirrors the site: groups **Páginas** (Inicio, Nosotros, Contacto, Portada del portafolio — globals) / **Portafolio** (experiencias) / **Pilares de servicio** / **Testimonios** / **Logos de clientes** / **Configuración del sitio**.
3. Fixed-field page globals, not a blocks page-builder. Collections + relationships for repeating content.
4. Every field: Spanish label + concrete description; Tabs (Contenido | SEO); sensible `defaultValue`s.
5. Draft-safe / publish-strict validation with Spanish messages; hard limits tied to actual design breakpoints; required alt text on the media collection (with decorative escape hatch); paired CTA validation; closed Selects for pillar slugs and icons.
6. Live Preview (server-side, `RefreshRouteOnSave`) + autosave + draft mode = production-fidelity preview; draft → publicar as the explicit safety model.
7. The `experience` collection matches the shipped model in `experiences.ts` exactly — not the stale caseStudy shape.
8. Client logos as documents (reusable, ordered), one shared media library on Supabase Storage (public bucket, direct URLs).
9. Seed the database from current hardcoded content **before** cutting pages over — never ship empty-CMS fallbacks; production DB never runs on Supabase's pausing free tier.
10. Spanish one-page cheat sheet + version-history training + friction check-ins during the first weeks; adoption is won or lost there.

## 6. Open questions carried into the plan
1. ~~**Supabase tier for production**~~ **Resolved (2026-08-06): Jorge's Supabase account is already Pro** — no pausing, daily DB backups, 100 GB storage. **The prod project is the only Supabase instance (no dev project, none planned)** — development runs on local Postgres (Docker or `supabase start`) with Payload local-disk uploads; the prod DB only ever receives generated migrations, never dev push.
2. **Hero video hosting**: mostly resolved by Pro (upload cap raisable, 250 GB/mo egress) — Supabase Storage can host it; sanity-check size/traffic when the asset arrives.
3. ~~**Vercel plan / cron**~~ **Resolved (2026-08-06): Vercel Cron is not used.** Scheduled publishing's job trigger will be Supabase Cron (pg_cron + pg_net, on the existing Pro project) or a GitHub Actions schedule — no Vercel-plan dependency.
4. ~~`budgetRange`~~ **Resolved (2026-08-06, Jorge): dropped entirely — the `experiences` collection ships without it.** (Closes docs-nuevos open client question #7; trivial to add an internal-only field later if ever requested.)
5. ~~Intake persistence~~ **Resolved (2026-08-06, Jorge): "persistence and email are a must."** In scope as plan Phase 3½ — DB write is the source of truth, email is a visible-failure notification layer; built now with `RESEND_API_KEY` supplied later.
