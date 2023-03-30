import React from "react";
import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";

import AppForm from "../Components/AppForm";
import { COLORS } from "../constants/theme";

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
			<StatusBar backgroundColor={COLORS.transparent}/>
			<Bg />
			<AppForm/>
		</View>
	);
};

