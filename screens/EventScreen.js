// import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import Events from './Events'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import axios from 'axios'
// import client from '../api/client'
// import LottieView from 'lottie-react-native'

// //get the userInfo, and if the event.campus tallies, show the post


// const EventsScreen = () => {
//   const navigation = useNavigation()

//   const [events, setEvents] = useState([])

//   const [currentPage, setCurrentPage] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)

//   const [userInfo, setUserInfo] = useState(null)
//   const [userToken, setUserToken] = useState(null)

//   const getEventData = async()=>{
//     try {
//       const value = await AsyncStorage.getItem('userInfo')
//       const userToken = await AsyncStorage.getItem('userToken')
//       if(value !== null && userToken !== null) {
//       setUserInfo(JSON.parse(value))
//       setUserToken(userToken)
//       }

    

//       const userInfo = JSON.parse((value)) 
//       console.log(userInfo.campus)

//       const token = userToken
//       console.log(token)
//         const config ={
//           headers: {
//             Authorization: `Bearer ${token}`,
//             }
//           }
          
//       setIsLoading(true);


//       await 
//        axios.get(
//         // `https://code-6z3x.onrender.com/api/event/get${userInfo.campus}CampusEvents/${currentPage}/5`, config
//         `https://code-6z3x.onrender.com/api/event/getMainCampusEvents/${currentPage}/5`, config
    
//        )
//        .then((res)=>{
//         if (res.data.data.length === 0) {
//           setIsLoading(false);
//           return; // Exit early if there are no more posts to fetch
//         }

//         console.log(res.data.data)
//         setIsLoading(false);
//         setEvents([...events, ...res.data.data])
//        })
//        .catch((e)=>{
//      console.log(`${e}`)
//        })


//     } catch(e) {
//       console.log(`${e}`)
//     }
//   }

//   useEffect(()=>{
//     getEventData()
//   },[currentPage])

//   const loadMorePosts=()=>{
//     console.log("load more posts")
//     setCurrentPage(currentPage +1)
//   }


//   const renderLoader=()=>{
//     return(
//       isLoading?
//       // <View
//       // // style={{marginVertical:16, alignItems:"center",}} 
//       // >
//         // <ActivityIndicator size="large" color="blue"/> 

//         (
//         <LottieView
// 					source={require("../assets/animations/loader.json")}
// 					style={{
// 						// position: "absolute",
// 						width: 400,
// 						height: 400,
// 						top: 30,
// 						alignSelf: "center",
// 					}}
// 					loop={true}
//         speed={0.7}
// 					autoPlay
// 				/>
//         )

//       : null
//     )
//   }



//   // don't forget to run the get all events through axios
//     return (
//       <SafeAreaView style={{flex:1, top:40}}>
//      <FlatList
//      onEndReachedThreshold={0.5}
// onEndReached={loadMorePosts}
//      showsVerticalScrollIndicator={false}
//      vertical
//      data={events}
//      bounces={false}
//      decelerationRate={"fast"}
//        ListFooterComponent={renderLoader}
//     //  keyExtractor={item=>item.id}
//      renderItem={({item, id}) => 
//     <Events event={item} key={id} navigation={navigation}/>
//     }
//    />
     
//      </SafeAreaView>

//     )
// }




import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Events from './Events'

const PAGE_SIZE = 5;

const EventsScreen = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const getEventData = useCallback(async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);
      }

      const token = userToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `https://code-6z3x.onrender.com/api/event/getMainCampusEvents/${currentPage}/${PAGE_SIZE}`,
        config
      );

      if (res.data.data.length === 0) {
        setIsLoading(false);
        return; // Exit early if there are no more posts to fetch
      }

      setIsLoading(false);
      setEvents((prevEvents) => [...prevEvents, ...res.data.data]);
      setCurrentPage((prevPage) => prevPage + 1);

    } catch (e) {
      console.log(`${e}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, userToken]);

  useEffect(() => {
    getEventData();
  }, [getEventData]);

  // const loadMorePosts = useCallback(() => {
  //   if (!isLoading) {
  //     console.log('load more posts');
  //     getEventData();
  //   }
  // }, [getEventData, isLoading]);

  const loadMorePosts = useCallback(() => {
    if (events.length % PAGE_SIZE === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
      console.log('load more posts');
    }
  }, [events]);

  const renderLoader = useCallback(() => {
    return isLoading ? (
      <LottieView
        source={require('../assets/animations/loader.json')}
        style={{
          width: 400,
          height: 400,
          top: 30,
          alignSelf: 'center',
        }}
        loop
        speed={0.7}
        autoPlay
      />
    ) : null;
  }, [isLoading]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <Events event={item} key={item.id} navigation={navigation} />
    ),
    [navigation]
  );

  return (
    <SafeAreaView style={{ flex: 1, top: 40 }}>
      <FlatList
        onEndReachedThreshold={1}
        onEndReached={loadMorePosts}
        showsVerticalScrollIndicator={false}
        data={events}
        bounces={false}
        decelerationRate={'fast'}
        ListFooterComponent={renderLoader}
        //  keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;


// const styles = StyleSheet.create({})



  {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {EVENTS.map((event, id)=>(
                 <TouchableOpacity
                 key={id}
                 activeOpacity={1}>
                   <Events event={event} key={id} navigation={navigation}/>
                 </TouchableOpacity>
              ))}
             </ScrollView> */}