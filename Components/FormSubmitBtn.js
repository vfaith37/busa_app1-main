import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
const { width } = Dimensions.get("window");
export const FormSubmitBtn = ({ title, onPress, submitting }) => {
	const backgroundColor = submitting ? "#FFF" : COLORS.lightblue;
	return (
		<Pressable
			activeOpacity={0.7}
			onPress={submitting ? null : onPress}
			style={[styles.container, { backgroundColor }]}
		>
			<Text
				style={{
					alignSelf: "center",
					color: "#FFF",
					fontWeight: "500",
					fontSize: 16,
					fontFamily:"Poppins3"
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width - 130,
		height: 50,
		alignSelf: "center",
		borderRadius: 10,
		justifyContent: "center",
		marginTop: 10,
	},
});
