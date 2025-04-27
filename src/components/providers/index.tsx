import type { ReactNode } from 'react'
import { UiProvider } from './ui'

export default function Providers({ children }: { children: ReactNode }) {
	return <UiProvider>{children}</UiProvider>
}
