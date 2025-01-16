import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const articleStatus = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const schemaMigrations = pgTable("schema_migrations", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  version: bigint({ mode: "number" }).primaryKey().notNull(),
  dirty: boolean().notNull(),
});

export const articles = pgTable(
  "articles",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    title: text().notNull(),
    description: text().notNull(),
    status: varchar({ length: 20 }).default("draft"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    authorId: uuid("author_id").notNull(),
    imageUrl: text("image_url"),
    imageBucketKey: text("image_bucket_key"),
  },
  (table) => [
    check(
      "article_status_check",
      sql`(status)::text = ANY ((ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying])::text[])`
    ),
  ]
);
