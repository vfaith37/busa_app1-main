import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/setting";
import { Form } from "../Components/ProductAdd"
import { Notification } from "../Components/Notification";
import { Account } from "../screens/account";
import Login from "../Components/Login";
import LoginScreen from "../screens/LoginScreen";
import SignOutScreen from "../screens/SignOutScreen";

const Stack = createStackNavigator();
export function ProfileStack() {
	return (
		<Stack.Navigator
			initialRouteName="ProfileScreen"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={Profile} name="ProfileScreen" />
			<Stack.Screen component={Account} name="AccountScreen" />
			<Stack.Screen component={Notification} name="NotificationScreen"/>
			<Stack.Screen component={SignOutScreen} name="Sign-Out"/> 
			{/* <Stack.Screen component={Form} name="AddProduct" /> */}
		</Stack.Navigator>
	);
}
