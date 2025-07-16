import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (extends Supabase auth.users)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').unique().notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  credits: integer('credits').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Payment history table
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(), // Amount in cents (e.g., 2000 for ¥20)
  currency: text('currency').default('JPY').notNull(),
  credits: integer('credits').notNull(), // Credits purchased
  status: text('status').notNull(), // 'pending', 'completed', 'failed'
  paymentMethod: text('payment_method'), // Payment provider details
  transactionId: text('transaction_id'), // External payment ID
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  status: text('status').default('draft').notNull(), // 'draft', 'processing', 'completed', 'failed'
  requirements: jsonb('requirements'), // Array of question-answer pairs
  generatedQuestions: jsonb('generated_questions'), // AI-generated questions
  documentsGenerated: boolean('documents_generated').default(false).notNull(),
  creditsUsed: integer('credits_used').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Documents table
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  type: text('type').notNull(), // 'user-journey', 'prd', 'frontend', 'backend', 'database'
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: text('status').default('generated').notNull(), // 'generated', 'edited', 'archived'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Credit transactions table (for tracking credit usage)
export const creditTransactions = pgTable('credit_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id),
  type: text('type').notNull(), // 'purchase', 'usage', 'refund'
  amount: integer('amount').notNull(), // Positive for purchase/refund, negative for usage
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  payments: many(payments),
  creditTransactions: many(creditTransactions),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  documents: many(documents),
  creditTransaction: many(creditTransactions),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  project: one(projects, {
    fields: [documents.projectId],
    references: [projects.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

export const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  user: one(users, {
    fields: [creditTransactions.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [creditTransactions.projectId],
    references: [projects.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type NewCreditTransaction = typeof creditTransactions.$inferInsert;