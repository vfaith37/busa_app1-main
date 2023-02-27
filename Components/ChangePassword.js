import { StyleSheet, Text, View, ActivityIndicator, Dimensions,  } from 'react-native'
import React from 'react'
import { Formik } from "formik";
import { FormInput } from "../Components/FormInput";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants/theme';

const {width, height} = Dimensions.get("screen")

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

const ChangePassword = () => {

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
    <View>
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
  )
}

export default ChangePassword

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