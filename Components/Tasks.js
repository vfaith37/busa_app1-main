import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import {
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { Icon } from '../constants/icons';
import client from '../api/client';
import AnimatedLottieView from 'lottie-react-native';


const {width, height} = Dimensions.get("screen")

const taskH =height/12.2
const taskW = width*0.89


const Tasks = () => {
  const navigation = useNavigation()
    const [todos, setTodos] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 // const markTodoComplete = todoId => {
  //   const newTodosItem = todos.map(item => {
  //     if (item.id == todoId) {
  //       return {...item, completed: true};
  //     }
  //     return item;
  //   });

  //   setTodos(newTodosItem);
  // };

  // const deleteTodo = todoId => {
  //   const newTodosItem = todos.filter(item => item.id != todoId);
  //   setTodos(newTodosItem);
  // };

  // const clearAllTodos = () => {
  //   Alert.alert('Confirm', 'Clear todos?', [
  //     {
  //       text: 'Yes',
  //       onPress: () => setTodos([]),
  //     },
  //     {
  //       text: 'No',
  //     },
  //   ]);
  // };

    useEffect(() => {
        getAllTasks();
      }, []);


      const getAllTasks = async () => {
    setIsLoading(true);

        try {
          const userToken = await AsyncStorage.getItem("userToken");
          const value = await AsyncStorage.getItem("userInfo");
    
          if (userToken !== null && value !== null) {
            const userInfo = JSON.parse(value);
            setUserToken(userToken);
            setUserInfo(userInfo);
    
            const token = userToken;
    
            const formData = new FormData();
            formData.append("userId", userInfo._id);
    
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
              },
            };
    
            const res = await client.get(
              `/task/getMyTasks/${userInfo._id}`,
              config
            );
    
            const myTasks = res.data.data.slice(0,5);
            setTodos([...todos, ...myTasks]);
          }
        } catch (e) {
          console.log(`${e.message}`);
        } finally{
          setIsLoading(false);
        }
      };

      const DisplayTasks = ({todo}) => {
        return (
          <View>
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>{
              navigation.dispatch(
                CommonActions.navigate({
                  name: "Task",
                  params: {
                    screen: "TasksScreen",
                  },
                })
              );
            }}
            >
            <View
            style={{paddingTop:4, paddingLeft:15}}
             >
          <View style={styles.listItem}>
            <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:5, alignItems:"center", paddingLeft:70}}>
             
             <View style={{left:-30}}>
              <View style={{height:44, width:44, backgroundColor:COLORS.todoBackground, borderRadius:5, bottom:-45, left:-taskW*0.05, position:"absolute" }}>
                {/* here conditionally render the icon based on whether its an assignment or class or anyother */}
              <Icon 
               name={todo.name === "Personal" ? "person-outline" : todo.name === "Assignments"? "book-outline" : "calendar-outline"} 
              size={30} color={COLORS.white} style={{paddingTop:5, alignContent:"center", right:-8,}}/>
              </View>
              </View>

            <View 
            style={{top:40,}}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: COLORS.todo,
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                  fontFamily:"Poppins3",
                  top:-25,
                  lineHeight:24,
                  paddingLeft:15,
                  position:"absolute"
                }}>
                {todo?.title} 
              </Text>

              <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:85, right:70,}}>
              <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo, lineHeight:12.1}}>
                {todo?.venue} {"."}
                  </Text>
                  <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo, lineHeight:12.1}}>
                  {""} {todo?.time}
                  </Text>
              </View>
            </View>
            </View>
          </View>
            </View>
            </TouchableOpacity>
          </View>
        );
      };

  return (
    <View style={{paddingTop:20}}>
      <Text style={{fontFamily:"Poppins3", fontSize:22, fontWeight:"600", lineHeight:36, color:COLORS.feedcolor }}>Tasks</Text>
      {/* if todo from async storage is empty display no tasks set, else display tasks */}

       <View>
   {todos.map((todo)=>{
         return(
          <DisplayTasks todo ={todo} key={todo._id}/>
         )
        })}
        </View>

        {/* make sure the data is already fetched before displaying this if empty */}

        {todos.length === 0 && !isLoading &&(
        <View>
        <AnimatedLottieView
                 source={require("../assets/animations/tasks.json")}
                 autoPlay
                 loop
                 speed={0.5}
                 style={{
                  width:300, height:300, 
                  alignSelf:"center"
                 }}
                 />

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
            <Text style={{fontFamily:"Poppins", fontSize:13, paddingTop:3, textAlign:"center"}}>no tasks yet, click to set tasks</Text>
            </TouchableOpacity>
            </View>
         )} 
        
    </View>
  )
}


const styles = StyleSheet.create({
    listItem: {
    height:height/12.2,
    width:width*0.89,
      backgroundColor: COLORS.tasks,
      borderRadius: 10,
      marginHorizontal:-10,
      alignItems:"center",
      marginVertical:10,
      borderLeftWidth:12,
      borderLeftColor:COLORS.todoBackground
    },
  });

export default Tasks
