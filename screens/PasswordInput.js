
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputField} from '../Components/InputField';
import { StackActions, useNavigation } from '@react-navigation/native';
import { FormSubmitBtn } from '../Components/FormSubmitBtn';
import { COLORS } from '../constants/theme';
import * as Yup from "yup";
import { Formik } from "formik";
import LottieView from 'lottie-react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get("screen")


const validationSchema = Yup.object({
	password: Yup.string()
	  .trim()
	  .min(8, "Password not long enough!")
	  .required("Password required!"),

	confirmPassword: Yup.string().equals(
	  [Yup.ref("password"), null],
	  "Password doesn't match"
	),
  })


const PasswordInput = ({route}) => {
  return (
    <>
      <PasswordLogic route ={route}/>
    </>
  );
};


export default PasswordInput;



const PasswordLogic =(props)=>{
  const {email} = props.route.params
  const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const userInfos = {
    password: "",
    confirmPassword :""
  };


  const verify = async (values) => {
    console.log(email)
    try {
     setIsLoading(true);
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const value = await AsyncStorage.getItem("userInfo")

  //     if (userToken !== null && value !== null) {
  //       const userInfo = JSON.parse(value)
  //  setUserToken(userToken);
  //  setUserInfo(userInfo);

const formData = new FormData()

formData.append("email", email.email);
formData.append("newPassword", values.password);
formData.append("confirmPassword", values.confirmPassword);
console.log(formData)

      const res = await client.post(`/changePassword`, formData);

      console.log(res);
      if (res.status === 200) {

        console.log("successful")
         navigation.dispatch(StackActions.replace("Log-in"));


//         const token = userToken
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };


// // // navigate back to login
// // // sign in the user with the current password inputed and then he'll move on

// const signinres = await client.post("/signin", formData, config);

// console.log(signinres)

// if (signinres.status === 200) {
//   // also store the users values as an object and pass it round
//   console.log(signinres.data);
//   let userInfo = signinres.data.user;
//   console.log(userInfo);

//   setUserInfo(userInfo);
//   let token = signinres.data.refreshToken;
//   setUserToken(token);

//   try {
//     //axios.defaults.headers.common.Authorization = `Bearer ${token}`
//     // stringify the user object
//     await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

//     // get the user token
//     await AsyncStorage.setItem("userToken", token);
//   } catch (e) {
//     console.log(`Async Storage error: ${e}`);
//   }
//   navigation.dispatch(StackActions.replace("Tab"));
//   setIsLoading(false);
// } 
// // else if (signinres.status === 401) {
// //   setIsLoading(false);
// //   setError("Invalid username or password.");
// }
      // } 
    }
    } catch (e) {
      console.log(e);
      setError(e.message)
      

      // console.log(e);
      // if (e.response && e.response.status === 401) {
      //   setError(`${e.response.data.error}`);
      // } else if (e.response && e.response.status === 400) {
      //   setError(`${e.response.data.error}`);
      // } else if (e.message === "Network Error" && e.code === "ERR_NETWORK") {
      //   setError("Network error, lost connection!");
      // } else {
      //   setError("An error occurred. Please try again later.");
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <>
     <SafeAreaView style={{flex: 1, alignContent: 'center', backgroundColor:COLORS.white}}>
		<StatusBar backgroundColor={COLORS.white}/>
		<KeyboardAvoidingView
		enabled
					style={{ flex: 1}}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
		>

<ScrollView
bounces ={false}
showsVerticalScrollIndicator={false}
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{paddingHorizontal: 25, paddingTop:40}}>
         <View style={{alignItems: 'center'}}>
		 
<LottieView
					source={require("../assets/animations/login.json")}
					style={{
						position: "relative",
						width: 250,
						height: 250,
						paddingTop:3,
						alignSelf: "center",
					}}
					loop={true}
					autoPlay
				/>
         </View> 

        <Text
          style={{
            fontFamily: 'Poppins2',
            fontSize: 28,
            fontWeight: '500',
			paddingTop:30,
			color:COLORS.lightblue
          }}>
          Verify Password
        </Text>


		<View style={{paddingTop:30}}>
<Formik
 initialValues={userInfos}
 validationSchema={validationSchema}
 onSubmit={verify}
>
	{({
values,
      errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
	})=>{
const {password, confirmPassword} = values
return(
<View>
{error && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "Poppins",
                        fontSize: 13,
						bottom:20
                      }}
                    >
                      {error}
                    </Text>
                  )}


{errors.password && touched.password && (
                    <Text
                      style={
						[
							styles.error,
							{
							  top: -10,
							  alignContent: "center",
							  right: width / 25,
							},
						  ]}
                    >
                      {errors.password}
                    </Text>
                  )}
<InputField
  icon={
	<Ionicons
	name="ios-lock-closed-outline"
	size={20}
	color={COLORS.lightblue}
	style={{marginRight: 5}}
  />
  }
  inputType="password"
  placeholder="new password"
  onChangeText={handleChange("password")}
  onBlur={handleBlur("password")}
  error={touched.password && errors.password}
  value={password}
  secureTextEntry
  autoCapitalize="none"
  maxLength={32}
  selectionColor={COLORS.lightblue}
  cursorColor={COLORS.lightblue}
/>

{errors.confirmPassword && touched.confirmPassword && (
                    <Text
                      style={
						[
							styles.error,
							{
							  top: 45,
							  alignContent: "center",
							  right: width / 25,
							},
						  ]}
                    >
                      {errors.confirmPassword}
                    </Text>
                  )}
<InputField
  icon={
	<Ionicons
	name="ios-lock-closed-outline"
	size={20}
	color={COLORS.lightblue}
	style={{marginRight: 5}}
  />
  }
  inputType="password"
  placeholder="confirm password"
  onChangeText={handleChange("confirmPassword")}
  onBlur={handleBlur("confirmPassword")}
  error={touched.confirmPassword && errors.confirmPassword}
  value={confirmPassword}
  secureTextEntry
  autoCapitalize="none"
  maxLength={32}
  selectionColor={COLORS.lightblue}
  cursorColor={COLORS.lightblue}
/>

{isLoading ? (
                    <View>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.lightblue}
                      />
                    </View>
                  ) : (
                    <FormSubmitBtn 
                    onPress={handleSubmit} 
                    title={"Verify"} 
                    />
                  )}
</View>

)
	}}
</Formik>
		</View>
      </View>
	</TouchableWithoutFeedback>
</ScrollView>
		</KeyboardAvoidingView>
    </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
	error: {
		fontFamily: "Poppins",
		fontSize: 12,
		color: "red",
		right: 15,
		position: "absolute",
		top: 5,
	  },
})




