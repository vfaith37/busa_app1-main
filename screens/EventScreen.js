
import React, { useState, useEffect, useCallback, Text } from 'react';
import { SafeAreaView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Events from './Events';
import client from '../api/client';

const PAGE_SIZE = 5;

const EventsScreen = () => {
  const navigation = useNavigation();
  
  
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);

 

 const getEventData = useCallback(async () => {
  
  const CACHE_EXPIRY_TIME = 2 * 60 * 1000; // 30 minutes in milliseconds

    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);

        const token = userToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Check if there's cached data in AsyncStorage
        const cachedData = await AsyncStorage.getItem('events');
        const cachedTimestamp = await AsyncStorage.getItem('eventsTimestamp');
        const currentTime = new Date().getTime();

        if (cachedData && cachedTimestamp) {
          const timeDiff = currentTime - Number(cachedTimestamp);
          if (timeDiff < CACHE_EXPIRY_TIME) { // Check if the cached data is still valid
            setEvents(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          } else {
            await AsyncStorage.removeItem('events');
            await AsyncStorage.removeItem('eventsTimestamp');
          }
        }

        const res = await client.get(
          `/event/get${userInfo.campus}CampusEvents/${currentPage}/${PAGE_SIZE}`,
          config
        );

            console.log(res)

        if (res.data.data.length === 0) {
          setIsLoading(false);
          setHasMoreData(false);
          return; // Exit early if there are no more events to fetch
        }

        const newEvents = currentPage === 1 ? res.data.data : [...events, ...res.data.data];
        setEvents(newEvents);

        // Cache the response data in AsyncStorage
        await AsyncStorage.setItem('events', JSON.stringify(newEvents));
        await AsyncStorage.setItem('eventsTimestamp', currentTime.toString());

        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.log(`${e}`);
      alert(`${e}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, userToken, events]);

  useEffect(() => {
    getEventData();
  }, [getEventData]);

  
  const loadMorePosts = useCallback(() => {
    if (events.length % PAGE_SIZE === 0  && hasMoreData)  {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [events]);

  const renderLoader = useCallback(() => {
    return isLoading  ? (
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


  const renderFooter = useCallback(() => {
    if (!hasMoreData && events.length === 0) {
      return (
        <Text style={{ textAlign: 'center', paddingVertical: 20 }}>
          No events to display
        </Text>
      );
    } else if (!hasMoreData) {
      return (
        <Text style={{ textAlign: 'center', paddingVertical: 20 }}>
          You have been caught up!
        </Text>
      );
    }
    return renderLoader();
  },[hasMoreData, renderLoader]);


  const handleRefresh = useCallback(async () => {
    setEvents([]);
    setCurrentPage(1); // Reset currentPage to 1 when refreshing
    setIsLoading(true);
    await getEventData();
    setIsLoading(false);
  }, [getEventData]);


  return (
    <SafeAreaView style={{ flex: 1, top: 40 }}>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={loadMorePosts}
        showsVerticalScrollIndicator={false}
        data={events}
        bounces={false}
        decelerationRate={'fast'}
        //  keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={isLoading && events.length === 0}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;
