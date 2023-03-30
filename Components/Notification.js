import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Switch,
	TouchableOpacity,
	Dimensions,
	Platform,
} from "react-native";
// import * as Notifications from "expo-notifications";
import { COLORS } from "../constants/theme";
import { Back } from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
// import client from "../api/client";
// import * as Device from "expo-device";


const { width } = Dimensions.get("screen");

export const Notification = () => {
	const navigation = useNavigation()
	const [isEnabled, setIsEnabled] = useState(true);
	// const [expoPushToken, setExpoPushToken] = useState(null);
	// const [notification, setNotification] = useState(false);


	// async function registerForPushNotificationsAsync() {
	// 	let token;
	// 	if (Device.isDevice) {
	// 	  const { status: existingStatus } = await Notifications.getPermissionsAsync();
	// 	  let finalStatus = existingStatus;
	// 	  if (existingStatus !== 'granted') {
	// 		const { status } = await Notifications.requestPermissionsAsync();
	// 		finalStatus = status;
	// 	  }
	// 	  if (finalStatus !== 'granted') {
	// 		alert('Failed to get push token for push notification!');
	// 		return;
	// 	  }
	// 	  token = (await Notifications.getExpoPushTokenAsync()).data;
	// 	  console.log("token", token);
	// 	} else {
	// 	  alert('Must use physical device for Push Notifications');
	// 	}
	  
	// 	if (Platform.OS === 'android') {
	// 	  Notifications.setNotificationChannelAsync('default', {
	// 		name: 'default',
	// 		importance: Notifications.AndroidImportance.MAX,
	// 		vibrationPattern: [0, 250, 250, 250],
	// 		lightColor: '#FF231F7C',
	// 	  });
	// 	}
	  
	// 	return token;
	//   }

    //           const listener = useRef()
	// 		  const responseListener = useRef()
	// useEffect(() => {
	// 	// Get the current permission status
	// 	Notifications.getPermissionsAsync().then((statusObj) => {
	// 		setIsEnabled(statusObj.granted);
	// 	});

	// 	// Listen for incoming notifications
	// 	listener.current = Notifications.addNotificationReceivedListener((notification) => {
	// 		setNotification(notification);
	// 	  });

	// 	  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
	// 		console.log(response);
	// 	  });

	// 	// Get the Expo push token

	// 	// registerForPushNotificationsAsync().then((pushToken) => {
	// 	// 	console.log(pushToken);
	// 	// 	setExpoPushToken(pushToken.data);
	// 	// 	// Send the Expo push token to the backend
	// 	// 	sendPushTokenToBackend(pushToken.data);
	// 	// });

	// 	Notifications.getExpoPushTokenAsync().then((pushToken) => {
	// 		if (Platform.OS === 'android') {
	// 			Notifications.setNotificationChannelAsync('default', {
	// 			  name: 'default',
	// 			  importance: Notifications.AndroidImportance.MAX,
	// 			  vibrationPattern: [0, 250, 250, 250],
	// 			  lightColor: '#FF231F7C',
	// 			});
	// 		  }
	// 		console.log(pushToken);
	// 		setExpoPushToken(pushToken.data);
	// 		// Send the Expo push token to the backend
	// 		sendPushTokenToBackend(pushToken.data);
	// 	});

	// 	// Remove the listener when the component is unmounted
	// 	return () => {
	// 		Notifications.removeNotificationSubscription(listener.current);
	// 		Notifications.removeNotificationSubscription(responseListener.current);
	// 	};
	// }, []);

	const toggleSwitch = () => {
		setIsEnabled((previousState) => !previousState);
	// 	if (!isEnabled) {
	// 		// Request permission to display notifications
	// 		Notifications.requestPermissionsAsync().then((statusObj) => {
	// 			console.log("Permission:", statusObj);
	// 			console.log(expoPushToken);
	// 		});
	// 	} else {
	// 		// Revoke permission to display notifications
	// 		Notifications.setNotificationHandler({
	// 			handleNotification: async () => ({
	// 				shouldShowAlert: true,
	// 				shouldPlaySound: false,
	// 				shouldSetBadge: false,
	// 			}),
	// 		});
	// 	}
	};

// 	const sendPushTokenToBackend= async(pushToken)=>{
// 		const body = {
// 			deviceID:pushToken,
// 			platform:Platform.OS
// 		}

//       console.log(pushToken)
// 	console.log(body)

// try{
// const res = await client.post(`/registerDevice`,body
// )
// console.log(res)
// if(res.status === 200){
// 	console.log("Push token sent:", res.data.data)
// }
// }catch (e){
// console.log(e)
// }
// 	}


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










































// Notifications.setNotificationHandler({
// 	handleNotification: async () => ({
// 	  shouldShowAlert: true,
// 	  shouldPlaySound: false,
// 	  shouldSetBadge: false,
// 	}),
//   });
  
//   // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
//   async function sendPushNotification(expoPushToken) {
// 	const message = {
// 	  to: expoPushToken,
// 	  sound: 'default',
// 	  title: 'Original Title',
// 	  body: 'And here is the body!',
// 	  data: { someData: 'goes here' },
// 	};
  
// 	await fetch('https://exp.host/--/api/v2/push/send', {
// 	  method: 'POST',
// 	  headers: {
// 		Accept: 'application/json',
// 		'Accept-encoding': 'gzip, deflate',
// 		'Content-Type': 'application/json',
// 	  },
// 	  body: JSON.stringify(message),
// 	});
//   }
  
//   async function registerForPushNotificationsAsync() {
// 	let token;
// 	if (Device.isDevice) {
// 	  const { status: existingStatus } = await Notifications.getPermissionsAsync();
// 	  let finalStatus = existingStatus;
// 	  if (existingStatus !== 'granted') {
// 		const { status } = await Notifications.requestPermissionsAsync();
// 		finalStatus = status;
// 	  }
// 	  if (finalStatus !== 'granted') {
// 		alert('Failed to get push token for push notification!');
// 		return;
// 	  }
// 	  token = (await Notifications.getExpoPushTokenAsync()).data;
// 	  console.log(token);
// 	} else {
// 	  alert('Must use physical device for Push Notifications');
// 	}
  
// 	if (Platform.OS === 'android') {
// 	  Notifications.setNotificationChannelAsync('default', {
// 		name: 'default',
// 		importance: Notifications.AndroidImportance.MAX,
// 		vibrationPattern: [0, 250, 250, 250],
// 		lightColor: '#FF231F7C',
// 	  });
// 	}
  
// 	return token;
//   }
  
//   export default function Notification (){
// 	const [expoPushToken, setExpoPushToken] = useState('');
// 	const [notification, setNotification] = useState(false);
// 	const notificationListener = useRef();
// 	const responseListener = useRef();
  
// 	useEffect(() => {
// 	  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
// 	  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
// 		setNotification(notification);
// 	  });
  
// 	  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
// 		console.log(response);
// 	  });
  
// 	  return () => {
// 		Notifications.removeNotificationSubscription(notificationListener.current);
// 		Notifications.removeNotificationSubscription(responseListener.current);
// 	  };
// 	}, []);
  
// 	return (
// 	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
// 		<Text>Your expo push token: {expoPushToken}</Text>
// 		<View style={{ alignItems: 'center', justifyContent: 'center' }}>
// 		  <Text>Title: {notification && notification.request.content.title} </Text>
// 		  <Text>Body: {notification && notification.request.content.body}</Text>
// 		  <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
// 		</View>
// 		<Button
// 		  title="Press to Send Notification"
// 		  onPress={async () => {
// 			await sendPushNotification(expoPushToken);
// 		  }}
// 		/>
// 	  </View>
// 	);
//   }

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
