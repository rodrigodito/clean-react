import React from 'react'
import ReactDom from 'react-dom'
import { Router } from '@/presentation/components/Router/Router'
import '@/presentation/styles/global.scss'
import { MakeLogin } from './factories/pages/login/factory-login'

ReactDom.render(
  <Router
    makeLogin={<MakeLogin />}
  />,
  document.getElementById('main')
)
