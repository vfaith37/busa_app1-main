import { StyleSheet, Text, View , SafeAreaView, ScrollView, Dimensions} from 'react-native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import Navbar from '../Components/Navbar'
import PostsDisplay from './PostsDisplay'
import Tasks from '../Components/Tasks'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import client from '../api/client'
import { COLORS } from '../constants/theme'
const {width, height} = Dimensions.get("screen")
import { useScrollToTop } from '@react-navigation/native';

const PAGE_SIZE = 10;

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
   const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [error,setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [noMorePosts, setNoMorePosts] = useState(false);
  
  const ref =  useRef(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollTo({ y: 50 }),
    })
  );

  const getPostData = useCallback ( async () => {


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
              
        // console.log (res.data.data)
        

        const responseData = res.data.data;

        if (responseData.length > 0) {
          // console.log(res)
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
  }, []);


  useEffect(()=>{
    getPostData()
  },[])

  

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
   <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
    <View style={{paddingLeft:20, paddingTop:50}}>
      <ScrollView
      // if tasks is empty, give normal height else increase it
      contentContainerStyle={{height:height*1.2}}
      showsVerticalScrollIndicator ={false}
      ref={ref}
      >
  {userInfo!==null && <Navbar userInfo ={userInfo}/>}
  <PostsDisplay post={posts} />
 <Tasks/>
      </ScrollView>
  </View>
   </SafeAreaView>
   
  )
}









// {posts.length>=1 ?
// <>
// <PostsDisplay getPostData={getPostData} post={posts} />
// <Tasks/>
// </>
// :
// <View>
// {posts.length === 0 && !isLoading && (
// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// <Text style={{fontFamily:"Poppins"}}>No posts present</Text>
// </View>
// )}
// </View>
// }
export default HomeScreen

const styles = StyleSheet.create({})