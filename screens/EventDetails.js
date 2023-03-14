// import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
// import React, { useCallback, useContext, useEffect } from 'react'
// import { useRef, useState} from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { useFonts } from 'expo-font';
// import { Icon } from '../constants/icons';
// import { StackActions, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../context/AuthContext';
// import client from '../api/client';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// // import moment from 'moment/moment';
// const{width, height} = Dimensions.get("window")
// const COLORS = {
//   primary: "#004FC7", // blue
//   secondary: "#F6F6F6",   // gray

//   black: "#1E1F20",
//   white: "#FFFFFF",
//   events:"#2b3b67"
// }

// const EventAbout =(props)=>{
//     const {title, date, venue, time, image, ticketPrice, description} = props.route.params
// return(
//     <View style={{top:20}}>
//     <EventImage image ={image}/>
//     <EventBody title={title} date={date} venue={venue} time={time} ticketPrice={ticketPrice} description={description}/>
//     </View>
// )
// }

// const EventImage=(props)=>{
//     const [currentSlideIndex, setCurrentSlideIndex]= useState(0)
//     const onViewableItemsChanged = useRef((item)=>{
//       const index = item.viewableItems[0].index
//       setCurrentSlideIndex(index)
//       // const index = item.viewableItems
//       console.log(index)
//     })
//     const viewabilityConfig = useRef({
//       itemVisiblePercentThreshold:50,
//     })
// return(
//     <View>
//      <View style={{ top:20, height:300, width:300, backgroundColor:"transparent",borderRadius:10, alignSelf:"center"}}>
//           <FlatList
//           data={props.image}
//           horizontal
//           bounces={false}
//           onViewableItemsChanged={onViewableItemsChanged.current}
//           viewabilityConfig={viewabilityConfig.current}
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           scrollEventThrottle={35}
//           scrollEnabled
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item}, id)=>(
//             <View>
//             <TouchableOpacity
//             activeOpacity={1}
//             >
//                 <Image
//                     style={{
//                       height:300, width:300,  alignSelf:"center", resizeMode:"contain", borderRadius:10
//                     }}
//                     key={id}
//                     source={{uri:item}}
//                     />
//                     </TouchableOpacity>
//                     </View>

//     )}
//   />
//   </View>

//   <View style={styles.pagination}>
//    {props.image.map((_, index) => {
//       return (
//          <View
//          key={index}
//          style={[
//            styles.dot,
//            currentSlideIndex == index && {
//              backgroundColor: "#000",
//              width: 7,
//              height:7,
//              borderRadius:10,
//            }
//          ]}
//        />
//        )
//       })}
//       </View>
//     </View>
//     )

//   }

// const EventBody=(props)=>{

//   const num = props.ticketPrice/100
//   const formattedNumber = num.toLocaleString("en-NG", { style: "currency", currency: "NGN" });

//   const [userInfo, setUserInfo] = useState(null)
//   const [userToken, setUserToken] = useState(null)
//   const navigation= useNavigation()

//   //run the async to get email and also get title being passed as a prop

//   const  getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('userInfo')
//       const userToken = await AsyncStorage.getItem(`userToken`)
//       if(value !== null) {
//         console.log(userToken)
//       setUserInfo(JSON.parse(value))
//       setUserToken(userToken)
//       }
//     } catch(e) {
//       console.log(`${e}`)
//     }
//     }
//      useEffect(()=>{
//     getData()
//     },[])

//     const pay = async()=>{
//           const token = userToken
//           const email = userInfo?.email
//           const title = props.title
//           console.log(title)

//  const config = {
// 			headers: { Authorization: `Bearer ${token}` }
// 		};

//         const body={
//           email:email,
//           title:title
//         }

//       axios.post("https://code-6z3x.onrender.com/api/pay/payForTicket",body,config)
//         .then((res)=>{
//   console.log(res)

//   if(res.status === 200){
//     navigation.dispatch(
//               StackActions.replace("CheckOutScreen"
//               , {
//              authorization_url: res.data.authorization_url
//               }
//               )
//               );

//   }
// }).catch((e)=>{
//   console.log(`The error is: ${e}`)
// })

//     }

// return(
//     <>
//     <View style={{height:335, width:width*0.83, borderRadius:30, backgroundColor:"#fff", top:35, alignSelf:"center"}}>

// <View style={{margin:13, left:10, marginVertical:20}}>
// <Text style={{color:"#1b5bff", fontFamily:"Poppins2", fontSize:10, fontWeight:"300", position:"absolute", textTransform:"uppercase"}}>{props.date}</Text>
// <Text style={{fontWeight:"600", fontSize:23, lineHeight:28, color:"#000", fontFamily:"Poppins2", position:"absolute", top:20}}>{props.title}</Text>

// <View style={{bottom:-46, left:5}}>
//     <View>
//    <Icon
//    name="time-outline"
//    size={16}
//    style={{
//            color: "#000",
//            top:2,
//            left:-3
//            }}
//        />
//    <Text style={{color:"#000", fontFamily:"Poppins2", fontSize:14,
//    position:"absolute",
//    left:15
//    }}>{props.time} {"|"}</Text>
//    </View>

//    <View style={{flexDirection:"row", justifyContent:"space-around", bottom:15, left:-25}}>
//    <Icon
//    name="location-outline"
//    size={16}
//    style={{
//            color: "#000",
//            left:-20
//            }}
//        />
//    <Text style={{color:"#000", fontFamily:"Poppins2", fontSize:14, textTransform:"uppercase", position:"absolute",
//    top:-3
//    }}>{props.venue}</Text>
//    </View>

//    </View>

// <Text style={{fontFamily:"Poppins2", fontWeight:"400",position:"absolute", left:2, bottom:-265, fontSize:18, lineHeight:22}}>
//   {/* {props.ticketPrice} */}
// {formattedNumber}
//   </Text>

// <View style={{width:width*0.75, position:"absolute"}}>
// <Text style={{fontSize:10, fontFamily:"Poppins", fontWeight:"300", color:"#999999", position:"absolute", top:80, lineHeight:12.5}}>{props.description}</Text>
// </View>

// </View>

// <View style={{width:118, height:37, borderRadius:10, backgroundColor:"#004fc7",alignSelf:"center", position:"absolute", bottom:10, right:20}}>
//     <Pressable
//     activeOpacity={0.7}
//     // onPress={()=>pay()}
//     onPress={()=>pay()}
//  >
//     <Text style={{color:"#fff", fontSize:14, fontWeight:"600", lineHeight:21, fontFamily:"Poppins2", alignSelf:"center", position:"absolute", padding:8}}>Buy Now</Text>
//     </Pressable>
// </View>

//     </View>

//     </>
// )

// }




import * as React from "react";
import {
	StatusBar,
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	Platform,
	SafeAreaView
} from "react-native";
import { useState, useEffect} from "react";
import {Location, Time } from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { StackActions, useNavigation } from "@react-navigation/native";
import client from "../api/client";
import { ScrollView } from "react-native-gesture-handler";


const { width, height } = Dimensions.get("screen");

// const imageW = width*0.83
const imageW= 348
// const imageH = height/2.85
const imageH = 338



const EventDetails = ({ route }) => {


	return (
		<>
			<EventAbout route={route} />
		</>
	);
};


const EventAbout = (props) => {
	const { title, date, venue, time, image, ticketPrice, content } =
		props.route.params;

	const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation();

	//run the async to get email and also get title being passed as a prop


	const newDate = date;
const changedDate = moment(newDate, 'DD/MM/YYYY'); // parse the date string using the specified format

const formattedDate = changedDate.format('dddd, DD MMMM'); // format the date as "Friday, 17 February"

	const Pay = async () => {
		try{

			const value = await AsyncStorage.getItem("userInfo");
			const userToken = await AsyncStorage.getItem(`userToken`);
			if (value !== null && userToken !== null) {
				const userInfo = JSON.parse((value));
				setUserInfo(userInfo);
				setUserToken(userToken);
          
				const token = userToken;
				const email = userInfo.email;

console.log(email)
const Title = title 
console.log(Title)

				const config = {
				  headers: { Authorization: `Bearer ${token}` },
				};
			  
				const formData = new FormData();
				formData.append("email", email);
				formData.append("title", Title);
			  
				setIsLoading(true);
			  
			await	client
				  .post(`/pay/payForTicket`, formData, config)
				  .then((res) => {
					console.log(res);
			  
					if (res.status === 200) {
					  navigation.dispatch(
						StackActions.replace("CheckOutScreen", {
						  authorization_url: res.data.authorization_url,
						})
					  )
					}
				  })
				  .catch((e) => {
					console.log(`The error is: ${e}`);
				  })
				  .finally(() => {
					setIsLoading(false);
				  });
		
			}	

		}catch (e){
			console.log(`${e}`);
		}finally{
			setIsLoading(false)
		}
			  };
			  
	const num = ticketPrice;
const formatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});

const formattedNumber = formatter.format(num).replace(/\.00$/, '');

	const scrollX = React.useRef(new Animated.Value(0)).current;

	const Indicator = ({ scrollx }) => {
		return (

			<View style={{ flexDirection: "row", alignSelf: "center", bottom:imageH*1, position:"relative"}}>
				{image.length >1 && image.map((_, i) => {
					const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

					const scale = scrollx.interpolate({
						inputRange,
						outputRange: [0.6, 0.9, 0.6],
						extrapolate: "clamp",
					});
					return (
						<Animated.View
							key={`indicator-${i}`}
							style={{
								height: 10,
								width: 10,
								borderRadius: 5,
								backgroundColor: "#fff",
								margin: 5,
								transform: [
									{
										scale,
									},
								],
							}}
						/>
					);
				})}
			</View>
		);
	};



	return (
		<View style={{flex:1}}>
  <SafeAreaView style={{flex:1}}>
			<StatusBar hidden />
			<View style={StyleSheet.absoluteFillObject}>
				{image.map((image, index) => {
					const inputRange = [
						(index - 1) * width,
						index * width,
						(index + 1) * width,
					];
					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0, 1, 0],
					});
					return (
						<Animated.Image
							source={{ uri: image }}
							key={`image-${index}`}
							style={[StyleSheet.absoluteFillObject, { opacity }]}
							blurRadius={50}
						/>
					);
				})}
			</View>
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={image}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				keyExtractor={(_, index) => index}
				horizontal
				pagingEnabled
				renderItem={({ item }) => {
					return (
						<View
							style={{
								paddingTop: 20,
								width,
								alignItems: "center",
								shadowColor: "#000",
								shadowOpacity: 0.5,
								shadowOffset: { width: 0, height: 0 },
								shadowRadius: 20,
							}}
						>
							<Image
								source={{ uri: item }}
								style={{
									width: imageW,
									height: imageH,
									resizeMode: Platform.OS === "android"? "contain": null,
									borderRadius: 10,
								}}
							/>
						</View>
					);
				}}
			/>

			<View  
			 >
			<Indicator scrollx={scrollX} />
			<View
	style={{
		height: height*0.49,
		width: width,
		borderRadius: 30,
		backgroundColor: "#fff",
		top:-imageH*0.87,
		alignSelf: "center",
		position:"absolute"
	}}
>
	<View style={{ marginLeft: 40, top:15}}>
		<Text
			style={{
				color: "#1b5bff",
				fontFamily: "Poppins2",
				fontSize: 10,
				fontWeight: "300",
				textTransform: "uppercase",
				top:15
			}}
		>
		{formattedDate}
	</Text>
	<Text
			style={{
				fontWeight: "500",
				fontSize: 23,
				color: "#000",
				fontFamily: "Poppins2",
				textTransform: "uppercase",
				top:13
			}}
		>
			{title}
		</Text>
		<Text
			style={{
				fontWeight: "600",
				color: "#000",
				fontFamily: "Poppins2",
				fontSize: 14,
				textTransform: "uppercase",
				top:13
			}}
		>
	   <Time size={15}/>
			 {""}{time} {"|"}
			{Location}
			{venue}
		</Text>
{/* if the text should prob be in a scroll view */}

<ScrollView
showsVerticalScrollIndicator
vertical 
bounces={false}
>
		<Text
			style={{
				marginTop: 30,
				width: width * 0.8,
				fontSize: 11,
				fontFamily: "Poppins",
				fontWeight: "300",
				color: "#999999",
				lineHeight: 12.5,
				height:110,
				alignItems:"center",
				right:-6,
			}}
		>
			{content}
		</Text>
</ScrollView>

		<View
			style={{
				position: "absolute",
				top: imageH/1.5,
				flexDirection: "row",
			}}
		>
			<Text
				style={{
					fontFamily: "Poppins2",
					fontWeight: "500",
					fontSize: 24,
					lineHeight: 20,
					paddingTop:width/35,
					width:92,
					height:33,
					backgroundColor:"transparent",
					top:width/85
				}}
			>
				{formattedNumber}
			</Text>

{isLoading ?
(
<View style={{left:width/3.5}}>
<ActivityIndicator size="large" color="#0000ff" />
</View>
)
: 
(
				<View
					style={{
						width: 100,
						height: 37,
						borderRadius: 10,
						backgroundColor: "#004fc7",
						alignSelf: "center",
						left:width/1.9,
						position:"absolute",
						top:width/100
					}}
					>
						<Pressable
						onPress={Pay}
						activeOpacity={0.8}
						>
					<Text
						style={{
							color: "#fff",
							fontSize: 14,
							fontWeight: "600",
							lineHeight: 21,
							fontFamily: "Poppins3",
							alignSelf: "center",
							position: "absolute",
							padding: 8,
						}}
					>
						Buy Now
					</Text>
					</Pressable>
				</View>
)
}
		</View>
	</View>
</View>



</View>
		</SafeAreaView>
		</View>

	);
};

export default EventDetails;

















// const styles = StyleSheet.create({
//     dot:{borderRadius:10, height:7, width:7, backgroundColor:"gray", marginBottom:3, marginHorizontal:3, justifyContent:"center" },
//     pagination:{
//         bottom:-6,
//         left:(width*0.90)/2,
//         position:"absolute",
//         flexDirection:"row",
//         justifyContent:"center",
//       },

// })












