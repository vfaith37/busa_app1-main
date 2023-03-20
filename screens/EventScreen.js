
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList, View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import Events from './Events';
import ErrorButton from '../Components/ErrorButton';

const PAGE_SIZE = 10;
const {width, height} = Dimensions.get("screen")

const EventScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [cacheExpiry, setCacheExpiry] = useState(null);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
 

 const getEventData = useCallback(async (currentPage) => {
  
  // const CACHE_EXPIRY_TIME = 1* 60 * 1000; // 1 minute in milliseconds

    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);

        // const cacheKeyEvent = `${userInfo.email}-${currentPage}-${PAGE_SIZE}`;
        // const cachedDataEvent = await AsyncStorage.getItem(cacheKeyEvent);
        // const cacheExpiryEvent = await AsyncStorage.getItem(`${cacheKeyEvent}-expiry`);


        // if (
        //   cachedDataEvent !== null &&
        //   cacheExpiryEvent !== null &&
        //   Date.now() - parseInt(cacheExpiryEvent) < CACHE_EXPIRY_TIME
        //   // i.e the cache hasn't expired
        // ) {
        //   setEvents(JSON.parse(cachedDataEvent));
        //   setCacheExpiry(parseInt(cacheExpiryEvent));
        //   console.log(cacheExpiryEvent)
        // }else{


        const token = userToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };


        const res = await client.get(
          `/event/get${userInfo.campus}CampusEvents/${currentPage}/${PAGE_SIZE}`,
          config
        );

            console.log(res.data.data)

          const responseData = res.data.data;

            if (responseData.length === 0) {
              setHasMoreData(false);
          setIsLoading(false)

              // return;
            }

            if(currentPage>1){
              setEvents(prevEvents => [...prevEvents, ...responseData]);
              }
              else{
                setEvents([...events, ...responseData])
              }
  
            //   setCacheExpiry(Date.now());
            //   await AsyncStorage.setItem(cacheKeyEvent, JSON.stringify(responseData));
            //   await AsyncStorage.setItem(
            //     `${cacheKeyEvent}-expiry`,
            //     JSON.stringify(Date.now())
            //   );
            //  console.log(cacheKeyEvent) 
      // }
    }
    } catch (e) {
      console.log(`${e}`);
      alert(`${e}`);
      setError(true);
      setErrorMessage('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false)
    getEventData(currentPage);
  }, [currentPage, getEventData]);


  const loadMoreEvents = useCallback(async () => {
    if (isLoading || !hasMoreData) {
     console.log("no more")
       return;
    }
    console.log("load more")
    
    setCurrentPage(prevPage => prevPage + 1);
  }, [isLoading, hasMoreData]);

  const renderLoader =()=>{
    return(
    isLoading ?
    <View style={{marginVertical:80, alignItems:"center"}}>
       <LottieView
          source={require('../assets/animations/loader.json')}
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
          }}
          loop
          speed={0.7}
          autoPlay
        />
    </View>
    : null
    )
  }
 

  const renderItem = useCallback(
    ({ item}) => (
      <ScrollView
      contentContainerStyle={{ 
        paddingTop:5,
         height: height/2.2
         }}
         showsVerticalScrollIndicator={false}
         bounces={false}
      >
      <Events event={item} key={item.id} navigation={navigation} />
      </ScrollView>
    ),
    [navigation]
  );


  const handleRefresh = useCallback(async () => {
    try {
      setEvents([]);
      setCurrentPage(1); // Reset currentPage to 1 when refreshing
      setIsLoading(true);

      await getEventData(1);
      setCacheExpiry(null); 
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(true)
      setErrorMessage("An error occured")
    }
  }, [getEventData]);



  return (
    <SafeAreaView style={{ flex: 1,
     paddingTop: 45
      }}>
 {events.length === 0 && !isLoading && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No events present</Text>
      </View>
    )}
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreEvents}
        showsVerticalScrollIndicator={false}
        data={events}
        bounces={false}
        decelerationRate={'fast'}
         ListFooterComponent={renderLoader}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshing={isLoading && events.length === 0}
        onRefresh={handleRefresh}
      />
   {error && <ErrorButton onPress={() => setError(false)} message={errorMessage} style={{paddingTop:height*0.8}} color= "red"/>}
    </SafeAreaView>
  );
};

export default EventScreen;


const styles = StyleSheet.create({
  error:{
    color:"red",
    fontSize:10,
    fontFamily:"Poppins"
  }
  })
