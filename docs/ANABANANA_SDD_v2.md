# ANABANANA — Software Design Document v2.0

**Project:** Corporate Website Redesign  
**Client:** Ana Gabriela — Grupo anabanana, S.A.  
**Domain:** anabanana.gt  
**Author:** [Your Name]  
**Date:** June 2026  
**Status:** Draft for Review

---

## 1. Executive Summary

Ana Gabriela is a corporate keynote speaker, facilitator, and executive trainer commanding six- and seven-figure engagements (GTQ 1M+) from Guatemala's largest enterprises. Her current website — a WooCommerce storefront selling Q125 online courses — is actively sabotaging her positioning. It communicates "small retail shop" to an audience of C-suite executives and procurement teams evaluating premium corporate services.

This redesign replaces the storefront with a high-authority, conversion-optimized corporate presence engineered to attract and qualify high-ticket B2B clients.

### Core Objectives

1. **Position** Ana Gabriela as a premium corporate authority — not a course seller
2. **Qualify** inbound leads through a multi-step intake funnel — no "Add to Cart"
3. **Empower** her team to manage content (case studies, testimonials, media) via a headless CMS — no dev dependency for updates
4. **Perform** with sub-2s load times, flawless SEO, and mobile-first execution

---

## 2. System Architecture

### 2.1 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components by default, edge-optimized, ISR for CMS content |
| Language | TypeScript (strict mode) | Type safety across frontend, API routes, and CMS schemas |
| Styling | Tailwind CSS v4 | Utility-first, design tokens, zero unused CSS in production |
| Animation | Framer Motion | Server-component-safe, layout animations, scroll-triggered reveals |
| CMS | Sanity.io (v3) | Real-time preview, GROQ queries, structured content, image CDN with transforms |
| Forms | React Hook Form + Zod | Client + server validation, multi-step state management |
| Email | Resend | API-driven transactional email, React Email templates |
| Analytics | Vercel Analytics + Google Tag Manager | Core Web Vitals + conversion tracking |
| Hosting | Vercel | Edge network, preview deployments, ISR support |
| Repository | GitHub | CI/CD via Vercel integration |

### 2.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     VERCEL EDGE                         │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Static Pages │  │  ISR Pages   │  │  API Routes  │  │
│  │  (home, about)│  │ (case studies)│  │ (/api/intake)│  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
└─────────┼─────────────────┼──────────────────┼──────────┘
          │                 │                  │
          │          ┌──────┴───────┐   ┌──────┴───────┐
          │          │  Sanity.io   │   │   Resend     │
          │          │  Content API │   │   Email API  │
          │          └──────────────┘   └──────────────┘
          │
   ┌──────┴───────┐
   │  Sanity CDN  │
   │  (images)    │
   └──────────────┘
```

### 2.3 Rendering Strategy

| Page | Strategy | Revalidation |
|---|---|---|
| `/` (Home) | SSG + ISR | 3600s (1hr) |
| `/nosotros` (About) | SSG + ISR | 3600s |
| `/servicios` (Services) | SSG + ISR | 3600s |
| `/portafolio` (Portfolio) | ISR | 1800s (30min) |
| `/portafolio/[slug]` | ISR + generateStaticParams | 1800s |
| `/contacto` (Contact) | SSG | Static (form is client-side) |
| `/api/intake` | Edge API Route | N/A |

---

## 3. Information Architecture

### 3.1 Sitemap

```
anabanana.gt/
├── / ......................... Home (hero, value prop, services, social proof, CTA)
├── /nosotros ................ About (executive bio, credentials, methodology, press)
├── /servicios ............... Services Hub (3 pillars)
│   ├── /servicios/keynotes
│   ├── /servicios/talleres-corporativos
│   └── /servicios/consultoria-estrategica
├── /portafolio .............. Case Studies (CMS-driven)
│   └── /portafolio/[slug]
├── /contacto ................ Multi-step Intake Form
└── /api/intake .............. Form submission endpoint
```

### 3.2 Navigation

**Primary Nav (sticky, transparent → solid on scroll):**
- Logo (left)
- Nosotros | Servicios | Portafolio (center)
- "Agendar Consulta" CTA button (right)

**Mobile:** Hamburger → full-screen overlay with staggered entry animation.

**Footer:**
- Contact info (WhatsApp, email)
- Social links (LinkedIn, Instagram — drop TikTok and Facebook for corporate positioning)
- Legal (Privacy, Terms)
- "Agendar Consulta" repeated CTA

---

## 4. Page Specifications

### 4.1 Home (`/`)

**Purpose:** Establish authority in 5 seconds. One scroll to understand what she does, for whom, and why she's different.

**Sections (in order):**

1. **Hero**
   - Full-viewport dark video background (placeholder: dark gradient with subtle grain texture)
   - Headline: "Transformamos el talento de su equipo en resultados corporativos medibles."
   - Subheadline: "Keynotes, facilitación y entrenamiento ejecutivo para las empresas más exigentes de la región."
   - CTA: "Agendar Consulta Privada"
   - Trust bar below hero: client logo strip (placeholder slots for 6 logos)

   > **PLACEHOLDER SPEC — Hero Video:**
   > 4K, 60fps, 8-12 seconds looped. Slow dolly across a large, polished corporate event space — ballroom or auditorium scale. Moody, low-key lighting. No faces in focus. Capture: stage lighting rigs, empty executive seating, architectural lines of the venue. Color grade: desaturated, cool tones (navy/charcoal). Deliver as .mp4 (H.264) and .webm (VP9), max 8MB compressed.

2. **Value Proposition / "Qué Hacemos"**
   - Three-column bento grid (icon + title + short description + "Explorar" link)
   - Keynotes | Talleres Corporativos | Consultoría Estratégica

3. **Authority / Metrics Strip**
   - Animated counters on scroll-in
   - Metrics: "X+ Empresas Impactadas" | "X+ Ejecutivos Entrenados" | "X+ Años de Experiencia" | "X+ Países"
   - (She provides real numbers; placeholders show "XX+" for now)

   > **NOTE TO CLIENT:** Provide exact numbers. Rounded-up minimums are fine (e.g., "200+ Ejecutivos"). These are the single most persuasive element on the page.

4. **Social Proof / Testimonials**
   - CMS-driven testimonial carousel
   - Each card: quote, name, title, company (or anonymized: "Director de RRHH, Empresa Fortune 500 Regional")
   - Dark cards on light section background

   > **PLACEHOLDER SPEC — Testimonials:**
   > Collect 3-5 written testimonials from corporate clients. Minimum info: quote (2-3 sentences), person's name, title, company. If company can't be named, use industry descriptor. Request on company letterhead if possible. Also collect written permission to publish.

5. **Featured Case Study**
   - One hero-sized case study preview pulled from Sanity
   - Dark image background with overlay, headline, key metric, "Ver caso completo" link

6. **Final CTA Section**
   - Full-width dark section
   - "¿Listo para transformar a su equipo?"
   - "Agendar Consulta Privada" button
   - Below button: "Respuesta garantizada en 24 horas hábiles."

### 4.2 About / Nosotros (`/nosotros`)

**Purpose:** Build trust and human connection without undermining authority.

**Executive Bio (rewritten for corporate audience):**

> Ana Gabriela es comunicadora corporativa, facilitadora ejecutiva y estratega de marca con más de [X] años liderando procesos de transformación en empresas de alto rendimiento.
>
> Como fundadora de Grupo anabanana, S.A. y Wellnest, S.A., ha diseñado y ejecutado programas de entrenamiento, conferencias y consultorías estratégicas para organizaciones que exigen resultados medibles — desde programas de marca personal para equipos de liderazgo hasta estrategias de comunicación corporativa para compañías con presupuestos superiores al millón de quetzales.
>
> Su formación combina una Licenciatura en Ciencias de la Comunicación y Administración Industrial con un MBA y certificaciones internacionales en Coaching Ontológico, Liderazgo para la Nueva Manera de Trabajar, Transformación Digital, y Metodologías Ágiles. Es Trainer certificada de META en mercadeo digital.
>
> A lo largo de su trayectoria corporativa, ha liderado áreas de Mercadeo, Desarrollo de Negocios, User Experience, Comunicación, Relaciones Públicas y Publicidad. Como facilitadora y conferencista, ha compartido escenario en foros nacionales e internacionales sobre Identidad Digital, Storytelling Corporativo y Marca Personal Ejecutiva.

**Sections:**
1. Hero image + bio text (side by side on desktop)
2. Credentials grid (education, certifications — icons + labels)
3. Methodology section: "Cómo Trabajamos" — 3-step visual process
4. Press/media section (placeholder for future media mentions)

> **PLACEHOLDER SPEC — Executive Portrait:**
> Professional studio session. Full editorial treatment. Two setups: (A) Close-up headshot, direct eye contact, confident expression, neutral dark background. (B) 3/4 body, power pose (standing, arms relaxed or crossed), corporate wardrobe (structured blazer, solid dark tones), shallow depth of field. Retouching: natural, no heavy filters. Deliver minimum 3000px wide, TIFF + JPEG.

### 4.3 Services / Servicios (`/servicios`)

**Purpose:** Articulate the three service pillars with enough specificity to attract qualified leads, not enough to enable price shopping.

**Hub page:** Three large service cards with CMS-managed content.

**Individual service pages** (`/servicios/[slug]`):

Each service page follows this template:
1. Hero (service title + one-line value statement)
2. "Para quién es" — audience description (e.g., "Equipos de liderazgo de 20-200 personas en empresas con facturación anual superior a Q50M")
3. "Qué incluye" — deliverables list (but NOT prices)
4. "Resultados esperados" — outcomes framed as business metrics
5. CTA: "Solicitar Propuesta"

**Service Pillars:**

**A. Keynotes y Conferencias**
- Corporate keynotes for company events, conventions, leadership summits
- Topics: personal branding, corporate communication, digital identity, leadership
- Format: 45-90 min, customized to client's industry and objectives

**B. Talleres Corporativos**
- Hands-on training workshops for teams
- Topics: Personal Branding, Storytelling for Sales, LinkedIn Strategy, Negotiation, Prospecting, Identity/Image/Reputation
- Format: half-day or full-day, in-person, groups of 15-100+

**C. Consultoría Estratégica**
- 1:1 or small-group executive advisory
- Scope: brand strategy, communication audits, digital presence transformation
- Engagement: retainer or project-based

### 4.4 Portfolio / Portafolio (`/portafolio`)

**Purpose:** Prove capability through curated case studies.

**Layout:** Masonry or staggered grid of case study cards.

**Each card shows:** Client alias, industry tag, hero image, one key metric.

**Individual case study page** (`/portafolio/[slug]`): CMS-driven, follows the schema in Section 5.

> **PLACEHOLDER SPEC — Event Photography:**
> For each case study, capture 5-8 images: (1) Wide shot of full venue/setup. (2) Stage/podium with speaker active. (3) Audience engaged — candid reactions. (4) Detail shots — table settings, branding, production elements. (5) Post-event group/networking shot. Style: high-contrast, slightly desaturated. No harsh flash. Deliver 3000px wide minimum, JPEG at quality 90+.

### 4.5 Contact / Contacto (`/contacto`)

**Purpose:** Qualify leads. Create intentional friction.

Multi-step intake form (see Section 6).

---

## 5. Data Model — Sanity Schemas

### 5.1 Case Study

```typescript
// sanity/schemas/case-study.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Caso de Éxito',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Caso',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientAlias',
      title: 'Nombre del Cliente (o alias)',
      type: 'string',
      description: 'Nombre real o alias corporativo (ej: "Banco Tier 1 Regional")',
    }),
    defineField({
      name: 'industry',
      title: 'Industria',
      type: 'string',
      options: {
        list: [
          'Banca y Finanzas',
          'Tecnología',
          'Manufactura',
          'Retail',
          'Telecomunicaciones',
          'Servicios Profesionales',
          'Farmacéutica',
          'Energía',
          'Otro',
        ],
      },
    }),
    defineField({
      name: 'budgetRange',
      title: 'Rango de Inversión',
      type: 'string',
      options: {
        list: ['Q100k–Q500k', 'Q500k–Q1M', 'Q1M+'],
      },
    }),
    defineField({
      name: 'attendance',
      title: 'Número de Participantes',
      type: 'number',
    }),
    defineField({
      name: 'serviceType',
      title: 'Tipo de Servicio',
      type: 'string',
      options: {
        list: ['Keynote', 'Taller Corporativo', 'Consultoría', 'Evento Integral'],
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'challenge',
      title: 'Desafío del Cliente',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'Solución Entregada',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'results',
      title: 'Resultados',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Métricas de impacto (ej: "92% de satisfacción en encuesta post-evento")',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonio del Cliente',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Cita' },
        { name: 'author', type: 'string', title: 'Nombre' },
        { name: 'role', type: 'string', title: 'Cargo' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en Home',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Fecha', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'clientAlias', media: 'heroImage' },
  },
})
```

### 5.2 Testimonial

```typescript
// sanity/schemas/testimonial.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Cita', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Cargo', type: 'string' }),
    defineField({ name: 'company', title: 'Empresa', type: 'string' }),
    defineField({ name: 'avatar', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  orderings: [
    { title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
```

### 5.3 Service

```typescript
// sanity/schemas/service.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
    defineField({ name: 'icon', title: 'Ícono', type: 'string', description: 'Lucide icon name (e.g., "mic-2", "users", "compass")' }),
    defineField({
      name: 'audience',
      title: 'Para Quién',
      type: 'text',
      rows: 3,
      description: 'Descripción del público objetivo',
    }),
    defineField({
      name: 'deliverables',
      title: 'Qué Incluye',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'outcomes',
      title: 'Resultados Esperados',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'heroImage', title: 'Imagen', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  orderings: [
    { title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
```

### 5.4 Site Settings (Singleton)

```typescript
// sanity/schemas/site-settings.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Titular del Hero',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subtítulo del Hero',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Métricas de Autoridad',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Valor (ej: "200+")' },
          { name: 'label', type: 'string', title: 'Etiqueta' },
        ],
      }],
    }),
    defineField({
      name: 'clientLogos',
      title: 'Logos de Clientes',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Configuración del Sitio' }),
  },
})
```

---

## 6. Intake Funnel — B2B Lead Qualification

### 6.1 Philosophy

High-ticket clients expect to be qualified. The form creates **intentional friction** that filters out price-shoppers and signals exclusivity. A Gmail address rejection is not rude — it's a signal that this is a corporate service.

### 6.2 Form Steps

**Step 1 — Company Information**
- Company name (required)
- Contact person (required)
- Corporate email (required, must not be @gmail.com, @hotmail.com, @yahoo.com)
- Phone (optional)

**Step 2 — Event Details**
- Service of interest: Keynote | Taller Corporativo | Consultoría Estratégica | No estoy seguro
- Estimated number of participants: 1-20 | 20-50 | 50-100 | 100-500 | 500+
- Tentative date or timeframe (date picker)
- Event format: Presencial | Virtual | Híbrido

**Step 3 — Scope & Budget**
- Event objective (textarea, min 20 chars) — "Describa brevemente qué quiere lograr"
- Estimated investment range: Q100k–Q250k | Q250k–Q500k | Q500k–Q1M | Q1M+ | Prefiero discutirlo en la consulta
- How did you hear about us? (dropdown)

**Step 4 — Confirmation**
- Summary of all inputs
- "Enviar Solicitud" button
- Privacy notice + consent checkbox

### 6.3 Validation Schema

```typescript
// src/lib/validations/intake.ts
import { z } from 'zod'

const BLOCKED_DOMAINS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com', 'icloud.com']

export const IntakeSchema = z.object({
  // Step 1
  companyName: z
    .string()
    .min(2, 'Nombre de empresa requerido'),
  contactName: z
    .string()
    .min(2, 'Nombre de contacto requerido'),
  corporateEmail: z
    .string()
    .email('Email inválido')
    .refine(
      (val) => !BLOCKED_DOMAINS.some((d) => val.toLowerCase().endsWith(`@${d}`)),
      { message: 'Por favor utilice su correo corporativo.' }
    ),
  phone: z
    .string()
    .optional(),

  // Step 2
  serviceType: z.enum([
    'keynote',
    'taller-corporativo',
    'consultoria-estrategica',
    'no-estoy-seguro',
  ]),
  participantRange: z.enum(['1-20', '20-50', '50-100', '100-500', '500+']),
  tentativeDate: z
    .string()
    .optional(),
  eventFormat: z.enum(['presencial', 'virtual', 'hibrido']),

  // Step 3
  eventObjective: z
    .string()
    .min(20, 'Describa brevemente el objetivo (mínimo 20 caracteres)'),
  budgetRange: z.enum([
    '100k-250k',
    '250k-500k',
    '500k-1M',
    '1M+',
    'prefer-to-discuss',
  ]),
  referralSource: z
    .string()
    .optional(),

  // Step 4
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, { message: 'Debe aceptar la política de privacidad.' }),
})

export type IntakeFormValues = z.infer<typeof IntakeSchema>
```

### 6.4 Email Routing (Resend)

On valid submission:
1. **To Ana's team:** Formatted lead notification with all fields + lead score (budget × participants)
2. **To lead:** Branded confirmation email: "Gracias por su interés. Nuestro equipo revisará su solicitud y le contactará en las próximas 24 horas hábiles."

---

## 7. UI/UX Design System

> ⚠️ **SUPERSEDED (2026-07-20).** This section describes the original gold
> "Quiet Authority" system for the *Ana Gabriela keynote* positioning. It has
> been **replaced by the brand manual** (`docs/manual-ana-banana.pdf`, "ana
> banana Experiences") — navy/soft-blue/electric-blue/lime palette, Playfair +
> Montserrat (Gotham substitute), and the "Transformar desde lo humano" voice.
> The gold accent is now an explicitly *forbidden* use. See
> [`docs/BRAND_REFACTOR_PLAN.md`](BRAND_REFACTOR_PLAN.md) for the current tokens.
> The rest of this SDD (architecture, data model, intake funnel, deployment)
> remains valid.

### 7.1 Aesthetic Direction

**"Quiet Authority"** — The visual language of a brand that doesn't need to shout. Think: McKinsey's website meets Aman Resorts' editorial photography. Zero clutter. Every pixel earns its place.

### 7.2 Color Palette

```
--color-primary:       #0A0F1C    /* Near-black navy — backgrounds, authority */
--color-secondary:     #1A2332    /* Dark slate — cards, sections */
--color-accent:        #C9A96E    /* Warm gold — CTAs, highlights, premium signal */
--color-accent-hover:  #B8943F    /* Deep gold — hover states */
--color-surface:       #F7F5F0    /* Warm off-white — light sections */
--color-text-primary:  #0A0F1C    /* On light backgrounds */
--color-text-inverse:  #F7F5F0    /* On dark backgrounds */
--color-text-muted:    #6B7280    /* Secondary text */
--color-border:        #E5E1D8    /* Subtle warm borders */
```

### 7.3 Typography

```
Display / H1:    "Playfair Display", serif    — 56-72px, weight 700
Headings H2-H4:  "Playfair Display", serif    — 32-48px, weight 600
Body:            "Source Sans 3", sans-serif   — 16-18px, weight 400
UI / Buttons:    "Source Sans 3", sans-serif   — 14-16px, weight 600, letter-spacing 0.05em uppercase
Caption / Meta:  "Source Sans 3", sans-serif   — 12-14px, weight 400
```

### 7.4 Spacing Scale

```
--space-xs:   0.25rem   (4px)
--space-sm:   0.5rem    (8px)
--space-md:   1rem      (16px)
--space-lg:   2rem      (32px)
--space-xl:   4rem      (64px)
--space-2xl:  6rem      (96px)
--space-3xl:  8rem      (128px)

Section padding: space-2xl (96px) vertical on desktop, space-xl (64px) on mobile
```

### 7.5 Animation Principles

- **Page load:** Staggered fade-up reveals (200ms delay between elements)
- **Scroll:** Elements animate in when 20% visible (IntersectionObserver via Framer Motion `whileInView`)
- **Hover:** Subtle scale (1.02) + shadow lift on cards; color transitions on links/buttons (200ms ease)
- **Navigation:** Smooth backdrop blur on scroll
- **NO:** Parallax. Bouncing logos. Auto-playing carousels. Anything that screams "template."

---

## 8. Media Production Specifications

All placeholders in the dev build include tooltip instructions matching these specs. Ana's production team should treat these as a shot list.

### 8.1 Hero Video
- **Format:** 4K (3840×2160), 60fps, 8-12 second loop
- **Content:** Slow dolly/pan across premium corporate event space. No faces in focus. Moody, architectural. Stage lighting, empty executive seating, venue scale.
- **Color grade:** Cool desaturated — navy/charcoal tones. Slightly underexposed.
- **Delivery:** .mp4 (H.264, CRF 23) + .webm (VP9), ≤8MB per file
- **Dark overlay applied in CSS:** `bg-black/40`

### 8.2 Executive Portraits
- **Setup A:** Headshot, direct eye contact, dark neutral background. Confident, approachable.
- **Setup B:** 3/4 body, power stance. Corporate wardrobe (structured blazer, solid dark tones). Shallow DOF.
- **Lighting:** Rembrandt or loop lighting. No flat flash.
- **Retouching:** Natural. No heavy filters.
- **Delivery:** 3000px wide minimum. TIFF (master) + JPEG (web, quality 90).

### 8.3 Event Photography
- **Per event, 5-8 images:**
  1. Wide establishing shot of venue
  2. Speaker on stage (active delivery)
  3. Audience engagement (candid reactions)
  4. Production details (lighting, branding, table settings)
  5. Networking/post-event moment
- **Style:** High contrast, slightly desaturated. Warm ambient light preferred. No direct flash.
- **Delivery:** 3000px wide, JPEG quality 90+

### 8.4 Client Logos
- **Format:** SVG (preferred) or PNG with transparent background
- **Treatment:** All logos rendered in monochrome (white on dark, dark on light) for visual cohesion
- **Minimum:** 6 logos for the trust bar. 10+ recommended.

---

## 9. SEO & Performance Targets

### 9.1 Core Web Vitals

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.0s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Lighthouse Performance | > 95 |
| Lighthouse SEO | 100 |

### 9.2 SEO Implementation

- Semantic HTML5 throughout
- JSON-LD structured data: Organization, Person (Ana Gabriela), LocalBusiness
- Open Graph + Twitter Card meta per page
- XML Sitemap (auto-generated by Next.js)
- Robots.txt
- Canonical URLs
- Alt text on all images (Sanity `alt` field required on image types)
- Hreflang tags (future: if bilingual version is added)

### 9.3 Keyword Targets

- "conferencista corporativa Guatemala"
- "facilitadora empresarial Guatemala"
- "talleres corporativos Guatemala"
- "entrenamiento ejecutivo Guatemala"
- "eventos corporativos premium Guatemala"

---

## 10. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-01
SANITY_API_TOKEN=your_server_token
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=consultas@anabanana.gt
RESEND_TO_EMAIL=equipo@anabanana.gt
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://anabanana.gt
```

---

## 11. Deployment & DNS

1. **Vercel:** Connect GitHub repo, auto-deploy on push to `main`
2. **DNS:** Point `anabanana.gt` A record to Vercel. Add CNAME `www` → `cname.vercel-dns.com`
3. **Email DNS:** Configure SPF, DKIM, DMARC for `@anabanana.gt` via Resend
4. **Preview:** Each PR gets a preview URL for client review
5. **Sanity Studio:** Accessible at `anabanana.gt/studio` (or separate subdomain)

---

## 12. Development Phases

### Phase 1 — Foundation (Week 1-2)
- Project scaffold (Next.js + Tailwind + TypeScript)
- Design system (tokens, components, layout primitives)
- Sanity project setup + schemas
- Navigation + footer + global layout

### Phase 2 — Pages (Week 3-4)
- Home page (all sections, with placeholders)
- About page
- Services hub + individual service pages
- Portfolio listing + case study detail

### Phase 3 — Functionality (Week 5)
- Intake form (multi-step, validation, Resend integration)
- Sanity ↔ Next.js data fetching (GROQ queries, ISR)
- SEO meta + JSON-LD
- Analytics integration

### Phase 4 — Polish (Week 6)
- Animations (Framer Motion: scroll reveals, page transitions)
- Mobile optimization
- Performance audit (Lighthouse, WebPageTest)
- Accessibility audit (axe-core)
- Placeholder tooltip documentation finalized

### Phase 5 — Launch
- Client content review (replace placeholders with real assets)
- Staging → Production deploy
- DNS cutover from WordPress
- Post-launch monitoring (72hr watch)

---

## Appendix A — What Gets Killed

| Current Element | Action | Reason |
|---|---|---|
| WooCommerce storefront | **Remove entirely** | Destroys positioning. No e-commerce on this domain. |
| Q125 online course | **Remove** | Incompatible with premium positioning. Migrate to separate platform if desired. |
| "Add to Cart" / shopping cart | **Remove** | High-ticket = consultation, not impulse purchase. |
| Storefront WordPress theme | **Replace** | Custom Next.js build. WordPress is decommissioned. |
| TikTok link | **Remove from site** | Not aligned with corporate audience. Keep the account, remove from website. |
| Facebook link | **Remove from site** | Low-value for B2B. LinkedIn and Instagram only. |
| "Buscar producto" search | **Remove** | There are no products to search. |
| "Mi Cuenta" / login | **Remove** | No user accounts needed. |
| WhatsApp widget | **Keep** | But restyle to match new design system. |

---

## Appendix B — Client Action Items

Before real content can replace placeholders, Ana Gabriela must provide:

1. [ ] Executive portrait photos (per spec 8.2)
2. [ ] Hero video (per spec 8.1) — or approve a production team to shoot
3. [ ] 6-10 client logos (with written permission to display)
4. [ ] 3-5 written testimonials (with permission)
5. [ ] Real metrics: years of experience, companies served, executives trained, countries
6. [ ] 2-3 case study writeups (challenge, solution, results)
7. [ ] Event photography from past engagements (per spec 8.3)
8. [ ] Finalized bio review and approval
9. [ ] Corporate email domain configured (`@anabanana.gt`)
10. [ ] Brand assets: logo in SVG format, any existing brand guidelines
