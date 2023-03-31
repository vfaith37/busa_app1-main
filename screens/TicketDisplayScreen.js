import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, ScrollView, FlatList} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import client from '../api/client';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketCard from './TicketCard';
import ErrorButton from '../Components/ErrorButton';
import { COLORS } from '../constants/theme';
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
  const [error,setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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

				const formData = new FormData();

				formData.append("email", email)

				const res =	await client.post(`/tickets/getTicketByEmail/`,formData, config)

				console.log(res.data.data)
				if(res.status === 200){
					setTickets([...tickets, ...res.data.data])
				}

				 if(res.data.data.length===0){
                    setTickets([])
					setError(true);
					setErrorMessage('Oops! Pls kindly purchase a ticket.');
				}
				}
	  
	} catch(e) {
	  console.log(`${e}`)
	  setError(true);
	  setErrorMessage('Oops! Something went wrong. Please try again later.');
	}finally{
		setIsLoading(false)
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


		const TicketIndicator =({tickets})=>{

			return(
				<View>
		{ 
		tickets.length > 1?
		(
			<View style={styles.pagination}>
		   {tickets.map((_, index) => {
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
		)
		:null
			}
				</View>
			)
		}

 return(
	<View style={{
		height:height*0.50, width:width*0.83, alignContent:"center", borderRadius:20, alignSelf:"center", backgroundColor:"#fff", top:200
	}}>
    {error && <ErrorButton onPress={() =>{setError(false); getTicketData()}} message={errorMessage} style={{paddingTop:height*0.52}} color= {COLORS.red} borderRadius={10}/>}
 
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
