import React, { useContext, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Keyboard,
	TouchableWithoutFeedback,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalPopUp } from "../Components/Modal";
import { AccordionItem } from "../Components/AccordionItem";
import { COLORS } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import { Back } from "../constants/icons";
import ChangePassword from "../Components/ChangePassword";
import { useNavigation } from "@react-navigation/native";
import ChangePasswordFormInput from "../Components/ChangePassword";


const { width } = Dimensions.get("screen");
export const Account = () => {
	const [visible, setVisible] = useState(false);
	const [actionTriggered, setActionTriggered] = useState("");
	const { logout } = useContext(AuthContext);
	const navigation = useNavigation()
	
	return (
		<SafeAreaView style={{ paddingTop: 40 }}>
			<View style={{ alignSelf: "center", paddingBottom: 20 }}>
				<Text
					style={{ fontSize: 25, fontWeight: "600", fontFamily: "Poppins2" }}
				>
					Account
				</Text>
			</View>
      <View>
			<AccordionItem />
			<View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						setVisible(true);
						setActionTriggered("Action_1");
					}}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Change Password</Text>
					</View>
				</TouchableOpacity>
			</View>

			{/* <View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						setVisible(true);
						setActionTriggered("Action_2");
					}}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Deactivate Account</Text>
					</View>
				</TouchableOpacity>
			</View> */}

			<View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						setVisible(true);
						setActionTriggered("Action_3");
					}}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Sign Out</Text>
					</View>
				</TouchableOpacity>
			</View>


			<ModalPopUp visible={visible}>

				{actionTriggered === "Action_1" ? (
 <KeyboardAvoidingView
enabled
behavior={Platform.OS === "ios" ? "padding" : "height"}
>
		<ScrollView
		showsVerticalScrollIndicator={false}
		bounces={false}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View
						style={{
							alignItems: "center",
						}}
					>
						<View
							style={{ flexDirection: "row", justifyContent: "space-around" }}
						>
							<TouchableOpacity onPress={()=>setVisible(false)}>
								<Back size={30} />
							</TouchableOpacity>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "600",
									color:COLORS.extra,
									fontFamily: "Poppins3",
								}}
							>
								Change Password
							</Text>
						</View>
						<ChangePasswordFormInput/>
					</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	</KeyboardAvoidingView> 
				) : null}




				{/* {actionTriggered === "Action_2" ? (
					<>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "600",
									color: "rgba(39, 46, 57, 1)",
									fontFamily: "Poppins3",
								}}
							>
								Deactivate Account
							</Text>
							<Text
								style={{
									width: width / 1.6,
									fontSize: 13,
									fontWeight: "300",
									textAlign: "center",
									color: "rgba(112.62, 112.62, 112.62, 1)",
									fontFamily: "Poppins",
								}}
							>
								Are you sure you want to deactivate your account? This will
								erase all data you have on this app.
							</Text>


						
						<View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginTop: 10,
									}}
								>

									<TouchableOpacity
									onPress={() => setVisible(false)}
									activeOpacity={0.5}
									>
									<View
										style={{
											width: 126,
											height: 42,
											backgroundColor: COLORS.lightGray3,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 5,
										}}
									>
										<Text
											style={{ color: COLORS.darkgray, fontFamily: "Poppins" }}
										>
											Cancel
										</Text>
									</View>
                                    </TouchableOpacity>


									<TouchableOpacity>
									<View
										style={{
											width: 126,
											height: 42,
											backgroundColor: COLORS.primary,
											justifyContent: "center",
											alignItems: "center",
											marginLeft: 25,
											borderRadius: 5,
										}}
									>
										<Text
											style={{ color: COLORS.white, fontFamily: "Poppins" }}
										>
											Confirm
										</Text>
									</View>
									</TouchableOpacity>
								</View>
								</View>
						</View>
					</>
				) : null} */}




				{actionTriggered === "Action_3" ? (
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
									fontFamily: "Poppins2",
								}}
							>
								Sign Out
							</Text>
							<Text
								style={{
									width: width / 1.6,
									fontSize: 13,
									fontWeight: "300",
									textAlign: "center",
									color: "rgba(112.62, 112.62, 112.62, 1)",
									fontFamily: "Poppins",
								}}
							>
								Are you sure you want to sign out of this account?
							</Text>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginTop: 10,
								}}
							>
								<TouchableOpacity onPress={() => setVisible(false)}>
									<View
										style={{
											width: 126,
											height: 42,
											backgroundColor: COLORS.lightGray3,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 5,
										}}
									>
										<Text
											style={{ color: COLORS.darkgray, fontFamily: "Poppins" }}
										>
											Cancel
										</Text>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => logout()}>
									<View
										style={{
											width: 126,
											height: 42,
											backgroundColor: COLORS.primary,
											justifyContent: "center",
											alignItems: "center",
											marginLeft: 25,
											borderRadius: 5,
										}}
									>
										<Text
											style={{ color: COLORS.white, fontFamily: "Poppins" }}
										>
											Confirm
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</>
				) : null}
			</ModalPopUp>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		color:COLORS.text,
		// fontWeight: "bold",
		fontFamily: "Poppins2",
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		alignSelf: "center",
		width: width - 30,
		padding: 10,
		borderRadius: 12,
		backgroundColor: "white",
		marginBottom: "2%",
		overflow: "hidden",
		borderColor: COLORS.accordion,
		borderWidth: 1,
	marginVertical:30
	},
	text: {
		fontSize: 13.5,
		fontFamily: "Poppins",
	},
	textInput: {
		borderRadius: 5,
		height: 50,
		width: width - 150,
		paddingLeft: 5,
		fontSize: 14,
		fontFamily: "Poppins",
		alignSelf: "center",
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
});
