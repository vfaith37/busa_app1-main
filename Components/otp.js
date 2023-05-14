import React, { useState, useRef, useEffect } from "react";
import {
	View,
	TextInput,
	Dimensions,
	StyleSheet,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
} from "react-native";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const initCodes = [];

export default function OTP({
	containerStyle,
	otpStyles,
	codeCount = 5,
	onTyping,
	onFinish,
	...props
}) {
	const inputCodeRef = useRef(new Array());
	const [codes, setCodes] = useState(initCodes);
	const [isCodeComplete, setIsCodeComplete] = useState(false);

	useEffect(() => {
		const codes = [];
		for (let i = 0; i < codeCount; i++) {
			codes.push("");
		}
		setCodes(codes);
	}, []);

	useEffect(() => {
		onTyping && onTyping(getCodes());
		const isTypeFinish = codes.every(function (i) {
			return i !== "";
		});
		setIsCodeComplete(isTypeFinish);
	}, [codes]);

	const getCodes = () => {
		let codeString = "";
		codes.forEach((code) => {
			codeString += code;
		});
		return { token: codeString };
	};

	const onChangeCode = (code, index) => {
		const typedCode = code.slice(-1);
		const currentCodes = [...codes];
		currentCodes[index] = typedCode;
		setCodes(currentCodes);
	};

	const onKeyPress = (event, index) => {
		const key = event.nativeEvent.key;
		let destIndex = index;
		if (key === "Backspace") {
			destIndex = index > 0 ? index - 1 : 0;
		} else {
			destIndex = index < codeCount - 1 ? index + 1 : codeCount - 1;
		}
		inputCodeRef.current[destIndex].focus();
	};

	const handleSubmit = () => {
		if (isCodeComplete) {
			onFinish && onFinish(getCodes());
		}
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{/* <ScrollView
				contentContainerStyle={styles.scrollViewContent}
				keyboardShouldPersistTaps="handled"
			> */}
			<View style={styles.codeContainer}>
				{codes.map((code, index) => (
					<TextInput
						cursorColor={COLORS.lightblue}
						key={index}
						ref={(ref) => (inputCodeRef.current[index] = ref)}
						style={[styles.codeInput, otpStyles]}
						onChangeText={(text) => onChangeCode(text, index)}
						onKeyPress={(event) => onKeyPress(event, index)}
						value={code}
						maxLength={1}
						keyboardType="numeric"
						autoFocus={index === 0}
						selectTextOnFocus={true}
						blurOnSubmit={false}
					/>
				))}
			</View>
			{/* </ScrollView> */}
			{isCodeComplete && (
				<TouchableOpacity
					style={styles.submitButton}
					onPress={handleSubmit}
				>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	// scrollViewContent: {
	// 	// flexGrow: 1,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// },
	codeContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	codeInput: {
		width: width / 8,
		height: 50,
		marginHorizontal: 5,
		fontSize: 24,
		backgroundColor: COLORS.white,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.primary,
		textAlign: "center",
		fontFamily: "Poppins",
		color: COLORS.onboarding,
		marginBottom: 10,
	},
	submitButton: {
		width: width * 0.4,
		height: width * 0.15,
		marginTop: 15,
		borderRadius: 7.5,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.primary,
		borderRadius: 5,
	},
	submitButtonText: {
		width: 54,
		fontSize: 14,
		fontWeight: "600",
		color: "white",
		color: COLORS.white,
		fontSize: 18,
		fontFamily: "Poppins",
	},
});
