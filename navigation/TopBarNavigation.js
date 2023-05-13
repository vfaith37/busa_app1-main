import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TasksScreen from '../screens/TasksScreen'
import { COLORS } from '../constants/theme'
import HomeScreen from '../screens/HomeScreen'
import AssignmentScreen from '../screens/AssignmentScreen'
import Ionicons from "react-native-vector-icons/Ionicons";
import ClassesScreen from '../screens/ClassesScreen'
import TasksNavigation from './TasksNavigation'

const {width, height} = Dimensions.get("screen")


const Tab = createMaterialTopTabNavigator()

const TopBarNavigation = () => {
  return (
    <Tab.Navigator
    initialRouteName='All'
    

screenOptions={({route})=>({
    tabBarIcon: ({ focused, color, size}) => {
        let iconName;

        if (route.name === "All") {
            iconName = focused
                ? "clipboard-outline"
                : "clipboard-outline";
        } else if (route.name === "Classes") {
            iconName = focused ? "calendar-outline" : "calendar-outline";
        } else if (route.name === "Assignments") {
            iconName = focused ? "book-outline" : "book-outline";
        }
        return <Ionicons name={iconName} size={20} color={color} style={{position:"absolute", flex:1}}/>;
    },
    tabBarLabelStyle: {fontFamily:"Poppins", fontSize:13, lineHeight:21, textTransform:"none"},
    tabBarItemStyle: {width:118, height:47, backgroundColor:COLORS.todoInactive, borderRadius:20, left:10, flexDirection:"row",}, // for each individual tab item
    tabBarStyle: { backgroundColor: COLORS.white, paddingTop:50, height:120},
    tabBarScrollEnabled:true,
    tabBarGap:10,
    tabBarIconStyle:{size:20, color:COLORS.black, },
    tabBarActiveTintColor: COLORS.todoBackground,
    tabBarInactiveTintColor:COLORS.black,
    tabBarIndicatorStyle:{backgroundColor:COLORS.todoBackground, width:130},
    tabBarBounces:false,
    tabBarContentContainerStyle:{width:width*1.2, paddingTop:10},
    tabBarPressColor:"transparent" ,// for Android only,
})}

    >
      <Tab.Screen name="All" component={TasksNavigation} />
      <Tab.Screen name="Classes" component={ClassesScreen} />
      <Tab.Screen name='Assignments' component={AssignmentScreen}/>
    </Tab.Navigator>
  )
}

export default TopBarNavigation

const styles = StyleSheet.create({})