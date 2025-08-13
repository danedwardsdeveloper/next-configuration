import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

/*
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
Enums
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

IMPORTANT: When generating pg enums, remember to:
1. Export both the values array and the enum
2. Create the corresponding TypeScript type
3. Use the enum in the table schema
4. The enum values must be lowercase for PostgreSQL

Example pattern:
export const roleValues = ['admin', 'user'] as const
export type Role = (typeof roleValues)[number] 
export const roleEnum = pgEnum('role', roleValues)
*/

export const roleValues = ['admin', 'user'] as const
export type Role = (typeof roleValues)[number]
export const roleEnum = pgEnum('role', roleValues)

/*
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
Tables
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
*/

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	role: roleEnum('role').notNull().default('user'),
	emailConfirmed: boolean('email_confirmed').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type DangerousUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type SafeUser = Omit<DangerousUser, 'hashedPassword'>

export const userSelectSchema = createSelectSchema(users)

export const signInSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
})

export const createAccountSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters').max(100),
})

export type SignInFormData = z.infer<typeof signInSchema>
export type CreateAccountFormData = z.infer<typeof createAccountSchema>

export const confirmationTokens = pgTable('confirmation_tokens', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	token: text('token').notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	usedAt: timestamp('used_at'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type ConfirmationToken = typeof confirmationTokens.$inferSelect
export type InsertConfirmationToken = typeof confirmationTokens.$inferInsert