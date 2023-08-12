import React, { useEffect, useState } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './signup-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import { Input } from '@/presentation/components/Input'
import { FormStatus } from '@/presentation/components/FormStatus'
import { type Validation } from '@/presentation/protocols/validation'
import { type AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

export function SignUp ({ validation, addAccount }: Props) {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prevState => ({ ...prevState, isLoading: true }))
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} data-testid="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="text" name="name" placeholder="Digite seu nome"/>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>
          <button data-testid="submit" disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={Styles.submit}>Entrar</button>
          <span>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
    </div>
  )
}
