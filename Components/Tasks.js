import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';
import {
  StackActions,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { Icon } from '../constants/icons';


const Tasks = () => {
  const navigation = useNavigation()
    // get the added tasks from async storage then splice it to show first 5 and then if user clicks on it can navugate
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        getTodosFromUserDevice();
      }, [todos]);


      const getTodosFromUserDevice = async () => {
        try {
          const todos = await AsyncStorage.getItem('todos');
          if (todos != null) {
            setTodos(JSON.parse(todos));
          }
        } catch (error) {
          console.log(error);
        }
      };
    

      const DisplayTasks = ({todo}) => {
        return (
            <View>
          <View style={styles.listItem}>

            <View style={{flexDirection:"row", justifyContent:"space-evenly", paddingTop:12, alignItems:"center"}}>

              <View style={{height:50, width:44, backgroundColor:"#0E23F0", borderRadius:11, top:10, left:40, }}>
                {/* here conditionally render the icon based on whether its an assignment or class or anyother */}
              <Icon name={"people-outline"} size={30} color={COLORS.white} style={{paddingTop:6, alignContent:"center", right:-6}}/>
              </View>

            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  color: COLORS.todo,
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                  fontFamily:"Poppins3",
                  textAlign:"center",
                  paddingTop:15
                }}>
                {/* {todo?.task} */} Thank you Jesus
              </Text>

              <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:85}}>
              <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo }}>
                Law Lecture Theatre {"."}
                  </Text>
                  <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo}}>
                    {/* {todo?.time} */}
                   {""} 11:00AM
                  </Text>
              </View>
            </View>
            </View>


            {/* {!todo?.completed && (
              <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Icon name="done" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )} */}
            {/* <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <View style={styles.actionIcon}>
                <Icon name="delete" size={20} color="white" />
              </View>
            </TouchableOpacity> */}
          </View>
            </View>
        );
      };

  return (
    <View style={{paddingTop:20}}>
      <Text style={{fontFamily:"Poppins3", fontSize:24, fontWeight:"600", lineHeight:36, color:"#07081E" }}>Tasks</Text>
      {/* if todo from async storage is empty display no tasks set, else display tasks */}

      {todos.length>=1 ?
      
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={todos.slice(0,5)}
          renderItem={({item}) => <DisplayTasks todo={item} />}
        />
        :
        <View>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{
            navigation.dispatch(
              CommonActions.navigate({
                name: "Task",
                params: {
                  screen: "TasksScreen",
                },
              })
            );
              }
            }
                >
            <Text style={{fontFamily:"Poppins", fontSize:13, paddingTop:3}}>no tasks set, click to set tasks</Text>
            </TouchableOpacity>
            </View>
    
    }
    </View>
  )
}


const styles = StyleSheet.create({
    listItem: {
    height:96,
    width:300,
      backgroundColor: COLORS.tasks,
      elevation: 12,
      borderRadius: 10,
      marginHorizontal:-18
    },
  });

export default Tasks
