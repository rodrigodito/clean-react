import React, { memo } from 'react'

import S from './Footer-styles.scss'

function Footer () {
  return (
    <footer className={S.footer} />
  )
}

export default memo(Footer)
