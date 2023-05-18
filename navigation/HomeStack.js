
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import PostDetails from "../screens/PostDetails";
import { NavigationContainer } from "@react-navigation/native";
import AllPosts from "../screens/AllPosts";
import MapsScreen from "../screens/MapsScreen";
import LearnScreen from "../screens/LearnScreen";
import HandBookScreen from "../screens/HandBookScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import CustomDrawer from "../Components/CustomDrawer";
import { Profile } from "../screens/setting";

import Ionicons from "react-native-vector-icons/Ionicons";
import TasksScreen from "../screens/TasksScreen";
import { TabNavigator } from "./TabStack";

const Stack = createStackNavigator();


// export default function DrawerStack() {
// 	return (
// 	  <NavigationContainer independent={true}>
// 		<Drawer.Navigator 
// 		screenOptions={({ route,}) => ({
// 			headerShown: false,
// 			drawerIcon: ({ focused, color}) => {
// 				let iconName;

// 				if (route.name === "Home") {
// 					iconName = focused
// 						? "ios-newspaper"
// 						: "ios-newspaper-outline";
// 				} else if (route.name === "Maps") {
// 					iconName = focused ? "location" : "location-outline";
// 				} else if (route.name === "Learn") {
// 					iconName = focused ? "laptop" : "laptop-outline";
// 				}
// 				else if (route.name === "Handbook"){
// 					iconName = focused ? "book" : "book-outline";
// 				}
// 				else if (route.name === "Complaints"){
// 					iconName = focused ? "mail" : "mail-outline";
// 				}
// 				else if (route.name === "Settings"){
// 					iconName = focused ? "add-circle" : "add-circle-outline";
// 				}

// 				return <Ionicons name={iconName} size={25} color={ focused ? color : "#7B7B7B"}/>;
// 			},
// 			drawerActiveBackgroundColor: '#ffff',
// 			drawerInactiveBackgroundColor:"#f9f9f9",
// 			drawerActiveTintColor: '#0A3697',
// 			drawerInactiveTintColor: '#0C0C0D',
// 			drawerLabelStyle: {
// 				fontFamily: 'Poppins',
// 				fontSize: 15,
// 				fontWeight:"400",
// 				lineHeight:21,
// 				marginVertical:10,
// 				marginLeft: -18,
// 			},
// 			// drawerItemStyle:{
// 			// 	width:160,
// 			// 	height:59,
// 			// 	borderRadius:16,
// 			// 	borderColor:"#EFEEEB",
// 			// 	backgroundColor:"#ffff",

// 			// }
// 		})}
// 		drawerContent={props=> 
// 		<CustomDrawer {...props} />}>
// 		<Drawer.Screen name="Home" component={HomeStack}/>
// 		  <Drawer.Screen name="Maps" component={MapsScreen} />
// 		  <Drawer.Screen name="Learn" component={LearnScreen} />
// 		  <Drawer.Screen name="Handbook" component={HandBookScreen} />
// 		  <Drawer.Screen name="Complaints" component={ComplaintsScreen} />
// 		  <Drawer.Screen name="Settings" component={Profile} />
// 		</Drawer.Navigator>
// 	   </NavigationContainer>
// 	);
//   }


export function HomeStack() {

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
		>	
	  <Stack.Screen component={HomeScreen} name="HomeScreen"  />
	<Stack.Screen component={PostDetails} name ="PostDetails"/> 
	<Stack.Screen component={AllPosts} name ="AllPosts"/> 
	<Stack.Screen component={TasksScreen} name ="TasksScreen"/> 
		</Stack.Navigator>
	);
}

