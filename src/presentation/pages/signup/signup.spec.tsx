import React from 'react'

import { SignUp } from './signup'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { AddAccountSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(
    <SignUp
      validation={validationStub}
      addAccount={addAccountSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

async function simulateValidSubmit (
  sut: RenderResult,
  name = faker.person.firstName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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

  test('Should show valid name state if Validation succeed', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email state if Validation succeed', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeed', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if Validation succeed', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should addAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const fakeName = faker.person.firstName()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    await simulateValidSubmit(sut, fakeName, fakeEmail, fakePassword)
    expect(addAccountSpy.params).toEqual({
      name: fakeName,
      email: fakeEmail,
      password: fakePassword,
      passwordConfirmation: fakePassword
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const fakeValidationError = faker.word.words()
    const { sut, addAccountSpy } = makeSut({ validationError: fakeValidationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.jwt)
  })
})
