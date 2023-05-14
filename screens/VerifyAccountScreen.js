import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import OTP from "../Components/otp";
import { SafeAreaView } from "react-native-safe-area-context";
const { height, width } = Dimensions.get("screen");
import client from "../api/client";
import axios from "axios";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/theme";

const VerifyAccountScreen = ({ route }) => {
	return <VerifyLogic route={route} />;
};

const VerifyLogic = (props) => {
	const { email, password } = props.route.params;

	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);

	const verify = async (value) => {
		console.log(value);
		if (value.token !== "" && value.token !== null) {
			setIsLoading(true);
			console.log(value.token);
			try {
				await client
					.post("/verifyToken", {
						...value,
					})
					.then((res) => {
						console.log(res);
						if (res.status === 200) {
							//   since the response was succesful, then email and password is valid
							//   get the refreshtoken and run the login function

							//  run the login function
							client
								.post("/signin", {
									email: email,
									password: password,
								})
								.then(async (res) => {
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
											// axios.defaults.headers.common.Authorization = `Bearer ${token}`
											// stringify the user object
											await AsyncStorage.setItem(
												"userInfo",
												JSON.stringify(userInfo)
											);

											// get the user token
											await AsyncStorage.setItem("userToken", token);
										} catch (e) {
											console.log(`Async Storage error: ${e}`);
										}

										navigation.dispatch(StackActions.replace("Sign-up2"));
									} else {
										console.error("Error with Login Functionality");
									}
								})
								.catch((e) => {
									console.log(`This is the login function error: ${e}`);
								});
						} else {
							console.error("Invalid token");
						}
					});
			} catch (e) {
				console.log(` This is the verify token error: ${e}`);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : null}
			>
				<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
					<TouchableWithoutFeedback>
						<View>
							<Text
								style={{
									color: COLORS.primary,
									textAlign: "center",
									fontWeight: "600",
									fontSize: 33,
									top: 96,
									fontFamily: "Poppins3",
								}}
							>
								Verify Account
							</Text>
							<LottieView
								source={require("../assets/animations/email-verification.json")}
								style={{
									width: 300,
									height: 300,
									resizeMode: "cover",
									alignSelf: "center",
									top: 30,
								}}
								loop={true}
								autoPlay
							/>

							<View style={{ height: height }}>
								
									<OTP
										codeCount={5}
										containerStyle={{borderRadius: 10}}
										otpStyles={{}}
										onFinish={(value) => verify(value)}
									/>
								<View style={{marginTop: 50}}>
									<Text
										style={{
											textAlign: "center",
											fontWeight: "600",
											fontSize: 13,
											color: COLORS.black,
											fontFamily: "Poppins3",
										}}
									>
										Didn't receive a code?
									</Text>
									<TouchableOpacity
										activeOpacity={0.6}
									>
										<Text
											style={{
												alignItems: "center",
												fontWeight: "600",
												fontSize: 14,
												textAlign: "center",
												color: COLORS.primary,
												textDecorationLine: "underline",
												fontFamily: "Poppins3",
											}}
										>
											Resend code
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
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
	container: {
		flex: 1.5,
		// 		backgroundColor:
		// "linear-gradient(168deg, rgba(60.30, 171.77, 234.47, 1), rgba(63.88, 132.68, 235.88, 1) 23%, rgba(68, 132, 228, 1) 38%, rgba(54, 59, 232, 1) 80%)",
		backgroundColor: COLORS.white,
	},
});
