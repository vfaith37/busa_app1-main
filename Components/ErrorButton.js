import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Close } from '../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/theme'

  const {width, height} = Dimensions.get("screen")

const ErrorButton = ({onPress, message, style, color, bgcolor, borderRadius, bgWidth, bgHeight, pBottom}) => {
  return (
    <SafeAreaView style={style}>
    <View style={{height: bgHeight? bgHeight: height/20, width: bgWidth? bgWidth : width*0.9, backgroundColor:bgcolor ?bgcolor : COLORS.lightblue, paddingTop:10,alignSelf:"center", borderRadius:borderRadius}}>
      <View style={{flexDirection:"row", alignContent:"center"}}>
        <View style={{height:height/30, width:width*0.79, position:"absolute"}}>
    <Text style={{ fontSize: 11.5, color: "#fff", fontFamily:"Poppins", position:"absolute", paddingLeft:10, paddingBottom:4}}>{message}</Text>
    </View>
    <View style={{paddingLeft:width*0.8, position:"absolute"}}>
    <TouchableOpacity onPress={onPress}>
      <Close color={color} style={{paddingBottom:pBottom? pBottom: 10}}/>
  </TouchableOpacity>
  </View>
  </View>
    </View>
    </SafeAreaView>
  )
}

export default ErrorButton
