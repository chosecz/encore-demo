CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "public"."article_status" AS ENUM('draft', 'published', 'archived');

CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" varchar(20) DEFAULT 'draft',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"author_id" uuid NOT NULL,
	"image_url" text,
	"image_bucket_key" text,
	CONSTRAINT "article_status_check" CHECK ((status)::text = ANY ((ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying])::text[]))
);

