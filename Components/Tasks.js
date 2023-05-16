import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import {
  StackActions,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { Icon } from '../constants/icons';


const {width, height} = Dimensions.get("screen")


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
    

      const List =[
        {
          id:1,
          icon:"clipboard-outline",
          name:"All"
        },
        {
          id:2,
          icon:"calendar-outline",
          name:"Classes"
        },
      {
        id:3,
        icon:"book-outline",
        name:"Assignments"
      },
      {
        id:4,
        icon:"book-outline",
        name:"Assignments"
      },
      {
        id:5,
        icon:"book-outline",
        name:"Assignments"
      },
      {
        id:6,
        icon:"book-outline",
        name:"Assignments"
      },
      {
        id:7,
        icon:"book-outline",
        name:"Assignments"
      }
      ]

      const DisplayTasks = ({todo}) => {
        return (

          <View>
            <View style={{paddingTop:4, paddingLeft:15}}>
          <View style={styles.listItem}>
            <View style={{flexDirection:"row", justifyContent:"space-evenly", paddingTop:3, alignItems:"center"}}>

              <View style={{height:44, width:44, backgroundColor:COLORS.todoBackground, borderRadius:5, top:3, left:40, }}>
                {/* here conditionally render the icon based on whether its an assignment or class or anyother */}
              <Icon name={"people-outline"} size={30} color={COLORS.white} style={{paddingTop:5, alignContent:"center", right:-6}}/>
              </View>

            <View style={{paddingTop:-4,}}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: COLORS.todo,
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                  fontFamily:"Poppins3",
                  textAlign:"center",
                  paddingTop:15,
                  lineHeight:24
                }}>
                {/* {todo?.task}  */}
                Operations Research
              </Text>

              <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:85,}}>
              <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo,}}> Law Lecture Theatre {"."}
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

          </View>
        );
      };

  return (
    <View style={{paddingTop:20}}>
      <Text style={{fontFamily:"Poppins3", fontSize:22, fontWeight:"600", lineHeight:36, color:COLORS.feedcolor }}>Tasks</Text>
      {/* if todo from async storage is empty display no tasks set, else display tasks */}

       {todos.length>=1 ?
       // to avoid issues i have to  map throught he array to display the contents. only display first five
       <View>
   {todos.slice(0,5).map((todo)=>{
         return(
          <DisplayTasks todo ={todo} key={todo.id}/>
         )
        })}
        </View>

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
    height:height/13,
    width:width*0.85,
      backgroundColor: COLORS.tasks,
      borderRadius: 10,
      marginHorizontal:-10,
      alignItems:"center",
      marginVertical:10
    },
  });

export default Tasks
