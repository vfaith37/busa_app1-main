import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Events from './Events'
import { EVENTS } from '../data/eventData'
import AsyncStorage from '@react-native-async-storage/async-storage'

//get the userInfo, and if the event.campus tallies, show the post


const EventsScreen = () => {



  //  axios.get(`https://no-vex-abeg.onrender.com/api/events/get${userInfo.campus.tocharAt(0).toUpperCase()}CampusEvents`,)
  //  .then((res)=>{

  //  }).catch((e)=>{

  //  })

  const [userInfo, setUserInfo] = useState(null)

  const getData = async()=>{
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if(value !== null) {
      // console.log(value)
      setUserInfo(JSON.parse(value))
      }
    } catch(e) {
      console.log(`${e}`)
    }
  }
  useEffect(()=>{
    getData()
  })

  // here, get the userInfo.campus and used it to make axios requests
  // if userinfo.campus === "iperu", get all iperu tickets
  // if userinfo.campus === "Main", get all main events



  // don't forget to run the get all events through axios
    const navigation = useNavigation()
    return (
      <SafeAreaView style={{flex:1, top:40}}>
     <FlatList
    //  onEndReachedThreshold={0.5}
    //  ref={ref}
    //  onMomentumScrollEnd={updateCurrentSlideIndex}
  // onEndReached={}

     showsVerticalScrollIndicator={false}
     vertical
     data={EVENTS}
     bounces={false}
     decelerationRate={"fast"}
    //  keyExtractor={item=>item.id}
     renderItem={({item, id}) => 
    <Events event={item} key={id} navigation={navigation}/>
    }
   />
     
     </SafeAreaView>

    )
}





 
export default EventsScreen

const styles = StyleSheet.create({})





















  {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {EVENTS.map((event, id)=>(
                 <TouchableOpacity
                 key={id}
                 activeOpacity={1}>
                   <Events event={event} key={id} navigation={navigation}/>
                 </TouchableOpacity>
              ))}
             </ScrollView> */}