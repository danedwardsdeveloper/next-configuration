import 'dotenv/config'
import { type AppEnv, appEnv } from './environment'

// Rename this file "secrets.ts" and it should be gitignored

// Secrets! Server only! They're secret!!!
if (typeof window !== 'undefined') {
	throw new Error('Browser attempting to import a private environment variable')
}

type Config = {
	dbString: string
	jwtSecret: string
}

// same for each environment
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const jwtSecret = ''

/*
Create a local database
psql
CREATE DATABASE project_name;
*/

export const secrets: Record<AppEnv, Config> = {
	development: {
		// Not a secret but much easy to put it here
		dbString: 'postgresql://localhost/next_configuration',
		jwtSecret,
	},
	staging: {
		dbString: 'neon....',
		jwtSecret,
	},
	production: {
		dbString: 'neon...',
		jwtSecret,
	},
}

export const dynamicSecrets = secrets[appEnv]
