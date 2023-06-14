import React from 'react'
import S from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import { Input } from '@/presentation/components/Input'
import { FormStatus } from '@/presentation/components/FormStatus'

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
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
