import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from '../screens/TasksScreen';

const Stack = createStackNavigator();

const TasksStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
>
<Stack.Screen component={TasksScreen} name="TasksScreen" />
</Stack.Navigator>
  )
}

export default TasksStack

const styles = StyleSheet.create({})