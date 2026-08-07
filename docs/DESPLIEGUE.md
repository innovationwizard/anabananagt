# Despliegue a producción — runbook

_Topología: GitHub → Vercel (hosting) → Supabase Pro (Postgres + Storage). Dev nunca toca producción: local usa Postgres local + disco local. Última actualización: 2026-08-07._

## 0. Regla de oro de la base de datos

- **Dev**: push automático contra Postgres **local** (`.env`). Nunca ejecutes `payload migrate` contra la base local (push y migraciones no se mezclan).
- **Producción**: SOLO migraciones (`src/migrations/`, generadas con `npx payload migrate:create <nombre>` tras cambiar schemas). El build de Vercel las aplica (`npm run ci`, ver `vercel.json`) usando `DIRECT_URL`.
- Cambiaste un schema → genera la migración → commit junto al cambio.

## 1. Supabase (una vez, en el proyecto Pro)

1. **Storage**: crear bucket `media`, marcado **Public**.
2. **Claves S3**: Project Settings → Storage → **S3 Connection** → crear access key. Anotar endpoint (`https://<ref>.storage.supabase.co/storage/v1/s3`), región, key id y secret. Son de servidor: solo van a Vercel y a los secretos de GitHub.
3. **Conexiones**: Project Settings → Database. Anotar **pooler de transacciones (6543)** para runtime y **session/directa (5432)** para migraciones y respaldos.
4. **Supabase Cron** (para publicación programada): Dashboard → Integrations → Cron → nuevo job cada 5 min que haga un HTTP GET a `https://anabanana.gt/api/payload-jobs/run` con header `Authorization: Bearer <CRON_SECRET>`. (Puede posponerse: sin esto, todo funciona salvo programar publicaciones a futuro.)

## 2. Vercel — variables de entorno (Production)

| Variable | Valor |
|---|---|
| `DATABASE_URL` | pooler de transacciones (6543) |
| `DIRECT_URL` | conexión session/directa (5432) — solo la usa el paso de migraciones |
| `PAYLOAD_SECRET` | `openssl rand -hex 32` (nuevo, distinto al de dev) |
| `PREVIEW_SECRET` | `openssl rand -hex 32` (nuevo) |
| `CRON_SECRET` | `openssl rand -hex 32` (nuevo) |
| `S3_BUCKET` / `S3_REGION` / `S3_ENDPOINT` / `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | de Supabase §1.2 |
| `SUPABASE_PUBLIC_HOSTNAME` | `<ref>.supabase.co` (imágenes en next/image) |
| `NEXT_PUBLIC_SERVER_URL` | `https://anabanana.gt` |
| `NEXT_PUBLIC_SITE_URL` | `https://anabanana.gt` |
| `RESEND_API_KEY` | **pendiente (Jorge)** — sin ella las solicitudes se guardan igualmente y quedan marcadas «correo no enviado» |
| `RESEND_FROM_EMAIL` / `RESEND_TO_EMAIL` | `consultas@anabanana.gt` / `equipo@anabanana.gt` |

El build command viene de `vercel.json` → `npm run ci` (= migraciones + build). Guarda los secretos en el vault compartido, nunca en el repo.

## 3. Primer despliegue (orden exacto)

1. Deploy en Vercel → el build aplica `src/migrations/` a la base vacía (crea todo el schema).
2. **Sembrar producción** desde tu máquina, con env de producción SOLO en esa terminal:
   `DATABASE_URL=<pooler> S3_BUCKET=… S3_REGION=… S3_ENDPOINT=… S3_ACCESS_KEY_ID=… S3_SECRET_ACCESS_KEY=… SUPABASE_PUBLIC_HOSTNAME=… PAYLOAD_SECRET=<el de prod> npx tsx scripts/seed.ts`
   (`tsx` no lee `.env`, así que solo aplican las variables de esa línea; los medios suben al bucket con su texto alternativo).
3. Redeploy (o publicar cualquier documento en `/admin`) para regenerar cachés con el contenido sembrado.
4. Crear usuarios en `/admin`: Jorge como **Administrador**; la editora del cliente como **Editor** con su **nombre y correo reales** — el marcador «Editor Name / editor@example.com» de dev **no debe existir en producción**.
5. **Revisión visual completa** del sitio en producción antes de anunciar (lo revisado es lo que se publica).

## 4. Respaldos

- Supabase Pro: respaldo diario de la **base** (7 días). Storage **no tiene versionado** — borrados son permanentes.
- Segunda copia: workflow `Respaldo de producción` (`.github/workflows/backup.yml`), domingos + manual. Requiere secretos de GitHub: `SUPABASE_DB_URL` (5432), `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`. Artefactos 90 días.
- **Restaurar base**: `docker run --rm -v "$PWD:/b" postgres:17 pg_restore -d "<SUPABASE_DB_URL>" --clean --no-owner /b/db.dump`
- **Restaurar medios**: descomprimir `media.tar.gz` y `aws s3 sync ./media-backup "s3://media" --endpoint-url <S3_ENDPOINT>`.

## 5. Checklist de verificación post-despliegue

- [ ] `/` y todas las páginas renderizan con contenido (no marcadores vacíos).
- [ ] `/admin` carga en español; login de ambos usuarios funciona.
- [ ] Editar y publicar el titular del inicio → el sitio público cambia en segundos.
- [ ] Vista previa en vivo funciona (borrador visible solo con el aviso «Viendo borrador»).
- [ ] Subir una imagen en Biblioteca de medios → aparece en el bucket de Supabase y sirve desde `…/storage/v1/object/public/media/…`.
- [ ] Enviar el formulario de contacto → aparece en Solicitudes (con `RESEND_API_KEY` pendiente: marcada «correo no enviado», y el lead ve éxito).
- [ ] Ejecutar manualmente el workflow de respaldo → artefacto con `db.dump` y `media.tar.gz`.
