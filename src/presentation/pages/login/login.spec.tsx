import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import { Login } from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInputStatus = sut.getByTestId('email-status')
    expect(emailInputStatus.title).toBe('Campo obrigatório')
    expect(emailInputStatus.textContent).toBe('🔴')

    const passwordInputStatus = sut.getByTestId('password-status')
    expect(passwordInputStatus.title).toBe('Campo obrigatório')
    expect(passwordInputStatus.textContent).toBe('🔴')
  })
})
