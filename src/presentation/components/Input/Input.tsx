import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import S from './Input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props) {
  // eslint-disable-next-line react/prop-types
  const { name } = props
  const { errorState } = useContext(Context)
  const error = errorState[name]

  function enableInput (event: React.FocusEvent<HTMLInputElement>) {
    event.target.readOnly = false
  }

  function getStatus () {
    return '🔴'
  }

  function getTitle (): string {
    return error
  }

  return (
    <div className={S.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span data-testid={`${name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
    </div>
  )
}
