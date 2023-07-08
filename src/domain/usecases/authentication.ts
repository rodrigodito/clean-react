import { type AccountModel } from '@/domain/models/account-model'

export type AuthenticationParams = {
  identifier: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
