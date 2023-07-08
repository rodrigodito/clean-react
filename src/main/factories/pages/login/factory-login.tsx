import React from 'react'
import { Login } from '@/presentation/pages/login'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeValidationLogin } from './login-validation-factory'

export function MakeLogin () {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeValidationLogin()}
    />
  )
}
