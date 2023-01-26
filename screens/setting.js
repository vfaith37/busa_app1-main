import React, { useContext, useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Image,
	TextInput,
	Button,
} from "react-native";
import {
	TicketIcon,
	Notification,
	Person,
	Chat,
	Direction,
	Warning,
} from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import { SettingsButton } from "../Components/settingsButton";
import { ModalPopUp } from "../Components/Modal";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
const { width } = Dimensions.get("screen");
const QR = width / 2;
export const Profile = () => {
	
	const [actionTriggered, setActionTriggered] = React.useState("");
	const [visible, setVisible] = React.useState(false);
	const navigation = useNavigation();

	// here, i'm getting the whole userinfo to get the values
	const {userInfo, logout} = useContext(AuthContext)

	return (

		<View style={styles.container}>
			<View
				style={{
					width: width - 20,
				}}
			>
				<View style={{ flexDirection: "row", marginLeft: 10 }}>
					<View style={styles.itemcontainer}>
						<Text style={{ fontWeight: "400", fontSize: 30, color: COLORS.white }}>
						{userInfo.firstname.charAt(0)}{userInfo.lastname.charAt(0)}
						</Text>
					</View>
					<View style={{ paddingBottom: 10, paddingLeft: 10 }}>
						<Text style={{ fontSize: 30, fontWeight: "700" }}>{userInfo.firstname} {userInfo.lastname}</Text>
						<Text style={styles.email}>{userInfo.email}</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("AccountScreen")}
					>
						<SettingsButton
							iconLeft={Direction}
							icon={Person}
							ButtonName={"Account"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("NotificationScreen")}
					>
						<SettingsButton
							iconLeft={Direction}
							icon={Notification}
							ButtonName={"Notification"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setVisible(true);
							setActionTriggered("Action_1");
						}}
					>
						<SettingsButton icon={TicketIcon} ButtonName={"Ticket"} />
					</TouchableOpacity>
					
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setVisible(true);
							setActionTriggered("Action_2");
						}}
					>
						<SettingsButton icon={Chat} ButtonName={"Feedback"} />
					</TouchableOpacity>
					<ModalPopUp visible={visible}>
						<View style={{ alignItems: "center" }}>
							<View style={styles.header}>
								<TouchableOpacity onPress={() => setVisible(false)}>
									<Image
										source={require("../assets/x.png")}
										style={{ height: 20, width: 20 }}
									/>
								</TouchableOpacity>
							</View>
						</View>
						{actionTriggered === "Action_1" ? (
							<>
								<View style={{ alignItems: "center" }}>
									<Text
										style={{
											fontSize: 20,
											fontWeight: "800",
											color: "rgba(47.66, 47.66, 47.66, 1)",
										}}
									>
										BUSA Game Show
									</Text>
									<Text
										style={{
											fontSize: 12,
											textAlign: "center",
											color: "rgba(112.62, 112.62, 112.62, 1)",
										}}
									>
										Scan this code to gain entry into BUSA game show
									</Text>
								</View>
								<Image
									source={require("../assets/qrcode.jpg")}
									style={{ height: QR, width: QR, alignSelf: "center" }}
								/>
								<Warning style={{alignSelf: 'center', margin: 5}} />
								<Text
									style={{
										width: 240,
										fontSize: 12,
										fontWeight: "500",
										alignSelf: "center",
										textAlign: "center",
										color: "rgba(112.62, 112.62, 112.62, 1)",
									}}
								>
									The qr code is one-time and would be unusable after its
									scanned
								</Text>
							</>
						) : null}
						{actionTriggered === "Action_2" ? (
							<>
								<View
									style={{
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: 26,
											fontWeight: "600",
											color: "rgba(39, 46, 57, 1)",
										}}
									>
										Feedback
									</Text>
									<Text
										style={{
											width: width / 3,
											fontSize: 12,
											fontWeight: "300",
											textAlign: "center",
											color: "rgba(112.62, 112.62, 112.62, 1)",
										}}
									>
										Let us know what we can do to improve your experience in
										this app
									</Text>
								</View>
								<TextInput
									placeholder="Enter your feedback"
									multiline={true}
									style={{
										borderColor: "gray",
										width: "100%",
										borderWidth: 1,
										borderRadius: 10,
										padding: 10,
										height: 150,
										marginBottom: 15,
									}}
								/>
								<TouchableOpacity activeOpacity={0.7}>
									<View
										style={{
											alignSelf: "center",
											height: 30,
											width: 80,
											backgroundColor: "rgba(0, 79.41, 198.53, 1)",
											borderRadius: 5,
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												fontSize: 14,
												fontWeight: "600",
												textAlign: "center",
												color: "white",
											}}
										>
											Post
										</Text>
									</View>
								</TouchableOpacity>
							</>
						) : null}
					</ModalPopUp>
				</View>
			</View>

				{/* <TouchableOpacity
				activeOpacity={0.5}
				onPress={logout}
				>
		<Text style={{top:50}}>Sign out</Text>
				</TouchableOpacity> */} 
				<Button title="sign out" onPress={logout()}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		flex: 1,
		paddingTop: 80,
	},
	itemcontainer: {
		backgroundColor: "#004FC7",
		height: 59,
		width: 59,
		borderRadius: 59,
		alignItems: "center",
		justifyContent: "center",
	},
	email: { fontWeight: "500", color: "#717171", fontSize: 12, opacity: 0.5 },
	modalBackGround: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: COLORS.white,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		elevation: 20,
	},
	header: {
		width: "100%",
		height: 20,
		alignItems: "flex-end",
		justifyContent: "center",
	},
});
