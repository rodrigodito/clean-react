import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import S from './Input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props) {
  // eslint-disable-next-line react/prop-types
  const { name } = props
  const { state, setState } = useContext(Context)
  const error = state[`${name}Error`]

  function enableInput (event: React.FocusEvent<HTMLInputElement>) {
    event.target.readOnly = false
  }

  function handleChange (event: React.FocusEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function getStatus () {
    return '🔴'
  }

  function getTitle (): string {
    return error
  }

  return (
    <div className={S.inputWrap}>
      <input data-testid={name} {...props} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span data-testid={`${name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
    </div>
  )
}
