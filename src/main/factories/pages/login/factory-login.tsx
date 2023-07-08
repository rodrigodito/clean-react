import React from 'react'
import { Login } from '@/presentation/pages/login'
import { RemoteAuthentication } from '@/data/usecases/authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export function MakeLogin () {
  const url = 'http://localhost:1337/api/auth/local'
  const axiosHttpClient = new AxiosHttpClient()
  const removeAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('identifier').required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={removeAuthentication}
      validation={validationComposite}
    />
  )
}
