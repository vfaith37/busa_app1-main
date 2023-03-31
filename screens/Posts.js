import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity, Platform, FlatList } from 'react-native'
import React from 'react'
import { useRef, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment/moment';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const {width, height}= Dimensions.get("screen")
const imageH = height*0.37
const imageW = width*0.9


const Posts = ({post}) => {
  return (
    <View
    style={{flex:1}}
    >
      <StatusBar backgroundColor={COLORS.white}/>
      <View> 
         <PostImage post={post}/>
        <PostFooter post={post}/>
        </View>
    </View>
  )
}

const PostImage=({post})=>{
 const navigation = useNavigation()
  const [isRecent, setIsRecent]= useState(false)

  useEffect(() => {
    const postDate = new Date(post.addedAt);
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the post date and the current date
    const diffInMs = currentDate.getTime() - postDate.getTime();

    // Check if the post is less than 1 hour old
    if (diffInMs < 3600000) {
      setIsRecent(true);
      // Remove the "recent" text after 1 hour
      const timerId = setTimeout(() => setIsRecent(false), 3600000 - diffInMs);
      return () => clearTimeout(timerId);
    }
  }, [post.addedAt]);


  let time = post.addedAt

  var date = moment(time);

  var newTime = date.format('MMM DD, YYYY')
  // console.log(newTime)
  // console.log(date.format('MMMM Do YYYY, h:mm:ss a'));
  
  // const presentDate = moment().format('MMMM Do YYYY, h:mm:ss a');

  // console.log(presentDate)
  
 


  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start()
    // }).start(()=>fadeOut());
  }, [fadeAnim]);



//  const [currentSlideIndex, setCurrentSlideIndex]= useState(0)
//   const onViewableItemsChanged = useRef((item)=>{
//   const index = item.viewableItems[0].index
//         setCurrentSlideIndex(index)
//       })
      
//       const viewabilityConfig = useRef({
//         itemVisiblePercentThreshold:50,
//       })  

  return(
    <View>
   <View style={{backgroundColor:COLORS.transparent, alignSelf:"center", top:20, 
   height:imageH,                   
   width:imageW, 

   borderRadius:20, alignItems:"center"}}>
        <FlatList
        data={post.images}
        horizontal 
        bounces={false}
        // onViewableItemsChanged={onViewableItemsChanged.current}
        // viewabilityConfig={viewabilityConfig.current}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled
        keyExtractor={(index) => index.toString()}
        renderItem={({item})=>(
          <View>
          <TouchableOpacity
          activeOpacity={1}
          onPress={()=>navigation.navigate("PostDetails", {
            image:post.images,
            title:post.title,
        date: newTime,
        content: post.content,
          })}
          >
              <Image
                  style={{
                   height:imageH, 
                   width:imageW, 
                   borderRadius:20, 
                    resizeMode: Platform.OS === "android" ? "contain" :"cover",
                    alignSelf:"center",
                  }}
                  key={item._id}
                  source={{uri:item}}
                  />
                  </TouchableOpacity>
                  </View>
  
  )}
/>
</View> 

{/* {post.images.length> 1 ? 
             (
    
              <View style={styles.pagination}
          >
        
          {post.images.map((_, index) => {
    
              const imageId = `${post._id}_${index}`;
            return (
               <React.Fragment key={imageId}>
               <View
               style={[
                 styles.dot,
                 currentSlideIndex == index &&{
                   backgroundColor:COLORS.black,
                   width: 7,
                   height:7,
                   borderRadius:10,
                 }
               ]}
             />
    
          {
            currentSlideIndex==index &&(
              <Animated.View style={{backgroundColor:COLORS.offwhite, width:33, height:17, borderRadius:20, bottom:width*0.68, position:"absolute", right:-imageW/2.7, 
              opacity:fadeAnim,
            }}
            key={imageId}
              >
                <Text style={{color:COLORS.black, fontFamily:"Poppins", alignSelf:"center", top:-2, position:"absolute",}} >{index+1}/{post.images.length}</Text>
              </Animated.View>
            )
          }
           </React.Fragment>
           
           ) 
          })
          } 
          
          </View>
            )
            : null} */}
            
{isRecent && 
<View style={{width:55, height:18, backgroundColor:COLORS.white, borderRadius:2, left:30, position:"absolute", top:imageH*0.13}}>
<Text style={{color:COLORS.black, fontSize:11, fontFamily:"Poppins3", alignSelf:"center", fontWeight:"200"}}>Recent</Text>
</View>
}
</View> 

  )
}





const PostFooter=({post})=>{ 
  
  let time = post.addedAt

  var date = moment(time);
  
  var newTime = date.format('MMM D, YYYY')
 
  return(
  <>
   <View style={{
    
    left:width/15,
      position:"absolute",
    // paddingTop:imageH*1.3,
    width:width,
    height:width/8
     }}>

      <View style={{paddingTop:imageH*1.1}}>
      <Text style={{textTransform:"capitalize", color:COLORS.black,fontSize:16, fontWeight:"600",
      fontFamily:"Poppins3"
    }}>{post.title}</Text> 
    <Text style={{fontWeight:"200", fontSize:10, color:COLORS.darkblack,fontFamily:"Poppins3", lineHeight:13 }}> {newTime}</Text>
    <Text style={{fontWeight:"400", fontSize:11, color:COLORS.mgray, width:width*0.95, height:height/10, top:5, fontFamily:"Poppins", right:-3,}}>
      {post.content.length > 125 ? post.content.charAt(0).toUpperCase()+ post.content.slice(1,124).toLowerCase()+'...' : post.content.charAt(0).toUpperCase()+ post.content.slice(1,`${post.content.length}`).toLowerCase()+'...'}
      </Text>
      </View>

        </View>
  </>
  )
}








export default Posts

const styles = StyleSheet.create({
  container:{
    top:80,
  },
  pagination:{
    bottom:-6,
    left:(width*0.93)/2,
    position:"absolute",
    flexDirection:"row",
    justifyContent:"center",
    width:40,
    
  },
  dot:{borderRadius:10, height:7, width:7, backgroundColor:COLORS.gray, marginBottom:3, marginHorizontal:3, justifyContent:"center" }
})


































///for tips of the day;
         {/* <View>
          <View style={{height:210, width:375, backgroundColor:"#f6f6f6"}}>
            <Text style={{fontWeight:"300", color:"#717171", fontSize:12, textAlign:"center", textTransform:"uppercase", top:10}}>Tip of the Day</Text>
            <View >

            <View style={{top:30, alignItems:"flex-start", right:-165}}>
            <Text style={{fontWeight:"600", fontSize:14, lineHeight:18.2, color:"#000",
             maxWidth:"45%"
             }}>Start your day with a glass of water</Text>
            <Text style={{fontWeight:"300", fontSize:10, lineHeight:18,color:"#717171", maxWidth:"53%", maxHeight:"80%", top:10}}>Your body goes quite a few hours without hydration as you sleep. 
              Drinking a full glass of water in the morning can aid digestion, flush out toxins, enhance skin health and give you an energy boost.
            </Text>
                <Image
                style={{width:130, height:140, shadowColor:"#717171", opacity:1.2, bottom:125, right:143}}
                source={require("../assets/images/shirt.jpg")}
                />
            </View>

            </View>
          </View>
        </View>  */}