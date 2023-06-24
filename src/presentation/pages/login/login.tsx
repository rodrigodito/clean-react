import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import { Input } from '@/presentation/components/Input'
import { FormStatus } from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

export function Login ({ validation, authentication }: LoginProps) {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  async function handleSubmit () {
    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      localStorage.setItem('accessToken', account.accessToken)
    } catch (e) {
      setState({
        ...state,
        isLoading: false,
        mainError: e.message
      })
    }
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={S.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={S.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name='email' placeholder='Digite seu email' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={S.submit}>Entrar</button>
          <span className={S.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
