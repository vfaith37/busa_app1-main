import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const SettingsButton = ({ icon, ButtonName, iconLeft }) => {
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ flexDirection: "row", padding: 20 }}>
					{icon}
					<Text style={{ marginLeft: 10 }}>{ButtonName}</Text>
				</View>
				{iconLeft}
			</View>
			<View
				style={{
					borderBottomColor: "black",
					borderBottomWidth: StyleSheet.hairlineWidth,
				}}
			/>
		</>
	);
};

const styles = StyleSheet.create({});
