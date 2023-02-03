
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EVENTS } from '../data/eventData';
const {width, height} = Dimensions.get("window")

const ScanTicketScreen = () =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
  setScanned(true); // now you can scan

  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
setShowAnimation(true)
  

    // get the data from the qr code, send a post request to the backend with that data to verify it, if it's succesful
    // show a small lottie view animation with sucess

  

//     if (userInfo?.scannedfor.toLowerCase() === data.event.title.toLowerCase()){
//          await axios.post("....url present here",{
//                token:data.token
//          }).then((res)=>{
//           console.log(res)
//           // if res is successful
//   //alert(`QR code has been successfully scanned)
// //      setShowAnimation(true)
// setScanned(false)
//          }).catch((e)=>{
//           console.log(`${e}`)
//          })
//     }else{
//       alert("This ticket is not for this event. Pls check another place")
//     }


// if(scannedfor.toLowerCase() === EVENTS.campus.toLowerCase()){

// }

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
      // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>} */}
      
      {scanned &&
    <Text style={{fontFamily:"Poppins3", fontSize:18, color:"blue", position:"absolute", bottom:60, alignSelf:"center"}} onPress={()=>setScanned(false)}>Re-scan</Text>
    }
    </View>
    <View style={{height:350, width:300, borderColor:"white", backgroundColor:"transparent", position:"absolute", bottom:160, borderRadius:50, borderWidth:5, alignSelf:"center", }}/>

<View style={styles.animation}>
{showAnimation && (
  <LottieView
   source={require("../assets/animations/qr-scan.json")} 
   speed={0.7}
   autoPlay
   loop={false}
   style={{width:100, height:100, bottom:280, position:"absolute", right:10}}
  onAnimationFinish={()=> setShowAnimation(false)}
  />
)}

</View>
</>
  );
}
export default ScanTicketScreen


const styles = StyleSheet.create({
container:{
  flex:1,
  height:height,
  width:width,
  alignSelf:"center",
  top:30
}
})