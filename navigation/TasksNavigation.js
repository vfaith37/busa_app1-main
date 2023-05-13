import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TasksScreen from '../screens/TasksScreen'
import AddTasksScreen from '../screens/AddTasksScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const TasksNavigation = () => {
  return (
        <Stack.Navigator
    screenOptions={{ headerShown: false }}
>
<Stack.Screen component={TasksScreen} name="TasksScreen" />
<Stack.Screen component={AddTasksScreen} name ="AddTasksScreen"/>
</Stack.Navigator>

  )
}

export default TasksNavigation

const styles = StyleSheet.create({})