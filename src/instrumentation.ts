import { isDevelopment } from './library/environment/publicVariables'
import { testDatabaseConnection } from './library/database/connection'

export async function register() {
	if (isDevelopment) {
		await testDatabaseConnection()
	}
}
