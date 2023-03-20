
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { StackActions, useNavigation, CommonActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { FormInput } from "./FormInput";
import * as Yup from "yup";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import "intl";
import "intl/locale-data/jsonp/en-GB";
import {  Calendars, Time, Back } from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import client from "../api/client";

const { width, height } = Dimensions.get("window");


export const Form = ({ component }) => {
	const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const navigation = useNavigation();
	const [image, setImage] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loading, setLoading] = useState(false)
	
	
	const validationSchema = Yup.object({
		title: Yup.string().required("Title is required!"),
		content: Yup.string().required("Content is required!"),
		image: Yup.array()
			.min(1, "Please select at least one image!")
			.max(5, "You can only select a maximum of 5 images!"),
		campus: Yup.string().required("Campus is required!"),
	});

	const validationSchemaEvent = Yup.object({
		title: Yup.string().required("Title is required!"),
		content: Yup.string().required("Content is required!"),
		image: Yup.array()
			.min(1, "Please select at least one image!")
			.max(5, "You can only select a maximum of 5 images"),
		campus: Yup.string().required("Campus is required!"),

		date: Yup.string().required("select start date!"),
		time: Yup.string().required("select start time!"),
		endTime: Yup.string().required("select end time!"),
		endDate: Yup.string().required("select end date!"), // here, endDate is a string
		ticketPrice: Yup.string().required("price required!"),
		venue: Yup.string().required("venue required!"),
		
	});

	const getData = async (values) => {
		try {
			const value = await AsyncStorage.getItem("userInfo");
			const token = await AsyncStorage.getItem("userToken");

			if (value !== null && token !== null) {
				setUserInfo(JSON.parse(value));
				setUserToken(token);
			

			const formData = new FormData();

			formData.append("title", values.title);
			values.image.forEach((image) => {
				formData.append("image", {
					uri: image.uri,
					type: "image/jpeg",
					name: `${Date.now()}.jpeg`,
				});
			});
			formData.append("campus", values.campus);
			formData.append("content", values.content);


			formData.append("ticketPrice", values.ticketPrice)
			formData.append("venue", values.venue)
			formData.append("date", values.date);
				formData.append("time", values.time);
				formData.append("endDate", values.endDate);
				formData.append("endTime", values.endTime);


			const newToken = token;
			 
			const config = {
				headers: {
					Authorization: `Bearer ${newToken}`,
				},
			}

			console.log(values)

               if(component === "Event"){
           setLoading(true)
				await client
				.post(
					`/event/uploadEvent`,
					formData ,config
					
				)
				.then((res) => {
					console.log(res);


					if (res.status === 200) {
						navigation.dispatch(
							CommonActions.navigate({
							  name: 'Event',
							  params: {
								screen: 'EventScreen',
							  },
							}),
						  );

						  navigation.goBack();

						// res is succesful, dispatch the user to event screen to see what he posted
					}
						  setLoading(false)
                  
				})
				.catch((e) => {
					console.log(`${e}`);
				});
				setLoading(false)
			   }
			   
			  else if(component === "Post"){
				setLoading(true)
				await client
				.post(
					`/news/addNews`,
					formData ,config
					
				)
				.then((res) => {
					console.log(res);

                     
					if (res.status === 200) {
						navigation.dispatch(StackActions.replace("Tab"))
						console.log("successful");
					}
					setLoading(false)
					// if res is succesful, dispatch the user to home screen to see what he posted
				})
				.catch((e) => {
					console.log(`${e}`);
				});
				setLoading(false)
			   }

			
			}
		} catch (e) {
			console.log(`${e}`);
		}

	};

	const Campus = [
		{
			label: "Main",
			value: "Main",
		},
		{ label: "Iperu", value: "Iperu" },

		// the news guy is only meant to be able to post for his campus. this is to avoid unncessary mistakes

		// 	{label:`${userInfo?.campus}`, value:`${userInfo?.campus}`
		// }
	];


	const pickImage = async (setFieldValue) => {
		try {
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("Permission to access camera roll is required!");
				return;
			}
			setIsLoading(true);

			const pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsMultipleSelection: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				selectionLimit: 5, //for IOS 14+
			});

			if (!pickerResult.canceled) {
				const uris = pickerResult.assets.map((asset, index) => ({
					uri: asset.uri,
					id: index,
				}));
				setFieldValue("image", uris);
				// setFieldValue("image", (prevImages) => [...prevImages, ...uris]);
				setImage((previmage) => [...previmage, ...uris]);
			}
			setIsLoading(false);
			console.log(pickerResult.assets);
		} catch (e) {
			console.log(`${e}`);
		}
	};


	const [mode, setMode] = useState("date");
	const [newMode, setNewMode] = useState("date")

	const [date, setDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date())
	const [show, setShow] = useState(false);
	const[view, setView] = useState(false)


	return (
		// add status bar with the color



		<View style={{ alignSelf: "center", width: width - 40, paddingTop: 55 }}>
			<View style={{ flexDirection: "row"}}>
				<TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
					<Back color={"#707070"} size={30} />
				</TouchableOpacity>
				<Text
					style={{
						fontFamily: "Poppins3",
						alignItems: "center",
						fontSize: 28,
						position: "absolute",
						left: 100,
					}}
				>
					New {component}
				</Text>
			</View>
			<Formik
				initialValues={{
					content: "",
					title: "",
					image: [],
					campus: "",
					date: "",
					time: "",
					venue:"",
					endDate:"",
					endTime:"",
					ticketPrice:"",
					
				}}
				onSubmit={getData}
				validationSchema ={component === "Post" ? validationSchema :validationSchemaEvent}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					setFieldValue,
				}) => {
					const { title, image, content, campus, ticketPrice, venue } = values;
					return (


                             <ScrollView
							 showsVerticalScrollIndicator={false}
							 bounces={false}
							 contentContainerStyle={{height:height*1.5}}
							 >
						<View style={{top:-10}}>
							<FormInput
								onChangeText={handleChange("title")}
								onBlur={handleBlur("title")}
								error={touched.title && errors.title}
								value={title}
								placeholder="Title"
								TextInputStyle={styles.input}
							/>

							<View style={{ top: 10 }}>
								<Text
									style={{
										fontFamily: "Poppins3",
										fontWeight: "500",
										fontSize: 22,
									}}
								>
									Image
								</Text>
								<Text
									style={{
										fontWeight: "300",
										fontSize: 11,
										fontFamily: "Poppins",
										width: 0.9 * width,
									}}
								>
									You can only add a maximum of five images per post
								</Text>
							</View>
							<View
								style={{
									width: width - 40,
									height: height / 3.8,
									borderColor: "#d9d9d9",
									borderStyle: "dashed",
									borderWidth: 2.5,
									marginTop: 19,
									borderRadius: 3.5,
									borderRadius: 20,
								}}
							>
								<View style={{ padding: 10, flexDirection: "row" }}>
									<Text
										style={{
											fontSize: 16,
											padding: 5,
											fontFamily: "Poppins",
											color: "#000",
										}}
									>
										Upload Here
									</Text>
									{isLoading ? (
										<View>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									) : (
										<Pressable onPress={() => pickImage(setFieldValue)}>
											<View
												style={{
													height: 30,
													width: 30,
													backgroundColor: "#004fc7",
													borderRadius: 25,
													alignSelf: "center",
													marginLeft: width - 200,
												}}
											>
												<Text
													style={{
														fontSize: 30,
														fontWeight: "300",
														color: "black",
														justifyContent: "center",
														alignItems: "center",
														fontFamily: "Poppins",
														position: "absolute",
														left: 4,
														top: -6,
														color: "#fff",
													}}
												>
													+
												</Text>
											</View>
										</Pressable>
									)}
								</View>

                                        
								{errors.image && touched.image && (
									<Text
										// style={{
										// 	color: "red",
										// 	fontFamily: "Poppins",
										// 	fontSize: 10,
										// 	top: -13,
										// 	alignSelf: "center",
										// }}
										style={[styles.error, {top:70, alignContent:"center", fontSize:10, right:width/4.5}]}
									>
										{errors.image}
									</Text>
								)}
								
								<FlatList
									data={image.slice(0, 5)}
									// data={image}
									horizontal
									renderItem={({ item }) => (
										<View style={{ width: 120, height: 130 }}>
											<Image
												source={{ uri: item.uri }}
												style={{
													width: 103,
													height: 110,
													left: 7,
													marginHorizontal: 4,
													borderRadius: 6,
													resizeMode: Platform.OS === "android"? "contain" : null,
												}}
											/>
										</View>
									)}
									keyExtractor={(item) => item.uri}
								/>
							</View>

									{component === "Event" ? (
                              
										<View style={{top:10, padding:3}}>

                                              <View style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:3}}>
											<Text style={{fontFamily:"Poppins", color:"#000"}}>Start Date</Text>
											<Text style={{fontFamily:"Poppins", color:"#000"}}>Start Time</Text>
											</View>

										{show && (
											<DateTimePicker
												value={date}
												mode={mode}
												is24Hour={false}
												display="default"
												onChange={(event, selectedDate) => {
													setShow(false);
													console.log("onChange called"); // add this line
													const currentDate = selectedDate || date;
													setDate(currentDate);
													setFieldValue(
														"date",
														new Intl.DateTimeFormat("en-GB").format(date)
														);
														const formattedTime = date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", hour12: true}).replace(" ", "");
														setFieldValue("time", formattedTime);
												}}
											/>
										)}
										


										<View

                                       style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:10}}
										 >
											<View
												style={[
													styles.dateContainer,
													{
														justifyContent: "space-around",
														flexDirection: "row",
														right:5,
														width:width/2.8,
														height:50,
														backgroundColor:"#d9d9d9",
													},
												]}
											>
												{errors.date && touched.date && (
									<Text
									style={[styles.error, {top:-33, right:10}]}
									>
										{errors.date}
									</Text>
								)}
												<Text
													style={[styles.textContainer, { marginTop: 10 }]}
												>
													{new Intl.DateTimeFormat("en-GB").format(date)}
												</Text>
												<TouchableOpacity
												activeOpacity={0.9}
													onPress={() => {
														setMode("date"), setShow(true);
													}}
												>
													{Calendars}
												</TouchableOpacity>
											</View>
							

										<View
												style={[
													styles.dateContainer,
													{
														justifyContent: "space-around",
														flexDirection: "row",
														right:-3,
														width:width/2.8,
														height:50,
														backgroundColor:"#d9d9d9"
													},
												]}
											>

{errors.time && touched.time && (
									<Text
									style={[styles.error, {top:-33, right:10}]}
									>
										{errors.time}
									</Text>
								)}
												<Text
													style={[styles.textContainer, { marginTop: 10 }]}
												>
													{date.toLocaleTimeString()}
												</Text>
												<TouchableOpacity
													onPress={() => {
														setMode("time"), setShow(true);
													}}
												>
													 <Time size={25}/>
												</TouchableOpacity>
											</View>



										</View>

                                             

                                                     

												{/* for end Date and End Time */}


												<View style={{top:10}}>

                                           <View style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:10}}>
										  <Text style={{fontFamily:"Poppins"}}>End Date</Text>
										  <Text style={{fontFamily:"Poppins"}}>End Time</Text>
										  </View>

										{view &&(
											<DateTimePicker
												value={endDate}
												mode={newMode}
												is24Hour={false}
												display="default"
												onChange={(event, selectedDate) => {
													setView(false);
													const currentDate = selectedDate || endDate;
													setEndDate(currentDate);
											
													setFieldValue(
														"endDate",
														new Intl.DateTimeFormat("en-GB").format(endDate)
													);
													const formattedTime = date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", hour12: true}).replace(" ", "");

													setFieldValue("endTime", formattedTime);
												}}
											/>
										)} 
                                      


										<View

                                       style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:10,}}
										 >
											<View
												style={[
													styles.dateContainer,
													{
														justifyContent: "space-around",
														flexDirection: "row",
														right:5,
														width:width/2.8,
														height:50,
														backgroundColor:"#d9d9d9",
													},
												]}
											>
												{errors.endDate && touched.endDate && (
									<Text
									style={[styles.error, {top:-33, right:20}]}
										
									>
										{errors.endDate}
									</Text>
								)}
												<Text
													style={[styles.textContainer, { marginTop: 10 }]}
												>
													{new Intl.DateTimeFormat("en-GB").format(endDate)}
												</Text>
												<TouchableOpacity
												activeOpacity={0.6}
													onPress={() => {
														setNewMode("date"), setView(true);
													}}
												>
													{Calendars}
												</TouchableOpacity>
											</View>

											<View
												style={[
													styles.dateContainer,
													{
														justifyContent: "space-around",
														flexDirection: "row",
														right:-3,
														width:width/2.8,
														height:50,
														backgroundColor:"#d9d9d9"
													},
												]}
											>
												{errors.endTime && touched.endTime && (
									<Text
										style={[styles.error, {top:-33, right:20}]}
									>
										{errors.endTime}
									</Text>
								)}
												<Text
													style={[styles.textContainer, { marginTop: 10 }]}
												>
													{endDate.toLocaleTimeString()}
												</Text>
												<TouchableOpacity
													onPress={() => {
														setNewMode("time"), setView(true);
													}}
												>
													 <Time size={25}/>
												</TouchableOpacity>
											</View>

										</View>


									</View>

						<View style={{flexDirection:"row", justifyContent:"space-between", paddingRight:5, top:18}}>
						{errors.ticketPrice && touched.ticketPrice && (
									<Text
										style={{
											color: "red",
											fontFamily: "Poppins",
											fontSize: 10,
											top: -8,
											alignSelf: "center",
											position:"absolute",
										left:50
										
										}}
									>
										{errors.ticketPrice}
									</Text>
								)}
									<FormInput
								onChangeText={handleChange("ticketPrice")}
								onBlur={handleBlur("ticketPrice")}
								// error={touched.ticketPrice && errors.ticketPrice}
								value={ticketPrice}
								placeholder="Price"
								TextInputStyle={[styles.venueInput,{right:11}]}
							/>
                                 
								 {errors.venue && touched.venue && (
									<Text
										style={{
											color: "red",
											fontFamily: "Poppins",
											fontSize: 10,
											top: -8,
											alignSelf: "center",
											position:"absolute",
										right:8
										
										}}
									>
										{errors.venue}
									</Text>
								)}
								<FormInput
								onChangeText={handleChange("venue")}
								onBlur={handleBlur("venue")}
								// error={touched.venue && errors.venue}
								value={venue}
								placeholder="Venue"
								TextInputStyle={styles.venueInput}
							/>
								</View>


									</View>
							
							
							) : null}
						
				

				<View style={{top:30}}>

							<Text
								style={{
									fontSize: 22,
									paddingTop: 10,
									fontFamily: "Poppins3",
								}}
							>
								Content
							</Text>
							{errors.content && touched.content && (
								<Text
									style={{
										color: "red",
										fontFamily: "Poppins",
										fontSize: 10,
										top: -13,
										alignSelf: "center",
									}}
								>
									{errors.content}
								</Text>
							)}
							<TextInput
								multiline
								style={styles.TextInput2}
								placeholder="Type Something here..."
								onChangeText={handleChange("content")}
								onBlur={handleBlur("content")}
								// error={touched.content && errors.content}
								value={content}
							/>

							<View>
								{errors.campus && touched.campus && (
									<Text style={styles.error}>{errors.campus}</Text>
								)}
								<Dropdown
									style={styles.dropdown}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									inputSearchStyle={styles.inputSearchStyle}
									iconStyle={styles.iconStyle}
									itemTextStyle={styles.textItem}
									data={Campus}
									maxHeight={300}
									labelField="label"
									valueField="value"
									placeholder="Campus"
									value={campus}
									onChangeText={handleChange("campus")}
									onChange={(value) => setFieldValue("campus", value.value)}
									//   renderLeftIcon={() => (
									//     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
									//   )}
								/>
							</View>


						
  {loading? (
	<View>
 <ActivityIndicator size="large" color="#0000ff" />

		</View>

  )
:
	<TouchableOpacity activeOpacity={0.7}
	onPress={handleSubmit}
	>
<View
	style={{
		backgroundColor: "#004fc7",
		width: 113,
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		borderRadius: 8,
		marginTop: 13,
		height: 37,
	}}
>
	<Text
		style={{
			fontSize: 18,
			fontWeight: "500",
			color: "white",
			fontFamily: "Poppins3",
		}}
	>
		Post
	</Text>
</View>
</TouchableOpacity>
}



						

                           </View>


						</View>
						</ScrollView>
					);
				}}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 43,
		backgroundColor: "#d9d9d9",
		borderRadius: 5,
		marginTop: 10,
		paddingLeft: 10,
		fontSize: 16,
		textAlign: "left",
		fontFamily: "Poppins",
		width: width - 40,
	},
	venueInput:{
		height: 43,
		backgroundColor: "#d9d9d9",
		borderRadius: 5,
		marginTop: 10,
		paddingLeft: 10,
		fontSize: 16,
		textAlign: "left",
		fontFamily: "Poppins",
		width: width/2.8
	},
	checkbox: {
		alignSelf: "center",
		width: 20,
		height: 20,
	},
	label: {
		fontSize: 16,
	},
	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 20,
		paddingTop: 15,
		justifyContent: "space-between",
	},
	TextInput2: {
		borderWidth: 2,
		borderColor: "#d9d9d9",
		width: width - 45,
		height: height / 4.3,
		// paddingBottom: 100,
		marginTop: 5,
		borderRadius: 20,
		fontFamily: "Poppins",
		fontSize: 13,
		paddingLeft: 11,
	},
	dropdown: {
		margin: 15,
		width: width - 40,
		height: 50,
		top: 6,
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
		right: 10,
	},
	icon: {
		marginRight: 5,
		color: "blue",
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textItem: {
		flex: 1,
		fontSize: 16,
		fontFamily: "Poppins",
		color: "gray",
	},
	placeholderStyle: {
		fontSize: 16,
		fontFamily: "Poppins3",
		color: "#000",
	},
	selectedTextStyle: {
		fontSize: 16,
		color: "blue",
		fontFamily: "Poppins",
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: "blue",
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		fontFamily: "Poppins",
	},
	error: {
		fontFamily: "Poppins",
		fontSize: 10,
		color: "red",
		right: 35,
		position: "absolute",
		top: 5,
	},
});

