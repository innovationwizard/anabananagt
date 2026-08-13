# anabanana.gt — sitio + CMS

Sitio corporativo de **ana banana Experiences** (Grupo anabanana, S.A.): presencia B2B de experiencias corporativas que transforman organizaciones *desde lo humano*, en tres pilares: **Desarrollo Profesional**, **Bienestar Corporativo** y **Experiencias de Integración**.

Es **una sola aplicación** Next.js que contiene dos cosas:

- **El sitio público** (`/`, `/nosotros`, `/portafolio`, `/servicios/[pilar]`, `/contacto`).
- **El CMS** (Payload) embebido en `/admin`, en español, desde donde el equipo del cliente edita **todo** el contenido del sitio: textos de cada página, portafolio, pilares, testimonios, logos, fotos, menú, pie de página y SEO — con borradores, vista previa en vivo e historial de versiones.

No hay servicios de CMS externos: el contenido vive en una base Postgres y los archivos en un almacenamiento compatible con S3. Quien reciba este proyecto solo necesita esas dos piezas de infraestructura.

---

## Mapa de la documentación

| Documento | Qué contiene | Para quién |
|---|---|---|
| **Este README** | Qué es el proyecto, cómo levantarlo desde cero y cómo llevarlo a producción | Cualquier desarrollador/proveedor que reciba el repo |
| [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md) | Runbook de producción: Supabase, Vercel, variables, primer despliegue, respaldos, restauración, checklist | Quien opere la infraestructura |
| [docs/GUIA-EDITORES.md](docs/GUIA-EDITORES.md) | Guía de una página para quien edita contenido en `/admin` | El equipo del cliente |
| [docs/CMS-IMPLEMENTATION-PLAN.md](docs/CMS-IMPLEMENTATION-PLAN.md) | Plan con el que se construyó el CMS (decisiones y fases) | Contexto técnico |
| [docs/CMS-RESEARCH.md](docs/CMS-RESEARCH.md) | Investigación que fundamenta el diseño del CMS | Contexto técnico |
| [docs/ANABANANA_SDD_v2.md](docs/ANABANANA_SDD_v2.md) | Especificación original del sitio (su §7 de diseño quedó superado por el manual de marca; sus menciones a Sanity quedaron superadas por Payload) | Contexto histórico |
| [docs/manual-ana-banana.pdf](docs/manual-ana-banana.pdf) | Manual de marca (paleta, tipografía, logo, voz) — fuente de verdad visual | Diseño |

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components, Turbopack) |
| Lenguaje | TypeScript estricto |
| CMS | **Payload 3** embebido (panel en `/admin`, API en `/api`) |
| Base de datos | Postgres (local en dev · Supabase en producción) |
| Archivos/medios | Disco local en dev · **Supabase Storage** vía API compatible con S3 en producción |
| Estilos | Tailwind CSS v4 (tokens de diseño en `globals.css`) |
| Animación | Framer Motion |
| Formularios | React Hook Form + Zod |
| Correo transaccional | Resend |
| Hosting actual | Vercel (portable: ver «Cambiar de proveedor») |

> **Nota sobre Next.js 16**: este repo usa una versión con cambios importantes respecto a versiones anteriores (APIs de petición asíncronas, caché no automática, `revalidateTag` con dos argumentos…). Antes de tocar APIs de Next, consulta la documentación incluida en `node_modules/next/dist/docs/` — así lo indica también [AGENTS.md](AGENTS.md).

---

## Arquitectura en 60 segundos

```
src/app/(site)/        El sitio público (layout propio con navbar/footer)
src/app/(payload)/     El panel /admin y la API REST/GraphQL de Payload (generado por Payload)
src/app/api/intake/    POST del formulario de contacto (persiste y luego notifica)
payload.config.ts      Configuración del CMS (colecciones, globals, i18n es, storage, preview)
src/collections/       media · experiences · services · testimonials · clientLogos · intakeSubmissions · users
src/globals/           homePage · aboutPage · contactPage · portfolioPage · siteSettings
src/access/            Autorización centralizada (admin/editor) — ÚNICO lugar con reglas de acceso
src/lib/content/       Capa de datos: ÚNICO punto por el que las páginas leen contenido
src/lib/preview.ts     Mapa documento→URL para vista previa y Live Preview
src/hooks/revalidate.ts  Hooks que purgan caché al publicar
src/fields/            Fábricas de campos compartidos (slug, SEO, listas cerradas)
src/migrations/        Migraciones SQL para producción (dev no las usa)
scripts/seed.ts        Siembra idempotente del contenido inicial
```

Cómo fluye el contenido:

1. **Lectura publicada**: las páginas llaman a `src/lib/content` (Local API de Payload — consultas directas a Postgres, sin HTTP) envuelto en `unstable_cache` con etiquetas.
2. **Publicar en `/admin`** dispara hooks que revalidan la etiqueta correspondiente → Next regenera solo las páginas afectadas, en segundos. (Semántica *stale-while-revalidate*: la primera petición tras publicar puede servir la versión anterior mientras se regenera.)
3. **Borradores**: todo se autoguarda como borrador; el sitio público solo cambia al pulsar «Publicar». La **Vista previa en vivo** del panel muestra el sitio real (móvil/tableta/escritorio) con los cambios de borrador al instante. En el navegador, el modo borrador se activa por una ruta con secreto (`/next/preview`) y se sale con el aviso «Viendo borrador → Salir».
4. **Medios**: al subir una imagen, sharp genera variantes; en dev van a `./media` (ignorado por git), en producción al bucket (URLs públicas directas del CDN). El texto alternativo es obligatorio salvo imágenes decorativas.
5. **Formulario de contacto**: se valida con Zod, **se guarda primero** en la colección «Solicitudes» (fuente de verdad) y después se intentan los correos. Si el correo falla o falta la clave de Resend, la solicitud queda marcada «correo no enviado» y visible en el panel — **ningún camino pierde un lead en silencio**.
6. **Roles**: `admin` (contenido + usuarios + ajustes) y `editor` (contenido). Sin límite de usuarios. Las reglas viven solo en `src/access/`.

---

## Levantarlo en local (primer intento, paso a paso)

**Requisitos**: Node.js ≥ 20.9 (probado con 22) · npm · Postgres local corriendo (Homebrew, Docker o `supabase start` — cualquiera sirve).

```bash
# 1. Dependencias
npm install

# 2. Variables de entorno
cp .env.example .env
# Edita .env: solo necesitas las 4 primeras variables en dev:
#   DATABASE_URL   → tu Postgres local, p. ej. postgresql://TU_USUARIO@localhost:5432/anabanana_cms
#   PAYLOAD_SECRET → genera uno: openssl rand -hex 32
#   PREVIEW_SECRET → genera otro: openssl rand -hex 32
#   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# (Las variables S3_*/Resend son SOLO de producción: en dev déjalas comentadas.)

# 3. Crea la base de datos vacía
createdb anabanana_cms          # o: psql -c 'CREATE DATABASE anabanana_cms'

# 4. Siembra el contenido inicial (crea el esquema + todo el contenido real del sitio)
npm run seed

# 5. Arranca
npm run dev                     # → http://localhost:3000
```

Primer uso del panel: abre **http://localhost:3000/admin** → te pedirá crear el primer usuario (será Administrador). El panel está en español.

Con eso el sitio completo funciona en local: páginas con contenido, panel, borradores, vista previa, formulario (las solicitudes se guardan; el correo queda «no enviado» hasta configurar Resend — comportamiento esperado).

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (el esquema de la base se sincroniza solo — *push*) |
| `npm run seed` | Siembra/actualiza el contenido inicial (idempotente: puedes re-ejecutarlo) |
| `npm run build` / `npm run start` | Build y servidor de producción locales |
| `npm run ci` | **Build de producción real**: aplica migraciones y compila (lo usa Vercel vía `vercel.json`) |
| `npm run lint` | ESLint (cero errores es el estándar del repo) |
| `npm run generate:types` | Regenera `src/payload-types.ts` tras cambiar colecciones/globals |
| `npm run generate:importmap` | Regenera el import map del panel tras añadir componentes admin |

### Variables de entorno

Todo está documentado con comentarios en [.env.example](.env.example). Resumen:

| Variable | Dev | Producción |
|---|---|---|
| `DATABASE_URL` | Postgres **local** | Pooler de transacciones de Supabase (6543) |
| `DIRECT_URL` | — | Conexión directa/session (5432), solo para migraciones |
| `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `CRON_SECRET` | generados localmente | generados aparte para producción (nunca se comparten entre entornos) |
| `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://anabanana.gt` |
| `S3_BUCKET/REGION/ENDPOINT/ACCESS_KEY_ID/SECRET_ACCESS_KEY`, `SUPABASE_PUBLIC_HOSTNAME` | — (disco local) | Supabase Storage, S3 Connection |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` | opcional | correo del formulario (sin la clave, los leads igual se guardan) |

Si falta una variable requerida, el arranque **falla con un mensaje claro** que la nombra — no hay valores de relleno silenciosos.

---

## Producción

El runbook completo (Supabase + Vercel, paso a paso, con checklist) es **[docs/DESPLIEGUE.md](docs/DESPLIEGUE.md)**. Lo esencial:

- **Regla de oro**: dev sincroniza el esquema por *push* contra la base **local**; producción usa **solo migraciones** (`src/migrations/`, aplicadas por `npm run ci` durante el build). Nunca se mezclan: no ejecutes `payload migrate` contra la base local ni apuntes `npm run dev` a producción.
- Cambiaste colecciones/globals → `npx payload migrate:create <nombre>` → commit del cambio + la migración juntos.
- Primer despliegue: build (aplica migraciones) → `seed` contra producción → refrescar cachés → crear usuarios reales → revisión visual completa.
- **Respaldos**: además del respaldo diario de Supabase (solo base de datos), el workflow [`.github/workflows/backup.yml`](.github/workflows/backup.yml) guarda semanalmente base **y** medios como artefacto (el Storage no tiene versionado: un borrado sin respaldo es permanente).
- Publicación programada (opcional): un cron externo debe llamar `GET /api/payload-jobs/run` con `Authorization: Bearer $CRON_SECRET` cada ~5 min (Supabase Cron, GitHub Actions o el cron del proveedor — **no** se usa Vercel Cron en este proyecto).

## Cambiar de proveedor de infraestructura

El proyecto no depende de Vercel ni de Supabase en el código — solo de tres capacidades estándar. Cualquier proveedor que ofrezca esto puede alojarlo:

1. **Hosting Node.js para Next.js 16** (serverless o servidor persistente, Node ≥ 20.9). El build de producción es `npm run ci`.
2. **Postgres** (cualquier Postgres gestionado o propio). Solo cambian `DATABASE_URL`/`DIRECT_URL`.
3. **Almacenamiento compatible con S3** (Supabase Storage, AWS S3, Cloudflare R2, MinIO…). Solo cambian las variables `S3_*` y `SUPABASE_PUBLIC_HOSTNAME` → el host público desde el que sirven los archivos (y su patrón en `next.config.ts` si la ruta pública difiere del formato de Supabase).

**Para migrar los datos**: los artefactos del workflow de respaldo son el vehículo — `db.dump` (restaurar con `pg_restore`) + `media.tar.gz` (subir al nuevo bucket con `aws s3 sync --endpoint-url …`). Procedimientos exactos en [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md) §4.

**Al traspasar el proyecto, rotar SIEMPRE**: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `CRON_SECRET`, las claves S3 y la clave de Resend. Los secretos anteriores quedan inválidos para quien los haya tenido.

---

## Contenido: qué se edita y dónde

| En `/admin` | Contenido |
|---|---|
| **Páginas** | Inicio · Nosotros · Contacto · Portada del portafolio (todo el texto de cada página, con pestaña SEO) |
| **Contenido** | Experiencias (talleres del portafolio) · Pilares de servicio (los 3, fijos) · Testimonios · Logos de clientes · Biblioteca de medios |
| **Solicitudes** | Leads del formulario, con estado de seguimiento |
| **Configuración** | Ajustes del sitio (menú, pie, redes, WhatsApp, SEO base) y Usuarios — solo administradores |

Guardarraíles ya integrados: solo puede haber **una** experiencia destacada (se desmarca sola la anterior) · los *slugs* de los 3 pilares son listas cerradas (el enrutamiento y el formulario dependen de ellos) · iconos y destinos de enlaces son listas cerradas · texto alternativo obligatorio en imágenes (salvo decorativas) · publicar con campos requeridos vacíos es imposible · historial de versiones en todo.

La guía para editores es [docs/GUIA-EDITORES.md](docs/GUIA-EDITORES.md).

### Contenido pendiente del cliente (el sitio muestra marcadores de posición mientras tanto)

- Video de la portada del inicio (especificaciones visibles en el propio marcador).
- Fotos de 2 pilares (Bienestar, Integración) y 2 fotos de «Sembrando futuro».
- Testimonios reales (los 3 actuales son marcadores de posición explícitos).
- Clave de Resend (`RESEND_API_KEY`) para activar los correos del formulario.

---

## Detalles que conviene saber (evitan sorpresas)

- **`npm run seed` es idempotente** (actualiza, no duplica) pero **no revalida cachés** (corre fuera de Next): tras sembrar, publica cualquier documento en `/admin` o haz un build/deploy fresco.
- **`X-Frame-Options: SAMEORIGIN`** (no DENY) es intencional: la Vista previa en vivo del panel muestra el sitio en un iframe del mismo origen.
- **Fuentes**: Playfair Display + Montserrat se auto-alojan en build vía `next/font` — sin peticiones a Google en runtime.
- El **formulario de contacto** (pasos, campos, validación) vive en código (`src/lib/validations/intake.ts` + `src/components/contact/`), no en el CMS — decisión deliberada: moverlo invitaría a estados rotos.
- **Correo corporativo obligatorio** en el formulario: dominios gratuitos (gmail, hotmail…) se rechazan por diseño.
- Los archivos de `src/app/(payload)/` los genera Payload — no editarlos a mano.
- **Los builds de producción usan webpack, no Turbopack** (`next build --webpack` en los scripts `build` y `ci`): con Turbopack, el build de producción genera un panel `/admin` en blanco — sin errores en consola, simplemente vacío (bug de Payload+Turbopack verificado el 2026-08-13 con payload 3.87.1 / Next 16.2.7; dev con Turbopack funciona bien). Al actualizar Payload, se puede probar quitar `--webpack` y verificar `/admin` en un build local (`npm run build && npm run start`) **abriéndolo en un navegador** — el HTML no basta: el panel siempre se renderiza en el cliente.
- En dev, si el HMR del panel `/admin` se comporta raro con Turbopack: `next dev --webpack` como salida.

## Diagnóstico rápido

| Síntoma | Causa y solución |
|---|---|
| Al arrancar: `Falta la variable de entorno requerida: X` | Completa `X` en `.env` (ver [.env.example](.env.example)) |
| Build falla: `Contenido requerido ausente en el CMS: …` | La base está vacía o falta un documento: `npm run seed`, o publica ese documento en `/admin` |
| `/next/preview` responde 401 «Secreto de vista previa inválido» | El `PREVIEW_SECRET` del entorno no coincide con el del panel que generó el enlace |
| Publiqué y el sitio no cambió | Espera una petición más (*stale-while-revalidate*) — o acabas de sembrar (ver arriba) |
| El build de producción se congela en `payload migrate` con «It looks like you've run Payload in dev mode…» | Algo inicializó Payload contra la base de producción sin `NODE_ENV=production` (p. ej. el seed) y dejó un marcador de modo dev. Fix: Supabase → SQL Editor → `DELETE FROM payload_migrations WHERE batch = -1;` y redeployar. No hay pérdida de datos: la migración ya aplicada se omite. |
| `/admin` carga una página en blanco en producción (sin errores en consola; el sitio funciona) | El build se hizo con Turbopack. Los scripts `build`/`ci` deben llevar `next build --webpack` (ver «Detalles que conviene saber»). |
| Las imágenes no cargan en producción | Revisa `SUPABASE_PUBLIC_HOSTNAME` y que el bucket sea **Public**; el patrón permitido vive en `next.config.ts` |
| El formulario «funciona» pero no llegan correos | Comportamiento esperado sin `RESEND_API_KEY`: los leads están en `/admin` → Solicitudes, marcados «correo no enviado» |
