
import { createStackNavigator } from "@react-navigation/stack";
import {Home} from "../screens/home"

const Stack = createStackNavigator();
export function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={Home} name="HomeScreen" />
		</Stack.Navigator>
	);
}
