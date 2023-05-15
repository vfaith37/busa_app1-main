import { Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
export const FormInput = (props) => {
	const { label, error, style, TextInputStyle, rightIcon, onPress } = props;
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					paddingTop: 20,
				}}
			>
				<Text style={style}>{label}</Text>
				{error ? (
					<Text style={{ fontSize: 11, color: "red", fontFamily: "Poppins" }}>
						{error}
					</Text>
				) : null}
			</View>
			<View>
				<TextInput
					{...props}
					style={TextInputStyle}
					selectionColor={COLORS.primary}
					cursorColor={COLORS.primary}
				/>
				{rightIcon && (
					<TouchableOpacity
						onPress={onPress}
						style={
							{
								position: "absolute",
								right: 10,
								top: 8,
							}
						}
					>
						{rightIcon}
					</TouchableOpacity>
				)}
			</View>
		</>
	);
};
