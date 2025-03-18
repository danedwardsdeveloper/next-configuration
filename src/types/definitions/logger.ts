import type { logLevels } from '@/library/constants'

export type LogLevel = keyof typeof logLevels
export type LogVerb = 'debug' | 'info' | 'success' | 'warn' | 'error'
