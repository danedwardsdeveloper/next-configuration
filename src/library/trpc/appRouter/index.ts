import { createTRPCRouter } from '../initialisation'
import { exampleRouter } from './routers/exampleRouter'

export const appRouter = createTRPCRouter({
	example: exampleRouter,
})

export type AppRouter = typeof appRouter