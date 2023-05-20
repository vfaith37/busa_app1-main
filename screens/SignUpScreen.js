import React, {useState} from "react";
import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";
import { SignUpForm } from "../Components/SignupForm";
import { COLORS } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorButton from "../Components/ErrorButton";

const { width } = Dimensions.get("screen");

export const SignUp = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [error, setError] = useState(false);

	const handleError = (errorMessage) => {
		setError(true);
		setErrorMessage(errorMessage);
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor:COLORS.white, paddingTop: 55 }}>
			<StatusBar backgroundColor={COLORS.transparent}/>
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
		</SafeAreaView>
	);
};

