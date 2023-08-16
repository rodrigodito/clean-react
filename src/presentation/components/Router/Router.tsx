import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

type Factories = {
  makeLogin: React.ReactNode
  makeSignUp: React.ReactNode
}

export function Router (factory: Factories) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' index element={factory.makeLogin} />
        <Route path='/signup' index element={factory.makeSignUp} />
      </Routes>
    </BrowserRouter>
  )
}
