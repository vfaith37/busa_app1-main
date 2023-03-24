
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
import { COLORS } from "../constants/theme";


const { width, height } = Dimensions.get("screen");

const imageW= width*0.95
const imageH = height/2.36



const EventDetails = ({ route }) => {


	return (
		<View style={{flex:1}}>
			<EventAbout route={route} />
		</View>
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

			<View style={{ flexDirection: "row", alignSelf: "center", bottom:imageH*0.96, position:"absolute"}}>
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
								backgroundColor: COLORS.white,
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
  <SafeAreaView 
  style={{flex:1}}
  >
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
								shadowColor: COLORS.black,
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
		backgroundColor: COLORS.white,
		top:-imageH*0.87,
		alignSelf: "center",
		position:"absolute"
	}}
>
	<View style={{ marginLeft: 40, top:10}}>
		<Text
			style={{
				color: COLORS.lightblue,
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
				color: COLORS.black,
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
				color: "COLORS.black",
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
				color: COLORS.darkgray,
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
<ActivityIndicator size="large" color={COLORS.primary} />
</View>
)
: 
(
				<View
					style={{
						width: 100,
						height: 37,
						borderRadius: 10,
						backgroundColor: COLORS.primary,
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
							color: COLORS.white,
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












