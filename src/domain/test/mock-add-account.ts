import { faker } from '@faker-js/faker'
import { type AddAccountParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const fakePassword = faker.internet.password()

  return {
    name: faker.word.sample(),
    email: faker.internet.email(),
    password: fakePassword,
    passwordConfirmation: fakePassword
  }
}
