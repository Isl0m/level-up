// import { env } from "@/env.mjs";
// import { neon, neonConfig } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

// neonConfig.fetchConnectionCache = true;

// const sql = neon(env.DATABASE_URL);
// export const db = drizzle(sql);
import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);
export type DB = typeof db;
