import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import { SignUp } from "../screens/SignUpScreen";
import SignUpScreen2 from "../screens/SignupScreen2"
import { TabNavigator } from "./TabStack";

const Stack = createStackNavigator();
const AuthenticationStack =()=> {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
		>
			 <Stack.Screen component={LoginScreen} name="Log-in" /> 
			 {/* <Stack.Screen component={LoginScreen} name="Log-in" />  */}
			   <Stack.Screen component={SignUp} name="Sign-up" />  
			 {/* <Stack.Screen component={TabNavigator} name="Tab" /> */}
		</Stack.Navigator>
	);
}



export default AuthenticationStack
