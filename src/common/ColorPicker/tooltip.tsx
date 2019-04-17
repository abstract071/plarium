import * as React from 'react'

import 'common/ColorPicker/styles.scss'


interface TooltipProps {
  className?: string,
  children: React.ReactNode
}

export const Tooltip = ( props: TooltipProps ) => {
  const { className } = props

  return (
    <div styleName={ `tooltip${ className ? ' ' + className : '' }` }>
      { props.children }
    </div>
  )
}
