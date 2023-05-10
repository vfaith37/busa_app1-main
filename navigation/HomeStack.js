
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import PostDetails from "../screens/PostDetails";
import { NavigationContainer } from "@react-navigation/native";
import ScanTicketScreen from "../screens/ScanTicketScreen";
import AllPosts from "../screens/AllPosts";

const Stack = createStackNavigator();

export default function DrawerStack() {
	return (
	  <NavigationContainer independent={true}>
		<Drawer.Navigator screenOptions={{headerShown: false}}>
		  <Drawer.Screen name="Feed" component={HomeStack} />
		</Drawer.Navigator>
	  </NavigationContainer>
	);
  }




export function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
		>
	  <Stack.Screen component={HomeScreen} name="HomeScreen" />
	<Stack.Screen component={PostDetails} name ="PostDetails"/> 
	<Stack.Screen component={AllPosts} name ="AllPosts"/> 
		</Stack.Navigator>
	);
}

