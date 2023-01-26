import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/setting";
import { Form } from "../Components/ProductAdd"
import { Notification } from "../Components/Notification";
import { Account } from "../screens/account";

const Stack = createStackNavigator();
export function ProfileStack() {
	return (
		<Stack.Navigator
			initialRouteName="ProfileScreen"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={Profile} name="ProfileScreen" />
			<Stack.Screen component={Account} name="AccountScreen" />
			<Stack.Screen component={Notification} name="NotificationScreen" />
			{/* <Stack.Screen component={Form} name="AddProduct" /> */}
		</Stack.Navigator>
	);
}
