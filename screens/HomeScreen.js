import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './Posts';
 import client from '../api/client'
import { COLORS } from '../constants/theme';
import DailyTips from "../Components/DailyTips"

const PAGE_SIZE = 5;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [posts, SetPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const getPostData = useCallback(async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);

        console.log(userInfo.campus)

      const token = userToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get(
`/news/get${userInfo.campus}CampusNews/${currentPage}/${PAGE_SIZE}`,

       config
      );

      if (res.data.data.length === 0) {
        setIsLoading(false);
        return; // Exit early if there are no more posts to fetch
      }

      setIsLoading(false);
      SetPosts((prevposts) => [...prevposts, ...res.data.data]);
      setCurrentPage((prevPage) => prevPage + 1);

    }
    } catch (e) {
      console.log({e});
      alert(`${e}`)
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, userToken]);

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
      <Posts post={item} key={item.id} navigation={navigation} />
    ),
    [navigation]
  );

  const handleRefresh = useCallback(() => {
    SetPosts([]);
    setCurrentPage(1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, top: 40 }}>
      <StatusBar backgroundColor={COLORS.white}/>
   <DailyTips/>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={loadMorePosts}
        showsVerticalScrollIndicator={false}
        data={posts}
        bounces={false}
        decelerationRate={'fast'}
        ListFooterComponent={renderLoader}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={isLoading && posts.length === 0}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;





