import { Formik } from "formik";
import React, { useState } from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	TouchableWithoutFeedback,
	SafeAreaView,
	Keyboard,
} from "react-native";
import { FormInput } from "./FormInput";
import { FormSubmitBtn } from "./FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation, StackActions } from "@react-navigation/native";
import client from "../api/client";
import { COLORS } from "../constants/theme";
import ErrorButton from "./ErrorButton";
import { Eye } from "../constants/icons";
const { width, height } = Dimensions.get("screen");
import { CheckBox } from "react-native-elements";

const validationSchema = Yup.object({
	firstname: Yup.string()
		.trim()
		.min(3, "Invalid Name")
		.required("First Name required!"),
	lastname: Yup.string()
		.trim()
		.min(3, "Invalid Name")
		.required("Last Name required!"),
	email: Yup.string()
		.trim()
		.matches(
			/^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
			"School Email required"
		)
		.required("Email required!"),
	password: Yup.string()
		.trim()
		.min(8, "Password not long enough!")
		.required("Password required!"),
	confirmpassword: Yup.string().equals(
		[Yup.ref("password"), null],
		"Password doesn't match"
	),
});

export const SignUpForm = ({ onError }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [checked, setChecked] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const navigation = useNavigation();
	const userInfo = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmpassword: "",
	};

	const signUp = async (values) => {
		try {
			setIsLoading(true);
			const res = await client.post("/signup", {
				...values,
			});

			console.log(res);
			if (res.data.success && res.status === 200) {
				navigation.dispatch(
					StackActions.replace("verify", {
						email: values.email,
						password: values.password,
					})
				);

				console.log(res.data);
			}
		} catch (e) {
			console.log(e);
			setError(true);
			setErrorMessage(
				e.message ? e.message : "Oops! something went wrong, pls try again"
			);
			onError && onError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					bounces={false}
					contentContainerStyle={{
						// flexGrow: 1,
						// paddingBottom: 30,
						height:height
					}}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{ justifyContent: "center" }}>
							<Text
								style={{
									color: "#363BE8",
									alignSelf: "center",
									fontSize: 35,
									fontWeight: "600",
									fontFamily: "Poppins3",
								}}
							>
								Welcome
							</Text>
							<View style={{ flexDirection: "row", alignSelf: "center" }}>
								<Text style={{ fontFamily: "Poppins" }}>Let's create your</Text>
								<Text
									style={{
										textDecorationLine: "underline",
										color: "#363be8",
										fontFamily: "Poppins",
										left: 3,
									}}
								>
									account
								</Text>
							</View>
							<View style={{ width: width * 0.8, alignSelf: "center" }}>
								<Formik
									initialValues={userInfo}
									validationSchema={validationSchema}
									onSubmit={signUp}
								>
									{({
										values,
										errors,
										touched,
										isSubmitting,
										handleBlur,
										handleChange,
										handleSubmit,
									}) => {
										const {
											firstname,
											lastname,
											email,
											password,
											confirmpassword,
										} = values;
										return (
											<>
												<FormInput
													onChangeText={handleChange("firstname")}
													onBlur={handleBlur("firstname")}
													error={touched.firstname && errors.firstname}
													value={firstname}
													label={"First Name"}
													style={styles.text}
													TextInputStyle={styles.textInput}
												/>
												<FormInput
													onChangeText={handleChange("lastname")}
													onBlur={handleBlur("lastname")}
													error={touched.lastname && errors.lastname}
													value={lastname}
													label={"Last Name"}
													style={styles.text}
													TextInputStyle={styles.textInput}
												/>
												<FormInput
													onChangeText={handleChange("email")}
													onBlur={handleBlur("email")}
													error={touched.email && errors.email}
													value={email}
													autoCapitalize="none"
													label={"Email"}
													style={styles.text}
													TextInputStyle={styles.textInput}
												/>
												<FormInput
													onChangeText={handleChange("password")}
													onBlur={handleBlur("password")}
													error={touched.password && errors.password}
													value={password}
													secureTextEntry={!passwordVisible}
													autoCapitalize="none"
													label={"Password"}
													style={styles.text}
													rightIcon={<Eye />}
													onPress={() => setPasswordVisible(!passwordVisible)}
													TextInputStyle={styles.textInput}
												/>
												<FormInput
													onChangeText={handleChange("confirmpassword")}
													onBlur={handleBlur("confirmpassword")}
													error={
														touched.confirmpassword && errors.confirmpassword
													}
													value={confirmpassword}
													secureTextEntry={!confirmPasswordVisible}
													autoCapitalize="none"
													label={"Verify Password"}
													style={styles.text}
													rightIcon={<Eye />}
													onPress={() =>
														setConfirmPasswordVisible(!confirmPasswordVisible)
													}
													TextInputStyle={styles.textInput}
												/>
												<CheckBox
													containerStyle={{
														width: width * 0.8,
														paddingTop: 10,
														borderWidth: 0,
														right: 10,
														top: 10,
														backgroundColor: "FFF",
													}}
													textStyle={{ fontSize: 9 }}
													center
													title="I have read and agreed to the Terms and Conditions for using the BUSA app "
													checked={checked}
													onPress={() => setChecked(!checked)}
												/>
												{isLoading ? (
													<View>
														<ActivityIndicator
															size="large"
															color={COLORS.primaryblue}
														/>
													</View>
												) : (
													<FormSubmitBtn
														disabled={!checked}
														Submitting={isSubmitting}
														onPress={handleSubmit}
														title={"Create Account"}
													/>
												)}
											</>
										);
									}}
								</Formik>
								<View style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}>
									<Text style={{ textAlign: "center", fontFamily: "Poppins" }}>
										Have an account?
									</Text>
									<Text
										style={{
											color: COLORS.primaryblue,
											fontWeight: "500",
											marginLeft: 5,
											fontFamily: "Poppins3",
										}}
										onPress={() => navigation.navigate("Log-in")}
									>
										Log in
									</Text>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	text: {
		fontSize: 13.5,
		fontFamily: "Poppins",
	},
	textInput: {
		borderBottomWidth: 3,
		borderBottomColor: COLORS.primary,
		backgroundColor: COLORS.lightGray3,
		borderRadius: 5,
		height: 45,
		marginBottom: 2,
		paddingLeft: 5,
		fontSize: 14,
		fontFamily: "Poppins",
	},
});
