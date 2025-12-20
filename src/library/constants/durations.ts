const oneDayInSeconds = 24 * 60 * 60
export const authTokenDays = 365
export const gracePeriodDays = 7

export const durationSeconds = {
	passwordReset: 60 * 60, // 1 hour
	emailConfirmation: oneDayInSeconds, // 24 hours
	authToken: authTokenDays * oneDayInSeconds,
}
