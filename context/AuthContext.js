import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useEffect, useState} from "react";
import {Login} from "../Components/Login";

export const AuthContext = createContext();
 

export const AuthProvider =({children})=>{

    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken]= useState(null)
   const [userInfo, setUserInfo] = useState(null)
   const [eventTitle, setEventTitle] = useState(null)
   const [eventTime, setEventTime] = useState(null)
   const logout = async()=>{
    setIsLoading(true)
    setUserToken(null)
    setEventTime(null)
    setEventTitle(null)

    try{
  await  AsyncStorage.removeItem("userToken")
   await AsyncStorage.removeItem("userInfo")
   await AsyncStorage.removeItem("eventTitle")
   await AsyncStorage.removeItem("eventTime")
}catch(e){
    console.log(`${e}`)
}
    setIsLoading(false)
   }



   const isLoggedIn = async ()=>{
    try{
        const userToken = await AsyncStorage.getItem("userToken")
        const value = await AsyncStorage.getItem("userInfo")
        if(value !==null && userToken !==null){
            const  userInfo = JSON.parse(value)
            setUserInfo(userInfo)
            setUserToken(userToken)
        }
        console.log(userToken)
    }catch(e){
        console.log(`isLogged in error: ${e}`)
    }
   }

   useEffect(()=>{
    isLoggedIn()
   }, [])



    return(
        <AuthContext.Provider value={{logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}