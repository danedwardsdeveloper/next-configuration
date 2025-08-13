import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { database } from '../database/connection'
import { users } from '../database/schema'
import { equals } from '../database/utilities'
import { verifyToken } from './jwtUtilities'

const createInnerTRPCContext = async (token?: string, responseHeaders?: Headers) => {
	return {
		database,
		token,
		responseHeaders,
	}
}

export const createTRPCContextWithToken = async (token?: string, responseHeaders?: Headers) => {
	return createInnerTRPCContext(token, responseHeaders)
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

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	if (!ctx.token) throw new TRPCError({ code: 'UNAUTHORIZED' })

	try {
		const decoded = verifyToken(ctx.token)
		const userId = decoded.userId || Number(decoded.sub)

		if (!userId || Number.isNaN(userId)) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		const [result] = await database
			.select()
			.from(users)
			.where(equals(users.id, userId))
			.limit(1)

		if (!result) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		return next({
			ctx: {
				...ctx,
				user: result,
			},
		})
	} catch {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
	if (ctx.user.role !== 'admin') {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'Admin access required',
		})
	}
	return next({ ctx })
})