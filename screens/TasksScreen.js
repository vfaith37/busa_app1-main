import React, {useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';
import { Icon } from '../constants/icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const {width, height} = Dimensions.get("screen")
  

const List =[
  {
    icon:"clipboard-outline",
    name:"All"
  },
  {
    icon:"calendar-outline",
    name:"Classes"
  },
{
  icon:"book-outline",
  name:"Assignments"
}
]

const TasksScreen =()=>{

  const navigation = useNavigation()
    const [todos, setTodos] = React.useState([]);
    const [textInput, setTextInput] = React.useState('');
  
    useEffect(() => {
      getTodosFromUserDevice();
    }, []);

    const Date = moment()
    const todaysDate = Date.format("Do MMMM, YYYY")
  
    // React.useEffect(() => {
    //   saveTodoToUserDevice(todos);
    // }, [todos]);
  
    // const addTodo = () => {
    //   if (textInput == '') {
    //     Alert.alert('Error', 'Please input todo');
    //   } else {
    //     const newTodo = {
    //       id: Math.random(),
    //       task: textInput,
    //       completed: false,
    //     };
    //     setTodos([...todos, newTodo]);
    //     setTextInput('');
    //   }
    // };
  
    // const saveTodoToUserDevice = async todos => {
    //   try {
    //     const stringifyTodos = JSON.stringify(todos);
    //     await AsyncStorage.setItem('todos', stringifyTodos);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
    const getTodosFromUserDevice = async () => {
      try {
        const todos = await AsyncStorage.getItem('todos');
        if (todos !== null) {
          setTodos(JSON.parse(todos));
        }
        console.log(todos)
      } catch (error) {
        console.log(error);
      }
    };
  
    const markTodoComplete = todoId => {
      const newTodosItem = todos.map(item => {
        if (item.id == todoId) {
          return {...item, completed: true};
        }
        return item;
      });
  
      setTodos(newTodosItem);
    };
  
    const deleteTodo = todoId => {
      const newTodosItem = todos.filter(item => item.id != todoId);
      setTodos(newTodosItem);
    };
  
    const clearAllTodos = () => {
      Alert.alert('Confirm', 'Clear todos?', [
        {
          text: 'Yes',
          onPress: () => setTodos([]),
        },
        {
          text: 'No',
        },
      ]);
    };


    // const Categories =({item})=>{
    //   return(
    //     <>
    //     <TouchableOpacity activeOpacity={0.7} onPress={()=>{}}>
    //     <View style={{paddingHorizontal:5  }}>
    //   <View style={{width:115, height:45, backgroundColor:COLORS.todoInactive, borderRadius:20,}}>
    //           <View style={{flexDirection:"row", justifyContent:"space-evenly", paddingTop:10}}>
    //         <Icon name={item.icon} size={20} color={COLORS.black} style={{}}/>
    //         <Text style={{fontFamily:"Poppins", fontSize:13, lineHeight:21, color:COLORS.black, }}>{item.name}</Text>
    //           </View>
    //         </View>
    //     </View>
    //     </TouchableOpacity>
    //     </>
    //   )
    // }
  
    const ListItem = ({todo}) => {

      return (

        <View style={{marginVertical:10}}>
          <View style={styles.listItem}>

            <View style={{flexDirection:"row", justifyContent:"space-evenly", paddingTop:-3, alignItems:"center"}}>
                  
              <View style={{height:50, width:44, backgroundColor:"#0E23F0", borderRadius:11, top:3, left:40, }}>
                {/* here conditionally render the icon based on whether its an assignment or class or anyother */}
              <Icon name={todo.category === "Personal" ? "people-outline" : todo.category ==="Classes" ? "calendar-outline" : "book-outline"} size={30} color={COLORS.white} style={{paddingTop:6, alignContent:"center", right:-6}}/>
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
                {todo?.title}
              </Text>

              <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:85}}>
              <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo }}>
                {todo?.venue} {"."}
                  </Text>
                  <Text style={{fontSize:10, fontFamily:"Poppins", color:COLORS.todo}}>
                    {/* {todo?.time} */}
                   {""} {todo?.time}
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>

          <View style={{paddingTop:5,
          paddingLeft:30,}}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: COLORS.black,
              fontFamily:"Poppins3"
            }}>
            My Tasks
          </Text>
          {/* <Icon name="delete" size={25} color="red" onPress={clearAllTodos} /> */}
        </View>
          
          {/* <View style={{paddingTop:20}}>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={List}
            renderItem={({item})=> <Categories item={item}/>}
            />
          </View> */}

          <View style={{flexDirection:"row", paddingTop:23, justifyContent:"space-between"}}>
          <Text style={{fontFamily:"Poppins3", fontSize:24, fontWeight:"400"}}>Today</Text>
           <Text style={{fontFamily:"Poppins", fontSize:14, lineHeight:21, color:COLORS.black, paddingRight:20, paddingTop:12 }}>{todaysDate}</Text>
          </View>



        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={todos}
          renderItem={({item}) => <ListItem todo={item} />}
        />
  
        <View style={styles.footer}>
          {/* <View style={styles.inputContainer}>
            <TextInput
              value={textInput}
              placeholder="Add Todo"
              onChangeText={text => setTextInput(text)}
            />
          </View> */}

          
          <TouchableOpacity
          onPress={()=> navigation.navigate("AddTasksScreen")}
           >
            <View style={styles.iconContainer}>
              <Icon name="add" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
          </View>
      </SafeAreaView>
    );
  };
  
  
  const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      // bottom: 0,
      // width: '100%',
      // flexDirection: 'row',
      // alignItems: 'center',
      // paddingHorizontal: 20,
      // backgroundColor: COLORS.white,
      paddingTop:height/1.9,
      right:30,

    },
    inputContainer: {
      height: 50,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      flex: 1,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 30,
    },
    iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: COLORS.todoBackground,
      elevation: 40,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    listItem: {
      height:65,
      width:300,
        backgroundColor: COLORS.tasks,
        borderRadius: 10,
        marginHorizontal:-18
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
      paddingTop: 20,
    },
  });

  export default TasksScreen