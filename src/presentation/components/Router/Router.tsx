import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SignUp } from '@/presentation/pages/signup'

type Props = {
  makeLogin: React.ReactNode
}

export function Router ({ makeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' index element={makeLogin} />
        <Route path='/signup' index element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
