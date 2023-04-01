import React, { useState, useEffect, useCallback} from 'react';
import { SafeAreaView, FlatList,StatusBar, ScrollView, Dimensions, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './Posts';
 import client from '../api/client'
import { COLORS } from '../constants/theme';
import DailyTips from "../Components/DailyTips"
import ErrorButton from '../Components/ErrorButton';
const {width, height} = Dimensions.get("screen")

const PAGE_SIZE = 10;

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
   const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error,setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [cacheExpiry, setCacheExpiry] = useState(null);


  const getPostData = useCallback(async (currentPage) => {
  // const CACHE_EXPIRY_TIME = 1* 60 * 1000; // 1 minute in milliseconds

    setIsLoading(true);

    try {
      const userToken = await AsyncStorage.getItem("userToken");
          const value = await AsyncStorage.getItem("userInfo")
      if (userToken !== null && value !== null) {
             const userInfo = JSON.parse(value)
        setUserToken(userToken);
        setUserInfo(userInfo);

        // const cacheKey = `${userInfo.lastname}-${currentPage}-${PAGE_SIZE}`;
        // const cachedData = await AsyncStorage.getItem(cacheKey);
        // const cacheExpiry = await AsyncStorage.getItem(`${cacheKey}-expiry`);

        // if (
        //   cachedData !== null &&
        //   cacheExpiry !== null &&
        //   Date.now() - parseInt(cacheExpiry) < CACHE_EXPIRY_TIME
        // ) {
        //   setPosts(JSON.parse(cachedData));
        //   setCacheExpiry(parseInt(cacheExpiry));
        // }else{
        
const token = userToken
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
          // setHasMoreData(false);
          setIsLoading(false)
          return;
        // setPosts(prevPosts => [...prevPosts, ...responseData]);

        }
        setPosts(prevPosts => [...prevPosts, ...responseData]);

        // if(currentPage>1){
        // }
        // else{
        //   setPosts([...posts, ...responseData])
        // }
        
      //   setCacheExpiry(Date.now());
      //   await AsyncStorage.setItem(cacheKey, JSON.stringify(responseData));
      //   await AsyncStorage.setItem(
      //     `${cacheKey}-expiry`,
      //     JSON.stringify(Date.now())
      //   );
      //  console.log(cacheKey)
      // }
    }
    } catch (e) {
      console.log(`${e}`);
      console.log(e)
      setError(true);
  setErrorMessage('Oops! Something went wrong. Please try again .');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false)
    getPostData(currentPage);
  }, [currentPage, getPostData]);


  const loadMorePosts = useCallback(async () => {
    // if (isLoading || !hasMoreData) {
    //  console.log("no more")
    //    return;
    // }
    // console.log("load more")
    
    // setCurrentPage(prevPage => prevPage + 1);
    setCurrentPage(currentPage+1)
  }, [isLoading]);




  const renderLoader =()=>{
    return(
    isLoading ?
    <View style={{marginVertical:60, alignItems:"center"}}>
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
    ({ item }) => (
      <ScrollView contentContainerStyle={{ 
         height: height / 1.94
         }}
         showsVerticalScrollIndicator={false}
         bounces={false}
         >
        <Posts post={item} key={item.id} navigation={navigation}/>
       </ScrollView>
    ),
    [navigation]
  );





   const handleRefresh = useCallback(async () => {
    try {
      setPosts([]);
      setCurrentPage(1); // Reset currentPage to 1 when refreshing
      setIsLoading(true);

      await getPostData(1);
      // setCacheExpiry(null); 
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(true)
      setErrorMessage("An error occured")
    }
  }, [getPostData]);

const renderHeader =()=>{
  return(
    <View>
      <DailyTips/>
    </View>
  )
}

  return (
    <SafeAreaView style={{ flex: 1, paddingTop:50}}>
      <StatusBar backgroundColor={COLORS.darkgray}/>
       {posts.length === 0 && !isLoading && (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontFamily:"Poppins"}}>No posts present</Text>
      </View>
    )}
      <FlatList
      ListHeaderComponent={renderHeader}
      onEndReachedThreshold={0}
      onEndReached={loadMorePosts}
      showsVerticalScrollIndicator={false}
      data={posts}
      bounces={false}
      decelerationRate={'fast'}
      ListFooterComponent={renderLoader}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshing={isLoading && posts.length === 0}
      onRefresh={handleRefresh}
      />
      {error && <ErrorButton onPress={() =>{ setError(false); getPostData();}}message={errorMessage} style={{paddingTop:height*0.48}} color= {COLORS.red} borderRadius={10}/>}
    </SafeAreaView>
  );
};

export default HomeScreen;

  