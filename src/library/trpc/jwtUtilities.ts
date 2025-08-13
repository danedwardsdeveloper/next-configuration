import jwt, { type JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { cookieDurations, cookieNames } from '../constants/cookies'
import { isProduction } from '../environment/publicVariables'
import { jwtSecret } from '../environment/serverVariables'

export async function setAuthorisationToken(userId: number) {
	const cookieStore = await cookies()
	cookieStore.set({
		name: cookieNames.token,
		value: jwt.sign({ userId }, jwtSecret, { expiresIn: '1year' }),
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: cookieDurations.oneYear,
		secure: isProduction,
	})
}

export function verifyToken(token: string) {
	return jwt.verify(token, jwtSecret) as JwtPayload
}