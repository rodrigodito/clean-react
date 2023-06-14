import React from 'react'

import S from './Input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props) {
  return (
    <div className={S.inputWrap}>
      <input {...props} />
      <span className={S.status}>🔴</span>
    </div>
  )
}
