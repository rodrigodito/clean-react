import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word())
    expect(error).toBeFalsy()
  })
})
