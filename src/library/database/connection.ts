import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { sql } from 'drizzle-orm'
import * as schema from './schema'
import logger from '../logger'
import { isProduction, developmentDatabaseString } from '../environment/publicVariables'
import { productionDatabaseString } from '../environment/serverVariables'

export const database = drizzle(
	isProduction // Doing it this way around ensures development is used in tests
		? productionDatabaseString //
		: developmentDatabaseString,
	{ schema },
)

export async function testDatabaseConnection() {
	try {
		await database.execute(sql`SELECT 1`)
		logger.info('Successfully connected to database')
	} catch (error) {
		logger.error('Database connection test failed:', error)
	}
}

export type Database = NodePgDatabase<typeof schema>
export type Transaction = Parameters<Parameters<typeof database.transaction>[0]>[0]
