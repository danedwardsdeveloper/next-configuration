import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../initialisation'

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ name: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.name}!`,
			}
		}),

	getAll: publicProcedure.query(() => {
		return {
			message: 'This is a simple tRPC endpoint',
			timestamp: new Date(),
		}
	}),
})