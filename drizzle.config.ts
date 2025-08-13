import type { Config } from 'drizzle-kit'

export default {
	dialect: 'postgresql',
	schema: './src/library/database/schema.ts',
	out: './drizzle',
	dbCredentials: { url: process.env.DATABASE_URL || 'postgresql://localhost:5432/nextconfig' },
	verbose: true,
	strict: true,
} satisfies Config