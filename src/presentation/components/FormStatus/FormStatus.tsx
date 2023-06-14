import React from 'react'
import { Spinner } from '../Spinner'

import S from './FormStatus-styles.scss'

export function FormStatus () {
  return (
    <div className={S.errorWrap}>
      <Spinner className={S.spinner} />
      <span className={S.error}>Erro</span>
    </div>
  )
}
