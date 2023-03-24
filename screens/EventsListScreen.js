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
import { COLORS } from '../constants/theme';

const {width, height} = Dimensions.get("screen")

const validationSchema = Yup.object({
	eventTitle: Yup.string().required("You must pick an event!"),
	
});


const EventsListScreen = () => {

  const [events, setEvents] = useState([])
  const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation()
	


// the frontend retrieves this, maps through it and display to the user
//  the user picks the particular event he wants to scan for, he is told that once picked he cannot change
//the time and title is saved to async storage



//here, the auth role is also checked before he can be allowed to scan


const getListofEVents = async () => {
	const today = moment().format('DD/MM/YYYY');

	console.log(today)
  
	try {
	  const value = await AsyncStorage.getItem('userInfo');
	  const token = await AsyncStorage.getItem('userToken');
  
	  if (value !== null && token !== null) {
		setUserInfo(JSON.parse(value));
		setUserToken(token);
  
		const userInfo = JSON.parse(value);
		console.log(userInfo.campus)
		const newToken = token;
  
		const formData = new FormData();
		formData.append('date', today);
		formData.append('campus', userInfo.campus);
  
		const config = {
		  headers: {
			Authorization: `Bearer ${newToken}`,
		  },
		};

		setIsLoading(true)
  
		await client
		  .post('event/getEventByDate', formData, config)
		  .then(async (res) => {
			console.log(res.data.data)
			if (res.status === 200) {

			  if (res.data.data.length === 0) {
				setEvents([]);
				setIsLoading(false)
			  } else {

				if (res.data.data.length === 1) {
				  const items = [
					{
					  label: res.data.data[0].title,
					  value: res.data.data[0].title,
					  endTime: res.data.data[0].endTime,
					},
				  ];
				  setEvents(items);
				  await AsyncStorage.setItem('eventTime', items[0].endTime);
				  setIsLoading(false)
				} 
				
				else if (res.data.data.length > 1) {
				  const eventsList = res.data.data.map((event) => ({
					label: event.title,
					value: event.title,
					endTime: event.endTime,
				  }));
				  setEvents(eventsList);
				setIsLoading(false)
				}
			  }
			}
			setIsLoading(false)
		  })
		  .catch((e) => {
			console.log(e);
		  });
	  }
	} catch (e) {
	  console.log(e);
	}
  };
  
  useEffect(() => {
	getListofEVents();
  }, []);
  



const Next = async (values) => {
  try {
    const title = values.eventTitle
    console.log(title)

   await  AsyncStorage.setItem("eventTitle", title)
   
    console.log(values)

navigation.dispatch(StackActions.replace("ScanTicketScreen",{
     eventTitle : title
}))
  } catch (e) {
    console.log(`${e}`);
  }

};
// eventTitle is passed through props to the scanTicketScreen

    // here in this logic, check from the backend if the array is empty. if it is, display no events avaliable

  return (


	

    <View>

       {
	   isLoading 
       ?
        (
             <View style={{top:150}}>
      <ActivityIndicator size="large" color={COLORS.primary}/>
      </View>
    )
     :

      events.length === 0 ? (
          
        <View>
		{/* possibly add more designs */}
      <Text style={{color:COLORS.red, top:150, left:20, fontFamily:"Poppins", alignItems:"center"}}> No events available Today! pls check back</Text>
      </View>

    ) : (


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
                  <View style={{top:200}}>
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
									data={events}
									maxHeight={300}
									labelField="label"
									valueField="value"
									placeholder="Pick Event"
                                   search
                                  searchPlaceholder="Search..."
									value={eventTitle}
									onChangeText={handleChange("eventTitle")}
									onChange={
										(value) =>{ setFieldValue("eventTitle", value.value)
										AsyncStorage.setItem("eventTime", value.endTime);
								}
							}
								/>
							</View>

							<Pressable onPress={handleSubmit}>
								<View
									style={{
										backgroundColor: COLORS.primary,
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
											color: COLORS.white,
											fontFamily: "Poppins3",
										}}
									>
										Next
									</Text>
								</View>
							</Pressable>
              </View>    
					);
				}
				
				}

			</Formik>

      )} 



	  
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
		shadowColor: COLORS.black,
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
		color: COLORS.primary,
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
		color: COLORS.gray,
	},
	placeholderStyle: {
		fontSize: 16,
		fontFamily: "Poppins3",
		color: COLORS.black,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: COLORS.primary,
		fontFamily: "Poppins",
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: COLORS.primary,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		fontFamily: "Poppins",
	},
	error: {
		fontFamily: "Poppins",
		fontSize: 10,
		color: COLORS.red,
		right: 35,
		position: "absolute",
		top: 5,
	},
});
