import type { authenticationMessages, basicMessages } from '@/library/constants/definitions/responseMessages'

export type BasicMessages = (typeof basicMessages)[keyof typeof basicMessages]

export type AuthenticationMessages = (typeof authenticationMessages)[keyof typeof authenticationMessages]
