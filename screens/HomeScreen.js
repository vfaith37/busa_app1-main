import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList,StatusBar, ScrollView, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './Posts';
 import client from '../api/client'
import { COLORS } from '../constants/theme';
import DailyTips from "../Components/DailyTips"

const {width, height} = Dimensions.get("screen")

const PAGE_SIZE = 5;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);


  const getPostData = useCallback(async () => {
  
    const CACHE_EXPIRY_TIME = 1 * 60 * 1000; // 30 minutes in milliseconds
  
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
          const cachedData = await AsyncStorage.getItem('posts');
          const cachedTimestamp = await AsyncStorage.getItem('postsTimestamp');
          const currentTime = new Date().getTime();
  
          if (cachedData && cachedTimestamp) {
            const timeDiff = currentTime - Number(cachedTimestamp);
            if (timeDiff < CACHE_EXPIRY_TIME) { // Check if the cached data is still valid
              setPosts(JSON.parse(cachedData));
              setIsLoading(false);
              return;
            } else {
              await AsyncStorage.removeItem('posts');
              await AsyncStorage.removeItem('postsTimestamp');
            }
          }
  
          const res = await client.get(
            `/news/get${userInfo.campus}CampusNews/${currentPage}/${PAGE_SIZE}`,
            config
          );
  
              console.log(res)
  
          if (res.data.data.length === 0) {
            setIsLoading(false);
            setHasMoreData(false);
            return; // Exit early if there are no more posts to fetch
          }
  
          const newposts = currentPage === 1 ? res.data.data : [...posts, ...res.data.data];
          setPosts(newposts);
  
          // Cache the response data in AsyncStorage
          await AsyncStorage.setItem('posts', JSON.stringify(newposts));
          await AsyncStorage.setItem('postsTimestamp', currentTime.toString());
  
          setCurrentPage((prevPage) => prevPage + 1);
        }
      } catch (e) {
        console.log(`${e}`);
        alert(`${e}`);
      } finally {
        setIsLoading(false);
      }
    }, [currentPage, userToken, posts]);



  useEffect(() => {
    getPostData();
  }, [getPostData]);

  const loadMorePosts = useCallback(() => {
    if (posts.length % PAGE_SIZE === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [posts]);

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
      <ScrollView
      contentContainerStyle={{top:-20, height:height/1.95}}
      >
      <Posts post={item} key={item.id} navigation={navigation} />
      </ScrollView>
    ),
    [navigation]
  );

  const renderFooter = useCallback(() => {
    if (!hasMoreData && posts.length === 0) {
      return (
        <Text style={{ textAlign: 'center', paddingVertical: 20 }}>
          No posts to display
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
    setPosts([]);
    setCurrentPage(1); // Reset currentPage to 1 when refreshing
    setIsLoading(true);
    await getPostData();
    setIsLoading(false);
  }, [getPostData]);

  return (
    <SafeAreaView style={{ flex: 1, top:50}}>
      <StatusBar backgroundColor={COLORS.white}/>
   <DailyTips/>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={loadMorePosts}
        showsVerticalScrollIndicator={false}
        data={posts}
        bounces={false}
        decelerationRate={'fast'}
        ListFooterComponent={renderFooter}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={isLoading && posts.length === 0}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;





