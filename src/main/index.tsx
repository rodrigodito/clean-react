import React from 'react'
import ReactDom from 'react-dom'
import { Router } from '@/presentation/components/Router/Router'
import '@/presentation/styles/global.scss'
import { MakeLogin } from './factories/pages/login/factory-login'
import { MakeSignUp } from './factories/pages/signup/signup-factory'

ReactDom.render(
  <Router
    makeLogin={<MakeLogin />}
    makeSignUp={<MakeSignUp />}
  />,
  document.getElementById('main')
)
