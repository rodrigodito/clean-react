import React from 'react'

import { SignUp } from './signup'
import { type RenderResult, render, cleanup } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp
      validation={validationStub}
    />
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', fakeValidationError)
    Helper.testStatusForField(sut, 'email', fakeValidationError)
    Helper.testStatusForField(sut, 'password', fakeValidationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', fakeValidationError)
  })

  test('Should show name error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', fakeValidationError)
  })

  test('Should show name error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', fakeValidationError)
  })

  test('Should show email error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', fakeValidationError)
  })

  test('Should show password error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', fakeValidationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', fakeValidationError)
  })
})
