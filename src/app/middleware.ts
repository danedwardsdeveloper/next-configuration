import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Redirect http to https for Google Search Console
	if (request.headers.get('x-forwarded-proto') === 'http') {
		const url = request.nextUrl.clone()
		url.protocol = 'https:'
		return NextResponse.redirect(url, 301)
	}

	// Redirect from www.
	const hostname = request.headers.get('host') || ''
	if (hostname.startsWith('www.')) {
		const url = request.nextUrl.clone()
		url.host = hostname.replace('www.', '')
		return NextResponse.redirect(url, 301)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/* Match all request paths except:
		- _next/static (static files)
		- _next/image (image optimization files)
		- Static assets (images, fonts, etc.)
		- SEO files */
		'/((?!_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|pdf|woff|woff2|ttf|eot)).*)',
	],
}
