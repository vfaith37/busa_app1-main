import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Warning } from '../constants/icons'

const ErrorButton = ({onPress, message, style, positionStyle}) => {
  return (
    <View style={positionStyle}>
    <TouchableOpacity onPress={onPress}>
      <Warning/>
    <Text style={style}>{message}</Text>
  </TouchableOpacity>
    </View>
  )
}

export default ErrorButton
