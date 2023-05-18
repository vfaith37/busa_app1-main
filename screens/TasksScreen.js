import React, {  useCallback, useEffect, useState } from "react";
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
  YellowBox,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/theme";
import { Icon } from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import client from "../api/client";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const List = [
  {
    icon: "clipboard-outline",
    name: "All",
  },
  {
    icon: "calendar-outline",
    name: "Classes",
  },
  {
    icon: "book-outline",
    name: "Assignments",
  },
  // {
  //   icon:"book-outline",
  //   name:"Incompleted"
  // }
];

const TasksScreen = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [clicked, setClicked] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tomorrowtasks, setTomorrowsTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [otherdaysTasks, setOtherDaysTasks] = useState([])

  useEffect(() => {
    getAllTasks();
  }, []);

  

  const todaysDate = moment().format("Do MMMM YYYY");
  const today = moment();
  const tomorrow = today.add(1, "days");
  const nextDate = tomorrow.format("Do MMMM YYYY");

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

  // const getTodosFromUserDevice = async () => {
  //   try {
  //     const todos = await AsyncStorage.getItem('todos');
  //     if (todos !== null) {
  //       setTodos(JSON.parse(todos));
  //     }
  //     console.log(todos)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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


  
  
  const getAllTasks =  async() => {
    //     const today = moment();
    // const currentDate = today.format("DD/MM/YYYY");
    
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
          
          const myTasks = res.data.data;
          // setTasks(tasks=>[...tasks, myTasks]);
          console.log(myTasks)
          setTasks(myTasks)
          // setTasks([...tasks,  myTasks]);
        }
      } catch (e) {
        console.log(`${e.message}`);
      }
  };



  
  //   const getTasksByDate = async ()=>{
  // // here get atsks by current date
  
  // try {
  //   const userToken = await AsyncStorage.getItem("userToken");
  //   const value = await AsyncStorage.getItem("userInfo");
  
  //   if (userToken !== null && value !== null) {
  //     const userInfo = JSON.parse(value);
  //     setUserToken(userToken);
  //     setUserInfo(userInfo);

  //     const token = userToken;

  //       const formData = new FormData()
  //     formData.append("date", "27/05/2023")

  //                 const config = {
  //                   headers: {
  //                     Authorization: `Bearer ${token}`,
  //                    "content-type": "multipart/form-data",
  //                   },
  //                  };

  //                 const res = await client.get(`/task/getTasksByDate`, formData, config)
  //                 console.log(res.data.data)

  //                 const myTasks = res.data.data
  //                 setTasks([...tasks, ...myTasks])

  //   }
  // } catch (e) {
  //   console.log(`${e.message}`);
  // }

  //   }

  // const groupTaskByDate = (tasks) => {
  //   let result = {};
  //   tasks.forEach(task => {
  //     let dateIndex = task.date;
  //     if(!result[dateIndex]){
  //       result[dateIndex] = [];
  //     }
  //     result[dateIndex].push(task);

  //   });
  //   console.log(result)
  //   // setTodos(result)
  //   console.log(todos)
  //   return result;
  // }

  const filterTomorrowsTasks = (arr, type) => {
    // here the function sif current date passed is not behind the task.date that means the date is tomorrow
    let filteredTomorrowsTasks = [];
    // const today = moment()
    const tomorrow = moment().add(1, 'days').startOf('day');
    // const today = date.format("DD/MMMM/YYYY")
    // Get the current date

    arr.forEach((task) => {
      if (
        task.category === type &&
        moment(task.date, "DD/MM/YYYY").isSame(tomorrow, "day")
      ) {
        filteredTomorrowsTasks.push(task);
      
        setTomorrowsTasks(filteredTomorrowsTasks);
      }

      if (type === "All" && moment(task.date, "DD/MM/YYYY").isSame(tomorrow, "day")) {
        filteredTomorrowsTasks.push(task);
        setTomorrowsTasks(filteredTomorrowsTasks);
      }

       console.log(filteredTomorrowsTasks)
      return filteredTomorrowsTasks;
    });
  };

  const filterTasks = (arr, type, date) => {

    const dates = moment(date, "DD/MM/YYYY");
    let filteredTasks = [];

    arr.forEach((task) => {
      const taskDate = moment(task.date, "DD/MM/YYYY");

      if (task.category === type && taskDate.isSame(dates)) {
        filteredTasks.push(task);
        setTodos(filteredTasks);
      }

      if (type === "All" && taskDate.isSame(dates)) {
        filteredTasks.push(task);
        setTodos(filteredTasks);
      }
         
      console.log(filteredTasks)
       return filteredTasks;
      // if there's date, so as to show it the next day
      // then filter this tasks by day
    });
  };

  const IncompletedTasks = () => {};


  const filterOtherDaysTasks = (arr, type) => {
    let filteredOtherDaysTasks = [];
    const tomorrow = moment().add(1, 'days').startOf('day');
  
    arr.forEach((task) => {
      if (
        task.category === type &&
        moment(task.date, "DD/MM/YYYY").isAfter(tomorrow, "day")
      ) {
        filteredOtherDaysTasks.push(task);
      
        setOtherDaysTasks(filteredOtherDaysTasks);
      }

      if (type === "All" && moment(task.date, "DD/MM/YYYY").isAfter(tomorrow, "day")) {
        filteredOtherDaysTasks.push(task);
        setOtherDaysTasks(filteredOtherDaysTasks);
      }

       console.log(filteredOtherDaysTasks)
      return filteredOtherDaysTasks;
    });
  };




  

  const Categories = ({ item }) => {
    const today = moment();
    const currentDate = today.format("DD/MM/YYYY");

    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
           setName(item.name);

            filterTasks(tasks, item.name, currentDate);
            filterTomorrowsTasks(tasks, item.name);
            filterOtherDaysTasks(tasks, item.name)
            //  setClicked(clicked);
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <View
              style={{
                width: 115,
                height: 45,
                backgroundColor: COLORS.todoInactive,
                borderRadius: 20,
                borderColor:
                name === item.name ? COLORS.todoBackground : "transparent",
                borderWidth: name === item.name ? 2 : 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingTop: 10,
                }}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color={COLORS.black}
                  style={{}}
                />
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 13,
                    lineHeight: 21,
                    color: COLORS.black,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const ListItem = ({ todo }) => {
    // here, todo already contains filtered tasks by category and date

    return (
      <ScrollView>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.listItem}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingTop: -3,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 44,
                  backgroundColor: "#0E23F0",
                  borderRadius: 11,
                  top: 3,
                  left: 40,
                }}
              >
                {/* here conditionally render the icon based on whether its an assignment or class or anyother */}
                <Icon
                  name={
                    todo.category === "Personal"
                      ? "people-outline"
                      : todo.category === "Classes"
                      ? "calendar-outline"
                      : "book-outline"
                  }
                  size={30}
                  color={COLORS.white}
                  style={{ paddingTop: 6, alignContent: "center", right: -6 }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 18,
                    color: COLORS.todo,
                    textDecorationLine: todo?.completed
                      ? "line-through"
                      : "none",
                    fontFamily: "Poppins3",
                    textAlign: "center",
                    paddingTop: 15,
                  }}
                >
                  {todo?.title}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 85,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Poppins",
                      color: COLORS.todo,
                    }}
                  >
                    {todo?.venue} {"."}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Poppins",
                      color: COLORS.todo,
                    }}
                  >
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
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ paddingTop: 40, paddingLeft: 30 }}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 24,
              color: COLORS.black,
              fontFamily: "Poppins3",
            }}
          >
            My Tasks
          </Text>
          {/* <Icon name="delete" size={25} color="red" onPress={clearAllTodos} /> */}
        </View>

        <View style={{ paddingTop: 20 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={List}
            renderItem={({ item }) => <Categories item={item} />}
          />
        </View>

        {/* where the filtering should start */}

        <ScrollView
          contentContainerStyle={{ height: height * 1.5 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 40,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins3",
                  fontSize: 24,
                  fontWeight: "400",
                  lineHeight: 36,
                }}
              >
                Today
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: 21,
                  color: COLORS.black,
                  paddingRight: 20,
                  paddingTop: 8,
                }}
              >
                {todaysDate}
              </Text>
            </View>

            {todos.map((item) => {
              return <ListItem todo={item} key={item._id} />;
            })}

            <View
              style={{
                flexDirection: "row",
                // bottom: 90,
                paddingTop: 30,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins3",
                  fontSize: 24,
                  fontWeight: "400",
                  lineHeight: 36,
                }}
              >
                Tommorow
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: 21,
                  color: COLORS.black,
                  paddingRight: 20,
                  paddingTop: 8,
                }}
              >
                {nextDate}
              </Text>
            </View>

            {tomorrowtasks.map((item) => {
              return <ListItem todo={item} key={item._id} />;
            })}


              <View
              style={{
                flexDirection: "row",
                paddingTop: 40,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins3",
                  fontSize: 24,
                  fontWeight: "400",
                  lineHeight: 36,
                }}
              >
              Other Days
              </Text>
              {/* <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: 21,
                  color: COLORS.black,
                  paddingRight: 20,
                  paddingTop: 8,
                }}
              >
              </Text> */}
            </View>
            {otherdaysTasks.map((item) => {
              return <ListItem todo={item} key={item._id} />;
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {/* <View style={styles.inputContainer}>
            <TextInput
            value={textInput}
            placeholder="Add Todo"
            onChangeText={text => setTextInput(text)}
            />
          </View> */}

          <TouchableOpacity
            onPress={() => navigation.navigate("AddTasksScreen")}
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
    position: "absolute",
    paddingTop: height / 1.4,
    right: 30,
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
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    height: 65,
    width: 320,
    backgroundColor: COLORS.tasks,
    borderRadius: 10,
    // marginHorizontal: -18,
  },

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    paddingTop: 20,
  },
});

export default TasksScreen;
