import type { MetadataRoute } from 'next'
import urlJoin from 'url-join'
import { utilityPathValues } from '@/library/constants/paths'
import { dynamicBaseUrl } from '@/library/environment/environment'
import type { SitemapEntry } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date()

	const appEntries: SitemapEntry[] = [...utilityPathValues].map((path) => ({
		url: urlJoin(dynamicBaseUrl, path),
		lastModified: now,
		changeFrequency: 'monthly',
		priority: 1,
		images: [urlJoin(dynamicBaseUrl, 'opengraph-image.png')], // Just list one image as they're the same
	}))

	return [...appEntries]
}
