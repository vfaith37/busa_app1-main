import { StyleSheet, Text, View , SafeAreaView, ScrollView, Dimensions} from 'react-native'
import React from 'react'
import Home from './Home'
import TaskList from '../Components/TaskList'
import Navbar from '../Components/Navbar'
import PostsDisplay from './PostsDisplay'
import TaskItem from '../Components/TaskItem'
import TaskManager from '../Components/TaskManager'
import TaskInput from '../Components/TaskInput'
import Tasks from '../Components/Tasks'

const {width, height} = Dimensions.get("screen")

const HomeScreen = () => {
  return (

   <SafeAreaView style={{flex:1}}>
    <View style={{paddingLeft:20, paddingTop:30}}>
    <Navbar/>
    <ScrollView contentContainerStyle={{height:height*1.5}} showsVerticalScrollIndicator={false} bounces={false}>
    <PostsDisplay/>
    <Tasks/>
    </ScrollView>
     </View> 
   </SafeAreaView>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({})