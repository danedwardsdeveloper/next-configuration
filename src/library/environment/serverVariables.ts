import { isProduction, productionBaseURL, developmentBaseURL } from './publicVariables'
import { requireVariable } from './requireVariable'

export const someVariable = requireVariable('SOME_VARIABLE')

export const serverSideBaseUrl = isProduction
	? process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: productionBaseURL
	: developmentBaseURL

