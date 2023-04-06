import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import * as Yup from "yup";
import { StackActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import { Formik } from "formik";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputField } from '../Components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import client from '../api/client';
import { FormSubmitBtn } from '../Components/FormSubmitBtn';



const validationSchema = Yup.object({
	email: Yup.string()
	  .trim()
	  .matches(
		/^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
		"School Email required"
	  )
	  .required("Email is required!"),
  });

const ForgotPassword =()=>{
    const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const userInfos = {
    email: "",
  };



  
  const sendMail = async (values) => {
    console.log(values)
    try {
      setIsLoading(true);

      const formData = new FormData()
      formData.append("email", values.email)
      const res = await client.post("/forgotPassword", formData);

      console.log(res);
      if (res.status === 200) {
        navigation.dispatch(StackActions.replace("verifyPasswordToken", {
          email: values.email,
        }));
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
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
		 
<AnimatedLottieView
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
            fontSize: 25,
            fontWeight: '500',
			paddingTop:30,
			color:COLORS.lightblue
          }}>
          Enter email
        </Text>


		<View style={{paddingTop:30}}>
<Formik
 initialValues={userInfos}
 validationSchema={validationSchema}
 onSubmit={sendMail}
>
	{({
values,
      errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
	})=>{
const {email, password} = values
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


{errors.email && touched.email && (
                    <Text
                      style={
						[
					styles.error,
					{
						top:-20
					}
							
						]
					}
                    >
                      {errors.email}
                    </Text>
                  )}			  

<InputField
  icon={
	<Ionicons
	name="mail"
	size={20}
	color={COLORS.lightblue}
	style={{marginRight: 5}}
  />
  }
  onChangeText={handleChange("email")}
  placeholder="email@student.babcock.edu.ng"
  onBlur={handleBlur("email")}
  value={email}
  autoCapitalize="none"
  label={"Email"}
  maxLength={50}
  selectionColor={COLORS.lightblue}
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
                    title={"Next"} 
                    />
                  )}
</View>

)

	}}
</Formik>
		</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
			paddingTop:50
          }}>
          <Text style={{fontFamily:"Poppins"}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign-up')}>
            <Text style={{color:COLORS.lightblue,  paddingBottom:2, fontFamily:"Poppins3", fontSize:13}}> Register</Text>
          </TouchableOpacity>
        </View>

      </View>
	</TouchableWithoutFeedback>
</ScrollView>
		</KeyboardAvoidingView>
    </SafeAreaView>
        </>
    )
}

export default ForgotPassword



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








