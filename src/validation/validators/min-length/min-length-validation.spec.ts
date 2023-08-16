import { InvalidFiledError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const fakeField = faker.database.column()
    const sut = makeSut(fakeField)
    const error = sut.validate({ [fakeField]: faker.lorem.word(3) })

    expect(error).toEqual(new InvalidFiledError())
  })

  test('Should return falsy if value is valid', () => {
    const fakeField = faker.database.column()
    const sut = makeSut(fakeField)
    const error = sut.validate({ [fakeField]: faker.lorem.word(5) })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exist in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.lorem.word(5) })

    expect(error).toBeFalsy()
  })
})
