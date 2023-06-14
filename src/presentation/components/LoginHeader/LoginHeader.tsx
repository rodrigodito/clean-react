import React, { memo } from 'react'
import { Logo } from '@/presentation/components/Logo'

import S from './LoginHeader-styles.scss'

function LoginHeader () {
  return (
    <header className={S.header}>
      <Logo />
      <h1>Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
