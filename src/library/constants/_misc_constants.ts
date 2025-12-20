import type { HttpStatus, MonthIndexZeroed } from '@/types'
// No imports except for types here!
// Importing from the schema will fuck everything up

export const noTrpcParams = undefined

export const sortOrderValues = [
	'asc', //
	'desc',
] as const
export type SortOrder = (typeof sortOrderValues)[number]
type SortOrderDisplay = 'Ascending' | 'Descending'
export const sortOrderToDisplay: Record<SortOrder, SortOrderDisplay> = {
	asc: 'Ascending',
	desc: 'Descending',
}

export const emailConfirmationStatusValues = ['pending', 'confirmed'] as const
export type EmailConfirmationStatus = (typeof emailConfirmationStatusValues)[number]

export const pageSizeOptions = [10, 20, 30, 50] as const
export type PageSize = (typeof pageSizeOptions)[number]

export const currencySymbolValues = ['£', '$', '€'] as const
export type CurrencySymbol = (typeof currencySymbolValues)[number]

export const radixParameter = 10

export const http200ok: HttpStatus = 200
export const http201created: HttpStatus = 201
export const http202accepted: HttpStatus = 202
export const http204noContent: HttpStatus = 204
export const http206partialContent: HttpStatus = 206

export const http300multipleChoices: HttpStatus = 300
export const http301movedPermanently: HttpStatus = 301
export const http302found: HttpStatus = 302
export const http303seeOther: HttpStatus = 303
export const http304notModified: HttpStatus = 304
export const http307temporaryRedirect: HttpStatus = 307
export const http308permanentRedirect: HttpStatus = 308

export const http400badRequest: HttpStatus = 400
export const http401unauthorised: HttpStatus = 401
export const http403forbidden: HttpStatus = 403
export const http404notFound: HttpStatus = 404
export const http405methodNotAllowed: HttpStatus = 405
export const http409conflict: HttpStatus = 409
export const http410gone: HttpStatus = 410
export const http415unsupportedMediaType: HttpStatus = 415
export const http422unprocessableContent: HttpStatus = 422
export const http429tooManyRequests: HttpStatus = 429

export const http500serverError: HttpStatus = 500
export const http501notImplemented: HttpStatus = 501
export const http502badGateway: HttpStatus = 502
export const http503serviceUnavailable: HttpStatus = 503
export const http504gatewayTimeout: HttpStatus = 504

export const january: MonthIndexZeroed = 0
export const february: MonthIndexZeroed = 1
export const march: MonthIndexZeroed = 2
export const april: MonthIndexZeroed = 3
export const may: MonthIndexZeroed = 4
export const june: MonthIndexZeroed = 5
export const july: MonthIndexZeroed = 6
export const august: MonthIndexZeroed = 7
export const september: MonthIndexZeroed = 8
export const october: MonthIndexZeroed = 9
export const november: MonthIndexZeroed = 10
export const december: MonthIndexZeroed = 11

// UI only - capitalised canonicals
export const monthNameValues = [
	'January', //
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const
export type MonthName = (typeof monthNameValues)[number]

export const zeroIndexMonthToDisplay: Record<MonthIndexZeroed, MonthName> = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'March',
	5: 'June',
	6: 'July',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December',
}

export const monthNameTo0Index: Record<MonthName, MonthIndexZeroed> = {
	January: 0,
	February: 1,
	March: 2,
	April: 3,
	May: 4,
	June: 5,
	July: 6,
	August: 7,
	September: 8,
	October: 9,
	November: 10,
	December: 11,
}

export const dayOfWeekValues = [
	'monday', //
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
] as const
export type DayOfWeek = (typeof dayOfWeekValues)[number]
export const defaultAcceptedDeliveryDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

const _dayOfWeekToJsIndex: Record<DayOfWeek, number> = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
}

export const jsDayIndexToDayOfWeek: Record<number, DayOfWeek> = {
	0: 'sunday',
	1: 'monday',
	2: 'tuesday',
	3: 'wednesday',
	4: 'thursday',
	5: 'friday',
	6: 'saturday',
}

export const databaseTargetValues = [
	'development', //
	'staging',
	'production',
] as const
// Don't call it Environment of VS Code will try to import external packages instead
export type DatabaseTarget = (typeof databaseTargetValues)[number]

export const environmentNameValues = [...databaseTargetValues, 'test'] as const
export type EnvironmentName = (typeof environmentNameValues)[number]

export const testPrefix = 'test-data-' as const
export type TestPrefix = typeof testPrefix
export type TestString = `${TestPrefix}${string}`

export const mimeTypes = [
	'application/pdf', //
	'application/json',
	'image/jpeg',
	'image/png',
	'text/csv',
] as const
export type MimeType = (typeof mimeTypes)[number]
