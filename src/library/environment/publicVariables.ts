import type { LogLevel } from '@/types'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const siteIsLaunched = false

export const bareDomain = 'bare-domain.fly.dev'
export const productionBaseURL = `https://${bareDomain}`
export const developmentBaseURL = 'http://localhost:3000'
export const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL

export const serverLogLevel: LogLevel = 'level5debug'
export const browserLogLevel: LogLevel = isDevelopment ? 'level5debug' : 'level0none'
