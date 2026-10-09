import { pgTable, serial, text, timestamp, integer, numeric, date, boolean } from 'drizzle-orm/pg-core';

// Pigs registry
export const pigs = pgTable('pigs', {
  id: serial('id').primaryKey(),
  tagNumber: text('tag_number').notNull().unique(), // e.g., "PIG-001"
  name: text('name'), // optional friendly name
  birthDate: date('birth_date'),
  gender: text('gender'), // "Male" or "Female"
  notes: text('notes'),
  status: text('status').default('Active'), // Active, Sold, Deceased
  createdAt: timestamp('created_at').defaultNow(),
});

export const accessCodes = pgTable('access_codes', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  label: text('label'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Expenses with categories
export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull().default('Other'),
  date: timestamp('date').defaultNow(),
  notes: text('notes'),
});

// Sales
export const sales = pgTable('sales', {
  id: serial('id').primaryKey(),
  pigId: integer('pig_id').references(() => pigs.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  buyer: text('buyer'),
  date: timestamp('date').defaultNow(),
  notes: text('notes'),
});

// Records (weaning, castration, vaccinations, etc.)
export const records = pgTable('records', {
  id: serial('id').primaryKey(),
  pigId: integer('pig_id').references(() => pigs.id).notNull(),
  type: text('type').notNull(), // "Weaning", "Castration", "Vaccination", "Deworming", "Other"
  date: timestamp('date').defaultNow(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});


