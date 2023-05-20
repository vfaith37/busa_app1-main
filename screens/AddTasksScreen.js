import { StyleSheet, Text, SafeAreaView, View, Dimensions, TouchableOpacity, ScrollView, TextInput, Alert, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { Dropdown } from 'react-native-element-dropdown'
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import "intl";
import "intl/locale-data/jsonp/en-GB";
import { Calendars, Time, Back } from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormInput } from '../Components/FormInput';
import { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ErrorButton from '../Components/ErrorButton';
import { useEffect } from 'react';
import client from '../api/client';


const {width, height} = Dimensions.get("screen")

const AddTasksScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");
    const [todos, setTodos] =  useState([]);
const [taskValues, setTaskValues] = useState("")

    const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
    const component ="Task"

    const today = new Date();
    const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 3);

    const Categories = [
        {
          label: "Personal",
          value: "Personal",
        },
        { label: "Classes", value: "Classes" },
        { label: "Assignments", value: "Assignments" },
      ];


      const validationSchemaTasks = Yup.object({
        title: Yup.string().required("Title is required!"),
        description: Yup.string().required("Description is required!"),
        category: Yup.string().required("Category is required!"),
        date: Yup.string().required("select date!"),
        time: Yup.string().required("select time!"),
        venue: Yup.string().required("venue required!"),
      });
    



const addTasks = async(values)=>{
  setError(false)
try{
  const userToken = await AsyncStorage.getItem("userToken");
  const value = await AsyncStorage.getItem("userInfo")

  if (userToken !== null && value !== null) {
    const userInfo = JSON.parse(value)
setUserToken(userToken);
setUserInfo(userInfo);

const token = userToken
const config = {
 headers: {
   Authorization: `Bearer ${token}`,
  "content-type": "multipart/form-data",
 },
};

const formData = new FormData()
formData.append("title", values.title);
formData.append("description", values.description);
formData.append("venue", values.venue);
formData.append("date", values.date);
formData.append("time", values.time);
formData.append("category", values.category)
formData.append("userId", userInfo._id)



console.log(formData)
console.log(userInfo)
console.log(userToken)
console.log(values)

const res =  await client.post(
 `/task/addTask`,
 formData,
 config
);
      console.log(res)

if(res.status === 200){
  navigation.navigate("TasksScreen");
}

}

}catch(e){
 setErrorMessage( e.message ? e.message : "Oops! Something went wrong. Please try again later.");
  
}

}



// const saveTodoToUserDevice = async todos => {
//     try {
//         const stringifyTodos = JSON.stringify(todos);


//         // first check if emoty then set it, i
//         // if( stringifyTodos !== null ){
//         //   await AsyncStorage.setItem('todos', stringifyTodos);
//         //   console.log(stringifyTodos)
//         //   setError(true)
//         //   setErrorMessage("Tasks Added Successfully")
//         // }

//        await AsyncStorage.setItem('todos', stringifyTodos);
//           console.log(stringifyTodos)
//       } catch (error) {
//         console.log(error);
//       }
//     };




return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
    <View style={{ alignSelf: "center", width: width - 40, paddingTop: 70, }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Back color={"#707070"} size={30} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Poppins3",
            alignItems: "center",
            fontSize: 28,
            position: "absolute",
            left: 100,
          }}
        >
          New {component}
        </Text>
      </View>
      <Formik
        initialValues={{
          description: "",
          title: "",
          category: "",
          date: "",
          time: "",
          venue: "",
        }}
         onSubmit={addTasks}
       validationSchema={validationSchemaTasks}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          const { title, description, category, venue } = values;
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{ height: height * 1.5 }}
            >
              <View style={{ top: 20 }}>
                  <Text  style={{
                      fontSize: 22,
                      paddingTop: 10,
                      fontFamily: "Poppins3",
                      color:COLORS.todoText
                    }}>Details</Text>
                <FormInput
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  error={touched.title && errors.title}
                  value={title}
                  placeholder="Title"
                  TextInputStyle={styles.input}
                  />

                {component === "Task" ? (
                  <View style={{ top: 10, padding: 3 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 7,
                      }}
                    >
                      <Text style={{ fontFamily: "Poppins3", color: COLORS.todoText, fontSize:18}}>
                        Date
                      </Text>
                      <Text style={{ fontFamily: "Poppins3", color: COLORS.todoText, fontSize:18}}>
                        Time
                      </Text>
                    </View>

                    {show && (
                      <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        minimumDate={today}
                        maximumDate={maxDate}
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShow(false);
                          // console.log("onChange called"); // add this line
                          const currentDate = selectedDate || date;
                          setDate(currentDate);
                          setFieldValue(
                            "date",
                            new Intl.DateTimeFormat("en-GB").format(currentDate)
                          );
                          const formattedTime = currentDate
                            .toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                            .replace(" ", "");
                          setFieldValue("time", formattedTime);
                        }}
                      />
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={[
                          styles.dateContainer,
                          {
                            justifyContent: "space-around",
                            flexDirection: "row",
                            right: 10,
                            width: width / 2.7,
                            height: 50,
                            backgroundColor: COLORS.todoInput,
                          },
                        ]}
                      >
                        {errors.date && touched.date && (
                          <Text style={[styles.error, { top: -33, right: 10 }]}>
                            {errors.date}
                          </Text>
                        )}
                        <Text style={ { marginTop: 13, fontFamily:"Poppins", }}>
                          {new Intl.DateTimeFormat("en-GB").format(date)}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            setMode("date");
                            setShow(true);
                          }}
                        >
                          {Calendars}
                        </TouchableOpacity>
                      </View>

                      <View
                        style={[
                          styles.dateContainer,
                          {
                            justifyContent: "space-around",
                            flexDirection: "row",
                            right: -10,
                            width: width / 2.7,
                            height: 50,
                            backgroundColor: COLORS.todoInput,
                          },
                        ]}
                      >
                        {errors.time && touched.time && (
                          <Text style={[styles.error, { top: -33, right: 10 }]}>
                            {errors.time}
                          </Text>
                        )}
                        <Text style={[styles.textContainer, { marginTop: 13, fontFamily:"Poppins" }]}>
                          {date.toLocaleTimeString()}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setMode("time");
                            setShow(true);
                          }}
                        >
                          <Time size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 5,
                        top: 18,
                      }}
                    >
                
                      {errors.venue && touched.venue && (
                        <Text
                          style={{
                            color: "red",
                            fontFamily: "Poppins",
                            fontSize: 10,
                            top: -8,
                            alignSelf: "center",
                            position: "absolute",
                            right: 8,
                          }}
                        >
                          {errors.venue}
                        </Text>
                      )}
                      <FormInput
                        onChangeText={handleChange("venue")}
                        onBlur={handleBlur("venue")}
                        // error={touched.venue && errors.venue}
                        value={venue}
                        placeholder="Venue"
                        TextInputStyle={styles.venueInput}
                      />
                    </View>
                  </View>
                ) : null}

                <View style={{ top: 30 }}>
                  <Text
                    style={{
                      fontSize: 22,
                      paddingTop: 10,
                      fontFamily: "Poppins3",
                      color:COLORS.todoText
                    }}
                  >
                    Description
                  </Text>
                  {errors.description && touched.description && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "Poppins",
                        fontSize: 10,
                        top: -13,
                        alignSelf: "center",
                      }}
                    >
                      {errors.description}
                    </Text>
                  )}
                  <TextInput
                    multiline
                    style={styles.TextInput2}
                    placeholder="Type Something here..."
                      placeholderTextColor={"#B6B6B6"}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    // error={touched.description && errors.description}
                    value={description}
                  />

                  <View>
                    {errors.category && touched.category && (
                      <Text style={styles.error}>{errors.category}</Text>
                    )}

                    <Text  style={{
                      fontSize: 22,
                      paddingTop: 10,
                      fontFamily: "Poppins3",
                      color:COLORS.todoText

                    }}>Category</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.textItem}
                      data={Categories}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Pick"
                      value={category}
                      onChangeText={handleChange("category")}
                      onChange={(value) => setFieldValue("category", value.value)}
                      //   renderLeftIcon={() => (
                      //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                      //   )}
                    />
                  </View>

                  {loading ? (
                    <View>
                      <ActivityIndicator size="large" color={COLORS.todoBackground} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleSubmit}
                    >
                    <View
                        style={{
                          backgroundColor: COLORS.todoBackground,
                          width: 113,
                          justifyContent: "center",
                          alignSelf: "center",
                          alignItems: "center",
                          borderRadius: 8,
                          marginTop: 13,
                          height: 37,
                        }}
                      >

                        {/* <Pressable> */}
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: "white",
                            fontFamily: "Poppins3",
                          }}
                        >
                          Create
                        </Text>
                        {/* </Pressable> */}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {error && (
                <ErrorButton
                  onPress={() => {
                    setError(false);
                  }}
                  message={errorMessage}
                  style={{ paddingTop: height / 22 }}
                  color={COLORS.red}
                  borderRadius={5}
                  bgcolor={COLORS.todoBackground}
                />
              )}
            </ScrollView>
          );
        }}
      </Formik>
    </View>
    </SafeAreaView>

  );
}

export default AddTasksScreen

const styles = StyleSheet.create({
    input: {
      height: 43,
      backgroundColor: COLORS.todoInput,
      borderRadius: 5,
      marginTop: -25,
      paddingLeft: 10,
      fontSize: 16,
      textAlign: "left",
      fontFamily: "Poppins",
      width: width - 40,
    },
    venueInput: {
      height: 43,
      backgroundColor: COLORS.todoInput,
      borderRadius: 5,
      marginTop: 10,
      paddingLeft: 10,
      fontSize: 16,
      textAlign: "left",
      fontFamily: "Poppins",
      width: width*0.88,
    },
    checkbox: {
      alignSelf: "center",
      width: 20,
      height: 20,
    },
    label: {
      fontSize: 16,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
      paddingTop: 15,
      justifyContent: "space-between",
    },
    TextInput2: {
      borderWidth: 2,
      borderColor: COLORS.todoInput,
      width: width - 45,
      height: height / 6,
      marginTop: 5,
      borderRadius: 20,
      fontFamily: "Poppins",
      fontSize: 13,
      paddingLeft: 11,
      backgroundColor:COLORS.todoInput
    },
    dropdown: {
      margin: 15,
      width: width - 40,
      height: 50,
      top: 6,
      backgroundColor: COLORS.todoInput,
      borderRadius: 12,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      right: 10,
    },
    icon: {
      marginRight: 5,
      color: "blue",
    },
    item: {
      padding: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      fontFamily: "Poppins",
      color: "gray",
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: "Poppins3",
      color: "#B6B6B6",
    },
    selectedTextStyle: {
      fontSize: 16,
      color: COLORS.todoText,
      fontFamily: "Poppins",
    },
    iconStyle: {
      width: 20,
      height: 20,
      color: "blue",
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontFamily: "Poppins",
    },
    error: {
      fontFamily: "Poppins",
      fontSize: 10,
      color: "red",
      right: 35,
      position: "absolute",
      top: 5,
    },
  });