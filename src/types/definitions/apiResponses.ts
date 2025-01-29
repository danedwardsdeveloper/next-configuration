import { AuthenticationMessages, BasicMessages } from './responseMessages'

export interface ExamplePOSTbody {
  password: string
  staySignedIn: boolean
}

export interface ExamplePOSTresponse {
  message: BasicMessages | AuthenticationMessages
}
