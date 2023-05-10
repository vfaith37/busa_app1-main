import React, { useState, useEffect, useCallback} from 'react';
import { SafeAreaView, FlatList,StatusBar, ScrollView, Dimensions, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './Posts';
 import client from '../api/client'
import { COLORS } from '../constants/theme';
import ErrorButton from '../Components/ErrorButton';
const {width, height} = Dimensions.get("screen")

const PAGE_SIZE = 10;

const Home = ({component}) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
   const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [error,setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [noMorePosts, setNoMorePosts] = useState(false);
  
  const getPostData = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
          const value = await AsyncStorage.getItem("userInfo")
      if (userToken !== null && value !== null) {
             const userInfo = JSON.parse(value)
        setUserToken(userToken);
        setUserInfo(userInfo);

const token = userToken
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
					 "content-type": "multipart/form-data",
          },
        };

        const res = await client.get(
          `/news/get${userInfo.campus}CampusNews/${currentPage}/${PAGE_SIZE}`,
          config
        );
              
        console.log (res.data.data)
        

        const responseData = res.data.data;

        if (responseData.length > 0) {
          console.log(res)
        setPosts(prevPosts => [...prevPosts, ...responseData]);
        setCurrentPage(currentPage + 1);
        }else{
        setNoMorePosts(true);
        }
    }
    } catch (e) {
      console.log(`${e}`);
      console.log(e)
      setError(true);
      setErrorMessage( e.message ? e.message : "Oops! Something went wrong. Please try again later.");
  
    } finally {
      setIsLoading(false);
    }  
  };


  useEffect(()=>{
    getPostData()
  },[])

  
  const renderFooter = () => {
    if (noMorePosts) {
      return (
        <View>
          <Text>No more posts available</Text>
        </View>
      )
    } else {
      return (
        isLoading?
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
      );
    }
  };


  const renderItem = useCallback(
    ({ item }) => (
        <Posts post={item} key={item.id} navigation={navigation} 
         component={component} 
        />
    ),
    [navigation]
  );


   const handleRefresh = useCallback(async () => {
    try {
      setPosts([]);
      setCurrentPage(1); // Reset currentPage to 1 when refreshing
      setIsLoading(true);

      await getPostData();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(true)
      setErrorMessage("An error occured")
    }
  }, [getPostData]);

  return (
    <View>
      {component === "HomeScreen" ? 
    <View style ={{paddingTop:50}}>
      <View>
       {posts.length === 0 && !isLoading && (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontFamily:"Poppins"}}>No posts present</Text>
      </View>
    )}
      <FlatList
      onEndReachedThreshold={0.1}
      onEndReached={getPostData}
      showsHorizontalScrollIndicator={false}
      data={posts}
      vertical
      bounces={false}
      decelerationRate={'fast'}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshing={isLoading && posts.length === 0}
    //   onRefresh={handleRefresh}
      />
      {error && <ErrorButton onPress={() =>{ setError(false); getPostData();}}message={errorMessage} style={{paddingTop:height*0.48}} color= {COLORS.red} borderRadius={10}/>}
      </View>
    </View>
     :
<View>
<FlatList
      showsHorizontalScrollIndicator={false}
      data={posts.slice(0,5)}
      horizontal
      bounces={false}
      decelerationRate={'fast'}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      />
</View>
    } 

     </View>
  );
};

export default Home;

  









