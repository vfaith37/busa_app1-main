import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const {width, height} = Dimensions.get("screen")

const ComingSoon = () => {
  return (
    <SafeAreaView>
    <View style={{paddingTop:20}}>
        <LottieView
        source={require("../assets/animations/comming-soon.json")}
        style={{
            width: 300,
            height: width/3,
            alignSelf: 'center',
            paddingTop:height/5
          }}
          loop
          speed={0.7}
          autoPlay
        />
    </View>
    </SafeAreaView>
  )
}

export default ComingSoon

