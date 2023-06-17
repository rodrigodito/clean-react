import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import { Input } from '@/presentation/components/Input'
import { FormStatus } from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'

type LoginProps = {
  validation?: Validation
}

export function Login ({ validation }: LoginProps) {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={S.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={S.form} action="">
          <h2>Login</h2>
          <Input type="email" name='email' placeholder='Digite seu email' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <button data-testid="submit" disabled className={S.submit}>Entrar</button>
          <span className={S.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
