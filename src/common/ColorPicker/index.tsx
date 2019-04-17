import React, { useState } from 'react'

import { CustomInputRange } from 'common/CustomInputRange'
import { Tooltip } from './tooltip'

import 'common/ColorPicker/styles.scss'


interface ColorPickerProps {
  value: string,
  onChange: ( color: string ) => void,
  colors: { name: string, hex: string }[]
}

const renderColorMenuItems = (
  colors: { name: string, hex: string }[],
  setRedValue: ( color: string ) => void,
  setGreenValue: ( color: string ) => void,
  setBlueValue: ( color: string ) => void,
  onChange: ( color: string ) => void
) => {
  return (
    colors.map( ( { name, hex }: { name: string, hex: string } ) => (
      <div
        key={ hex }
        styleName="color-picker__color-item"
        onClick={ () => changeBasicColor( hex, setRedValue, setGreenValue, setBlueValue, onChange ) }
      >
        <span styleName="color-picker__hex-name">{ name }</span>
        <span
          styleName="color-picker__color-display"
          style={ { backgroundColor: hex } }
        />
      </div>
    ) )
  )
}

const changeBasicColor = (
  value: string,
  setRedValue: ( color: string ) => void,
  setGreenValue: ( color: string ) => void,
  setBlueValue: ( color: string ) => void,
  onChange: ( color: string ) => void
) => {
  validateHexAndUpdate( value, onChange )
  setRGBMenuValues( value, setRedValue, setGreenValue, setBlueValue )
}

const onAccept = ( red: string, green: string, blue: string, onChange: ( color: string ) => void ) => {
  const redHex = convertColorFromValueToHex( red )
  const greenHex = convertColorFromValueToHex( green )
  const blueHex = convertColorFromValueToHex( blue )
  validateHexAndUpdate( `#${ redHex }${ greenHex }${ blueHex }`, onChange )
}

const onDecline = (
  value: string,
  setRedValue: ( color: string ) => void,
  setGreenValue: ( color: string ) => void,
  setBlueValue: ( color: string ) => void
) => {
  setRGBMenuValues( value, setRedValue, setGreenValue, setBlueValue )
}

const setRGBMenuValues = (
  value: string,
  setRedValue: ( color: string ) => void,
  setGreenValue: ( color: string ) => void,
  setBlueValue: ( color: string ) => void
) => {
  setRedValue( convertColorFromHexToValue( value, 'red' ) )
  setGreenValue( convertColorFromHexToValue( value, 'green' ) )
  setBlueValue( convertColorFromHexToValue( value, 'blue' ) )
}

const convertColorFromValueToHex = ( color: string ) => {
  const number = parseInt( color )
  return number ? number.toString( 16 ) : '00'
}

const validateHexAndUpdate = ( value: string, onChange: ( color: string ) => void ) => {
  if ( /^#[0-9a-f]{0,6}$/gi.test( value ) ) {
    onChange( value.toUpperCase() )
  }
}

const convertColorFromHexToValue = ( color: string, colorName: string ): string => {
  switch ( colorName ) {
    case 'red':
      return parseInt( color.slice( 1, 3 ), 16 ).toString()
    case 'green':
      return parseInt( color.slice( 3, 5 ), 16 ).toString()
    case 'blue':
      return parseInt( color.slice( 5, 7 ), 16 ).toString()
  }
}

export const ColorPicker = ( props: ColorPickerProps ) => {
  const {
    value,
    onChange,
    colors
  } = props
  const [
    redValue,
    setRedValue
  ]: ( string | ( ( color: string ) => void ) )[] = useState( convertColorFromHexToValue( value, 'red' ) )
  const [
    greenValue,
    setGreenValue
  ]: ( string | ( ( color: string ) => void ) )[] = useState( convertColorFromHexToValue( value, 'green' ) )
  const [
    blueValue,
    setBlueValue
  ]: ( string | ( ( color: string ) => void ) )[] = useState( convertColorFromHexToValue( value, 'blue' ) )

  return (
    <div styleName="color-picker">
      <div styleName="color-picker__wrapper">
        <div styleName="color-picker__hex">
          <input type="text" value={ value } onChange={ ( event ) => validateHexAndUpdate( event.target.value, onChange ) }/>
        </div>
        <div styleName="color-picker__menu">
          <span
            styleName="color-picker__color-display"
            style={ { backgroundColor: `rgb( ${ redValue }, ${ greenValue }, ${ blueValue } )` } }
          />
          <Tooltip className="tooltip__rgb">
            <CustomInputRange title="R" min="0" max="255" step="1" value={ redValue } onChange={ setRedValue } />
            <CustomInputRange title="G" min="0" max="255" step="1" value={ greenValue } onChange={ setGreenValue } />
            <CustomInputRange title="B" min="0" max="255" step="1" value={ blueValue } onChange={ setBlueValue } />
            <div styleName="tooltip__controls">
              <button
                styleName="tooltip__controls--green"
                type="button"
                onClick={ () => onAccept( redValue, greenValue, blueValue, onChange ) }
              >OK</button>
              <button
                styleName="tooltip__controls--grey"
                type="button"
                onClick={ () => onDecline( value, setRedValue, setGreenValue, setBlueValue ) }
              >Cancel</button>
            </div>
          </Tooltip>
        </div>
        <div styleName="color-picker__color">
          <span styleName="color-picker__arrow"/>
          <Tooltip className="tooltip__color">
            { renderColorMenuItems( colors, setRedValue, setGreenValue, setBlueValue, onChange ) }
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
