import React, { useContext } from 'react'
import { Spinner } from '../Spinner'
import Context from '@/presentation/contexts/form/form-context'

import S from './FormStatus-styles.scss'

export function FormStatus () {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={S.errorWrap}>
      {isLoading && <Spinner className={S.spinner} /> }
      {errorMessage && <span className={S.error}>{errorMessage}</span>}
    </div>
  )
}
