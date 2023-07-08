import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

type Props = {
  makeLogin: React.ReactNode
}

export function Router ({ makeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' index element={makeLogin} />
      </Routes>
    </BrowserRouter>
  )
}
