import type { userMessages } from '@/library/constants'

export type BasicMessages = (typeof userMessages)[keyof typeof userMessages]
