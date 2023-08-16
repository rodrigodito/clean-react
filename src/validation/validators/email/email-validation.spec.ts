import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFiledError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const fakeField = faker.database.column()
    const sut = makeSut(fakeField)
    const error = sut.validate({ [fakeField]: faker.lorem.word() })
    expect(error).toEqual(new InvalidFiledError())
  })

  test('Should return falsy if email is valid', () => {
    const fakeField = faker.database.column()
    const sut = makeSut(fakeField)
    const error = sut.validate({ [fakeField]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const fakeField = faker.database.column()
    const sut = makeSut(fakeField)
    const error = sut.validate({ [fakeField]: '' })
    expect(error).toBeFalsy()
  })
})
