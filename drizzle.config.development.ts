import { secrets } from '@/library/environment/secrets.example'
import { createDrizzleConfig } from './scripts/scriptUtilities/createDrizzleConfig'

export default createDrizzleConfig(secrets.development.dbString)
