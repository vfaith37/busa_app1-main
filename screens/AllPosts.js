import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'

const AllPosts = ({route}) => {
  const {post} =  route.params
  return (
    <View>
<Home component={"HomeScreen"} post={post}/>
    </View>
  )
}

export default AllPosts

const styles = StyleSheet.create({})