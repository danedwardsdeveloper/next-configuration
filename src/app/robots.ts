import type { MetadataRoute } from 'next'
import { dynamicBaseUrl } from '@/library/environment/environment'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${dynamicBaseUrl}/sitemap.xml`,
	}
}
