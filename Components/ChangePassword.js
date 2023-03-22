import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Formik } from "formik";
import { FormInput } from "../Components/FormInput";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants/theme';
import { ModalPopUp } from './Modal';
import { Back } from '../constants/icons';

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

// const ChangePassword = () => {
// 	const [visible, setVisible] = useState(false)

//   return (
// 	// <ModalPopUp visible={visible}>
// 	// 			<View style={{ alignItems: "center" }}></View>
// 		<View style={{
// 							alignItems: "center",
// 						}}>
//     <View
// 							style={{ flexDirection: "row", justifyContent: "space-around" }}
// 						>
// 							<TouchableOpacity onPress={()=>setVisible(false)}>
// 								<Back size={30} />
// 							</TouchableOpacity>
// 							<Text
// 								style={{
// 									fontSize: 20,
// 									fontWeight: "600",
// 									color: "rgba(39, 46, 57, 1)",
// 									fontFamily: "Poppins3",
// 								}}
// 							>
// 								Change Password
// 							</Text>
// 						</View>
//              <ChangePasswordFormInput/>
// 	</View>
// 	// </ModalPopUp>
//   )
// }


 export const ChangePasswordFormInput = ()=>{

	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setDisabled] = useState(true);

	const userInfo = {
		oldPassword: "",
		password: "",
		confirmPassword: "",
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

	return(
		<>
<View 
style={{height:height/2.3}}
>

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
											label="Current Password"
											placeholder="Current Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
											placeholderTextColor={"#ccc"}
										/>
										<FormInput
											value={password}
											error={touched.password && errors.password}
											onChangeText={handleChange("password")}
											onBlur={handleBlur("password")}
											autoCapitalize="none"
											secureTextEntry
											 label="Password"
											placeholder="Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
											placeholderTextColor={"#ccc"}

										/>
										<FormInput
											value={confirmPassword}
											error={touched.confirmPassword && errors.confirmPassword}
											onChangeText={handleChange("confirmPassword")}
											onBlur={handleBlur("confirmPassword")}
											autoCapitalize="none"
											secureTextEntry
											 label="Confirm Password"
											placeholder="Confirm Password"
											style={styles.text}
											TextInputStyle={styles.textInput}
											placeholderTextColor={"#ccc"}
										/>
										{/* {errors === null ? setDisabled(true) : setDisabled(false)} */}
										{console.log(12, errors)}
										{isLoading ? (
											<View
												// style={{
												// 	width: width - 130,
												// 	height: 50,
												// 	alignSelf: "center",
												// 	borderRadius: 10,
												// 	justifyContent: "center",
												// 	marginTop: 15,
												// 	backgroundColor: "#0000ff",
												// }}
											>
												<ActivityIndicator size="large" color="#FFF" />
											</View>
										) : (
											<View style={{marginTop:5}}>
												<FormSubmitBtn
													disabled={isDisabled}
													Submitting={isSubmitting}
													onPress={handleSubmit}
													title={"Change Password"}
												/>
											</View>
										)}
									</>
								);
							}}
						</Formik>
    </View>

		</>
	)
}


// export default ChangePasswordFormInput

const styles = StyleSheet.create({
	text: {
		fontSize: 13.5,
		fontFamily: "Poppins",
		paddingLeft:10
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