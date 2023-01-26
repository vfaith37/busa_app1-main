
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {SafeAreaProvider } from "react-native-safe-area-context";
import { MainStack } from './MainStack';
import AuthenticationStack from './AuthenticationStack';
import { AuthContext } from '../context/AuthContext';
import {View, ActivityIndicator } from 'react-native';

const AppNavigation = () => {
  const {isLoading, userToken} = useContext(AuthContext)
  // if(isLoading){
  //   return(
  //   <View style ={{flex:1, justifyContext:"center", alignItems:"center"}}>
  //     <ActivityIndicator size={"large"}/>
  //   </View>
  //   )
  // }
  
  return (
    <NavigationContainer>
    <SafeAreaProvider>
      {userToken!==null ?
    <MainStack/>
    :
    <AuthenticationStack/> 
    }
    </SafeAreaProvider>
</NavigationContainer>
  )
}

export default AppNavigation