import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Tasks = () => {
    // get the added tasks from async storage then splice it to show first 5 and then if user clicks on it can navugate
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        getTodosFromUserDevice();
      }, []);


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
            <View style={{flex: 1,}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 15,
                  color: "#07081E",
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                  fontFamily:"Poppins3"
                }}>
                {todo?.task}
              </Text>
            </View>
            {!todo?.completed && (
              <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Icon name="done" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )}
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
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{}}>
            <Text>no tasks set, click to set tasks</Text>
            </TouchableOpacity>
            </View>
    
    }
    </View>
  )
}


const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
    },
    listItem: {
    //   padding: 20,
    height:60,
    width:300,
      backgroundColor: COLORS.tasks,
      flexDirection: 'row',
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10,
    },
    actionIcon: {
      height: 25,
      width: 25,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      marginLeft: 5,
      borderRadius: 3,
    },
    header: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default Tasks
