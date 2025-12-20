import 'dotenv/config'
import logger from '@/library/logger'

// Import dotenv/config here then you don't have to import it in every script!

export function runIfCLIArgument(fn: () => Promise<void>) {
	if (process.argv.includes('run')) {
		;(async () => {
			try {
				await fn()
				process.exit(0)
			} catch (error) {
				logger.error('Error running task:', error)
				process.exit(1)
			}
		})()
	}
}
