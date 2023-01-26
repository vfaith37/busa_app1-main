import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FormInput } from "./FormInput";
import { FormSubmitBtn } from "./FormSubmitBtn";
import * as Yup from "yup";
import client from "../api/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const validationSchema = Yup.object({
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
});
export const SignInForm = () => {
//  const {login} = useContext(AuthContext)
	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken]= useState(null)
	const [userInfos, setUserInfo] = useState(null)

	const userInfo = {
		email: "",
		password: "",
	};
     
	
	
	 const signIn = async (values) => {
		 await axios.post("https://no-vex-abeg.onrender.com/api/signin", {
			...values,
		}).then((res)=>{
			console.log(res)
			if (res.status === 200) {
				// also store the users values as an object and pass it round
				console.log(res.data);
				let userInfo = res.data.user
				setUserInfo(userInfo)
				let token = res.data.token
				setUserToken(token)

				try{
					// stringify the user object
					AsyncStorage.setItem("userInfo", JSON.stringify(userInfo))
					// get the user token
					AsyncStorage.setItem("userToken",token)
					console.log(userInfo)
					console.log(token)
				navigation.dispatch(StackActions.replace("Tab"));
				}catch(e){
					console.log(`Async Storage error: ${e}`)
				}


				// let useremail = values.email
				// try{
				// AsyncStorage.setItem("email", useremail)
				// // console.log(useremail)
				// navigation.dispatch(StackActions.replace("Tab"));
				// }catch(e){
				//  console.log(`The error is ${e}`)
				// }
			}
		}).catch((e)=>{
			console.log(e)
		}
		
		)
		
	};


	return (
		<View>
			<Formik
				initialValues={userInfo}
				validationSchema={validationSchema}
				onSubmit={signIn}
				// onSubmit={()=> {login}}
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
					const { email, password } = values;
					return (
						<>
							<FormInput
								onChangeText={handleChange("email")}
								placeholder="email@student.babcock.edu.ng"
								onBlur={handleBlur("email")}
								error={touched.email && errors.email}
								value={email}
								autoCapitalize="none"
								label={"Email"}
								style={styles.text}
								TextInputStyle={styles.textInput}
							/>
							<FormInput
								placeholder="*********"
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
							{isLoading ? (
								<View>
									<ActivityIndicator size="large" color="#0000ff" />
								</View>
							) : (
								<FormSubmitBtn
									Submitting={isSubmitting}
									onPress={handleSubmit}
									title={"Log in"}
								/>
							)}
						</>
					);
				}}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
		top: 30,
		backgroundColor: "#000",
		left: 20,
	},
	text: {
		fontWeight: "400",
		fontSize: 15,
		color: "#363be8",
	},
	textInput: {
		paddingTop: 15,
		borderColor: "000",
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 35,
		marginBottom: 10,
		paddingLeft: 5,
		fontSize: 14,
	},
});
