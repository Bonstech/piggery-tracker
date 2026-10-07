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

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});