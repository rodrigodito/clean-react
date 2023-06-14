import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { Login } from '@/presentation/pages/login/login'

import '@/presentation/styles/global.scss'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' index element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
