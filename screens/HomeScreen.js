import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import Posts from './Posts'
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
const {width, height} = Dimensions.get("window")
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import client from '../api/client'
import { COLORS } from '../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = () => {

  const navigation = useNavigation()
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)


  const getData = async()=>{
    try {
      const value = await AsyncStorage.getItem('userInfo')
      const userToken = await AsyncStorage.getItem('userToken')
      if(value !== null) {
      setUserInfo(JSON.parse(value))
      setUserToken(userToken)
      }

    } catch(e) {
      console.log(`${e}`)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const token = userToken

  const config ={
    Headers:{Authorization:`Bearer ${token}`}
  }
   
      const getPosts =()=>{
    setIsLoading(true)
        client.get(`/news/getMainCampusNews/${currentPage}/2`, config)
        .then(res=>{
           setPosts([...posts, ...res.data.data])
          console.log(res.data.data)
  setIsLoading(false)
        })
      }

      
  
  const renderLoader=()=>{
    return(
      isLoading?
      <View style={{marginVertical:16, alignItems:"center",}}>
        <ActivityIndicator size="large" color="blue"/>
      </View>
      : null
    )
  }
  
  const loadMorePosts=()=>{
    console.log("load more posts")
    setCurrentPage(currentPage +1)
  }
  
      useEffect(()=>{
        getPosts()
      },[currentPage])
  
  return ( 
    <>
      <StatusBar backgroundColor={COLORS.white}/>
    <SafeAreaView style={{flex:1, top:100}}>
<FlatList
 onEndReachedThreshold={0.5}
//  ref={ref}
//  onMomentumScrollEnd={updateCurrentSlideIndex}
onEndReached={loadMorePosts}
showsVerticalScrollIndicator={false}
vertical
data={posts}
bounces={false}
decelerationRate={"fast"}
//  keyExtractor={item=>item.id}
renderItem={({item, id}) => <Posts  post={item} key={id} navigation={navigation} />}
ListFooterComponent={renderLoader}


/>
    </SafeAreaView>
    </>
  )
}



export default HomeScreen

const styles = StyleSheet.create({})





{/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}
>
{POSTS.map((post, id)=>(
<TouchableOpacity
   key={id}
   activeOpacity={1}
  //  onPress={()=>navigation.navigate("PostDetails"
  // //   {
    // //   image:post.image,
  // //   title:post.title,
  // //   date: post.date,
  // //   fullDescription: post.fullDescription,
  // //  }
  //  )}
   >

     <Posts post={post} key={id} navigation={navigation}/>
   </TouchableOpacity>
))}
</ScrollView> */}