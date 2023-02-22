import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EVENTS } from "../data/eventData";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const ScanTicketScreen = ({route}) => {
	return <ScanLogic route={route} />;
};

const ScanLogic = (props) => {
	// const {eventTitle} = props.route.params;

  // alert the user time has elapsed
  // write functionality that after time has elapsed, take him back to the settings page


	  const [hasPermission, setHasPermission] = useState(null);
	   const [scanned, setScanned] = useState(false);
	  const [showAnimation, setShowAnimation] = useState(false);
	   const [userToken, setUserToken] = useState(null)
	  const [userInfo, setUserInfo] = useState(null)
    const [eventTitle, setEventTitle] = useState(null)
    const [eventTime, setEventTime] = useState(null)

    const navigation = useNavigation()

	  useEffect(() => {
	    const getBarCodeScannerPermissions = async () => {
	      const { status } = await BarCodeScanner.requestPermissionsAsync();
	      setHasPermission(status === 'granted');
	    };

	    getBarCodeScannerPermissions();
	  }, []);


	  const  getData = async () => {
	    try {
	      const value = await AsyncStorage.getItem('userInfo')
	      const userToken = await AsyncStorage.getItem("userToken")
        const title =  await AsyncStorage.getItem("eventTitle")
			  const eventTime = await AsyncStorage.getItem('eventTime');
        
	      if(value !== null && userToken !== null &&title !== null ) {
	      setUserInfo(JSON.parse(value))
	      setUserToken(userToken)
        setEventTitle(title)
     
         if(eventTime !==null){
          const endTime = moment(eventTime, 'h:mmA');
          const currentTime = moment();

          if (currentTime.isAfter(endTime)) {
            // The time for the event has ended, navigate to profile screen
            setEventTime(null);
            setEventTitle(null);
            
            try {
            await AsyncStorage.removeItem('eventTime');
            await AsyncStorage.removeItem('eventTitle');
            alert("sorry Admin, your time as a scanner for this event is elapsed")
            } catch (e) {
            console.log(e);
            }
            navigation.navigate('ProfileScreen');
            return;
          }

          const timeLeft = moment.duration(endTime.diff(currentTime));
        setTimeout(getData, timeLeft.asMilliseconds());

         }


	      }
	    } catch(e) {
	      console.log(`${e}`)
	    }
	    }

	     useEffect(()=>{
	    getData()
	    },[])



	//   const handleBarCodeScanned = async ({ type, data }) => {
	//     setScanned(true);
	//     // get the data from the qr code, send a post request to the backend with that data to verify it, if it's succesful
	//     // show a small lottie view animation with sucess

	//        const token = userToken
    //      const title = eventTitle

	//        console.log(data)
	//        console.log(token)
	//         console.log(title)

	//        console.log(token)
	//          const config ={
	//          headers:{ Authorization: `Bearer ${token}`}
	//         }

    //       const formData = new FormData()
    //        formData.append("token", data)
    //        formData.append("eventTitle", title)

         


	//     // try {
	//     //   const res = await client.post(`/tickets/scan`, formData, config);

	//     //   if (res.status === 200) {
	//     //     alert(`QR code has been successfully scanned`);
	//     //     setShowAnimation(true);
	//     //   }

	// 	//    if (res.status === 400){
	// 	// 	alert(`QR code Has already been scanned!`);
	// 	//   }
	//     //   console.log(title)
	//     //   setScanned(false);
	//     // } catch (e) {
	//     //   console.error(e);
	//     // }


	// 	try{
	// 		await client.post(`/tickets/scan`, formData, config)
	// 		.then((res)=>{
	// 			if(res.status === 200){
	// 				try{
	// 					alert (`QR code has been successfully scanned`)
	// 					setShowAnimation(true)
	// 					setScanned(false)
	// 				}catch(e){
	// 					console.log(`${e}`)
	// 				}
	// 			}
	// 			else if(res.status === 400){
	// 				alert (`QR code has already been scanned`)
	// 				setScanned(false)
	// 			}
	// 			console.log(title)
	// 			 setScanned(false);
	// 		})

	// 	}catch(e){
    //     console.error(e)
	// 	}

		

	



	//   };



	

	const handleBarCodeScanned = async ({ type, data }) => {
		setScanned(true);
		const token = userToken;
		const title = eventTitle;
	  
		console.log(data);
		console.log(token);
		console.log(title);
	  
		const config = {
		  headers: { Authorization: `Bearer ${token}` },
		};
	  
		const formData = new FormData();
		formData.append("token", data);
		formData.append("eventTitle", title);
	  
		try {
		  const res = await client.post(`/tickets/scan`, formData, config);
	  
		  if (res.status === 200) {
			alert(`QR code has been successfully scanned`);
			setShowAnimation(true);
		  } else if (res.status === 400) {
			alert(`QR code Has already been scanned!`);
		  }
	  
		  console.log(title);
		  setScanned(false);
		} catch (e) {
		  console.error(e);
		  setScanned(false);
		}
	  };
	  





	  if (hasPermission === null) {
	    return <Text>Requesting for camera permission</Text>;
	  }
	  if (hasPermission === false) {
	    return <Text>No access to camera</Text>;
	  }

	  return (
	    <>
	    <View style={styles.container}>

	      <BarCodeScanner
	      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
	        style={StyleSheet.absoluteFillObject}
	      />

	      {scanned &&
	      <View style={{backgroundColor:"white", width:100, height:30, position:"absolute", alignItems:"center", bottom:height/10, left:width/3}}>
	    <Text style={{fontFamily:"Poppins3", fontSize:18, color:"blue", position:"absolute", bottom:-2, alignSelf:"center",}} onPress={()=>setScanned(false)}>Re-scan</Text>
	    </View>
	    }
	    </View>
	    <View style={{height:347, width:300, backgroundColor:"transparent", position:"absolute", alignSelf:"center", bottom:height/6, borderColor:"white", borderRadius:20, borderWidth:3, alignContent:"center"}}/>

	<View style={styles.animation}>
	{showAnimation && (
	  <LottieView
	   source={require("../assets/animations/qr-scan.json")}
	   speed={0.5}
	   autoPlay
	   loop={false}
	   style={{width:100, height:100, bottom:280, position:"absolute", right:10}}
	  onAnimationFinish={()=> setShowAnimation(false)}
	  />
	)}

	</View>
	 </>
	   );
};
export default ScanTicketScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height,
		width: width,
		alignSelf: "center",
		top: 30,
	},
});
