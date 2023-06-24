import React from 'react'
import { type RenderResult, render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Login } from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

function simulateValidSubmit (
  sut: RenderResult,
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password()
) {
  populateEmailField(sut, fakeEmail)
  populatePasswordField(sut, fakePassword)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

function populateEmailField (
  sut: RenderResult,
  fakeEmail = faker.internet.email()
) {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: fakeEmail } })
}

function populatePasswordField (
  sut: RenderResult,
  fakePassword = faker.internet.password()
) {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: fakePassword } })
}

function simulateStatusForField (sut: RenderResult, fieldName: string, validationError?: string) {
  const emailInputStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailInputStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailInputStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    simulateValidSubmit(sut, fakeEmail, fakePassword)

    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
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

    populateEmailField(sut)
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

    expect(errorWrap.childElementCount).toBe(1)
  })
})
