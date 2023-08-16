import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const fakeFiel = faker.database.column()
    const sut = makeSut(fakeFiel)
    const error = sut.validate({ [fakeFiel]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const fakeFiel = faker.database.column()
    const sut = makeSut(fakeFiel)
    const error = sut.validate({ [fakeFiel]: faker.lorem.word() })
    expect(error).toBeFalsy()
  })
})
