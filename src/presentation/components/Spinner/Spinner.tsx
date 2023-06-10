import React from 'react'
import S from './spinner-styles.scss'

type Props = {
  className?: string
}

export function Spinner (props: Props) {
  return (
    <div className={[S.spinner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
