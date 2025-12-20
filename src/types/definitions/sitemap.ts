import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'
import type { Videos } from 'next/dist/lib/metadata/types/metadata-types'

export type ChangeFrequencies = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type SitemapEntry = {
	url: string
	lastModified: string | Date
	changeFrequency: ChangeFrequencies
	priority: number
	images?: string[]
}

// Copied verbatim from Next.js source code because it isn't exported
export type SitemapFile = Array<{
	url: string
	lastModified?: string | Date | undefined
	changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined
	priority?: number | undefined
	alternates?:
		| {
				languages?: Languages<string> | undefined
		  }
		| undefined
	images?: string[] | undefined
	videos?: Videos[] | undefined
}>
