import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFiledError } from '@/validation/errors'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fakeField = faker.database.column()
    const fakeFieldToCompare = faker.database.column()
    const sut = makeSut(fakeField, fakeFieldToCompare)
    const error = sut.validate({
      [fakeField]: faker.word.words(1),
      [fakeFieldToCompare]: faker.word.words(1)
    })
    expect(error).toEqual(new InvalidFiledError())
  })

  test('Should return falsy if compare is valid', () => {
    const fakeField = faker.database.column()
    const fakeFieldToCompare = faker.database.column()
    const fakeValue = faker.word.words(1)

    const sut = makeSut(fakeField, fakeFieldToCompare)
    const error = sut.validate({
      [fakeField]: fakeValue,
      [fakeFieldToCompare]: fakeValue
    })

    expect(error).toBeFalsy()
  })
})
