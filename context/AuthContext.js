import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, {createContext, useEffect, useState} from "react";
import {Login} from "../Components/Login";

export const AuthContext = createContext();


export const AuthProvider =({children})=>{

    const [isLoading, setIsLoading] = useState(false)
   const  [userToken, setUserToken]= useState(null)
   const [userInfo, setUserInfo] = useState(null)

   const logout =()=>{
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem("UserInfo")
    AsyncStorage.removeItem("userToken")
    setIsLoading(false)
   }


   const isLoggedIn = async ()=>{
    try{
        setIsLoading(true)
        let userToken = await AsyncStorage.getItem("userToken")
        let userInfo = await AsyncStorage.getItem("userInfo")
        userInfo = JSON.parse(userInfo)
        if(userInfo){
            setUserToken(userToken)
            setUserInfo(userInfo)
        }
        setIsLoading(false)
    }catch(e){
        console.log(`isLogged in error: ${e}`)
    }
   }

   useEffect(()=>{
    isLoggedIn()
   }, [])

    return(
        <AuthContext.Provider value={{Login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}