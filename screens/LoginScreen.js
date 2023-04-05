// import { StyleSheet, Text, View, Dimensions, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
// import React from "react";
// import LottieView from "lottie-react-native";
// const { width, height } = Dimensions.get("window");
// import { SignInForm } from "../Components/SigninForm";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../constants/theme";


// const LoginScreen = () => {
// 	const navigation = useNavigation();
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<StatusBar hidden />
// 			<KeyboardAvoidingView
// 			enabled
// 			style={{ flex: 1 }}
// 			behavior={Platform.OS === "ios" ? "padding" : "height"}
// 			>
// 				<ScrollView
// 				showsVerticalScrollIndicator={false}
// 				bounces={false}
// 				// contentContainerStyle={{height:height}}
// 				>
// 					{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
// 						<View>
// 			<View
// 				style={{
// 					backgroundColor: COLORS.primaryblue,
// 					height: 0.5 * height,
// 					borderBottomRightRadius: 100,
// 					alignItems: "center",
// 				}}
// 			>
// 				<Text
// 					style={{
// 						color: COLORS.white,
// 						fontSize: 35,
// 						fontWeight: "600",
// 						paddingTop:70,
// 						fontFamily:"Poppins3"
// 					}}
// 				>
// 					Welcome
// 				</Text>
// 				<LottieView
// 					source={require("../assets/animations/information.json")}
// 					style={{
// 						position: "relative",
// 						width: height/2.5,
// 						height: height/2.5,
// 						paddingTop:3,
// 						alignSelf: "center",
// 					}}
// 					loop={true}
// 					autoPlay
// 				/>
// 			</View>


// 			<View 
// 			>
// 				<View
// 					style={{
// 						...StyleSheet.absoluteFillObject,
// 						backgroundColor: COLORS.primaryblue,
// 					}}
// 				/>
// 				<View
// 					style={{
// 						paddingTop: 12.5,
// 					    //  flex: 1,
// 						backgroundColor: COLORS.white,
// 						borderTopLeftRadius: 100,
// 						alignItems: "center",
// 						height:height/2
// 					}}
// 				>
// 					<SignInForm/>
// 					<View style={{
// 						paddingTop:250,
// 						 position:"absolute"
// 						}}>
// 					<Text
// 						style={{
// 							fontWeight: "400",
// 							fontSize: 15,
// 							color: COLORS.blendgray,
// 							textAlign: "center",
// 							alignSelf: "center",
// 							marginTop: 20,
// 							marginBottom: 10,
// 							fontFamily:"Poppins"
// 						}}
// 					>
// 						or
// 					</Text>
// 					<View style={{flexDirection: "row"}}>
// 						<Text style={{ textAlign: "center", fontFamily:"Poppins" }}>Don't have an account?</Text>
// 						<Text
// 							style={{ color: COLORS.primaryblue, fontWeight: "500", marginLeft: 5, fontFamily:"Poppins3"}}
// 							onPress={() => navigation.navigate("Sign-up")
// 						}
// 						>
// 							Sign up
// 						</Text>
// 					</View>
// 					</View>
// 				</View>

// 			         </View>

// 					 </View>
// 					{/* </TouchableWithoutFeedback> */}
// 				</ScrollView>
			
// 			</KeyboardAvoidingView>
// 		</SafeAreaView>
// 	);
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: COLORS.white,
// 		alignContent: "center",
// 	},
// });









import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputField} from '../Components/InputField';
import { StackActions, useNavigation } from '@react-navigation/native';
import { FormSubmitBtn } from '../Components/FormSubmitBtn';
import { COLORS } from '../constants/theme';
import * as Yup from "yup";
import { Formik } from "formik";
import LottieView from 'lottie-react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get("screen")

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

const LoginScreen = () => {

	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const userInfos = {
    email: "",
    password: "",
  };


  const signIn = async (values) => {
    console.log("button works");
    try {
      setIsLoading(true);
      const res = await client.post("/signin", {
        ...values,
      });

      console.log(res);
      if (res.status === 200) {
        // also store the users values as an object and pass it round
        console.log(res.data);
        let userInfo = res.data.user;
        console.log(userInfo);

        setUserInfo(userInfo);
        let token = res.data.refreshToken;
        setUserToken(token);

        try {
          //axios.defaults.headers.common.Authorization = `Bearer ${token}`
          // stringify the user object
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

          // get the user token
          await AsyncStorage.setItem("userToken", token);
        } catch (e) {
          console.log(`Async Storage error: ${e}`);
        }
        navigation.dispatch(StackActions.replace("Tab"));
        setIsLoading(false);
      } else if (res.status === 401) {
        setIsLoading(false);
        setError("Invalid username or password.");
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        setError(`${e.response.data.error}`);
      } else if (e.response && e.response.status === 400) {
        setError(`${e.response.data.error}`);
      } else if (e.message === "Network Error" && e.code === "ERR_NETWORK") {
        setError("Network error, lost connection!");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={{flex: 1, alignContent: 'center', backgroundColor:COLORS.white}}>
		<StatusBar backgroundColor={COLORS.white}/>
		<KeyboardAvoidingView
		enabled
					style={{ flex: 1}}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
		>

<ScrollView
bounces ={false}
showsVerticalScrollIndicator={false}
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{paddingHorizontal: 25, paddingTop:40}}>
         <View style={{alignItems: 'center'}}>
		 
<LottieView
					source={require("../assets/animations/login.json")}
					style={{
						position: "relative",
						width: 250,
						height: 250,
						paddingTop:3,
						alignSelf: "center",
					}}
					loop={true}
					autoPlay
				/>
         </View> 

        <Text
          style={{
            fontFamily: 'Poppins2',
            fontSize: 28,
            fontWeight: '500',
			paddingTop:30,
			color:COLORS.lightblue
          }}>
          Login
        </Text>


		<View style={{paddingTop:30}}>
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
	})=>{
const {email, password} = values
return(
<View>
{error && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "Poppins",
                        fontSize: 13,
						bottom:20
                      }}
                    >
                      {error}
                    </Text>
                  )}


{errors.email && touched.email && (
                    <Text
                      style={
						[
					styles.error,
					{
						top:-20
					}
							
						]
					}
                    >
                      {errors.email}
                    </Text>
                  )}			  

<InputField
  icon={
	<Ionicons
	name="mail"
	size={20}
	color={COLORS.lightblue}
	style={{marginRight: 5}}
  />
  }
  onChangeText={handleChange("email")}
  placeholder="email@student.babcock.edu.ng"
  onBlur={handleBlur("email")}
  value={email}
  autoCapitalize="none"
  label={"Email"}
  maxLength={50}
  selectionColor={COLORS.lightblue}
/>

{errors.password && touched.password && (
                    <Text
                      style={
						[
							styles.error,
							{
							  top: 45,
							  alignContent: "center",
							  right: width / 25,
							},
						  ]}
                    >
                      {errors.password}
                    </Text>
                  )}
<InputField
  icon={
	<Ionicons
	name="ios-lock-closed-outline"
	size={20}
	color={COLORS.lightblue}
	style={{marginRight: 5}}
  />
  }
  inputType="password"
  fieldButtonLabel={"Forgot?"}
  fieldButtonFunction={()=> navigation.navigate("password")}
  placeholder="*********"
  onChangeText={handleChange("password")}
  onBlur={handleBlur("password")}
  error={touched.password && errors.password}
  value={password}
  secureTextEntry
  autoCapitalize="none"
  maxLength={32}
  selectionColor={COLORS.lightblue}
  cursorColor={COLORS.lightblue}
/>

{isLoading ? (
                    <View>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.lightblue}
                      />
                    </View>
                  ) : (
                    <FormSubmitBtn 
                    onPress={handleSubmit} 
                    title={"Log in"} 
                    />
                  )}
</View>

)

	}}
</Formik>
		</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
			paddingTop:50
          }}>
          <Text style={{fontFamily:"Poppins"}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign-up')}>
            <Text style={{color:COLORS.lightblue,  paddingBottom:2, fontFamily:"Poppins3", fontSize:13}}> Register</Text>
          </TouchableOpacity>
        </View>

      </View>
	</TouchableWithoutFeedback>
</ScrollView>
		</KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;




const styles = StyleSheet.create({
	error: {
		fontFamily: "Poppins",
		fontSize: 12,
		color: "red",
		right: 15,
		position: "absolute",
		top: 5,
	  },
})








