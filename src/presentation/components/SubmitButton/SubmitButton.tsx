import React, { useContext } from 'react'
import formContext from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
}

export function SubmitButton ({ text }: Props) {
  const { state } = useContext(formContext)
  return (
    <button data-testid="submit" disabled={state.isFormInvalid}>{text}</button>
  )
}
