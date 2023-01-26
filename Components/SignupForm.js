import { Formik } from "formik";
import React from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { FormInput } from "./FormInput";
import { FormSubmitBtn } from "./FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation, StackActions } from "@react-navigation/native";
import client from "../api/client";
const { width, height } = Dimensions.get("screen");

const validationSchema = Yup.object({
	firstname: Yup.string()
		.trim()
		.min(3, "Invalid Name")
		.required("First Name is required!"),
	lastname: Yup.string()
		.trim()
		.min(3, "Invalid Name")
		.required("Last Name is required!"),
	email: Yup.string()
		.trim()
		.matches(
			/^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
			"School Email required"
		)
		.required("Email is required!"),
	password: Yup.string()
		.trim()
		.min(8, "Password not long enough!")
		.required("Password required!"),
	confirmpassword: Yup.string().equals(
		[Yup.ref("password"), null],
		"Password does not match"
	),
});

export const SignUpForm = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const navigation = useNavigation();
	const userInfo = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmpassword: "",
	};
	const signUp = async (values, formikActions) => {
		// setIsLoading(true);
		// // console.log(values);
    
		const res = await client.post("/signup", {
			...values,
		});

		// sign in user

		if (res.data.success === true) {

               navigation.dispatch(
						StackActions.replace("verify"
						, {
					 email: values.email,
					//  password:values.password,
						}
						)
						);

						console.log(res.data)

			// {()=> navigation.navigate("verify", {
			// 	email:values.email,
			// 	password:values.password,
			// })}


			// const signInRes = await client.post("/sign-in", {
			// 	email: values.email,
			// 	password: values.password,
			// });
        

		// if (res.data.message === "Successfully added user") {
		// 	navigation.dispatch(
		// 		StackActions.replace("verify", {
		// 			token: signInRes.data.token,
		// 		})
		// 		);
		// }

			//  formikActions.resetForm();
			// formikActions.setSubmitting(false);
		}
	

	};
	return (
		<KeyboardAvoidingView
			enabled
			behavior={Platform.OS === "ios" ? "padding" : null}
		>
			<View
				style={{
					marginTop: 50,
					height: height / 1.5,
					width: width - 60,
					borderRadius: 17,
					backgroundColor: "#FFFFFF",
					alignSelf: "center",
					justifyContent: "center",
					borderWidth: 1,
					borderColor: "rgba(73, 137, 242, 0.48)",
				}}
			>
				<Text
					style={{
						color: "#363BE8",
						alignSelf: "center",
						fontSize: 40,
						fontWeight: "600",
					}}
				>
					Welcome
				</Text>
				<View
					style={{ paddingTop: 20, width: width - 130, alignSelf: "center" }}
				>
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
							const { firstname, lastname, email, password, 
								confirmpassword } =
								values;
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
										secureTextEntry
										autoCapitalize="none"
										label={"Password"}
										style={styles.text}
										TextInputStyle={styles.textInput}
									/>
									<FormInput
										onChangeText={handleChange("confirmpassword")}
										onBlur={handleBlur("confrirmpassword")}
										error={touched.confirmpassword && errors.confirmpassword}
										value={confirmpassword}
										secureTextEntry
										autoCapitalize="none"
										label={"Verify Password"}
										style={styles.text}
										TextInputStyle={styles.textInput}
									/>
									{isLoading ? (
										<View>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									) : (
										<FormSubmitBtn
											Submitting={isSubmitting}
											onPress={handleSubmit}
											title={"Create Account"}
										/>
									)}




								</>
							);
						}}
					</Formik>
									{/* <View style={{height:50, width:50, backgroundColor:"blue", bottom:150}} onPress={navigation.navigate("verify")}>
                                    <Text>login</Text>
									</View> */}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	text: {
		fontSize: 15,
	},
	textInput: {
		backgroundColor: "#C9D9F2",
		borderRadius: 5,
		height: 35,
		marginBottom: 10,
		paddingLeft: 5,
		fontSize: 15,
	},
});
