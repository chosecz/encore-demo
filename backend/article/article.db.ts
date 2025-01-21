import { drizzle } from "drizzle-orm/node-postgres";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import pg from "pg";

const { Pool } = pg;

const DB = new SQLDatabase("article", {
  migrations: {
    path: "migrations",
    source: "drizzle",
  },
});

const pool = new Pool({
  connectionString: DB.connectionString,
});

export const db = drizzle(pool);
