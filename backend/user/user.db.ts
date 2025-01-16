import { drizzle } from "drizzle-orm/node-postgres";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const DB = new SQLDatabase("user", {
  migrations: {
    path: "migrations",
    source: "drizzle",
  },
});

export const db = drizzle(DB.connectionString);
