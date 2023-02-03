import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import { useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Icon } from '../constants/icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
// import moment from 'moment/moment';
const{width, height} = Dimensions.get("window")
const COLORS = {
  primary: "#004FC7", // blue
  secondary: "#F6F6F6",   // gray

  black: "#1E1F20",
  white: "#FFFFFF",
  events:"#2b3b67"
}

const EventDetails = ({route}) => {
  return (
    <>
    <StatusBar backgroundColor={COLORS.events} statusBarStyle={COLORS.events}/>
    <View style={{backgroundColor:"#2b3b67", flex:1}}>
    <EventAbout route={route}/>
    </View>
    </>
  )
}


const EventAbout =(props)=>{
    const {title, date, location, time, image, price, description} = props.route.params
return(
    <View style={{top:20}}>
    <EventImage image ={image}/>
    <EventBody title={title} date={date} location={location} time={time} price={price} description={description}/>
    </View>
)
}


const EventImage=(props)=>{
    const [currentSlideIndex, setCurrentSlideIndex]= useState(0)
    const onViewableItemsChanged = useRef((item)=>{
      const index = item.viewableItems[0].index
      setCurrentSlideIndex(index)
      // const index = item.viewableItems
      console.log(index)
    })
    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold:50,
    })
return(
    <View>
     <View style={{ top:20, height:300, width:300, backgroundColor:"transparent",borderRadius:10, alignSelf:"center"}}>
          <FlatList
          data={props.image}
          horizontal
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig.current}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={35}
          scrollEnabled
          keyExtractor={item => item.id}
          renderItem={({item}, id)=>(
            <View>
            <TouchableOpacity
            activeOpacity={1}
            >
                <Image
                    style={{
                      height:300, width:300,  alignSelf:"center", resizeMode:"contain", borderRadius:10
                    }}
                    key={id}
                    source={{uri:item.image}}
                    />
                    </TouchableOpacity>
                    </View>
    
    )}
  />
  </View> 
  <View style={styles.pagination}>
   {props.image.map((_, index) => {
      return (
         <View
         key={index}
         style={[
           styles.dot,
           currentSlideIndex == index && {
             backgroundColor: "#000",
             width: 7,
             height:7,
             borderRadius:10,
           }
         ]}
       />
       ) 
      })} 
      </View>
    </View>
    )
  
  
  }

const EventBody=(props)=>{

  const [userInfo, setUserInfo] = useState(null)
  const navigation= useNavigation()

  //run the async to get email and also get title being passed as a prop

  const  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if(value !== null) {
      // console.log(value)
      setUserInfo(JSON.parse(value))
      }
    } catch(e) {
      console.log(`${e}`)
    }
    }
  
  
     useEffect(()=>{
    getData()
    },[])

    const pay = async()=>{
        // try{
        //     const value = await AsyncStorage.getItem("userInfo")
        //     if(value!==null){
        //         setUserInfo(JSON.parse(value))
        //     }
        // }
        // catch(e){
        //       console.log(`an error occured ${e}`)
        //   }
          
      
            const email = userInfo?.email
        console.log(email)

        const title = props.title
        console.log(title)



        await axios.post(`https://no-vex-abeg.onrender.com/api/pay/payForTicket`,{
         email:email,
         title:title
}).then((res)=>{
  console.log(res)

  if(res.status===200){
    navigation.dispatch(
              StackActions.replace("CheckOutScreen"
              , {
             authorization_url: res.data.authorization_url
              }
              )
              );

  }
}).catch((e)=>{
  console.log(`The error is: ${e}`)
})

    }
    
    // useEffect(()=>{
    //   pay()
    //   },[])


return(
    <>
    <View style={{height:335, width:width*0.83, borderRadius:30, backgroundColor:"#fff", top:35, alignSelf:"center"}}>

<View style={{margin:13, left:10, marginVertical:20}}>
<Text style={{color:"#1b5bff", fontFamily:"Poppins2", fontSize:10, fontWeight:"300", position:"absolute", textTransform:"uppercase"}}>{props.date}</Text>
<Text style={{fontWeight:"600", fontSize:23, lineHeight:28, color:"#000", fontFamily:"Poppins2", position:"absolute", top:20}}>{props.title}</Text>


<View style={{bottom:-46, left:5}}>
    <View>
   <Icon
   name="time-outline"
   size={16}
   style={{
           color: "#000",
           top:2,
           left:-3
           }}
       />
   <Text style={{color:"#000", fontFamily:"Poppins2", fontSize:14, 
   position:"absolute", 
   left:15
   }}>{props.time} {"|"}</Text>
   </View>


   <View style={{flexDirection:"row", justifyContent:"space-around", bottom:15, left:-25}}>
   <Icon
   name="location-outline"
   size={16}
   style={{
           color: "#000",
           left:-20
           }}
       />
   <Text style={{color:"#000", fontFamily:"Poppins2", fontSize:14, textTransform:"uppercase", position:"absolute", 
   top:-3
   }}>{props.location}</Text>
   </View>

   </View>

<Text style={{fontFamily:"Poppins2", fontWeight:"400",position:"absolute", left:2, bottom:-265, fontSize:18, lineHeight:22}}>{props.price}</Text>

<View style={{width:width*0.75, position:"absolute"}}>
<Text style={{fontSize:10, fontFamily:"Poppins", fontWeight:"300", color:"#999999", position:"absolute", top:80, lineHeight:12.5}}>{props.description}</Text>
</View>

</View>

<View style={{width:118, height:37, borderRadius:10, backgroundColor:"#004fc7",alignSelf:"center", position:"absolute", bottom:10, right:20}}>
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={()=>pay()}
 >
    <Text style={{color:"#fff", fontSize:14, fontWeight:"600", lineHeight:21, fontFamily:"Poppins2", alignSelf:"center", position:"absolute", padding:8}}>Buy Now</Text>
    </TouchableOpacity>
</View>

    </View>
    
    </>
)



}
export default EventDetails


const styles = StyleSheet.create({
    dot:{borderRadius:10, height:7, width:7, backgroundColor:"gray", marginBottom:3, marginHorizontal:3, justifyContent:"center" },
    pagination:{
        bottom:-6,
        left:(width*0.90)/2,
        position:"absolute",
        flexDirection:"row",
        justifyContent:"center",
      },


})