import React from 'react'
import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import { Login } from './login'
import { ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.lorem.words()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInputStatus = sut.getByTestId('email-status')
    expect(emailInputStatus.title).toBe(validationSpy.errorMessage)
    expect(emailInputStatus.textContent).toBe('🔴')

    const passwordInputStatus = sut.getByTestId('password-status')
    expect(passwordInputStatus.title).toBe('Campo obrigatório')
    expect(passwordInputStatus.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const fakeEmail = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: fakeEmail } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(fakeEmail)
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const fakePassword = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: fakePassword } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(fakePassword)
  })

  test('Should show error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
