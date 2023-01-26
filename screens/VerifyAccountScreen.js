import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import OTP from "../Components/otp";
import { SafeAreaView } from "react-native-safe-area-context";
const { height, width } = Dimensions.get("screen");
import client from "../api/client";
import axios from "axios";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";


const VerifyAccountScreen = () => {
	const navigation= useNavigation()
	const [isLoading, setIsLoading] = React.useState(false);
	const verify = async (values) => {
  	await axios.post('https://no-vex-abeg.onrender.com/api/verifyToken', {
			...values,
			})
			.then((res) => {
			console.log(res)
				if (res.data.message === "User verified successfully") {
                 navigation.dispatch(StackActions.replace("Log-in"));
				}else{
					console.error("Invalid input")
					}
			// 	console.log(newres.data);
			})
			.catch((error) => {
				console.log(error);
			});


		//login the user, if successful

	};
	

	return (
		<SafeAreaView>
			<View
				style={{
					backgroundColor:
						"linear-gradient(168deg, rgba(60.30, 171.77, 234.47, 1), rgba(63.88, 132.68, 235.88, 1) 23%, rgba(68, 132, 228, 1) 38%, rgba(54, 59, 232, 1) 80%)",
					height: height,
				}}
			>
				<View
					style={{
						alignSelf: "center",
						marginTop: height * 0.5,
						width: 315,
						height: 172,
						backgroundColor: "white",
						boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.17)",
						borderRadius: 10,
						alignItems: "center",
					}}
				>
					{isLoading ? (
						<View>
							<ActivityIndicator size="large" color="#0000ff" />
						</View>
					) : (
						<OTP
							codeCount={5}
							containerStyle={{ marginTop: 50 }}
							otpStyles={{ backgroundColor: "#eee" }}
							onFinish={(value) => verify(value)}
						/>
					)}

					{/* <View
						style={{
							width: 100,
							height: 38,
							backgroundColor: "blue",
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<TouchableOpacity
						activeOpacity={0.5}
						// onPress={(token)=>verify(token)}
						>
						<Text style={{ color: "#fff" }}>verify</Text>
						</TouchableOpacity>
					</View> */}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default VerifyAccountScreen;

const styles = StyleSheet.create({
	text: {
		fontSize: 15,
	},
	textInput: {
		backgroundColor: "#C9D9F2",
		borderRadius: 5,
		height: 35,
		marginBottom: 10,
		paddingLeft: 5,
		fontSize: 15,
	},
});
