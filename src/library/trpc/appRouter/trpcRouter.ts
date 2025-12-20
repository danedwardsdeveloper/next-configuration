import { createTRPCRouter } from '../initialisation'
import { authRouter } from './routers/authRouter'
import { exampleRouter } from './routers/exampleRouter'

export const trpcRouter = createTRPCRouter({
	auth: authRouter,
	example: exampleRouter,
})

export type AppRouter = typeof trpcRouter
