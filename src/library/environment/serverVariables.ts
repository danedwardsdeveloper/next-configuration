import { requireVariable } from './requireVariable'

// ==================================================
// Database
// ==================================================
export const stagingDatabaseString = requireVariable('STAGING_DATABASE_STRING')
export const productionDatabaseString = requireVariable('PRODUCTION_DATABASE_STRING')

// ==================================================
// Security
// ==================================================
export const jwtSecret = requireVariable('JWT_SECRET')
