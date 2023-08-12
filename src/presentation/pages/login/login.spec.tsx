import React from 'react'
import { type RenderResult, render, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages/login'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock, Helper } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <Login
      validation={validationStub}
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

function simulateValidSubmit (
  sut: RenderResult,
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password()
) {
  Helper.populateField(sut, 'email', fakeEmail)
  Helper.populateField(sut, 'password', fakePassword)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    simulateValidSubmit(sut, fakeEmail, fakePassword)

    expect(authenticationSpy.params).toEqual({
      identifier: fakeEmail,
      password: fakePassword
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.lorem.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)

    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.jwt)
  })
})
