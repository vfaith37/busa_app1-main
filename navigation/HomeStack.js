
import { createStackNavigator } from "@react-navigation/stack";
import {Home} from "../screens/home"

const Stack = createStackNavigator();
export function HomeStack() {
	// it is inside this home scren that the async storage is checked to know if the app is first launched. 
	// since async storage is global, the appdata would be called here, and the sign up screen2 would be called based on whether the
	//user is just entering or not
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={Home} name="HomeScreen" />
		</Stack.Navigator>
	);
}
