import type { Config } from 'drizzle-kit'

export const createDrizzleConfig = (connectionString: string): Config => ({
	dialect: 'postgresql',
	schema: './src/library/database/schema.ts',
	out: './drizzle',
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true,
})
