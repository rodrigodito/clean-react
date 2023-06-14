import React from 'react'
import S from './login-styles.scss'
import { Spinner } from '@/presentation/components/Spinner'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import { Input } from '@/presentation/components/Input'

export function Login () {
  return (
    <div className={S.login}>
      <LoginHeader />
      <form className={S.form} action="">
        <h2>Login</h2>
        <Input type="email" name='email' placeholder='Digite seu email' />
        <Input type="password" name='password' placeholder='Digite sua senha' />
        <button className={S.submit}>Entrar</button>
        <span className={S.link}>Criar conta</span>
        <div className={S.errorWrap}>
          <Spinner className={S.spinner} />
          <span className={S.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
