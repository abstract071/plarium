import React from 'react'

import 'common/CustomInputRange/styles.scss'


interface CustomInputRangeProps {
  title: string,
  min: string,
  max: string,
  step: string,
  value: string,
  onChange: ( color: string ) => void
}

export const CustomInputRange = ( props: CustomInputRangeProps ) => {
  const {
    title,
    min,
    max,
    step,
    value,
    onChange
  } = props

  return (
    <div styleName="horizontally-stacked-slider">
      { title }
      <input
        type="range"
        min={ min }
        max={ max }
        step={ step }
        value={ value }
        onChange={ ( event ) => onChange( event.target.value ) }
      />
    </div>
  )
}
