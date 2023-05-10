import { createStackNavigator } from "@react-navigation/stack";


import { TabNavigator } from "./TabStack";

const Stack = createStackNavigator();
export function MainStack() {
	return (
		<Stack.Navigator
			// initialRouteName="verify"
			screenOptions={{ headerShown: false }}
		>
			 <Stack.Screen component={TabNavigator} name="Tab" />
		</Stack.Navigator>
	);
}
