'use client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './appRouter/trpcRouter'

export const trpc = createTRPCReact<AppRouter>()
