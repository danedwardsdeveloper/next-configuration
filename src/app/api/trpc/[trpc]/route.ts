import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { cookieNames } from '../../../../library/constants/cookies'
import { appRouter } from '../../../../library/trpc/appRouter'
import { createTRPCContextWithToken } from '../../../../library/trpc/initialisation'

const handler = async (req: NextRequest) => {
	const cookieStore = await cookies()
	const token = cookieStore.get(cookieNames.token)?.value

	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () => createTRPCContextWithToken(token, new Headers()),
		onError:
			process.env.NODE_ENV === 'development'
				? ({ path, error }) => {
						console.error(`❌ tRPC failed on ${path ?? '<no-path>'}:`, error.message)
					}
				: undefined,
	})
}

export { handler as GET, handler as POST }