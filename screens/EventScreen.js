
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import Events from './Events';

const PAGE_SIZE = 10;

const EventScreen = () => {
  const navigation = useNavigation();
  
  
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [cacheExpiry, setCacheExpiry] = useState(null);

 

 const getEventData = useCallback(async (currentPage) => {
  
  const CACHE_EXPIRY_TIME = 1* 60 * 1000; // 30 minutes in milliseconds

    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);



        const cacheKey = `${userInfo.firstName}-${currentPage}-${PAGE_SIZE}`;

        const cacheData = await AsyncStorage.getItem(cacheKey);
        if (cacheData !== null) {
          const parsedData = JSON.parse(cacheData);
          setEvents(parsedData.events);
          setHasMoreData(parsedData.hasMoreData);
          setCacheExpiry(parsedData.cacheExpiry);
          setIsLoading(false);
          return;
        }

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

            console.log(res)

          const responseData = res.data.data;

            if (responseData.length === 0) {
              setHasMoreData(false);
              return;
            }
    
            const newData = [...events, ...responseData];
    
            const cacheExpiry = new Date().getTime() + CACHE_EXPIRY_TIME;
            const cacheValue = JSON.stringify({
              events: newData,
              hasMoreData: responseData.length > 0,
              cacheExpiry,
            });
    
            await AsyncStorage.setItem(cacheKey, cacheValue);
    
            setEvents(newData);
            setCacheExpiry(cacheExpiry);
      }
    } catch (e) {
      console.log(`${e}`);
      alert(`${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getEventData();
  }, [currentPage, getEventData]);


  const loadMorePosts = async () => {
    if (!hasMoreData || isLoading) {
      return;
    }

    if (cacheExpiry && new Date().getTime() >= cacheExpiry) {
      const cacheKey = `${userInfo.firstName}-${currentPage}-${PAGE_SIZE}`;
      await AsyncStorage.removeItem(cacheKey);
      setCacheExpiry(null);
    }

    setCurrentPage(currentPage + 1);
  };


  const renderLoader =()=>{
    return(
    isLoading ?
    <View style={{marginVertical:20, alignItems:"center"}}>
       <LottieView
          source={require('../assets/animations/loader.json')}
          style={{
            width: 300,
            height: 300,
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
    ({ item, index }) => (
      <Events event={item} key={item.id} navigation={navigation} />
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
    }
  }, [getEventData]);



  return (
    <SafeAreaView style={{ flex: 1, top: 40 }}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={loadMorePosts}
        showsVerticalScrollIndicator={false}
        data={events}
        bounces={false}
        decelerationRate={'fast'}
        ListFooterComponent={renderLoader}
        renderItem={renderItem}
        refreshing={isLoading && events.length === 0}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default EventScreen;
