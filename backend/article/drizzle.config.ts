import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "migrations",
  schema: "article.schema.ts",
  dialect: "postgresql",
});
