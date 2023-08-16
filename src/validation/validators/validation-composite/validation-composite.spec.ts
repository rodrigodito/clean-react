import { faker } from '@faker-js/faker'
import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

function makeSut (fieldName: string): SutTypes {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fakeFieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fakeFieldName)
    const fakeErrorMessage = faker.lorem.words()
    fieldValidationsSpy[0].error = new Error(fakeErrorMessage)
    fieldValidationsSpy[1].error = new Error(faker.lorem.words())

    const error = sut.validate(fakeFieldName, { [fakeFieldName]: faker.lorem.word() })
    expect(error).toBe(fakeErrorMessage)
  })

  test('Should return falsy if none validation fails', () => {
    const fakeFieldName = faker.database.column()
    const { sut } = makeSut(fakeFieldName)

    const error = sut.validate(fakeFieldName, { [fakeFieldName]: faker.lorem.word() })
    expect(error).toBeFalsy()
  })
})
