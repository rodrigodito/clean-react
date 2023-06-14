import React from 'react'
import S from './login-styles.scss'
import { Spinner } from '@/presentation/components/Spinner'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'

export function Login () {
  return (
    <div className={S.login}>
      <LoginHeader />
      <form className={S.form} action="">
        <h2>Login</h2>
        <div className={S.inputWrap}>
          <input type="email" name='email' placeholder='Digite seu email' />
          <span className={S.status}>🔴</span>
        </div>
        <div className={S.inputWrap}>
          <input type="password" name='password' placeholder='Digite sua senha' />
          <span className={S.status}>🔴</span>
        </div>
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
