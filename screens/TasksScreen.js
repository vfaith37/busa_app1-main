import React, {
  useCallback,
  useEffect,
  useState,
  useLayOutEffect,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/theme";
import { Icon } from "../constants/icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import client from "../api/client";
import { useIsFocused } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";


const { width, height } = Dimensions.get("screen");

const List = [
  {
    icon:"clipboard-outline",
    name:"AllTasks"
  },
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
  {
    icon:"book-outline",
    name:"Personal"
  },
  {
    icon:"book-outline",
    name:"Incompleted"
  },
  {
    icon:"book-outline",
    name:"Completed"
  }
];

const TasksScreen = () => {
  
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState("");
  const [clicked, setClicked] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tomorrowtasks, setTomorrowsTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [otherdaysTasks, setOtherDaysTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTaskData, setAllTaskData] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filterName, setFilterName] = useState("")
  // const [isFirstLoad, setIsFirstLoad] = useState(true)
  // const [initialLanding, setInitialLanding] = useState([])
  // const [completedTasks, setCompletedTasks] = useState([])


  // const isFocused = useIsFocused();

  const todaysDate = moment().format("Do MMMM YYYY");
  const today = moment();
  const tomorrow = today.add(1, "days");
  const nextDate = tomorrow.format("Do MMMM YYYY");

  // for better code optimization and efficiency when the screen is focused, run filter function for the current name before the user was navigated back
  
  // useEffect(() => {
  //   setTasks([]);
  //   // setTodos([])
  //   getAllTasks();
  //   setRefresh(false);
  //   setIsFirstLoad(false)
  // }, [refresh, isFocused]);


 
  // only run this hook when the screen is ficused and not when navigating between tabs
useFocusEffect(
  useCallback(()=>{
      getAllTasks()
  },[])
)

// don't forget to add the logic for initial landing from async storage. 

  const getAllTasks = async () => {
    setIsLoading(true)

    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const value = await AsyncStorage.getItem("userInfo");
      // const filtername = await AsyncStorage.getItem("filtername");
      

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
        setTasks(myTasks);
        setTaskData(myTasks);
        setAllTaskData(myTasks)

        console.log(name)
        console.log(tasks)

        // when user is navigated back, the name is now emoty so the filter function doesn't work

        if(name === "" || name !==""){
      const filtername = await AsyncStorage.getItem("filtername");
                 if(filtername !==null && filtername !== "AllTasks"){
                   setFilterName(filtername)
        console.log(filtername)
             
        const value = res.data.data

                   const today = moment();
                   const currentDate = today.format("DD/MM/YYYY");
                   
                   filterTasks(value,  filtername, currentDate);
                   filterTomorrowsTasks(value, filtername);
                  //  filterOtherDaysTasks(value, filtername);
                 }  
                 
                 if(filtername === "AllTasks"){
                  setAllTaskData(value)
                 }

                 }
      }
    } catch (e) {
      console.log(e);
    }finally{
      setIsLoading(false)
    }
  };


  const filterTasks = (arr, type, date) => {
    let filteredTasks = [];
    const dates = moment(date, "DD/MM/YYYY");

    arr.filter((task) => {
      const taskDate = moment(task.date, "DD/MM/YYYY");
                                              
      if (
        ((task.category === type || type === "All") || (task.completed === false && type === "Incompleted") || (task.completed === true && type ==="Completed"))  &&
        taskDate.isSame(dates)
      ) {
        filteredTasks.push(task);
      }

      // console.log(filteredTasks)
      setTodos(filteredTasks);
      return filteredTasks;
      // if there's date, so as to show it the next day
      // then filter this tasks by day
    });
  };


  const filterTomorrowsTasks = (arr, type) => {

    // here the function sif current date passed is not behind the task.date that means the date is tomorrow
    let filteredTomorrowsTasks = [];
    // const today = moment()
    const tomorrow = moment().add(1, "days").startOf("day");
    // const today = date.format("DD/MMMM/YYYY")
    // Get the current date

    arr.filter((task) => {
      if (
        ((task.category === type || type === "All") || (task.completed === false && type === "Incompleted") || (task.completed === true && type === "Completed")) &&
        moment(task.date, "DD/MM/YYYY").isSame(tomorrow, "day")
      ) {
        filteredTomorrowsTasks.push(task);
      }

      console.log(filteredTomorrowsTasks)
      setTomorrowsTasks(filteredTomorrowsTasks);
      return filteredTomorrowsTasks;
    });
  };


  const filterOtherDaysTasks = (arr, type) => {
    let filteredOtherDaysTasks = [];
    const tomorrow = moment().add(1, "days").startOf("day");
    console.log(tomorrow)

    arr.filter((task) => {
      if (
        ((task.category === type || type === "All") || (task.completed === false && type === "Incompleted") || (task.completed === true && type ==="Completed")) &&
        moment(task.date, "DD/MM/YYYY").isAfter(tomorrow, "day")
      ) {
        filteredOtherDaysTasks.push(task);
      }
      
      console.log(filteredOtherDaysTasks)
      setOtherDaysTasks(filteredOtherDaysTasks);
      return filteredOtherDaysTasks;
    });
  };


  const Categories = ({ item }) => {
    const today = moment();
    const currentDate = today.format("DD/MM/YYYY");
     
    const names = item.name
    const handlePress = async ()=>{
      setName(names);

            // then save to async storage
            await AsyncStorage.setItem("filtername", names)

            if (names === "AllTasks"){
                    setAllTaskData(tasks)
            }else{
              filterTasks(tasks, names, currentDate);
              filterTomorrowsTasks(tasks, names);
               filterOtherDaysTasks(tasks, names);
            } 
    }

    return (
      <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={async() => {
          //   setName(item.name);
          //   console.log(item.name)

            
          //   if (item.name === "AllTasks"){
          //     setAllTaskData(tasks)
          //     await AsyncStorage.setItem("filtername", "AllTasks")
          //     const res = await AsyncStorage.getItem("filtername"); 
             
          //   }else{
          //     filterTasks(tasks, item.name, currentDate);
          //     filterTomorrowsTasks(tasks, item.name);
          //     filterOtherDaysTasks(tasks, item.name);
          //     await AsyncStorage.setItem("filtername", item.name)
          //   } 

          //   // await AsyncStorage.setItem("filtername", item.name)

          // }}

          onPress={handlePress}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <View
              style={{
                width: 115,
                height: 45,
                backgroundColor: COLORS.todoInactive,
                borderRadius: 20,
                borderColor:
                  name ===  names ? COLORS.todoBackground : "transparent",
                borderWidth: name === names ? 2 : 0.5,
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
      </View>
      </>
    );
  };

  const ListItem = ({ todo, type}) => {
    // here, todo already contains filtered tasks by category and date

    return (
      <ScrollView>
        <View style={{ marginVertical: 10 }}>
          {type === "AllTasks" && (
            <>
             <CheckBox
        // value={selectedTasks.includes(todo._id)}
        // onValueChange={() => toggleTaskSelection(todo._id)}
        checked={selectedTasks.includes(todo._id)}
        onPress={() => toggleTaskSelection(todo._id)}
      />
            </>
          )}
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
          </View>
        </View>
      </ScrollView>
    );
  };


  const InitialLanding =()=>{
    return(
      <>
         <View
                  style={{
                    paddingTop: 40,
                  }}
                >
                  {/* <Text
                    style={{
                      fontFamily: "Poppins3",
                      fontSize: 24,
                      fontWeight: "400",
                      lineHeight: 36,
                    }}
                  >
                    Completed Tasks
                  </Text> */}
       {/* <FilteredDatas type={"Completed"}/> */}

       <Text>Pls i'm to tell bro praise or bro taiwo to pls give a ui for this</Text>
                </View>
      </>
    )
  }


  const AllTasks =()=>{
    return(
      <FilteredDatas type={"AllTasks"}/>
    )
  }

  const toggleTaskSelection = (taskId) => {

    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((_id) => _id !== taskId);
      }
      console.log([prevSelectedTasks, taskId])
      return [...prevSelectedTasks, taskId];
    });
  };


  const handleDeleteTasks = async () => {

    console.log("delete")
    if (selectedTasks.length === 0) {
      Alert.alert('No tasks selected', 'Please select tasks to delete');
      return;
    }

     setIsLoading(true)


    // Alert.alert('Confirm Deletion', 'Are you sure you want to delete the selected tasks?', [
    //   {
    //     text: 'Cancel',
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'Delete',
    //     onPress: async () => {
    //       setIsLoading(true);
    //       try {
    //         // Make the API call to delete tasks
    //         const response = await fetch('/api/tasks/delete', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ taskIds: selectedTasks }),
    //         });

    //         if (response.ok) {
    //           // Delete tasks from the UI optimistically
    //           setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
    //           setSelectedTasks([]);
    //         } else {
    //           // Revert the UI to the previous state and show an error message
    //           Alert.alert('Error', 'Failed to delete tasks. Please try again later.');
    //         }
    //       } catch (error) {
    //         // Handle the error and show appropriate message to the user
    //         Alert.alert('Error', 'Failed to delete tasks. Please try again later.');
    //       }
    //       setIsLoading(false);
    //     },
    //   },
    // ]);

// Store the previous state
const prevTasks = tasks;
const prevSelectedTasks = selectedTasks;


setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
setSelectedTasks([]);


// Make the API call to delete tasks
// make sure to use axios
await fetch('/api/tasks/delete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ taskIds: selectedTasks }),
})
  .then((response) => {
    if (!response.ok) {
      // Revert the UI to the previous state and show an error message
      setTasks(prevTasks);
      setSelectedTasks(prevSelectedTasks);
      Alert.alert('Error', 'Failed to delete tasks. Please try again later.');
    }
  })
  .catch((error) => {
    // Handle the error and show appropriate message to the user
    console.log(error)
    setTasks(prevTasks);
    setSelectedTasks(prevSelectedTasks);
    Alert.alert('Error', 'Failed to delete tasks. Please try again later.');
  }).finally(()=>{
    setIsLoading(false)
  });
  };



  const handleCompleteTasks = async () => {
    if (selectedTasks.length === 0) {
      Alert.alert('No tasks selected', 'Please select tasks to mark as completed');
      return;
    }

    setIsLoading(true);

//     try {
//       // Make the API call to update tasks as completed
//       const response = await fetch('/api/tasks/complete', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ taskIds: selectedTasks }),
//       });

//       if (response.ok) {
//         // Update tasks as completed in the UI optimistically
//         setTasks((prevTasks) =>
//           prevTasks.map((task) =>
//             selectedTasks.includes(task._id) ? { ...task, completed: true } : task
//           )
//         );
//         setSelectedTasks([]);
//       } else {
//   // Revert the UI to the previous state and show an error message
//   Alert.alert('Error', 'Failed to mark tasks as completed. Please try again later.');
// }
// }
// catch (error) {
//   // Handle the error and show appropriate message to the user
//   Alert.alert('Error', 'Failed to mark tasks as completed. Please try again later.');
// }
// finally{
//   setIsLoading(false);
// }

const prevTasks = tasks;
const prevSelectedTasks = selectedTasks;

// perform optimization code before deleting for best user experience
try{
  // Store the previous state


  setTasks((prevTasks) =>
            prevTasks.map((task) =>
              selectedTasks.includes(task._id) ? { ...task, completed: true } : task
            )
          );
          setSelectedTasks([]);
  
              const response = await fetch('/api/tasks/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskIds: selectedTasks }),
        });
  
  
        if (!response.ok) {
        // Revert the UI to the previous state and show an error message
        setTasks(prevTasks);
        setSelectedTasks(prevSelectedTasks);
        Alert.alert('Error', 'Failed to mark tasks. Please try again later.');   
               
                }

}catch (error){
  // Handle the error and show appropriate message to the user
  setTasks(prevTasks);
  setSelectedTasks(prevSelectedTasks);
  Alert.alert('Error', 'Failed to mark tasks as complete. Please try again later.');

} finally{
setIsLoading(false)
}
  }


  const FilteredDatas = ({type})=>{
    return(
      <>
      <View>
        {type === "AllTasks" ? 
        <View style={{paddingTop:20}}>
               {/* map through the task data and display it. */}

               <View style={{flexDirection:"row", justifyContent:"space-between"}}>
               <TouchableOpacity 
              onPress={handleCompleteTasks}
               >
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Icon name="checkbox-outline" size={20} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={handleDeleteTasks}
              >
              <View style={[styles.actionIcon, {right:30, position:"absolute"}]}>
                <Icon name="trash-outline" size={20} color="red" />
              </View>
            </TouchableOpacity>
            </View>

            {tasks.map((item) => {
                 return <ListItem todo={item} key={item._id}
                 type={"AllTasks"}
            />;
               })}





          {/* {!todo?.completed && (
              <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Icon name="book-outline" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <View style={styles.actionIcon}>
                <Icon name="delete" size={20} color="white" />
              </View>
            </TouchableOpacity> */}

          </View>
          :
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
                  {todos.length === 0 && !isLoading && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
            onPress={()=>{
              // {type === "Completed" ? null : navigation.navigate("AddTasksScreen")}
              {(type === name && name === "Completed") ? null : navigation.navigate("AddTasksScreen")}
            }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 13,
                        paddingTop: 3,
                      }}
                    >
                      {/* {type === "Completed" ? "no completed tasks":"no tasks set, click to set tasks"} */}

                      { (type === name && name === "Completed") ? `You have ${todos.length} completed tasks`:"no tasks set, click to set tasks"}

                       
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
        
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
        
              {tomorrowtasks.length === 0 && !isLoading && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
             onPress={()=>{
              // {type === "Completed" ? null : navigation.navigate("AddTasksScreen")}

              {(type === name && name === "Completed") ? null : navigation.navigate("AddTasksScreen")}
             }} 

                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 13,
                        paddingTop: 3,
                      }}
                    >
                      {/* {type === "Completed" ? `You have ${tomorrowtasks.length} completed tasks`:"no tasks for tommorrow, click to set tasks"} */}

                      { (type === name && name === "Completed") ? `You have ${tomorrowtasks.length} completed tasks`:"no tasks for tommorrow, click to set tasks"}

                  
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
{/*          
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
                  Coming Days
                </Text>
              </View>  */}
              {/* {otherdaysTasks.map((item) => {
                return <ListItem todo={item} key={item._id} />;
              })} */}
        
              {/* {otherdaysTasks.length === 0 && !isLoading && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={()=>{
                      // {type === "Completed" ? null : navigation.navigate("AddTasksScreen")}
                      {(type === name && name === "Completed") ? null : navigation.navigate("AddTasksScreen")}

                     

                     }} 
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 13,
                        paddingTop: 3,
                      }}
                    >
                       {/* {type === "Completed" ? "no completed tasks" : "no tasks for coming days, click to set tasks"} */}
                      

                     {/* {(type === name && name === "Completed") ? `You have ${otherdaysTasks.length} completed tasks`:"no tasks for other days, click to set tasks"} 
                     </Text>
                  </TouchableOpacity>
                </View> */}
              {/* )}   */}
              </View>
      }
      </View>
         
      </>
    )
  }



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
          contentContainerStyle={{ height: height * 6 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
           {

       isLoading? (
          <View>
             <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 13,
            paddingTop: 10,
          }}
        >
          loading.....
        </Text>
            </View>
           ):
           // write another loop for if the task length >=1 there's no name and there's data from the async storage. i.e the user reopened the app again
           (tasks.length >=1 && name === "" && filterName !== "")
           ?
           <View>
            <InitialLanding/>
            </View>
            :
           ((todos.length > 0 || tomorrowtasks.length > 0 || otherdaysTasks.length > 0)  && (name !=="" && name !== "AllTasks"))
           ?
            <FilteredDatas type={"Filters"}/>
              :
              ((todos.length ===0 && tomorrowtasks.length ===0 && otherdaysTasks.length ===0) && tasks.length ===0)
              ?
              <View>
                {/* <InitialLanding/>
                 */}
                 <Text>Landed initially</Text>
                </View>
                :
                ((todos.length ===0 && tomorrowtasks.length ===0 && otherdaysTasks.length ===0) && tasks.length >=1 && (name !=="" && name !== "AllTasks"))
              ?
              // here type can be name so that if the user selects on completed he can see all the completed tasks
              //pass name into the FilteredDatas and if name === "Completed" show a different message
              // also it should show all other names apart from the AllTasks

            <FilteredDatas type={name}/>
               :
               ((todos.length ===0 && tomorrowtasks.length ===0 && otherdaysTasks.length ===0) && tasks.length >=1 && name === "")
               ?
               <View>
                <Text>Landed initially</Text>
                </View>
                :
                name === "AllTasks" &&
                (
                <View>
                  <AllTasks/>
                  </View>
                )
          }
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
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    paddingTop: 20,
  },
});

export default TasksScreen;
