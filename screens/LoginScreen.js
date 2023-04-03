import { StyleSheet, Text, View, Dimensions, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");
import { SignInForm } from "../Components/SigninForm";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";


const LoginScreen = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<KeyboardAvoidingView
			enabled
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
				showsVerticalScrollIndicator={false}
				bounces={false}
				// contentContainerStyle={{height:height}}
				>
					{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
						<View>
			<View
				style={{
					backgroundColor: COLORS.primaryblue,
					height: 0.5 * height,
					borderBottomRightRadius: 100,
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 35,
						fontWeight: "600",
						paddingTop:70,
						fontFamily:"Poppins3"
					}}
				>
					Welcome
				</Text>
				<LottieView
					source={require("../assets/animations/information.json")}
					style={{
						position: "relative",
						width: height/2.5,
						height: height/2.5,
						paddingTop:3,
						alignSelf: "center",
					}}
					loop={true}
					autoPlay
				/>
			</View>


			<View 
			>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: COLORS.primaryblue,
					}}
				/>
				<View
					style={{
						paddingTop: 12.5,
					    //  flex: 1,
						backgroundColor: COLORS.white,
						borderTopLeftRadius: 100,
						alignItems: "center",
						height:height/2
					}}
				>
					<SignInForm/>
					<View style={{
						paddingTop:250,
						 position:"absolute"
						}}>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 15,
							color: COLORS.blendgray,
							textAlign: "center",
							alignSelf: "center",
							marginTop: 20,
							marginBottom: 10,
							fontFamily:"Poppins"
						}}
					>
						or
					</Text>
					<View style={{flexDirection: "row"}}>
						<Text style={{ textAlign: "center", fontFamily:"Poppins" }}>Don't have an account?</Text>
						<Text
							style={{ color: COLORS.primaryblue, fontWeight: "500", marginLeft: 5, fontFamily:"Poppins3"}}
							onPress={() => navigation.navigate("Sign-up")
						}
						>
							Sign up
						</Text>
					</View>
					</View>
				</View>

			         </View>

					 </View>
					{/* </TouchableWithoutFeedback> */}
				</ScrollView>
			
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignContent: "center",
	},
});
















// import React, {useContext, useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView
// } from 'react-native';

// import { FormSubmitBtn } from '../Components/FormSubmitBtn';
// import LoginInput from '../Components/LoginInput';

// import { AuthContext } from '../context/AuthContext';
// import { COLORS } from '../constants/theme';

// const LoginScreen = ({navigation}) => {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

// //   const {login, googleLogin, fbLogin} = useContext(AuthContext);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>

// 	{/* here can be an animation or better still the busa logo */}
//       <Image
//         source={require('../assets/ice.jpg')}
//         style={styles.logo}
//       />
//       <Text style={styles.text}>Welcome Back</Text>

//       <LoginInput
//         labelValue={email}
//         onChangeText={(userEmail) => setEmail(userEmail)}
//         placeholderText="Email"
//         // iconType="user"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         autoCorrect={false}
//       />

//       <LoginInput
//         labelValue={password}
//         onChangeText={(userPassword) => setPassword(userPassword)}
//         placeholderText="Password"
//         // iconType="lock"
//         secureTextEntry={true}
//       />

//       <FormSubmitBtn
//         title="Sign In"
// 		//onPress={handleSubmit}
//       />

//       <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
//         <Text style={styles.navButtonText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.forgotButton}
//         onPress={() => navigation.navigate('Sign-up')}>
//         <Text style={styles.navButtonText}>
//           Don't have an acount? Create here
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 50,
// 	backgroundColor:COLORS.password,
// 	flex:1
//   },
//   logo: {
//     height: 150,
//     width: 150,
//     resizeMode: 'cover',
//   },
//   text: {
//     fontFamily: 'Poppins',
//     fontSize: 20,
//     marginBottom: 10,
//     color: '#051d5f',
//   },
//   navButton: {
//     marginTop: 15,
//   },
//   forgotButton: {
//     marginVertical: 35,
// 	fontSize:5
//   },
//   navButtonText: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#2e64e5',
//     fontFamily: 'Poppins',
//   },
// });