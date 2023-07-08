import { faker } from '@faker-js/faker'
import { type AuthenticationParams } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'

export const mockAuthentication = (): AuthenticationParams => ({
  identifier: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  jwt: faker.lorem.word(20)
})
