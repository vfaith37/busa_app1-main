import React, { useContext, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalPopUp } from "../Components/Modal";
import { AccordionItem } from "../Components/AccordionItem";
import { COLORS } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import { FormInput } from "../Components/FormInput";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Back } from "../constants/icons";

const validationSchema = Yup.object({
	oldPassword: Yup.string()
		.trim()
		.min(8, "Password not long enough!")
		.required("Password required!"),
	password: Yup.string()
		.trim()
		.min(8, "Password not long enough!")
		.required("Password required!"),
	confirmPassword: Yup.string().equals(
		[Yup.ref("password"), null],
		"Password does not match"
	),
});

const { width } = Dimensions.get("screen");
export const Account = () => {
	const [visible, setVisible] = React.useState(false);
	const [actionTriggered, setActionTriggered] = useState("");
	// const [colour, setColour] = useState();
	const { logout } = useContext(AuthContext);

	const navigation = useNavigation();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isDisabled, setDisabled] = React.useState(true);
	const userInfo = {
		oldPassword: "",
		password: "",
		confirmpassword: "",
	};
	const resetPassword = async (values, formikActions) => {
		setIsLoading(true);
		console.log(values);
		setIsLoading(false);
		setVisible(false);
		// const res = await client.post("/resetpassword", {
		// 	...values,
		// });

		// if (res.data.success) {
		// 	navigation.dispatch(StackActions.replace("ProfileScreen"));
		// 	setVisible(false);
		// 	console.log(res.data);
		// }
	};

	return (
		<SafeAreaView style={{ paddingTop: 40 }}>
			<View style={{ alignSelf: "center", paddingBottom: 15 }}>
				<Text
					style={{ fontSize: 25, fontWeight: "600", fontFamily: "Poppins2" }}
				>
					Account
				</Text>
			</View>
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

			<View style={styles.container}>
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
			</View>
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
				<View style={{ alignItems: "center" }}></View>
				{actionTriggered === "Action_1" ? (
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
									color: "rgba(39, 46, 57, 1)",
									fontFamily: "Poppins3",
								}}
							>
								Change Password
							</Text>
						</View>
						<Formik
							initialValues={userInfo}
							validationSchema={validationSchema}
							onSubmit={resetPassword}
						>
							{({
								values,
								errors,
								touched,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit,
							}) => {
								const { oldPassword, password, confirmPassword } = values;
								return (
									<>
										<FormInput
											value={oldPassword}
											error={touched.oldPassword && errors.oldPassword}
											onChangeText={handleChange("oldPassword")}
											onBlur={handleBlur("oldPassword")}
											autoCapitalize="none"
											secureTextEntry
											// label="Current Password"
											placeholder="Current Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
										/>
										<FormInput
											value={password}
											error={touched.password && errors.password}
											onChangeText={handleChange("password")}
											onBlur={handleBlur("password")}
											autoCapitalize="none"
											secureTextEntry
											// label="Password"
											placeholder="Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
										/>
										<FormInput
											value={confirmPassword}
											error={touched.confirmpassword && errors.confirmpassword}
											onChangeText={handleChange("confirmPassword")}
											onBlur={handleBlur("confirmPassword")}
											autoCapitalize="none"
											secureTextEntry
											// label="Confirm Password"
											placeholder="Confirm Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
										/>
										{errors === null ? setDisabled(true) : setDisabled(false)}
										{console.log(12, errors)}
										{isLoading ? (
											<View
												style={{
													width: width - 130,
													height: 50,
													alignSelf: "center",
													borderRadius: 10,
													justifyContent: "center",
													marginTop: 10,
													backgroundColor: "#0000ff",
												}}
											>
												<ActivityIndicator size="large" color="#FFF" />
											</View>
										) : (
											<FormSubmitBtn
												disabled={isDisabled}
												Submitting={isSubmitting}
												onPress={handleSubmit}
												title={"Change Password"}
											/>
										)}
									</>
								);
							}}
						</Formik>
					</View>
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
				) : null}

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
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		color: "#2d2d2d",
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
		borderColor: "rgba(113,113,113,0.2)",
		borderWidth: 1,
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
