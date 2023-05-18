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
import messaging from "@react-native-firebase/messaging";
import { COLORS } from "../constants/theme";
import { Back } from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";

const { width } = Dimensions.get("screen");

export const Notification = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  const navigation = useNavigation();

  const requestPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  const saveTokenToDatabase = async (token) => {
    // Assume user is already signed in

    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const value = await AsyncStorage.getItem("userInfo");
      if (userToken !== null && value !== null) {
        const userInfo = JSON.parse(value);
        setUserToken(userToken);
        setUserInfo(userInfo);

        const refreshToken = userToken;
        const config = {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "content-type": "multipart/form-data",
          },
        };
        const platform = Platform.OS;

        const formData = new FormData();
        formData.append("deviceId", token);
        formData.append("platform", platform);

        console.log(token);

        await client
          .post(`/api/notification/registerDevice`, formData, config)
          .then((res) => {
            console.log(res.data);
          });
        console.log("Token sent to the server successfully.");
      }
    } catch (error) {
      console.log("Failed to send token to the server:", error);
    }
  };

  useEffect(() => {
    if (requestPermissions()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          return saveTokenToDatabase(token);
        });

      // listen when token changes
      return messaging().onTokenRefresh((token) => {
        saveTokenToDatabase(token);
      });
    } else {
      console.log("Failed Token status");
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.Notification
          );
        }
      });

    messaging().onNotificationOpenedApp()(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.Notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;

    //   messaging()
    //   .getToken()
    //   .then(token => {
    // 	  return saveTokenToDatabase(token);
    // 	});
  }, []);

  // useEffect(() => {
  // 	const handleNotification = (notification) => {
  // 		// Handle incoming notification
  // 		console.log("Notification received:", notification);
  // 	};

  // 	const registerForPushNotifications = async () => {
  // 		const { status: existingStatus } =
  // 			await Notifications.getPermissionsAsync();
  // 		let finalStatus = existingStatus;

  // 		if (existingStatus !== "granted") {
  // 			const { status } = await Notifications.requestPermissionsAsync();
  // 			finalStatus = status;
  // 		}

  // 		if (finalStatus !== "granted") {
  // 			console.log("Permission to receive notifications was denied.");
  // 			return;
  // 		}

  // 		const { data: token } = await Notifications.getExpoPushTokenAsync();

  // 		console.log("Expo Push Token:", token);
  // 		console.log(platform);
  // 		// const data = [
  // 		// 	{
  // 		// 		deviceId: token,
  // 		// 		platform: platform,
  // 		// 	},
  // 		// ];
  // 		// console.log(data);

  // 		const formData = new FormData()
  // 		formData.append("deviceId", token)
  // 		formData.append("platform", platform)

  // 		try {
  // 			const userToken = await AsyncStorage.getItem("userToken");
  // 			const value = await AsyncStorage.getItem("userInfo");
  // 			if (userToken !== null && value !== null) {
  // 				const userInfo = JSON.parse(value);
  // 				setUserToken(userToken);
  // 				setUserInfo(userInfo);

  // 				const token = userToken;
  // 				const config = {
  // 					headers: {
  // 						Authorization: `Bearer ${token}`,
  // 						"content-type": "multipart/form-data",
  // 					},
  // 				};
  // 				console.log(config);

  // 				await client
  // 					.post(
  // 						`/api/notification/registerDevice`, formData, config)
  // 					.then((res) => {
  // 						console.log(res.data);
  // 					});
  // 				console.log("Token sent to the server successfully.");
  // 			}
  // 		} catch (error) {
  // 			console.log("Failed to send token to the server:", error);
  // 		}

  // 		if (notificationEnabled) {
  // 			Notifications.addNotificationReceivedListener(handleNotification);
  // 		} else {
  // 			Notifications.removeNotificationSubscription(handleNotification);
  // 		}
  // 	};

  // 	registerForPushNotifications();

  // 	return () => {
  // 		// Notifications.removeNotificationSubscription(
  // 		// 	notificationListener.current
  // 		// );
  // 		// Notifications.removeNotificationSubscription(responseListener.current);
  // 	};
  // }, [notificationEnabled]);

  // const toggleNotification = () => {
  //   setNotificationEnabled((prevValue) => !prevValue);
  // };

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
          thumbColor={notificationEnabled ? COLORS.primary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          // value={notificationEnabled}
          // onValueChange={toggleNotification}
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


