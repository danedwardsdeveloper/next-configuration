import jwt from 'jsonwebtoken'
import { cookieNames } from '@/library/constants/storageKeys'
import { isProduction } from '@/library/environment/publicVariables'
import { jwtSecret } from '@/library/environment/serverVariables'
import { authTokenDays, durationSeconds } from '../constants/durations'

export function createAuthToken(userId: number): string {
	return jwt.sign({ userId }, jwtSecret, { expiresIn: `${authTokenDays}d` })
}

export function constructAuthCookie(token: string): string {
	const parts = [`${cookieNames.token}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${durationSeconds.authToken}`]

	if (isProduction) {
		parts.push('Secure')
	}

	return parts.join('; ')
}
