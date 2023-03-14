import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { SignUpForm } from "./SignupForm";

const { width, height } = Dimensions.get("window");

const AppForm = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignContent: "center",
			}}
		>
        <SignUpForm/>
		</View>
	);
};

const styles = StyleSheet.create({});
export default AppForm;