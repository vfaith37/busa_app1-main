import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Events from './Events'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import client from '../api/client'

//get the userInfo, and if the event.campus tallies, show the post


const EventsScreen = () => {


  const [events, setEvents] = useState([])



  const [userInfo, setUserInfo] = useState(null)
  const [userToken, setUserToken] = useState(null)

  const getEventData = async()=>{
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
    getEventData()
  },[])


  const token = userToken
  // console.log(token)
    const config ={
      headers: {
        Authorization: `Bearer ${token}`,
        }
      }

  const getEvents = async ()=>{
     await  axios.get(`https://code-6z3x.onrender.com/api/event/getIperuCampusEvents/1/2`, config
     //${userInfo?.campus.charAt(0).toUppercase()}
      )
      .then((res)=>{
       console.log(res)
       // setEvents([...events, ...res.data.data])
      })
      .catch((e)=>{
    console.log(`${e}`)
      })
    }
   
  useEffect(()=>{
    getEvents()
  },[])

 



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
     data={events}
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