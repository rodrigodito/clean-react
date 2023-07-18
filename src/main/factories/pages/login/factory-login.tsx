import React from 'react'
import { Login } from '@/presentation/pages/login'
import { makeValidationLogin } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { MakeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export function MakeLogin () {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeValidationLogin()}
      saveAccessToken={MakeLocalSaveAccessToken()}
    />
  )
}
