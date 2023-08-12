import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import { Input } from '@/presentation/components/Input'
import { FormStatus } from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication, type SaveAccessToken } from '@/domain/usecases'
import { SubmitButton } from '@/presentation/components/SubmitButton'

type LoginProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

export function Login ({ validation, authentication, saveAccessToken }: LoginProps) {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({
        identifier: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.jwt)
      window.location.href = '/'
    } catch (e) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        mainError: e.message
      }))
    }
  }

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
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
          <SubmitButton text='entrar'/>
          <span className={S.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
