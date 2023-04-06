import { StyleSheet,  View, ActivityIndicator, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Formik } from "formik";
import { FormInput } from "../Components/FormInput";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import ErrorButton from './ErrorButton';

const {width, height} = Dimensions.get("screen")

const validationSchema = Yup.object({
	oldPassword: Yup.string()
	  .trim()
	  .min(8, "Password not long enough!")
	  .required("Password required!"),
	password: Yup.string()
	  .trim()
	  .min(8, "Password not long enough!")
	  // if password is same as old password, prevent the user
	  .notOneOf([Yup.ref("oldPassword"), null], "New password must be different from old password!")
	  .required("Password required!"),
	confirmPassword: Yup.string().equals(
	  [Yup.ref("password"), null],
	  "Password doesn't match"
	),
  })

  const ChangePasswordFormInput = ()=>{

	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setDisabled] = useState(true);
	const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [feedback,setFeedback] = useState(false)
  const [message, setMessage] = useState("")

	const userInfos = {
		oldPassword: "",
		password: "",
		confirmPassword: "",
	};

	const resetPassword = async (values, formikActions) => {

		try{
			setIsLoading(true);
			console.log(values);
			const userToken = await AsyncStorage.getItem("userToken");
			const value = await AsyncStorage.getItem("userInfo")

			if(userToken !== null && value !== null){
				const userInfo = JSON.parse(value)
				setUserToken(userToken);
				setUserInfo(userInfo);


				const token = userToken
				const config = {
				  headers: {
					Authorization: `Bearer ${token}`,
				  },
				};
		
	
				const formData = new FormData()
				formData.append("email", userInfo.email)
				formData.append("password", values.oldPassword)
				formData.append("newPassword", values.password)

				console.log(formData)

				const res = await client.put("/resetpassword", formData, config);

				console.log (res)

				if(res.status === 200){
					  console.log("successful")
					  setFeedback(true);
					  setMessage( "Password sucessfully changed");
					  navigation.goBack()
				}
			}
			

		}catch(e){
         console.log(e)
		 setFeedback(true);
		 setMessage("An Error occured");
		}finally{
       setIsLoading(false)
		}
		

	};

	return(
		<>
<View 
style={{height:height/1.85}}
>

                       <Formik
							initialValues={userInfos}
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
									<View
									 style={{paddingTop:14}}
									 >

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
											placeholder="New Password"
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
												<ActivityIndicator size="large" color={COLORS.lightblue} />
											</View>
										) : (
											<View style={{marginTop:5}}>
												<FormSubmitBtn
													// disabled={isDisabled}
													Submitting={isSubmitting}
													onPress={handleSubmit}
													title={"Change Password"}
												/>
											</View>
										)}
									</View>
									</>
								);
							}}
						</Formik>

 {feedback && <ErrorButton onPress={() =>{ setFeedback(false)}}message={message} style={{paddingTop:19}} color= {COLORS.red} borderRadius={10} bgWidth={width-120} pBottom={1}/>}

    </View>

		</>
	)
}
 export default ChangePasswordFormInput

const styles = StyleSheet.create({
	text: {
		fontSize: 13.5,
		fontFamily: "Poppins",
		paddingLeft:15,
		position:"absolute"
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
		 marginVertical:12,
	},
});