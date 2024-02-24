import type { Config } from 'drizzle-kit';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
export default {
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} as Config;
