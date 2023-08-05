import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFiledError } from '@/validation/errors'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.word.words(1))
    const error = sut.validate(faker.word.words(1))
    expect(error).toEqual(new InvalidFiledError())
  })

  test('Should return falsy if compare is valid', () => {
    const fakeValueToCompare = faker.word.words(1)

    const sut = makeSut(fakeValueToCompare)
    const error = sut.validate(fakeValueToCompare)

    expect(error).toBeFalsy()
  })
})