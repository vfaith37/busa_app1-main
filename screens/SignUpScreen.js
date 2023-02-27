import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {SignUpForm} from "../Components/SignupForm";
import AppForm from "../Components/AppForm";

const { width } = Dimensions.get("screen");
const ArrowBack = (
	<Icon
		// onPress={console.warn("no link")}
		name="arrow-left"
		size={30}
		color="#0D13E3"
		style={{ alignSelf: "flex-start", paddingTop: 10, marginLeft: 20 }}
	/>
);
const Bg = () => {
	return (
		<View
			style={{
				backgroundColor: "#FFF",
				height: width * 2,
				width: width * 2,
				bottom: 300,
				right: -10,
				position: "absolute",
				transform: [{ rotate: "230deg" }],
			}}
		/>
	);
};

export const SignUp = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "#0D13E3", paddingTop: 55 }}>
			<Bg />
			<SignUpForm />

			{/* <AppForm/> */}

			<StatusBar hidden />
		</View>
	);
};
const styles = StyleSheet.create({});
