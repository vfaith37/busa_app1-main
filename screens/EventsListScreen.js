import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import client from '../api/client';
import moment from 'moment';
import { Formik } from "formik";
import * as Yup from "yup";
import { Dropdown } from "react-native-element-dropdown";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const {width, height} = Dimensions.get("screen")

const validationSchema = Yup.object({
	eventTitle: Yup.string().required("You must pick an event!"),
	
});


const EventsListScreen = () => {

  const [events, setEvents] = useState([])
  const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation()
	


// the frontend retrieves this, maps through it and display to the user
//  the user picks the particular event he wants to scan for, he is told that once picked he cannot change
//the time and title is saved to async storage



//here, the auth role is also checked before he can be allowed to scan
const getListofEVents = async()=>{

  const today = moment().format('DD/MM/YYYY');
  console.log(today)

  try{
     
    const value = await AsyncStorage.getItem('userInfo')
	  const token = await AsyncStorage.getItem('userToken')

    if (value !== null && token !== null) {
      setUserInfo(JSON.parse(value));
      setUserToken(token);
    

    const formData = new FormData();
    formData.append("date", today);

          const newToken = token

     
    const config = {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    }


      await client
      .get(
        `event/getEventByDate`,
      config, formData
        
      )
      .then((res) => {
        console.log(res);



        if (res.data.data.length === 0) {
          setEvents([]);
        }
        
        else {

          const eventsList = res.data.data.map((event) => ({
            label: event.title,
            value: event.title,
            endTime : event.endTIme
          }
          ));
          setEvents(eventsList);
          // AsyncStorage.setItem("eventTime", eventsList.endTime)
        }
       
      })
      .catch((e) => {
        console.log(`${e}`);
      });
       }

  }catch(e){

    console.log(`${e}`)
  }

}

useEffect(()=>{
  getListofEVents()
}, [])



const Next = async (values) => {
  try {
    const title = values.eventTitle
    console.log(title)
         const time = "11:45PM"
         console.log(time)

   await  AsyncStorage.setItem("eventTitle", title)
   await AsyncStorage.setItem("eventTime",time )
    console.log(values)

navigation.dispatch(StackActions.replace("ScanTicketScreen",{
     eventTitle : title
}))
  } catch (e) {
    console.log(`${e}`);
  }

};


const EventsList =[
// on landing, a get request is made from the backend to retrive list of open events and their endTime. the backend only returns events for that particular day the request is made

  {
    label: "Laptop",
    value: "Laptop",
  },
  {
    label: "Laphas",
    value: "Laphas",
  },
]



// eventTitle is passed through props to the scanTicketScreen

    // here in this logic, check from the backend if the array is empty. if it is, display no events avaliable

  return (

    <View>

       {/* {isLoading 
       ?
        (
             <View>
      <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
     :
      events.length === 0 ? (
          
        <View>
      <Text> No events available for Today</Text>
      </View>

    ) : ( */}

      <Formik
				initialValues={{
					eventTitle: "",
				}}
				onSubmit={Next}
				validationSchema={validationSchema}
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
					const {eventTitle} = values;
					return (

                  <View style={{top:100}}>
							<View style={{alignSelf:"center"}}>
								{errors.eventTitle && touched.eventTitle && (
									<Text style={styles.error}>{errors.eventTitle}</Text>
								)}
								<Dropdown
									style={styles.dropdown}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									inputSearchStyle={styles.inputSearchStyle}
									iconStyle={styles.iconStyle}
									itemTextStyle={styles.textItem}
									data={EventsList}
                  // items ={events}
									maxHeight={300}
									labelField="label"
									valueField="value"
									placeholder="Pick Event"
                  search
                  searchPlaceholder="Search..."
									value={eventTitle}
									onChangeText={handleChange("eventTitle")}
									onChange={(value) => setFieldValue("eventTitle", value.value)}
								/>
							</View>

							<Pressable onPress={handleSubmit}>
								<View
									style={{
										backgroundColor: "#004fc7",
										width: 113,
										justifyContent: "center",
										alignSelf: "center",
										alignItems: "center",
										borderRadius: 8,
										marginTop: 13,
										height: 37,
									}}
								>
									<Text
										style={{
											fontSize: 18,
											fontWeight: "500",
											color: "white",
											fontFamily: "Poppins3",
										}}
									>
										Next
									</Text>
								</View>
							</Pressable>
              </View>    
					);
				}}
			</Formik>

      {/* // )} */}
    </View>
  )
}

export default EventsListScreen

const styles = StyleSheet.create({
	
	label: {
		fontSize: 16,
	},
	dropdown: {
		margin: 15,
		width: width - 40,
		height: 50,
		top: 6,
		backgroundColor: "white",
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
		right: width/320,
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
		color: "#000",
	},
	selectedTextStyle: {
		fontSize: 16,
		color: "blue",
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
