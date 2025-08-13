import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

const createInnerTRPCContext = async () => {
	return {}
}

export const createTRPCContext = async () => {
	return createInnerTRPCContext()
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure