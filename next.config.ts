import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	devIndicators: false,
	output: 'standalone',
	async redirects() {
		return [
			{
				// Redirect from www.
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'www.my-site.co.uk',
					},
				],
				destination: 'https://my-site.co.uk/:path*',
				permanent: true,
			},
			{
				// Redirect from Fly.io site to custom domain
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'my-site.fly.dev',
					},
				],
				destination: 'https://my-site.co.uk/:path*',
				permanent: true,
			},
		]
	},
	async headers() {
		return [
			{
				source: '/robots.txt', // Allow Lighthouse to download robots.txt
				headers: [
					{
						key: 'Content-Security-Policy',
						value: "connect-src 'self'; script-src 'none'; object-src 'none'; frame-src 'none'",
					},
				],
			},
		]
	},
}

export default nextConfig
