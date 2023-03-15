import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Warning } from '../constants/icons'

const ErrorButton = ({onPress, message, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Warning/>
    <Text style={style}>{message}</Text>
  </TouchableOpacity>
  )
}

export default ErrorButton
