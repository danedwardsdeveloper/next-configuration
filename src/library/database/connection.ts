import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import type { DatabaseTarget } from '../constants/_misc_constants'
import { appEnv, developmentDatabaseString } from '../environment/publicVariables'
import { productionDatabaseString, stagingDatabaseString } from '../environment/serverVariables'
import logger from '../logger'
import * as schema from './schema'

export const dbConnectionConfig: Record<DatabaseTarget, string> = {
	development: developmentDatabaseString,
	staging: stagingDatabaseString,
	production: productionDatabaseString,
}

const connectionString = dbConnectionConfig[appEnv]

// exported for scripts/resetDatabase
export function truncateConnectionString(cString: string): string {
	try {
		const url = new URL(cString)
		// Mask password but keep other identifying info
		const maskedPassword = url.password ? '***' : ''
		return `${url.protocol}//${url.username}${maskedPassword ? `:${maskedPassword}` : ''}@${url.host}${url.pathname}`
	} catch {
		// Fallback if URL parsing fails
		return cString.replace(/:[^:@]+@/, ':***@')
	}
}

const pool = new Pool({
	connectionString,
	max: 5,
	idleTimeoutMillis: 30_000,
	connectionTimeoutMillis: 10_000,
})

export const db = drizzle(pool, { schema })

// Only create pools when accessed
// They must be separate or things can go very wrong
let _devDb: NodePgDatabase<typeof schema> | null = null
let _stagingDb: NodePgDatabase<typeof schema> | null = null
let _productionDb: NodePgDatabase<typeof schema> | null = null

export function getDevDb() {
	if (!_devDb) {
		const devPool = new Pool({ connectionString: developmentDatabaseString })
		_devDb = drizzle(devPool, { schema })
	}
	return _devDb
}

export function getStagingDb() {
	if (!_stagingDb) {
		const stagingPool = new Pool({ connectionString: stagingDatabaseString })
		_stagingDb = drizzle(stagingPool, { schema })
	}
	return _stagingDb
}

export function getProductionDb() {
	if (!_productionDb) {
		const productionPool = new Pool({ connectionString: productionDatabaseString })
		_productionDb = drizzle(productionPool, { schema })
	}
	return _productionDb
}

export async function testDatabaseConnection() {
	try {
		await db.execute('select 1')
		const truncated = truncateConnectionString(connectionString)
		logger.success(`Connected to ${appEnv} database ${truncated}`)
	} catch (error) {
		const truncated = truncateConnectionString(connectionString)
		logger.error(`Failed to connect to ${appEnv} database ${truncated}`, error)
	}
}

export type Database = NodePgDatabase<typeof schema>
export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]
export type QueryRunner = Database | Transaction
