import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// This creates the connection to your database
export const db = drizzle(sql, { schema });