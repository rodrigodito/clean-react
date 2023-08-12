import React from 'react'

import { SignUp } from './signup'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
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

function populateField (sut: RenderResult, fieldName: string, value = faker.word.words(1)): void {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', fakeValidationError)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const fakeValidationError = faker.word.words()
    const { sut } = makeSut({ validationError: fakeValidationError })
    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', fakeValidationError)
  })
})
