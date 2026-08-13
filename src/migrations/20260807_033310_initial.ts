import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiences_pillar" AS ENUM('desarrollo-profesional', 'bienestar-corporativo', 'experiencias-de-integracion');
  CREATE TYPE "public"."enum_experiences_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_version_pillar" AS ENUM('desarrollo-profesional', 'bienestar-corporativo', 'experiencias-de-integracion');
  CREATE TYPE "public"."enum__experiences_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_slug" AS ENUM('desarrollo-profesional', 'bienestar-corporativo', 'experiencias-de-integracion');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('graduation-cap', 'heart', 'users', 'sparkles', 'lightbulb', 'award');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_slug" AS ENUM('desarrollo-profesional', 'bienestar-corporativo', 'experiencias-de-integracion');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('graduation-cap', 'heart', 'users', 'sparkles', 'lightbulb', 'award');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_intake_submissions_service_type" AS ENUM('desarrollo-profesional', 'bienestar-corporativo', 'experiencias-de-integracion', 'no-estoy-seguro');
  CREATE TYPE "public"."enum_intake_submissions_participant_range" AS ENUM('1-20', '20-50', '50-100', '100-500', '500+');
  CREATE TYPE "public"."enum_intake_submissions_event_format" AS ENUM('presencial', 'virtual', 'hibrido');
  CREATE TYPE "public"."enum_intake_submissions_estado" AS ENUM('nueva', 'contactada', 'cerrada');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_valores_items_icono" AS ENUM('graduation-cap', 'heart', 'users', 'sparkles', 'lightbulb', 'award');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_valores_items_icono" AS ENUM('graduation-cap', 'heart', 'users', 'sparkles', 'lightbulb', 'award');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_portfolio_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_nav_enlaces_destino" AS ENUM('/contacto', '/portafolio', '/nosotros', '/servicios/desarrollo-profesional', '/servicios/bienestar-corporativo', '/servicios/experiencias-de-integracion', '/');
  CREATE TYPE "public"."enum_site_settings_footer_enlaces_destino" AS ENUM('/contacto', '/portafolio', '/nosotros', '/servicios/desarrollo-profesional', '/servicios/bienestar-corporativo', '/servicios/experiencias-de-integracion', '/');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_nav_enlaces_destino" AS ENUM('/contacto', '/portafolio', '/nosotros', '/servicios/desarrollo-profesional', '/servicios/bienestar-corporativo', '/servicios/experiencias-de-integracion', '/');
  CREATE TYPE "public"."enum__site_settings_v_version_footer_enlaces_destino" AS ENUM('/contacto', '/portafolio', '/nosotros', '/servicios/desarrollo-profesional', '/servicios/bienestar-corporativo', '/servicios/experiencias-de-integracion', '/');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"decorativa" boolean DEFAULT false,
  	"credito" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "experiences_resultados" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "experiences_contenido_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "experiences_temas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tagline" varchar,
  	"cover_id" integer,
  	"objetivo" varchar,
  	"contenido" varchar,
  	"temas_intro" varchar,
  	"duracion" varchar,
  	"modalidad" varchar DEFAULT 'Virtual, presencial o híbrido',
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"slug" varchar,
  	"pillar" "enum_experiences_pillar",
  	"destacada" boolean DEFAULT false,
  	"fecha" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experiences_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_experiences_v_version_resultados" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_contenido_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_temas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_cover_id" integer,
  	"version_objetivo" varchar,
  	"version_contenido" varchar,
  	"version_temas_intro" varchar,
  	"version_duracion" varchar,
  	"version_modalidad" varchar DEFAULT 'Virtual, presencial o híbrido',
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version_slug" varchar,
  	"version_pillar" "enum__experiences_v_version_pillar",
  	"version_destacada" boolean DEFAULT false,
  	"version_fecha" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experiences_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "services_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tagline" varchar,
  	"resumen" varchar,
  	"description" varchar,
  	"audience" varchar,
  	"foto_id" integer,
  	"cta_etiqueta" varchar DEFAULT 'Diseñemos esta experiencia',
  	"cierre_titulo" varchar DEFAULT '¿Es esta la experiencia que su equipo necesita?',
  	"cierre_texto" varchar DEFAULT 'Conversemos. Escuchamos sus objetivos y diseñamos una experiencia a la medida de su organización.',
  	"cierre_cta_etiqueta" varchar DEFAULT 'Conversemos',
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"slug" "enum_services_slug",
  	"icon" "enum_services_icon",
  	"orden" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_resumen" varchar,
  	"version_description" varchar,
  	"version_audience" varchar,
  	"version_foto_id" integer,
  	"version_cta_etiqueta" varchar DEFAULT 'Diseñemos esta experiencia',
  	"version_cierre_titulo" varchar DEFAULT '¿Es esta la experiencia que su equipo necesita?',
  	"version_cierre_texto" varchar DEFAULT 'Conversemos. Escuchamos sus objetivos y diseñamos una experiencia a la medida de su organización.',
  	"version_cierre_cta_etiqueta" varchar DEFAULT 'Conversemos',
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version_slug" "enum__services_v_version_slug",
  	"version_icon" "enum__services_v_version_icon",
  	"version_orden" numeric DEFAULT 1,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cita" varchar,
  	"autor" varchar,
  	"cargo" varchar,
  	"empresa" varchar,
  	"destacado" boolean DEFAULT false,
  	"orden" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cita" varchar,
  	"version_autor" varchar,
  	"version_cargo" varchar,
  	"version_empresa" varchar,
  	"version_destacado" boolean DEFAULT false,
  	"version_orden" numeric DEFAULT 1,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "client_logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"orden" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "intake_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"contact_name" varchar NOT NULL,
  	"corporate_email" varchar NOT NULL,
  	"phone" varchar,
  	"service_type" "enum_intake_submissions_service_type" NOT NULL,
  	"participant_range" "enum_intake_submissions_participant_range" NOT NULL,
  	"tentative_date" varchar,
  	"event_format" "enum_intake_submissions_event_format" NOT NULL,
  	"event_objective" varchar NOT NULL,
  	"referral_source" varchar,
  	"privacy_consent" boolean DEFAULT false NOT NULL,
  	"estado" "enum_intake_submissions_estado" DEFAULT 'nueva' NOT NULL,
  	"correo_enviado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"experiences_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"client_logos_id" integer,
  	"intake_submissions_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_sembrando_fotos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_titulo" varchar,
  	"hero_titulo_destacado" varchar,
  	"hero_subtitulo" varchar,
  	"hero_cta_etiqueta" varchar,
  	"hero_fondo_id" integer,
  	"marcas_titulo" varchar,
  	"marcas_texto" varchar,
  	"pilares_tag" varchar,
  	"pilares_titulo" varchar,
  	"pilares_descripcion" varchar,
  	"sembrando_tag" varchar,
  	"sembrando_titulo" varchar,
  	"sembrando_texto" varchar,
  	"destacada_tag" varchar,
  	"destacada_resumen" varchar,
  	"destacada_stat_valor" varchar,
  	"destacada_stat_etiqueta" varchar,
  	"destacada_cta_etiqueta" varchar,
  	"testimonios_tag" varchar,
  	"testimonios_titulo" varchar,
  	"testimonios_descripcion" varchar,
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_page_v_version_sembrando_fotos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_titulo" varchar,
  	"version_hero_titulo_destacado" varchar,
  	"version_hero_subtitulo" varchar,
  	"version_hero_cta_etiqueta" varchar,
  	"version_hero_fondo_id" integer,
  	"version_marcas_titulo" varchar,
  	"version_marcas_texto" varchar,
  	"version_pilares_tag" varchar,
  	"version_pilares_titulo" varchar,
  	"version_pilares_descripcion" varchar,
  	"version_sembrando_tag" varchar,
  	"version_sembrando_titulo" varchar,
  	"version_sembrando_texto" varchar,
  	"version_destacada_tag" varchar,
  	"version_destacada_resumen" varchar,
  	"version_destacada_stat_valor" varchar,
  	"version_destacada_stat_etiqueta" varchar,
  	"version_destacada_cta_etiqueta" varchar,
  	"version_testimonios_tag" varchar,
  	"version_testimonios_titulo" varchar,
  	"version_testimonios_descripcion" varchar,
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_page_hero_historia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parrafo" varchar
  );
  
  CREATE TABLE "about_page_valores_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icono" "enum_about_page_valores_items_icono",
  	"titulo" varchar,
  	"descripcion" varchar
  );
  
  CREATE TABLE "about_page_arquetipos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"descripcion" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_titulo" varchar,
  	"hero_titulo_destacado" varchar,
  	"hero_foto_id" integer,
  	"esencia_tag" varchar,
  	"esencia_titulo" varchar,
  	"esencia_titulo_destacado" varchar,
  	"esencia_texto" varchar,
  	"valores_tag" varchar,
  	"valores_titulo" varchar,
  	"arquetipos_tag" varchar,
  	"arquetipos_titulo" varchar,
  	"arquetipos_descripcion" varchar,
  	"cierre_titulo" varchar,
  	"cierre_titulo_destacado" varchar,
  	"cierre_cta_etiqueta" varchar,
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_hero_historia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"parrafo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_valores_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icono" "enum__about_page_v_version_valores_items_icono",
  	"titulo" varchar,
  	"descripcion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_arquetipos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"descripcion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_titulo" varchar,
  	"version_hero_titulo_destacado" varchar,
  	"version_hero_foto_id" integer,
  	"version_esencia_tag" varchar,
  	"version_esencia_titulo" varchar,
  	"version_esencia_titulo_destacado" varchar,
  	"version_esencia_texto" varchar,
  	"version_valores_tag" varchar,
  	"version_valores_titulo" varchar,
  	"version_arquetipos_tag" varchar,
  	"version_arquetipos_titulo" varchar,
  	"version_arquetipos_descripcion" varchar,
  	"version_cierre_titulo" varchar,
  	"version_cierre_titulo_destacado" varchar,
  	"version_cierre_cta_etiqueta" varchar,
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_eyebrow" varchar,
  	"header_titulo" varchar,
  	"header_texto" varchar,
  	"alt_contacto_texto" varchar,
  	"alt_contacto_etiqueta_enlace" varchar,
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_eyebrow" varchar,
  	"version_header_titulo" varchar,
  	"version_header_texto" varchar,
  	"version_alt_contacto_texto" varchar,
  	"version_alt_contacto_etiqueta_enlace" varchar,
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "portfolio_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_eyebrow" varchar,
  	"header_titulo" varchar,
  	"header_texto" varchar,
  	"cierre_experiencia_titulo" varchar,
  	"cierre_experiencia_texto" varchar,
  	"cierre_experiencia_cta_etiqueta" varchar,
  	"seo_meta_titulo" varchar,
  	"seo_meta_descripcion" varchar,
  	"seo_og_imagen_id" integer,
  	"_status" "enum_portfolio_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_portfolio_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_eyebrow" varchar,
  	"version_header_titulo" varchar,
  	"version_header_texto" varchar,
  	"version_cierre_experiencia_titulo" varchar,
  	"version_cierre_experiencia_texto" varchar,
  	"version_cierre_experiencia_cta_etiqueta" varchar,
  	"version_seo_meta_titulo" varchar,
  	"version_seo_meta_descripcion" varchar,
  	"version_seo_og_imagen_id" integer,
  	"version__status" "enum__portfolio_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "site_settings_nav_enlaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"destino" "enum_site_settings_nav_enlaces_destino"
  );
  
  CREATE TABLE "site_settings_footer_enlaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"destino" "enum_site_settings_footer_enlaces_destino"
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"identidad_titulo_base" varchar,
  	"identidad_meta_descripcion" varchar,
  	"contacto_email" varchar,
  	"contacto_whatsapp" varchar,
  	"redes_linkedin" varchar,
  	"redes_instagram" varchar,
  	"redes_tiktok" varchar,
  	"nav_cta_etiqueta" varchar,
  	"footer_cta_titulo" varchar,
  	"footer_cta_titulo_destacado" varchar,
  	"footer_cta_etiqueta" varchar,
  	"footer_blurb" varchar,
  	"footer_entidad" varchar,
  	"footer_ubicacion" varchar,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_nav_enlaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"destino" "enum__site_settings_v_version_nav_enlaces_destino",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_enlaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"destino" "enum__site_settings_v_version_footer_enlaces_destino",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_identidad_titulo_base" varchar,
  	"version_identidad_meta_descripcion" varchar,
  	"version_contacto_email" varchar,
  	"version_contacto_whatsapp" varchar,
  	"version_redes_linkedin" varchar,
  	"version_redes_instagram" varchar,
  	"version_redes_tiktok" varchar,
  	"version_nav_cta_etiqueta" varchar,
  	"version_footer_cta_titulo" varchar,
  	"version_footer_cta_titulo_destacado" varchar,
  	"version_footer_cta_etiqueta" varchar,
  	"version_footer_blurb" varchar,
  	"version_footer_entidad" varchar,
  	"version_footer_ubicacion" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "experiences_resultados" ADD CONSTRAINT "experiences_resultados_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_contenido_items" ADD CONSTRAINT "experiences_contenido_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_temas" ADD CONSTRAINT "experiences_temas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_resultados" ADD CONSTRAINT "_experiences_v_version_resultados_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_contenido_items" ADD CONSTRAINT "_experiences_v_version_contenido_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_temas" ADD CONSTRAINT "_experiences_v_version_temas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_parent_id_experiences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_outcomes" ADD CONSTRAINT "services_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_outcomes" ADD CONSTRAINT "_services_v_version_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_foto_id_media_id_fk" FOREIGN KEY ("version_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "client_logos" ADD CONSTRAINT "client_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_logos_fk" FOREIGN KEY ("client_logos_id") REFERENCES "public"."client_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_intake_submissions_fk" FOREIGN KEY ("intake_submissions_id") REFERENCES "public"."intake_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_sembrando_fotos" ADD CONSTRAINT "home_page_sembrando_fotos_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_sembrando_fotos" ADD CONSTRAINT "home_page_sembrando_fotos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_fondo_id_media_id_fk" FOREIGN KEY ("hero_fondo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_sembrando_fotos" ADD CONSTRAINT "_home_page_v_version_sembrando_fotos_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_sembrando_fotos" ADD CONSTRAINT "_home_page_v_version_sembrando_fotos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_fondo_id_media_id_fk" FOREIGN KEY ("version_hero_fondo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_hero_historia" ADD CONSTRAINT "about_page_hero_historia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_valores_items" ADD CONSTRAINT "about_page_valores_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_arquetipos_items" ADD CONSTRAINT "about_page_arquetipos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_hero_historia" ADD CONSTRAINT "_about_page_v_version_hero_historia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_valores_items" ADD CONSTRAINT "_about_page_v_version_valores_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_arquetipos_items" ADD CONSTRAINT "_about_page_v_version_arquetipos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_page" ADD CONSTRAINT "portfolio_page_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_page_v" ADD CONSTRAINT "_portfolio_page_v_version_seo_og_imagen_id_media_id_fk" FOREIGN KEY ("version_seo_og_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_nav_enlaces" ADD CONSTRAINT "site_settings_nav_enlaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_enlaces" ADD CONSTRAINT "site_settings_footer_enlaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_nav_enlaces" ADD CONSTRAINT "_site_settings_v_version_nav_enlaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_enlaces" ADD CONSTRAINT "_site_settings_v_version_footer_enlaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "experiences_resultados_order_idx" ON "experiences_resultados" USING btree ("_order");
  CREATE INDEX "experiences_resultados_parent_id_idx" ON "experiences_resultados" USING btree ("_parent_id");
  CREATE INDEX "experiences_contenido_items_order_idx" ON "experiences_contenido_items" USING btree ("_order");
  CREATE INDEX "experiences_contenido_items_parent_id_idx" ON "experiences_contenido_items" USING btree ("_parent_id");
  CREATE INDEX "experiences_temas_order_idx" ON "experiences_temas" USING btree ("_order");
  CREATE INDEX "experiences_temas_parent_id_idx" ON "experiences_temas" USING btree ("_parent_id");
  CREATE INDEX "experiences_cover_idx" ON "experiences" USING btree ("cover_id");
  CREATE INDEX "experiences_seo_seo_og_imagen_idx" ON "experiences" USING btree ("seo_og_imagen_id");
  CREATE UNIQUE INDEX "experiences_slug_idx" ON "experiences" USING btree ("slug");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences__status_idx" ON "experiences" USING btree ("_status");
  CREATE INDEX "_experiences_v_version_resultados_order_idx" ON "_experiences_v_version_resultados" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_resultados_parent_id_idx" ON "_experiences_v_version_resultados" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_contenido_items_order_idx" ON "_experiences_v_version_contenido_items" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_contenido_items_parent_id_idx" ON "_experiences_v_version_contenido_items" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_temas_order_idx" ON "_experiences_v_version_temas" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_temas_parent_id_idx" ON "_experiences_v_version_temas" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_parent_idx" ON "_experiences_v" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_version_cover_idx" ON "_experiences_v" USING btree ("version_cover_id");
  CREATE INDEX "_experiences_v_version_seo_version_seo_og_imagen_idx" ON "_experiences_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_experiences_v_version_version_slug_idx" ON "_experiences_v" USING btree ("version_slug");
  CREATE INDEX "_experiences_v_version_version_updated_at_idx" ON "_experiences_v" USING btree ("version_updated_at");
  CREATE INDEX "_experiences_v_version_version_created_at_idx" ON "_experiences_v" USING btree ("version_created_at");
  CREATE INDEX "_experiences_v_version_version__status_idx" ON "_experiences_v" USING btree ("version__status");
  CREATE INDEX "_experiences_v_created_at_idx" ON "_experiences_v" USING btree ("created_at");
  CREATE INDEX "_experiences_v_updated_at_idx" ON "_experiences_v" USING btree ("updated_at");
  CREATE INDEX "_experiences_v_latest_idx" ON "_experiences_v" USING btree ("latest");
  CREATE INDEX "_experiences_v_autosave_idx" ON "_experiences_v" USING btree ("autosave");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_outcomes_order_idx" ON "services_outcomes" USING btree ("_order");
  CREATE INDEX "services_outcomes_parent_id_idx" ON "services_outcomes" USING btree ("_parent_id");
  CREATE INDEX "services_foto_idx" ON "services" USING btree ("foto_id");
  CREATE INDEX "services_seo_seo_og_imagen_idx" ON "services" USING btree ("seo_og_imagen_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_outcomes_order_idx" ON "_services_v_version_outcomes" USING btree ("_order");
  CREATE INDEX "_services_v_version_outcomes_parent_id_idx" ON "_services_v_version_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_foto_idx" ON "_services_v" USING btree ("version_foto_id");
  CREATE INDEX "_services_v_version_seo_version_seo_og_imagen_idx" ON "_services_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "client_logos_logo_idx" ON "client_logos" USING btree ("logo_id");
  CREATE INDEX "client_logos_updated_at_idx" ON "client_logos" USING btree ("updated_at");
  CREATE INDEX "client_logos_created_at_idx" ON "client_logos" USING btree ("created_at");
  CREATE INDEX "intake_submissions_updated_at_idx" ON "intake_submissions" USING btree ("updated_at");
  CREATE INDEX "intake_submissions_created_at_idx" ON "intake_submissions" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_client_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("client_logos_id");
  CREATE INDEX "payload_locked_documents_rels_intake_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("intake_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_sembrando_fotos_order_idx" ON "home_page_sembrando_fotos" USING btree ("_order");
  CREATE INDEX "home_page_sembrando_fotos_parent_id_idx" ON "home_page_sembrando_fotos" USING btree ("_parent_id");
  CREATE INDEX "home_page_sembrando_fotos_foto_idx" ON "home_page_sembrando_fotos" USING btree ("foto_id");
  CREATE INDEX "home_page_hero_hero_fondo_idx" ON "home_page" USING btree ("hero_fondo_id");
  CREATE INDEX "home_page_seo_seo_og_imagen_idx" ON "home_page" USING btree ("seo_og_imagen_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_version_sembrando_fotos_order_idx" ON "_home_page_v_version_sembrando_fotos" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_sembrando_fotos_parent_id_idx" ON "_home_page_v_version_sembrando_fotos" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_sembrando_fotos_foto_idx" ON "_home_page_v_version_sembrando_fotos" USING btree ("foto_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_fondo_idx" ON "_home_page_v" USING btree ("version_hero_fondo_id");
  CREATE INDEX "_home_page_v_version_seo_version_seo_og_imagen_idx" ON "_home_page_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX "about_page_hero_historia_order_idx" ON "about_page_hero_historia" USING btree ("_order");
  CREATE INDEX "about_page_hero_historia_parent_id_idx" ON "about_page_hero_historia" USING btree ("_parent_id");
  CREATE INDEX "about_page_valores_items_order_idx" ON "about_page_valores_items" USING btree ("_order");
  CREATE INDEX "about_page_valores_items_parent_id_idx" ON "about_page_valores_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_arquetipos_items_order_idx" ON "about_page_arquetipos_items" USING btree ("_order");
  CREATE INDEX "about_page_arquetipos_items_parent_id_idx" ON "about_page_arquetipos_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_hero_foto_idx" ON "about_page" USING btree ("hero_foto_id");
  CREATE INDEX "about_page_seo_seo_og_imagen_idx" ON "about_page" USING btree ("seo_og_imagen_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_hero_historia_order_idx" ON "_about_page_v_version_hero_historia" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_hero_historia_parent_id_idx" ON "_about_page_v_version_hero_historia" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_valores_items_order_idx" ON "_about_page_v_version_valores_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_valores_items_parent_id_idx" ON "_about_page_v_version_valores_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_arquetipos_items_order_idx" ON "_about_page_v_version_arquetipos_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_arquetipos_items_parent_id_idx" ON "_about_page_v_version_arquetipos_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_foto_idx" ON "_about_page_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_about_page_v_version_seo_version_seo_og_imagen_idx" ON "_about_page_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "contact_page_seo_seo_og_imagen_idx" ON "contact_page" USING btree ("seo_og_imagen_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_seo_version_seo_og_imagen_idx" ON "_contact_page_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX "portfolio_page_seo_seo_og_imagen_idx" ON "portfolio_page" USING btree ("seo_og_imagen_id");
  CREATE INDEX "portfolio_page__status_idx" ON "portfolio_page" USING btree ("_status");
  CREATE INDEX "_portfolio_page_v_version_seo_version_seo_og_imagen_idx" ON "_portfolio_page_v" USING btree ("version_seo_og_imagen_id");
  CREATE INDEX "_portfolio_page_v_version_version__status_idx" ON "_portfolio_page_v" USING btree ("version__status");
  CREATE INDEX "_portfolio_page_v_created_at_idx" ON "_portfolio_page_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_page_v_updated_at_idx" ON "_portfolio_page_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_page_v_latest_idx" ON "_portfolio_page_v" USING btree ("latest");
  CREATE INDEX "_portfolio_page_v_autosave_idx" ON "_portfolio_page_v" USING btree ("autosave");
  CREATE INDEX "site_settings_nav_enlaces_order_idx" ON "site_settings_nav_enlaces" USING btree ("_order");
  CREATE INDEX "site_settings_nav_enlaces_parent_id_idx" ON "site_settings_nav_enlaces" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_enlaces_order_idx" ON "site_settings_footer_enlaces" USING btree ("_order");
  CREATE INDEX "site_settings_footer_enlaces_parent_id_idx" ON "site_settings_footer_enlaces" USING btree ("_parent_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "_site_settings_v_version_nav_enlaces_order_idx" ON "_site_settings_v_version_nav_enlaces" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_nav_enlaces_parent_id_idx" ON "_site_settings_v_version_nav_enlaces" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_enlaces_order_idx" ON "_site_settings_v_version_footer_enlaces" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_enlaces_parent_id_idx" ON "_site_settings_v_version_footer_enlaces" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "experiences_resultados" CASCADE;
  DROP TABLE "experiences_contenido_items" CASCADE;
  DROP TABLE "experiences_temas" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "_experiences_v_version_resultados" CASCADE;
  DROP TABLE "_experiences_v_version_contenido_items" CASCADE;
  DROP TABLE "_experiences_v_version_temas" CASCADE;
  DROP TABLE "_experiences_v" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_outcomes" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v_version_deliverables" CASCADE;
  DROP TABLE "_services_v_version_outcomes" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "client_logos" CASCADE;
  DROP TABLE "intake_submissions" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_sembrando_fotos" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v_version_sembrando_fotos" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "about_page_hero_historia" CASCADE;
  DROP TABLE "about_page_valores_items" CASCADE;
  DROP TABLE "about_page_arquetipos_items" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_hero_historia" CASCADE;
  DROP TABLE "_about_page_v_version_valores_items" CASCADE;
  DROP TABLE "_about_page_v_version_arquetipos_items" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "portfolio_page" CASCADE;
  DROP TABLE "_portfolio_page_v" CASCADE;
  DROP TABLE "site_settings_nav_enlaces" CASCADE;
  DROP TABLE "site_settings_footer_enlaces" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_nav_enlaces" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_enlaces" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TYPE "public"."enum_experiences_pillar";
  DROP TYPE "public"."enum_experiences_status";
  DROP TYPE "public"."enum__experiences_v_version_pillar";
  DROP TYPE "public"."enum__experiences_v_version_status";
  DROP TYPE "public"."enum_services_slug";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_slug";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_intake_submissions_service_type";
  DROP TYPE "public"."enum_intake_submissions_participant_range";
  DROP TYPE "public"."enum_intake_submissions_event_format";
  DROP TYPE "public"."enum_intake_submissions_estado";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_about_page_valores_items_icono";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_valores_items_icono";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum_portfolio_page_status";
  DROP TYPE "public"."enum__portfolio_page_v_version_status";
  DROP TYPE "public"."enum_site_settings_nav_enlaces_destino";
  DROP TYPE "public"."enum_site_settings_footer_enlaces_destino";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_nav_enlaces_destino";
  DROP TYPE "public"."enum__site_settings_v_version_footer_enlaces_destino";
  DROP TYPE "public"."enum__site_settings_v_version_status";`)
}
