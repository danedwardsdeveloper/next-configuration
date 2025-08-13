import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import logger from '../logger'
import { isProduction, developmentDatabaseString } from '../environment/publicVariables'
import { productionDatabaseString } from '../environment/serverVariables'

export const database = drizzle(isProduction ? productionDatabaseString : developmentDatabaseString, { schema })

export async function testDatabaseConnection() {
	try {
		await database.execute(sql`SELECT 1`)
		logger.info('Successfully connected to database')
	} catch (error) {
		logger.error('Database connection test failed:', error)
	}
}