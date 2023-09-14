import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
