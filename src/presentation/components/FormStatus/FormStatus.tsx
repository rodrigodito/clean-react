import React, { useContext } from 'react'
import { Spinner } from '../Spinner'
import Context from '@/presentation/contexts/form/form-context'

import S from './FormStatus-styles.scss'

export function FormStatus () {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={S.errorWrap}>
      {state.isLoading && <Spinner className={S.spinner} /> }
      {errorState.main && <span className={S.error}>{errorState.main}</span>}
    </div>
  )
}
