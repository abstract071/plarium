import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'

import { ColorPicker } from 'common/ColorPicker'

import 'static/scss/base.scss'


const COLORS: { name: string, hex: string }[] = [
  { name: 'red', hex: '#FF0000' },
  { name: 'yellow', hex: '#FFCC33' },
  { name: 'green', hex: '#00FF00' },
  { name: 'blue', hex: '#0000FF' }
]

const App = () => {
  const [
    color,
    setColor
  ]: ( string | ( ( color: string ) => void ) )[] = useState( '#000000' )

  return (
    <ColorPicker
      value={ color }
      onChange={ setColor }
      colors={ COLORS }
    />
  )
}

export default hot( App )
