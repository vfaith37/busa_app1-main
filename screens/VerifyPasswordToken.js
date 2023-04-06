
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import OTP from "../Components/otp";
const { height, width } = Dimensions.get("screen");
import client from "../api/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants/theme";
import { useState } from "react";



const VerifyPasswordToken =({route})=>{
	return(
		<VerifyTokenLogic route={route}/>
	)
}





const VerifyTokenLogic = (props) => {
	const email = props.route.params
	const navigation= useNavigation()
	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(null)
	const [userToken, setUserToken]= useState(null)

	const verify = async (value) => {
      console.log(value)
		if(value.token !== "" && value.token!==null){
		 setIsLoading(true);
		console.log(value.token)
		try {
		  await client.post('/verifyToken', {
		   ...value,
		  }).then((res) => {
			console.log(res)
			if (res.status === 200) {
					  navigation.dispatch(StackActions.replace("PasswordInput",{
						email:email
					  }));
			} else {
			  console.error("Invalid token")
			}
		  }
		  )
		} catch (e) {
		  console.log(` This is the verify token error: ${e}`);
		  setIsLoading(false)
		} finally {
		  setIsLoading(false);
		}
	}
	  };
	  
	  const resendCode = async()=>{
    // logic to still be added
	  }

	return (
		<View style={styles.container}>
			<StatusBar hidden/>
		<KeyboardAvoidingView
		enabled
		behavior={Platform.OS === "ios" ? "padding" : null}
		>
			<ScrollView
			bounces={false}
			showsVerticalScrollIndicator={false}
			>
				<TouchableWithoutFeedback>
		  <View >
			<Text style={{color:"#fff", textAlign:"center", fontWeight:"600", fontSize:33, top:96, fontFamily:"Poppins3"}}>Reset Password</Text>
	  <LottieView
	  source={require("../assets/animations/email-verification.json")}
	  style={{
		width: 300,
		height: 300,
		resizeMode:"cover",
		alignSelf:"center",
		top:30
	  }}
	  loop={true}
	  autoPlay
	  />


	  <View style={{marginTop:50, height:height}}>
	  <View style={{width:315, height:172, backgroundColor:"#ffff", borderRadius:10, alignSelf:"center"}}>
                  <OTP
				codeCount={5}
				containerStyle={{ marginTop: 65 }}
				otpStyles={{ backgroundColor: "#fff" }}
			     onFinish={(value) => verify(value)}
				  />
  
		  <Text style={{fontWeight:"500", color:"#363BE8", textAlign:"center", bottom:95, fontFamily:"Poppins", fontSize:12.5}}>
			{/* enter code sent to your email address */}
			currently in test mode🧪; enter any token of your choice😁
			</Text>
	  </View>
		  <View style={{top:20}}>
		  <Text style={{textAlign:"center", fontWeight:"600", fontSize:13, color:"#ffff", fontFamily:"Poppins3"}}>Didn't receive a code?</Text>
		  <TouchableOpacity
		  activeOpacity={0.6}
		//   onPress={resendCode()}
		  >
			  <Text style={{alignItems:"center", fontWeight:"600", fontSize:14, textAlign:"center", color:"#ffff", textDecorationLine:"underline", fontFamily:"Poppins3"}}>Resend code</Text>
		  </TouchableOpacity>
		  </View>
		  </View>
	  </View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	</View>
		)
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
	container:{
        flex:1.5,
backgroundColor:COLORS.lightblue
    }
});


export default VerifyPasswordToken
