import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { SafeAreaView, FlatList,StatusBar, ScrollView, Dimensions, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { useNavigation, useScrollToTop} from '@react-navigation/native';
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
        setUserInfo(userInfo)

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
        

        console.log(userToken)
        console.log(userInfo)

        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
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
          setIsLoading(false)
          // return;
        }

        if(currentPage>1){
        setPosts(prevPosts => [...prevPosts, ...responseData]);
        }
        else{
          setPosts([...posts, ...responseData])
        }
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
  setErrorMessage('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false)
    getPostData(currentPage);
  }, [currentPage, getPostData]);


  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMoreData) {
     console.log("no more")
       return;
    }
    console.log("load more")
    
    setCurrentPage(prevPage => prevPage + 1);
  }, [isLoading, hasMoreData]);

  const renderItem = useCallback(
    ({ item }) => (
      <ScrollView contentContainerStyle={{ 
         height: height / 1.94
         }}
         showsVerticalScrollIndicator={false}
         bounces={false}
         >
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
      <StatusBar backgroundColor={COLORS.white}/>
       {posts.length === 0 && !isLoading && (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontFamily:"Poppins"}}>No posts present</Text>
      </View>
    )}
    {error && <ErrorButton onPress={() => setError(false)} message={errorMessage} style={{paddingTop:height*0.48}} color= {COLORS.red} borderRadius={10}/>}
      <FlatList
      ListHeaderComponent={renderHeader}
        onEndReachedThreshold={0.1}
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
    </SafeAreaView>
  );
};

export default HomeScreen;




//   const getPostData = useCallback(async (currentPage) => {
//     setIsLoading(true);

//     try {
//         const value = await AsyncStorage.getItem("userInfo");
//         const userToken = await AsyncStorage.getItem("userToken");

//         if (value !== null && userToken !== null) {
//             const userInfo = JSON.parse(value);
//             setUserInfo(userInfo);
//             setUserToken(userToken);

//             const cacheKey = `${userInfo.campus}-${currentPage}-${PAGE_SIZE}`;

//             const cacheData = await AsyncStorage.getItem(cacheKey);
//             if (cacheData !== null) {
//                 const parsedData = JSON.parse(cacheData);
//                 setPosts([...posts, ...parsedData.posts]);
//                 setHasMoreData(parsedData.hasMoreData);
//                 setCacheExpiry(parsedData.cacheExpiry);
//                 setIsLoading(false);
//                 return;
//             }

//             const token = userToken;
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             let allPosts = []; // New variable to hold all the posts
//             let hasMore = true; // New variable to determine if there is more data to load

//             while (hasMore) { // Loop until there is no more data
//                 const res = await client.get(
//                     `/news/get${userInfo.campus}CampusNews/${currentPage}/${PAGE_SIZE}`,
//                     config
//                 );

//                 console.log(res.data.data);

//                 const responseData = res.data.data;

//                 if (responseData.length === 0) {
//                     hasMore = false;
//                 } else {
//                     allPosts = [...allPosts, ...responseData];
//                     currentPage++;
//                 }
//             }

//             if (allPosts.length === 0) {
//                 setHasMoreData(false);
//                 setIsLoading(false);
//                 return;
//             }

//             // const cacheExpiry = new Date().getTime() + CACHE_EXPIRY_TIME;
//             // const cacheValue = JSON.stringify({
//             //     posts: allPosts,
//             //     hasMoreData: false,
//             //     cacheExpiry,
//             // });

//             // await AsyncStorage.setItem(cacheKey, cacheValue);

//             setPosts([...posts, ...allPosts]);
//             // setCacheExpiry(cacheExpiry);
//         }
//     } catch (e) {
//         console.log(`${e}`);
//         alert(`${e}`);
//     } finally {
//         setIsLoading(false);
//     }
// }, []);
  