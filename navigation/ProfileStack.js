import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/setting";
import {Notification} from "../Components/Notification";
import { Account } from "../screens/account";
import UploadEventScreen from "../screens/UploadEventScreen";
import UploadPostScreen from "../screens/UploadPostScreen";
import ScanTicketScreen from "../screens/ScanTicketScreen";
import TicketDisplayScreen from "../screens/TicketDisplayScreen";
import EventsListScreen from "../screens/EventsListScreen";
import EventScreen from "../screens/EventScreen";

const Stack = createStackNavigator();

const ProfileStack = ()=> {
	return (
		<Stack.Navigator
			// initialRouteName="ProfileScreen"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={Profile} name="ProfileScreen" />
			<Stack.Screen component={Account} name="AccountScreen" />
			<Stack.Screen component={Notification} name="NotificationScreen"/> 
			<Stack.Screen component={TicketDisplayScreen} name="TicketScreen"/> 
			<Stack.Screen component={UploadPostScreen} name="UploadPostScreen"/> 
			<Stack.Screen component={UploadEventScreen} name="UploadEventScreen"/> 
			<Stack.Screen component={EventScreen} name="EventScreen"/> 
			<Stack.Screen component={EventsListScreen} name="EventList"/> 
            <Stack.Screen component={ScanTicketScreen} name="ScanTicketScreen"/>
		</Stack.Navigator>
	);
}

export default ProfileStack