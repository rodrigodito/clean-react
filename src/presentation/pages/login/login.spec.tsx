import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './login'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInputStatus = getByTestId('email-status')
    expect(emailInputStatus.title).toBe('Campo obrigatório')
    expect(emailInputStatus.textContent).toBe('🔴')

    const passwordInputStatus = getByTestId('password-status')
    expect(passwordInputStatus.title).toBe('Campo obrigatório')
    expect(passwordInputStatus.textContent).toBe('🔴')
  })
})
