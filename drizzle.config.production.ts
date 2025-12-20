import { productionDatabaseString } from '@/library/environment/serverVariables'
import { createDrizzleConfig } from '../scriptUtilities/createDrizzleConfig'

export default createDrizzleConfig(productionDatabaseString)
