import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { SignUpForm } from "./SignupForm";
import ErrorButton from "./ErrorButton";
import { COLORS } from "../constants/theme";

const { width, height } = Dimensions.get("window");

const AppForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [error, setError] = useState(false);

	const handleError = (errorMessage) => {
		setError(true);
		setErrorMessage(errorMessage);
	};

	return (
		
		<>
			<SignUpForm onError={handleError} />
			{error && (
				<ErrorButton
					onPress={() => {
						setError(false);
					}}
					message={"An error occured, pls try again 😁"}
					style={{ paddingBottom: height / 40 }}
					color={COLORS.red}
					borderRadius={10}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});
export default AppForm;
