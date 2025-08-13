import type { ReactNode } from 'react'
import { TRPCProvider } from './trpc'
import { UiProvider } from './ui'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<TRPCProvider>
			<UiProvider>{children}</UiProvider>
		</TRPCProvider>
	)
}
