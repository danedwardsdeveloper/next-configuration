export const l1appPathValues = [
	'/', //
	'/orders',
	'/inventory',
	'/customers',
	'/settings',
] as const satisfies `/${string}`[]
export type L1AppPath = (typeof l1appPathValues)[number]

export type AppPath = L1AppPath

// Not sure why these aren't included in valid path but that's fine!
export type OrderDetailPath = `/orders/${number}`
export type OrderAgainPath = `/orders/new#reorder/${number}`

export const developmentPathValues = [
	'/test-page', //
] as const satisfies `/${string}`[]
export type DevelopmentPath = (typeof developmentPathValues)[number]

export const utilityPathValues = [
	'/sign-in', //
	'/free-trial',
	'/articles',
	'/contact',
] as const satisfies `/${string}`[]
export type UtilityPath = (typeof utilityPathValues)[number]

export const nonIndexedPaths = [
	'/confirm-email', //
	'/accept-invitation',
	'/reset-password',
	'/test-page',
] as const satisfies `/${string}`[]
export type NonIndexedPath = (typeof nonIndexedPaths)[number]

export const dynamicPathBases = [
	'/confirm-email#token/', //
	'/accept-invitation#token/',
	'/reset-password#token/',
] as const satisfies `${NonIndexedPath}#token/`[]
type DynamicPathBase = (typeof dynamicPathBases)[number]
export type DynamicPath = `${DynamicPathBase}${string}`

// Export to generate static params
export const articleSlugs = [
	'example-article', //
] as const satisfies readonly string[]
export type ArticleSlug = (typeof articleSlugs)[number]
// Export for sitemap
export const articlePaths = articleSlugs.map((slug) => `/articles/${slug}` as const)
export type ArticlePath = (typeof articlePaths)[number]

export type ValidPath = AppPath | UtilityPath | ArticlePath | DynamicPath | NonIndexedPath

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const imagePaths = [
	'/board-games-collection-shelf.png', //
	'/two-people-browsing-a-library.png',
	'/bible-study-group.png',
	'/simple-software-for-hospice-libraries.png',
	'/equipment-checkout-software-for-small-organisations.png',
	'/wholesale-handler-logo.png',
] as const satisfies `/${string}.png`[]
export type ImagePath = (typeof imagePaths)[number]
