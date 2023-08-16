import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fakeFieldName = faker.database.column()
    const validations = ValidationBuilder.field(fakeFieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fakeFieldName)])
  })

  test('Should return EmailValidation', () => {
    const fakeFieldName = faker.database.column()
    const validations = ValidationBuilder.field(fakeFieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fakeFieldName)])
  })

  test('Should return MinLengthValidaton', () => {
    const fakeFieldName = faker.database.column()
    const fakeLength = faker.number.int()

    const validations = ValidationBuilder.field(fakeFieldName).min(fakeLength).build()
    expect(validations).toEqual([new MinLengthValidation(fakeFieldName, fakeLength)])
  })

  test('Should return CompareFieldsValidation', () => {
    const fakeFieldName = faker.database.column()
    const fakeFieldToCompare = faker.database.column()

    const validations = ValidationBuilder.field(fakeFieldName).sameAs(fakeFieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(fakeFieldName, fakeFieldToCompare)])
  })

  test('Should return a list of validations', () => {
    const fakeFieldName = faker.database.column()
    const fakeLength = faker.number.int()

    const validations = ValidationBuilder.field(fakeFieldName).required().min(fakeLength).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fakeFieldName),
      new MinLengthValidation(fakeFieldName, fakeLength),
      new EmailValidation(fakeFieldName)
    ])
  })
})
