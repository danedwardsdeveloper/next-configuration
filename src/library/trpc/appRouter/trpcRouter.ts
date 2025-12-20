import { createTRPCRouter } from '../initialisation'
import { exampleRouter } from './routers/exampleRouter'

export const trpcRouter = createTRPCRouter({
	example: exampleRouter,
})

export type AppRouter = typeof trpcRouter
