import logger from './library/logger'

import { isDevelopment } from './library/environment/publicVariables'

export function register() {
  if (isDevelopment) {
    logger.info(`register function from src/instrumentation called`)
    // testDatabaseConnection() etc.
  }
}
