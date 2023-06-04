import { faker } from '@faker-js/faker'
import { type AuthenticationParams } from '@/domain/usecases/authentication'
import { type AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.alpha()
})
