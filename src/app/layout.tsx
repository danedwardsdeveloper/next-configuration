import Providers from '@/components/Providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
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
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
