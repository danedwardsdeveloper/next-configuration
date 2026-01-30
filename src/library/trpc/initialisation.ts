import { initTRPC, TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { cookieNames } from '../constants/storageKeys'
import { db } from '../database/connection'
import { users } from '../database/schema'
import { dynamicSecrets } from '../environment/secrets.example'

const createInnerTRPCContext = async (token?: string, responseHeaders?: Headers) => {
	return {
		database: db,
		token,
		responseHeaders,
	}
}

export const createTrpcContextWithToken = async (token?: string, responseHeaders?: Headers) => {
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
	try {
		const cookieStore = await cookies()
		const authToken = cookieStore.get(cookieNames.token)?.value

		if (!authToken) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		const payload = jwt.verify(authToken, dynamicSecrets.jwtSecret) as JwtPayload
		const userId = payload.userId as number

		if (!userId || Number.isNaN(userId)) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		const [result] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

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
