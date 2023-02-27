
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Events from './Events';
import client from '../api/client';

const PAGE_SIZE = 5;

// const EventsScreen = () => {
//   const navigation = useNavigation();

//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [userToken, setUserToken] = useState(null);

//   const getEventData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const value = await AsyncStorage.getItem('userInfo');
//       const userToken = await AsyncStorage.getItem('userToken');
//       if (value !== null && userToken !== null) {
//         const userInfo = JSON.parse(value);
//         setUserInfo(userInfo);
//         setUserToken(userToken);
//       }

//       const token = userToken;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const res = await client.get(
//         `/event/getMainCampusEvents/${currentPage}/${PAGE_SIZE}`,
//         config
//       );

//       if (res.data.data.length === 0) {
//         setIsLoading(false);
//         return; // Exit early if there are no more events to fetch
//       }

//       setIsLoading(false);
//       setEvents((prevEvents) => [...prevEvents, ...res.data.data]);
//       setCurrentPage((prevPage) => prevPage + 1);

//     } catch (e) {
//       console.log(`${e}`);
//       alert(`${e}`)
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, userToken]);





const EventsScreen = () => {
  const navigation = useNavigation();
  
  
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);


  const updateCachedData = async (newData) => {
    try {
      const cachedData = await AsyncStorage.getItem('events');
      const parsedData = cachedData ? JSON.parse(cachedData) : [];
      const updatedData = [...parsedData, ...newData];
      await AsyncStorage.setItem('events', JSON.stringify(updatedData));
    } catch (e) {
      console.log(`Error updating cached data: ${e}`);
    }
  }


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

      // Check if there's cached data in AsyncStorage
      const cachedData = await AsyncStorage.getItem('events');
      if (cachedData) {
        setEvents(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      const res = await client.get(
        `/event/getMainCampusEvents/${currentPage}/${PAGE_SIZE}`,
        config
      );

      if (res.data.data.length === 0) {
        setIsLoading(false);
        return; // Exit early if there are no more events to fetch
      }

      setIsLoading(false);
      // setEvents((prevEvents) => [...prevEvents, ...res.data.data]);
      setEvents((prevEvents) => {
        const newEvents = [...prevEvents, ...res.data.data];
        updateCachedData(newEvents); // Update cached data with new events
        return newEvents;
      });
      setCurrentPage((prevPage) => prevPage + 1);

      // Cache the response data in AsyncStorage
      await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (e) {
      console.log(`${e}`);
      alert(`${e}`)
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, userToken]);


  useEffect(() => {
    getEventData();
  }, [getEventData]);



  const loadMorePosts = useCallback(() => {
    if (events.length % PAGE_SIZE === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
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

  const handleRefresh = useCallback(() => {
    setEvents([]);
    setCurrentPage(1);
  }, []);

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
        // keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={isLoading && events.length === 0}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;
