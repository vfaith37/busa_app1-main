import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Switch,
	TouchableOpacity,
	Dimensions,
	Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import { COLORS } from "../constants/theme";
import { Back } from "../constants/icons";
const { width } = Dimensions.get("screen");

export const Notification = () => {
	const [isEnabled, setIsEnabled] = useState(true);
	const [expoPushToken, setExpoPushToken] = useState(null);
	const [notification, setNotification] = useState(false);

	useEffect(() => {
		// Get the current permission status
		Notifications.getPermissionsAsync().then((statusObj) => {
			setIsEnabled(statusObj.granted);
		});

		// Listen for incoming notifications
		Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		// Get the Expo push token
		Notifications.getExpoPushTokenAsync().then((pushToken) => {
			console.log(pushToken);
			setExpoPushToken(pushToken);
			// Send the Expo push token to the backend
			sendPushTokenToBackend(pushToken);
		});

		// Remove the listener when the component is unmounted
		return () => {
			Notifications.removeNotificationSubscription(listener.current);
		};
	}, []);

	const toggleSwitch = () => {
		setIsEnabled((previousState) => !previousState);
		if (!isEnabled) {
			// Request permission to display notifications
			Notifications.requestPermissionsAsync().then((statusObj) => {
				console.log("Permission:", statusObj);
				console.log(expoPushToken);
			});
		} else {
			// Revoke permission to display notifications
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: false,
					shouldSetBadge: false,
				}),
			});
		}
	};



	const sendPushTokenToBackend = async (pushToken) => {
		try {
			const response = await fetch("https://finalissima.onrender.com/api/registerDevice", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pushToken: pushToken,
					OS: Platform.OS,
				}),
			});
			console.log("Push token sent:", response.status);
		} catch (error) {
			console.error(error);
		}
	};
	
	return (
		<View style={{ marginLeft: 30, marginRight: 30, top: 40 }}>
			<View
				style={{
					flexDirection: "row",
					paddingTop: 20,
					justifyContent: "space-between",
				}}
			>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => navigation.goBack()}
				>
					<Back size={25} style={{}} />
				</TouchableOpacity>
				<Text
					style={{
						fontSize: 24,
						fontWeight: "600",
						textAlign: "center",
						color: COLORS.black,
						marginRight: width / 6,
						paddingBottom: 20,
						fontFamily: "Poppins3",
						// alignContent:"y"
					}}
				>
					Notifications
				</Text>
			</View>
			<Text
				style={{
					fontSize: 17,
					fontWeight: "600",
					paddingBottom: 5,
					color: COLORS.black,
					fontFamily: "Poppins2",
				}}
			>
				Notification Settings
			</Text>
			<Text
				style={{
					width: 315,
					fontSize: 12,
					paddingBottom: 5,
					fontWeight: "300",
					color: COLORS.black,
					fontFamily: "Poppins",
				}}
			>
				We may still send you important notifications about your account outside
				of your notification settings
			</Text>
			<Text
				style={{
					fontSize: 10,
					paddingBottom: 8,
					color: COLORS.black,
					fontWeight: "500",
					fontFamily: "Poppins",
				}}
			>
				Interactions
			</Text>
			<View
				style={{
					width: width - 60,
					height: 48,
					backgroundColor: COLORS.white,
					borderRadius: 5,
					alignItems: "center",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={{
						fontSize: 12,
						fontWeight: "600",
						color: COLORS.black,
						marginLeft: 5,
						fontFamily: "Poppins",
					}}
				>
					Notifications
				</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	permission: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
});
