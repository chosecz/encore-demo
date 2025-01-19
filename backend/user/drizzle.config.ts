import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "migrations",
  schema: "user.schema.ts",
  dialect: "postgresql",
});
