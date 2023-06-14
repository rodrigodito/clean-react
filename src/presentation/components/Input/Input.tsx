import React from 'react'

import S from './Input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props) {
  function enableInput (event: React.FocusEvent<HTMLInputElement>) {
    event.target.readOnly = false
  }

  return (
    <div className={S.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span className={S.status}>🔴</span>
    </div>
  )
}
