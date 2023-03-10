import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList,StatusBar, ScrollView, Dimensions, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './Posts';
 import client from '../api/client'
import { COLORS } from '../constants/theme';
import DailyTips from "../Components/DailyTips"

const {width, height} = Dimensions.get("screen")


  const PAGE_SIZE = 10;
const CACHE_EXPIRY_TIME = 2* 60 * 100;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [cacheExpiry, setCacheExpiry] = useState(null);

  const getPostData = useCallback(async (currentPage) => {
    setIsLoading(true);

    try {
      const value = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");

      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);

        const cacheKey = `${userInfo.campus}-${currentPage}-${PAGE_SIZE}`;

        const cacheData = await AsyncStorage.getItem(cacheKey);
        if (cacheData !== null) {
          const parsedData = JSON.parse(cacheData);
          setPosts(parsedData.posts);
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
          `/news/get${userInfo.campus}CampusNews/${currentPage}/${PAGE_SIZE}`,
          config
        );

        console.log (res.data.data)

        const responseData = res.data.data;

        if (responseData.length === 0) {
          setHasMoreData(false);
          return;
        }

        const newData = [...posts, ...responseData];

        const cacheExpiry = new Date().getTime() + CACHE_EXPIRY_TIME;
        const cacheValue = JSON.stringify({
          posts: newData,
          hasMoreData: responseData.length > 0,
          cacheExpiry,
        });

        await AsyncStorage.setItem(cacheKey, cacheValue);

        setPosts(newData);
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
    setIsLoading(false)
    getPostData(currentPage);
  }, [currentPage, getPostData]);


  const loadMorePosts = async () => {
    if (!hasMoreData || isLoading) {
      return;
    }

    if (cacheExpiry && new Date().getTime() >= cacheExpiry) {
      const cacheKey = `${userInfo.campus}-${currentPage}-${PAGE_SIZE}`;
      await AsyncStorage.removeItem(cacheKey);
      setCacheExpiry(null);
    }

    setCurrentPage(currentPage + 1);
  };

  const handleRefresh = useCallback(async () => {
    try {
      setPosts([]);
      setCurrentPage(1); // Reset currentPage to 1 when refreshing
      setIsLoading(true);

      await getPostData(1);
      setCacheExpiry(null); 


      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [getPostData]);



  const renderItem = useCallback(
    ({ item }) => (
      <ScrollView contentContainerStyle={{ top: -20, height: height / 1.94}}>
        <Posts post={item} key={item.id} navigation={navigation} />
       </ScrollView>
    ),
    [navigation]
  );


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




 
  
  return (
    <SafeAreaView style={{ flex: 1, top:50}}>
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
        renderItem={renderItem}
        refreshing={isLoading && posts.length === 0}
        keyExtractor={(item) => item._id}
         onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;



  
  
  
  