import React, { useCallback } from "react";
import { MainStack } from "./navigation/MainStack";
import { AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCustomFonts from "./useCustomFonts";
function App() {
	let fontsLoaded = useCustomFonts()

	const onLayoutRootView = useCallback(async () => {
		        if (fontsLoaded) {
		          await SplashScreen.hideAsync();
		        }
		      }, [fontsLoaded])

	if(!fontsLoaded){
		return null
	}
	

	return (

		<AuthProvider>
			<AppNavigation/>
		</AuthProvider>
	);
}

export default App;
