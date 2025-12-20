import { developmentDatabaseString } from '@/library/environment/publicVariables'
import { createDrizzleConfig } from './scripts/scriptUtilities/createDrizzleConfig'

export default createDrizzleConfig(developmentDatabaseString)
