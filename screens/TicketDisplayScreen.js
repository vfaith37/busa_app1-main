import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, ScrollView} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Warning } from '../constants/icons'
import client from '../api/client';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { EVENTS } from '../data/eventData';
import TicketCard from './TicketCard';
const {height, width} = Dimensions.get("screen")

const TicketDisplayScreen = () =>{
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)


	const updateCurrentSlideIndex = e => {
		const contentOffsetX = e.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / width);
		setCurrentSlideIndex(currentIndex);
	  };

	  const [tickets, setTickets] = useState([])

	const navigation = useNavigation();
          const [userInfo, setUserInfo] = useState(null)
          const [userToken, setUserToken] = useState(null)

  const [isLoading, setIsLoading] = useState(false)



  const  getTicketData = async () => {
	try {
	  const value = await AsyncStorage.getItem('userInfo')
	  const userToken = await AsyncStorage.getItem("userToken")

	  if(value !== null && userToken !==null) {
		console.log(value)
		setUserInfo(JSON.parse(value))
		setUserToken(userToken)
	  
          
		const userInfo = JSON.parse((value))
             
		console.log(userInfo)
	  
		// run the getTicketDetailsFunction
		setIsLoading(true)
		const email = userInfo?.email
		
		const token = userToken
		const config ={
				headers: {
					Authorization: `Bearer ${token}`,
					}
				}

				// if (tickets.length === 0){

					await axios.get(`https://code-6z3x.onrender.com/api/tickets/getTicketByEmail/${email}`, config,
					)
				.then((res)=> {
					console.log(res)
				console.log(res.data)
				if(res.status === 200){
					setTickets([...tickets, ...res.data.data])
					setIsLoading(false)
				}
				})
				.catch((e)=>{
					console.log(`${e}`)
				})
				// }else{
				// 	setIsLoading(false)
				// }
			}
	  
	} catch(e) {
	  console.log(`${e}`)
	}
  }

	useEffect(()=>{
	  getTicketData()
	  },[])

  
  
  const renderLoader=()=>{
	  return(
		  isLoading?
		  <View style={{ alignContent:"center", top:width/2, marginHorizontal:140}}>
			<ActivityIndicator size="large" color="blue"/>
		  </View>
		  : null
		  )

		}


		// const TicketIndicator =({tickets})=>{

		// 	return(
		// 		<View>
		// { 
		// tickets.length > 1?
		// (
		// 	<View style={styles.pagination}>
		//    {tickets.map((_, index) => {
		// 	  return (
		// 		 <View
		// 		 key={index}
		// 		 style={[
		// 		   styles.dot,
		// 		currentSlideIndex == index && {
		// 			 backgroundColor: "#000",
		// 			 width: 7,
		// 			 height:7,
		// 			 borderRadius:10,
		// 		   }
		// 		 ]}
		// 	   />
		// 	   )
		// 	  })} 
		// 	  </View>
		// )
		// :null
		// 	}
		// 		</View>
		// 	)
		// }

 return(
	<View style={{
		height:height*0.50, width:width*0.83, alignContent:"center", borderRadius:20, alignSelf:"center", backgroundColor:"#fff", top:200
	}}>
 
	<FlatList
horizontal
showsHorizontalScrollIndicator={false}
 onMomentumScrollEnd={updateCurrentSlideIndex}
scrollEventThrottle={35}
bounces={false}
pagingEnabled
scrollEnabled
data={tickets}
renderItem={({item, id})=><TicketCard ticket={item} key={id} navigation={navigation}/>}
ListFooterComponent={renderLoader}
/>


   {/* <View style={{top:150}}>
			  <Text style={{fontSize:13, fontWeight:"600", color:"red", fontFamily:"Poppins", alignSelf:"center"}}>
				Pls You do not have any ticket purchased, kindly go ahead and purchase a ticket
			  </Text>
			  <Warning style={{alignSelf:"center", marginTop:30}} width={100} height={100} />
			</View>  */}




{/* <TicketIndicator tickets={tickets}/> */}
 </View>
 )
}


export default TicketDisplayScreen



const styles = StyleSheet.create({
    dot:{borderRadius:10, height:7, width:7, backgroundColor:"gray", marginBottom:10, marginHorizontal:3, justifyContent:"center" },
    pagination:{
        bottom:-6,
        left:(width*0.80)/2,
        position:"absolute",
        flexDirection:"row",
        justifyContent:"center",
      },


})
