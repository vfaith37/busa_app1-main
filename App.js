import "react-native-gesture-handler"
import React, { useCallback } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";

import useCustomFonts from "./useCustomFonts";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants/theme";

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
			<StatusBar backgroundColor={COLORS.white}/>
			<AppNavigation/>
		</AuthProvider>
	);
}

export default App;
