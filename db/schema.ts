import { pgTable, serial, text, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

// This table stores every pig you own
export const pigs = pgTable('pigs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // e.g., "Piggy 1" or "Sow A"
  birthDate: timestamp('birth_date').defaultNow(),
  notes: text('notes'),
});

// This table stores all your expenses
export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(), // e.g., "Feed", "Medicine"
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: timestamp('date').defaultNow(),
  category: text('category'), // e.g., "Feed", "Vet"
});

// This table stores sales when you sell a pig
export const sales = pgTable('sales', {
  id: serial('id').primaryKey(),
  pigId: integer('pig_id').references(() => pigs.id), // Links to a pig
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: timestamp('date').defaultNow(),
});