import { testDatabaseConnection } from './library/database/connection'
import { isDevelopment } from './library/environment/environment'

export async function register() {
	if (isDevelopment) {
		await testDatabaseConnection()
	}
}
