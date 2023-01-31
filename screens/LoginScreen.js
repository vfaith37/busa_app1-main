import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");
import { SignInForm } from "../Components/SigninForm";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View
				style={{
					backgroundColor: "#363be8",
					height: 0.54 * height,
					borderBottomRightRadius: 100,
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: "#fff",
						fontSize: 40,
						fontWeight: "600",
						top: 70,
					}}
				>
					Welcome
				</Text>
				<LottieView
					source={require("../assets/animations/information.json")}
					style={{
						position: "absolute",
						width: 300,
						height: 300,
						resizeMode: "cover",
						top: 50,
						alignSelf: "center",
					}}
					loop={true}
					autoPlay
				/>
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: "#363be8",
					}}
				/>
				<View
					style={{
						paddingTop: 20,
						flex: 1,
						backgroundColor: "white",
						borderTopLeftRadius: 100,
						alignItems: "center",
					}}
				>
					<SignInForm/>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 15,
							color: "#717171",
							textAlign: "center",
							alignSelf: "center",
							marginTop: 20,
							marginBottom: 10,
						}}
					>
						or
					</Text>
					<View style={{flexDirection: "row"}}>
						<Text style={{ textAlign: "center" }}>Don't have an account?</Text>
						<Text
							style={{ color: "#363be8", fontWeight: "500", marginLeft: 5 }}
							onPress={() => navigation.navigate("Sign-up")
						}
						>
							Sign up
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignContent: "center",
	},
});
