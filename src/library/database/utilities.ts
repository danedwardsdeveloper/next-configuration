import {
	and,
	count,
	eq as equals,
	gt as greaterThan,
	gte as greaterThanOrEqual,
	inArray,
	isNull,
	lte as lessThanOrEqual,
	or,
} from 'drizzle-orm'
import { database } from './connection'

export { and, count, equals, greaterThan, isNull, inArray, or, greaterThanOrEqual, lessThanOrEqual }

export type Transaction = Parameters<Parameters<typeof database.transaction>[0]>[0]