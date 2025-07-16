import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create the connection
const connectionString = process.env.DATABASE_URL!;

// Disable prefetch for migrations
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

// Type exports
export type Database = typeof db;
export * from './schema';