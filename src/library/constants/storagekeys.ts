export const cookieNames = {
	token: 'token',
} as const
export type CookieNames = (typeof cookieNames)[keyof typeof cookieNames]
