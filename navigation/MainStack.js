import { createStackNavigator } from "@react-navigation/stack";

// import { TabNavigator } from "./TabStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapsScreen from "../screens/MapsScreen";
import LearnScreen from "../screens/LearnScreen";
import HandBookScreen from "../screens/HandBookScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import { Profile } from "../screens/setting";
import CustomDrawer from "../Components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { HomeStack } from "./HomeStack";
import TasksStack from "./TasksStack";
import ProfileStack from "./ProfileStack";
import { EventStack } from "./EventStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants/theme";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// export function MainStack() {
// 	return (
// 		<Stack.Navigator
// 			// initialRouteName="verify"
// 			screenOptions={{ headerShown: false }}
// 		>
// 			 <Stack.Screen component={TabNavigator} name="Tab" />
// 		</Stack.Navigator>
// 	);
// }

const TabNavigator = () => {
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Event") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "ios-person-circle"
              : "ios-person-circle-outline";
          } else if (route.name === "Task") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

				return <Ionicons name={iconName} size={23} color={color} style={{paddingTop:6}}/>;
			},
			tabBarActiveTintColor: COLORS.todoBackground,
			tabBarInactiveTintColor: COLORS.darkgray,
			tabBarLabelStyle: {fontFamily:"Poppins", fontSize:9, lineHeight:13.5, textTransform:"none"},
		})}
	
	>
		<Tab.Screen name="Home" component={HomeStack} headerShown={false}/>
		<Tab.Screen name="Event" component={EventStack}/> 
		<Tab.Screen name="Task" component={TasksStack}/>
		<Tab.Screen name="Profile" component={ProfileStack} headerShown={true}/>
	</Tab.Navigator>

    //  </NavigationContainer>
  );
};

export function MainStack() {
  return (
    <Drawer.Navigator
      //   initialRouteName="Feed"
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
          } else if (route.name === "Maps") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Learn") {
            iconName = focused ? "laptop" : "laptop-outline";
          } else if (route.name === "Handbook") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Complaints") {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? color : "#7B7B7B"}
            />
          );
        },
        drawerActiveBackgroundColor: "#ffff",
        drawerInactiveBackgroundColor: "#f9f9f9",
        drawerActiveTintColor: "#0A3697",
        drawerInactiveTintColor: "#0C0C0D",
        drawerLabelStyle: {
          fontFamily:"Poppins",
          fontSize: 15,
          fontWeight: "400",
          lineHeight: 21,
          marginVertical: 10,
          marginLeft: -18,
        },
        drawerItemStyle: {
          // width:160,
          // height:59,
          borderRadius: 16,
          borderColor: "#EFEEEB",
          backgroundColor: "#ffff",
          borderWidth: 1,
          marginVertical:5
        },
		drawerStyle: {width: 200}
      })}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Feed" component={TabNavigator}  />
      <Drawer.Screen name="Maps" component={MapsScreen} />
      <Drawer.Screen name="Learn" component={LearnScreen} />
      <Drawer.Screen name="Handbook" component={HandBookScreen} />
      <Drawer.Screen name="Complaints" component={ComplaintsScreen} />
      <Drawer.Screen name="Settings" component={ProfileStack} />
    </Drawer.Navigator>
  );
}
