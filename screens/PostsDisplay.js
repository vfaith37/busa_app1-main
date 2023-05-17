import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PostsDisplay = ({post }) => {
    const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} onPress={()=> navigation.navigate("AllPosts", {
        post
      })}>
        <View style={{flexDirection:"row",  paddingTop:15, justifyContent:"space-between"}}>
      <Text style={{fontFamily:"Poppins3", fontSize:22, lineHeight:33, fontWeight:"600"}}>News</Text>
          {/* <Text style={{fontSize:13, paddingTop:13, paddingRight:10, fontFamily:"Poppins"}}>more {">>>"}</Text> */}
        </View>
      </TouchableOpacity>
        <View style={{paddingTop:15}}>
      <Home component={"Feeds"} post={post}/>
        </View>
    </View>
  )
}


export default PostsDisplay

const styles = StyleSheet.create({})