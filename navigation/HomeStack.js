
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

import PostDetails from "../screens/PostDetails";

const Stack = createStackNavigator();
export function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
		>
	  <Stack.Screen component={HomeScreen} name="HomeScreen" />
	<Stack.Screen component={PostDetails} name ="PostDetails"/> 
		</Stack.Navigator>
	);
}
