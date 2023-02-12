

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {  useFormik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import client from '../api/client';

const DropdownComponent=()=>{
  const [userInfo, setUserInfo] = useState(null)
  const navigation = useNavigation()

  const getUserId = async()=>{
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if(value !== null) {
      // console.log(value)
      setUserInfo(JSON.parse(value))
      }
    } catch(e) {
      console.log(`${e}`)
    }
  
  }
  useEffect(()=>{
    getUserId()
  },[])


  const Gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const Level=[
    {
      label:"100", value:"100"
    },
    {
      label:"200", value:"200"
    },
    {label:"300", value:"300"},
    {label:"400", value:"400"},
    {label:"500", value:"500"},
    {label:"600", value:"600"}

  ]

  const campus=[
{
  label:"Main", value:"Main",

},
{label:"Iperu", value:"Iperu"}
  ]

  const course=[
    {
      label:"Software Enginnering", value:"Software Engineering"
    },
    {
      label:"Computer Science", value:"Computer Science"
    }
  ]

  const formik = useFormik({
    initialValues:{
      gender:"",
      campus:"",
      course:"",
      level:"",
    } ,
    
    validate: values => {
      const errors = {};
      if (!values.gender) {
        errors.gender = 'gender required';
      }
      if (!values.campus) {
        errors.campus = 'campus required';
      }
      if (!values.course) {
        errors.course = 'course required';
      }
      if(!values.level){
        errors.level = "level required"
      }

      return errors;
    },

    onSubmit: async values=>{
console.log("gender:", values.gender.value)
console.log("level:", values.level.value)
console.log("campus:", values.campus.value)

const gender = values.gender.value
const level = values.level.value
const campus = values.campus.value
const course = values.course.value

await client.put(`/user/${userInfo?._id}`,{
 gender:gender,
 level:level,
 campus:campus,
 course:course
})
.then(async(res)=>{
console.log(res)

if(res.status === 201){
  console.log(res.data)
  // get the response. if it conatins all the userdata,

  const userData = res.data.data
  //await the async storage and update the userInfo to get the current userdata.

  try{
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`
    // stringify the userData object
    await AsyncStorage.setItem("userInfo", JSON.stringify(userData))
  }catch(e){
    console.log(`Async Storage error: ${e}`)
  }
  // if succesful, dispatch to homescreen
  navigation.dispatch(StackActions.replace("Tab"));
}
}).catch((e)=>{
  console.log(`${e}`)
})

    }
  })

  
  const handleDropdownValueChange = (value) => {
     formik.setFieldValue('gender', value);
   };

   const handleDropdownValueChange2 = (value) => {
    formik.setFieldValue('level', value);
  };
  const handleDropdownValueChange3 = (value) => {
    formik.setFieldValue('campus', value);
  };
  const handleDropdownValueChange4 = (value) => {
    formik.setFieldValue('course', value);
  };


 return(
<View style={{top:60}}>

<View>
<Text style={styles.error}>{JSON.stringify(formik.errors.gender)}</Text>
<Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.textItem}
      data={Gender}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Gender"
      value={formik.values.gender}
      errorMessage={formik.touched.gender && formik.errors.gender ? formik.errors.gender : undefined}
       onChange={(value) => handleDropdownValueChange(value)}
       onChangeText={formik.handleChange("gender")}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
    {/* <Text style={{fontFamily:"Poppins", fontSize:5}}>{JSON.stringify(formik.touched)}</Text> */}
    </View>

<View>
<Text style={styles.error}>{JSON.stringify(formik.errors.level)}</Text>
<Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.textItem}
      data={Level}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Level"
        value={formik.values.level}
       onChange={(value) => handleDropdownValueChange2(value)}
       onChangeText={formik.handleChange("level")}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
</View>

<View>
<Text style={styles.error}>{JSON.stringify(formik.errors.campus)}</Text>
<Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.textItem}
      data={campus}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Campus"
        value={formik.values.campus}
       onChange={(value) => handleDropdownValueChange3(value)}
       onChangeText={formik.handleChange("campus")}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
</View>

<View>
<Text style={styles.error}>{JSON.stringify(formik.errors.course)}</Text>
<Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.textItem}
      data={course}
      maxHeight={300}
      search
      searchPlaceholder="Search..."
      labelField="label"
      valueField="value"
      placeholder="Course"
        value={formik.values.course}
       onChange={(value) => handleDropdownValueChange4(value)}
       onChangeText={formik.handleChange("course")}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
</View>

   <Button title="Continue" onPress={formik.handleSubmit} />
</View>
 )

}


export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
    color:"blue"
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily:"Poppins",
    color:"gray"
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily:"Poppins",
    color:"#ccc"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"blue",
    fontFamily:"Poppins"
  },
  iconStyle: {
    width: 20,
    height: 20,
    color:"blue"
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily:"Poppins"
  },
  error:{fontFamily:"Poppins", fontSize:13, color:"red", right:25, position:"absolute", top:-6}
});