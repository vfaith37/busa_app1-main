import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {SignUpForm} from "../Components/SignupForm";
import AppForm from "../Components/AppForm";
import { COLORS } from "../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { width } = Dimensions.get("screen");
const Bg = () => {
	return (
		<View
			style={{
				backgroundColor:COLORS.white,
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
		<View style={{ flex: 1, backgroundColor:COLORS.primary, paddingTop: 55 }}>
			<StatusBar backgroundColor={COLORS.white}/>
			<Bg />
			<AppForm/>
		</View>
	);
};
const styles = StyleSheet.create({});
