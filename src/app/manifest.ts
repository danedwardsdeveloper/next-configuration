import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	// Defines how your app appears when installed as a PWA (Progressive Web App)
	return {
		name: '', // For app stores and install prompts, e.g. "Simple Order - Wholesale Bakery Management"
		short_name: '', // Shown under home screen icon, e.g. "Simple Order"
		description: '', // For stores & prompts - keep under 140 chars for most platforms
		display: 'browser', // 'standalone' makes it look like a native app without browser UI
		background_color: 'hsl(0, 0%, 100%)', // Color shown before styles load
		theme_color: 'hsl(217, 91%, 60%)', // blue-500 - Color of system UI elements like the status bar
		icons: [
			{
				src: '/favicon/favicon-192.png', // Required by most Android devices
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/favicon/favicon-512.png', // Required by iOS and Android for splash screens
				sizes: '512x512',
				type: 'image/png',
			},
		],
		orientation: 'portrait', // Specify preferred orientations
		scope: '/', // Define scope of which pages are part of the PWA
		start_url: '/',
	}
}
