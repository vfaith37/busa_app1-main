import React from "react";
import { MainStack } from "./navigation/MainStack";
import { AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
function App() {
	return (


		<AuthProvider>
			<AppNavigation/>
		</AuthProvider>


        // <NavigationContainer>
		// 	<SafeAreaProvider>
		// 		<MainStack/>
		// 	</SafeAreaProvider>
		// </NavigationContainer>


	);
}

export default App;
