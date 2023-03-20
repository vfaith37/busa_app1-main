import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Warning } from '../constants/icons';
const { width, height } = Dimensions.get("screen");
const QR = width / 2;

const TicketCard = ({ticket}) => {
  return (
    <View style={{
		height:height*0.44, width:width*0.83, alignContent:"center", borderRadius:20, alignSelf:"center", backgroundColor:"transparent", top:10
	}}>
        <TicketTitle ticket={ticket}/>
      <TicketImage ticket={ticket}/>
      <TicketDescription ticket={ticket}/>
    </View>
  )
}


const TicketTitle =({ticket})=>{
return(
              <>
       <View style={{ alignItems: "center", }}>
					   <Text
						   style={{
							   fontSize: 20,
							   fontWeight: "600",
							   color: "rgba(47.66, 47.66, 47.66, 1)",
							   fontFamily:"Poppins2"
						   }}
					   >
					   {ticket.title}
					   </Text>
					   <Text
						   style={{
							   fontSize: 12,
							   textAlign: "center",
							   color: "rgba(112.62, 112.62, 112.62, 1)",
							   fontFamily:"Poppins",
							   width:250
						   }}
					   >
						   Scan this code to gain entry into {ticket.title}
					   </Text>
				   </View>
</>
)

}


const TicketImage =({ticket})=>{
    return(
        <View>
             <View 
                style={{alignItems:"center", width:300, height:QR,}}
                >
                <Image
                   source={{uri: ticket.qrCode}}
                 style={{ height: QR, width: QR, alignSelf: "center", }}
                     />
                     </View>
        </View>
    )

}



const TicketDescription=({ticket})=>{
    return(
        <View>
        <Warning style={{alignSelf: 'center', margin: 5}} />
				   <Text
					   style={{
						   width: 240,
						   fontSize: 12,
						   fontWeight: "500",
						   alignSelf: "center",
						   textAlign: "center",
						   color: "rgba(112.62, 112.62, 112.62, 1)",
						   fontFamily:"Poppins"
					   }}
				   >
					   The qr code is one-time and would be unusable after its
					   scanned
				   </Text>
                   </View>
    )

}



export default TicketCard

const styles = StyleSheet.create({})