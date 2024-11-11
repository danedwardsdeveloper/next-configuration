import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'

export const metadata: Metadata = {
  // ToDo
  title: `My Site`,
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
