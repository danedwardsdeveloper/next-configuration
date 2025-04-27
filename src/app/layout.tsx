import Providers from '@/components/providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import Script from 'next/script'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: `Dan's Next.js Configuration`,
	metadataBase: new URL(dynamicBaseURL),
	description: 'Site description',
	alternates: {
		canonical: dynamicBaseURL,
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className="text-base">
				<Providers>{children}</Providers>
				<Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="lazyOnload" />
			</body>
		</html>
	)
}
