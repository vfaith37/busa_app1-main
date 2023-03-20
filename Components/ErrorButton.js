import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Close } from '../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'

  const {width, height} = Dimensions.get("screen")
const ErrorButton = ({onPress, message, style, color}) => {
  return (
    <SafeAreaView style={style}>
    <View style={{height:height/20, width:width*0.9, backgroundColor:"blue", paddingTop:10,alignSelf:"center",}}>
      <View style={{flexDirection:"row", alignContent:"center"}}>
        <View style={{height:height/30, width:width*0.79, position:"absolute"}}>
    <Text style={{ fontSize: 11.5, color: "#fff", fontFamily:"Poppins", position:"absolute", paddingLeft:10, paddingTop:2}}>{message}</Text>
    </View>
    <View style={{paddingLeft:width*0.8, position:"absolute"}}>
    <TouchableOpacity onPress={onPress}>
      <Close color={color}/>
  </TouchableOpacity>
  </View>
  </View>
    </View>
    </SafeAreaView>
  )
}

export default ErrorButton
