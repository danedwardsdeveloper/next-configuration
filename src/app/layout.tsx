import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { MenuSideBar } from '@/components/MenuSideBar'
import { TRPCProvider } from '@/components/providers/TRPCProvider'
import { SidebarProvider } from '@/components/shadcn/sidebar'
import { dynamicBaseUrl } from '@/library/environment/environment'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: `Dan's Next.js Configuration`,
	metadataBase: new URL(dynamicBaseUrl),
	description: 'Site description',
	alternates: {
		canonical: '/',
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
		<html
			lang="en-GB" //
			suppressHydrationWarning
			className={`${inter.variable} text-base`}
			style={{
				WebkitTextSizeAdjust: '100%',
				textSizeAdjust: '100%',
			}}
		>
			<body>
				<TRPCProvider>
					<SidebarProvider>
						<MenuSideBar />
						{children}
					</SidebarProvider>
				</TRPCProvider>
				<Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="lazyOnload" />
			</body>
		</html>
	)
}
