import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Form } from '../Components/ProductAdd'

const UploadPostScreen = () => {
  return (
    <View>
      <Form component={"Post"} />
      </View>
  )
}

export default UploadPostScreen

const styles = StyleSheet.create({})