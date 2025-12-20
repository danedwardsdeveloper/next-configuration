import { productionDatabaseString } from '@/library/environment/serverVariables'
import { createDrizzleConfig } from './scripts/scriptUtilities/createDrizzleConfig'

export default createDrizzleConfig(productionDatabaseString)
