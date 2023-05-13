import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PostsDisplay = ({ getPostData, renderFooter, post }) => {
    const navigation = useNavigation()
  return (
    <View>
        <View style={{flexDirection:"row",  paddingTop:8, justifyContent:"space-between"}}>
      <Text style={{fontFamily:"Poppins3", fontSize:23,}}>News</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={()=> navigation.navigate("AllPosts", {
        post,
      })}>
          <Text style={{fontSize:13, paddingTop:13, paddingRight:10, fontFamily:"Poppins"}}>more {">>>"}</Text>
      </TouchableOpacity>
        </View>
        <View style={{paddingTop:15}}>
      <Home component={"Feeds"} getPostData={getPostData} post={post}/>
        </View>
    </View>
  )
}


export default PostsDisplay

const styles = StyleSheet.create({})