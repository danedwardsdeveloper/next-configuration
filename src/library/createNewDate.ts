import type { Month, Year } from '@/types'

export function createNewDate(day: number, month: Month, year: Year): Date {
	return new Date(Date.UTC(year, month, day))
}
