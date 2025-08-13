import type { Metadata, Viewport } from "next";
import Providers from "@/components/providers";
import "./styles.tailwind.css";
import Script from "next/script";
import type { ReactNode } from "react";
import { dynamicBaseUrl } from "@/library/environment/publicVariables";
import { SidebarProvider } from "@/components/shadcn/sidebar";
import { MenuSideBar } from "@/components/MenuSideBar";

export const metadata: Metadata = {
	title: `Dan's Next.js Configuration`,
	metadataBase: new URL(dynamicBaseUrl),
	description: "Site description",
	alternates: {
		canonical: dynamicBaseUrl,
	},
};

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className="text-base">
				<Providers>
					<SidebarProvider>
						<MenuSideBar />
						<main className="flex-1 p-2">{children}</main>
					</SidebarProvider>
				</Providers>
				<Script
					src="https://scripts.simpleanalyticscdn.com/latest.js"
					strategy="lazyOnload"
				/>
			</body>
		</html>
	);
}
