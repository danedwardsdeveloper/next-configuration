const appEnvValues = [
	'development', //
	'staging',
	'production',
] as const
export type AppEnv = (typeof appEnvValues)[number]

export const appEnv = process.env.NEXT_PUBLIC_APP_ENV as AppEnv
if (!appEnv) throw new Error('NEXT_PUBLIC_APP_ENV missing')

if (!appEnv || !appEnvValues.includes(appEnv as AppEnv)) {
	throw new Error(`Invalid NEXT_PUBLIC_APP_ENV: ${appEnv}`)
}

export const isProduction = appEnv === 'production'
export const isStaging = appEnv === 'staging'
export const isDevelopment = appEnv === 'development'

// For vitest - isDevelopment & isTest can be true at the same time
export const isTest = process.env.NODE_ENV === 'test'

export const bareDomain = 'bare-domain.vercel.app'
export const productionBaseUrl = `https://${bareDomain}`
export const devBaseUrl = 'http://localhost:3000'
export const stagingBaseUrl = 'https://wholesale-handler-staging.fly.dev'

let dynamicBaseUrl = devBaseUrl

if (isStaging) {
	dynamicBaseUrl = stagingBaseUrl
} else if (isProduction) {
	dynamicBaseUrl = 'https://wholesalehandler.com'
}

export { dynamicBaseUrl }
