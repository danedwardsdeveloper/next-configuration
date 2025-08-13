import { requireVariable } from './requireVariable'

export const productionDatabaseString = requireVariable('PRODUCTION_DATABASE_STRING')
export const jwtSecret = requireVariable('JWT_SECRET')
