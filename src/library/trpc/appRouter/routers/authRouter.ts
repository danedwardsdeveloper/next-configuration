import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { cookieNames } from '../../../constants/cookies'
import { database } from '../../../database/connection'
import { users, type DangerousUser, signInSchema, createAccountSchema, type SafeUser } from '../../../database/schema'
import { equals } from '../../../database/utilities'
import { hashPassword, verifyPassword } from '../../../utilities/hashPassword'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../../initialisation'
import { setAuthorisationToken } from '../../jwtUtilities'

export const authRouter = createTRPCRouter({
	signIn: publicProcedure
		.input(signInSchema)
		.mutation(async ({ input }) => {
			const { email, password } = input

			const [user] = await database
				.select()
				.from(users)
				.where(equals(users.email, email.toLowerCase()))
				.limit(1)

			if (!user) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid email or password',
				})
			}

			const validPassword = await verifyPassword(password, user.hashedPassword)

			if (!validPassword) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid email or password',
				})
			}

			await setAuthorisationToken(user.id)

			const safeUser: Omit<DangerousUser, 'hashedPassword'> = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				emailConfirmed: user.emailConfirmed,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}

			return {
				user: safeUser,
				message: 'Sign in successful',
			}
		}),

	createAccount: publicProcedure
		.input(createAccountSchema)
		.mutation(async ({ input }) => {
			const { name, email, password } = input

			const [existingUser] = await database
				.select()
				.from(users)
				.where(equals(users.email, email.toLowerCase()))
				.limit(1)

			if (existingUser) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'An account with this email already exists',
				})
			}

			const hashedPasswordValue = await hashPassword(password)

			const [newUser] = await database
				.insert(users)
				.values({
					name,
					email: email.toLowerCase(),
					hashedPassword: hashedPasswordValue,
					role: 'user',
				})
				.returning()

			await setAuthorisationToken(newUser.id)

			const safeUser: SafeUser = {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
				emailConfirmed: newUser.emailConfirmed,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt,
			}

			return {
				user: safeUser,
				message: 'Account created successfully',
			}
		}),
	getMe: protectedProcedure.query(({ ctx }) => {
		const safeUser: SafeUser = {
			id: ctx.user.id,
			name: ctx.user.name,
			email: ctx.user.email,
			role: ctx.user.role,
			emailConfirmed: ctx.user.emailConfirmed,
			createdAt: ctx.user.createdAt,
			updatedAt: ctx.user.updatedAt,
		}

		return safeUser
	}),

	signOut: protectedProcedure.mutation(async () => {
		const cookieStore = await cookies()
		cookieStore.delete(cookieNames.token)

		return {
			message: 'Signed out successfully',
		}
	}),
})