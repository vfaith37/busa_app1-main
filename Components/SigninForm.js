import { Formik } from "formik";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Keyboard, SafeAreaView} from "react-native";
import { FormInput } from "./FormInput";
import { FormSubmitBtn } from "./FormSubmitBtn";
import * as Yup from "yup";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";

const {width, height} =Dimensions.get("screen")

const validationSchema = Yup.object({
	email: Yup.string()
		.trim()
		.matches(
			/^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
			"School Email required"
			)
		.required("Email is required!"),
	password: Yup.string()
	.trim()
	.min(8, "Password not long enough!")
	.required("Password required!"),
});




export const SignInForm = () => {
	
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken]= useState(null)
	const [userInfo, setUserInfo] = useState(null)
	const [error, setError] = useState(null);


	const userInfos = {
		email: "",
		password: "",
	};

	const navigation = useNavigation()

	const signIn = async (values) => {
		setIsLoading(true)
			 await client.post("/signin", {
					...values,
		}).then(async(res)=>{
			console.log(res)
			if (res.status === 200) {
				// also store the users values as an object and pass it round
				console.log(res.data);
				let userInfo = res.data.user
				console.log(userInfo)
	
				setUserInfo(userInfo)
				let token = res.data.refreshToken
				setUserToken(token)
	
				try{
					//axios.defaults.headers.common.Authorization = `Bearer ${token}`
					// stringify the user object
					await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo))
					 
					// get the user token
					await AsyncStorage.setItem("userToken",token)
				}catch(e){
					console.log(`Async Storage error: ${e}`)
				}
				navigation.dispatch(StackActions.replace("Tab"));
				setIsLoading(false)

			}
			else if (res.status === 401){
				setIsLoading(false)
				setError("Invalid username or password.");
			}
		}).catch((e)=>{
			console.log(e)
			if (e.response && e.response.status === 401) {
				setError (`${e.response.data.error}`)
			}else if (e.response && e.response.status === 400) {
			setError (`${e.response.data.error}`)
			}
			else if(e.message === "Network Error" && e.code === "ERR_NETWORK"){
				setError("Network error, lost connection!")
			}
			else{
		    setError("An error occurred. Please try again later.");
			}
		}
		)
		.finally(() => {
			setIsLoading(false);
		  });
	}


	return (
		<SafeAreaView 
		>
			<Formik
				initialValues={userInfos}
				validationSchema={validationSchema}
				 onSubmit={signIn}
			>
				{({
					values,
					errors,
					touched,
					isSubmitting,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => {
					const { email, password } = values;
					return (

							<View 
							>
						<View
						>
				{error && <Text style={{ color: "red", fontFamily:"Poppins", fontSize:12 }}>{error}</Text>}
							<FormInput
								onChangeText={handleChange("email")}
								placeholder="email@student.babcock.edu.ng"
								onBlur={handleBlur("email")}
								error={touched.email && errors.email}
								value={email}
								autoCapitalize="none"
								label={"Email"}
								style={styles.text}
								TextInputStyle={styles.textInput}
								maxLength={50}
								selectionColor='#363BE8'
							/>
							<FormInput
								placeholder="*********"
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								error={touched.password && errors.password}
								value={password}
								secureTextEntry
								autoCapitalize="none"
								label={"Password"}
								style={styles.text}
								TextInputStyle={styles.textInput}
								maxLength={32}
								selectionColor='#363BE8'
								cursorColor='#363be8'
							/>
							{isLoading ? (
								<View>
									<ActivityIndicator size="large" color="#363be8" />
								</View>
							) : (
								// <View style={{paddingTop:20}}>
								<FormSubmitBtn
									Submitting={isSubmitting}
									onPress={handleSubmit}
									title={"Log in"}
								/>
								// </View>
							)}
						</View>
						</View>
					);
				}}
			</Formik>
		</SafeAreaView>
		
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	
	text: {
		fontWeight: "400",
		fontSize: 13,
		color: "#363be8",
		fontFamily:"Poppins",



	},
	textInput: {
		 paddingTop: height*0.02,
		borderColor: "000",
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
		height:height*0.04,
		 marginBottom: height*0.01,
		paddingLeft: 5,
		fontSize: 13,
		fontFamily:"Poppins",
		width:width*0.67

	},
});
