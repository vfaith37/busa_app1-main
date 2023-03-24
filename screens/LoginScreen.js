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
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
						width: 250,
						height: 250,
						paddingTop:5,
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
					</TouchableWithoutFeedback>
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
