import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VerifyAccountScreen from './VerifyAccountScreen'

const AuthenticationVerification = () => {
  return (
    <View>
      <VerifyAccountScreen component ={"Authentication"}/>
    </View>
  )
}

export default AuthenticationVerification

const styles = StyleSheet.create({})