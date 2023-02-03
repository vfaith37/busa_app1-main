import React, { useContext, useEffect, useMemo, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Image,
	TextInput,
	Button,
} from "react-native";
import {
	TicketIcon,
	Notification,
	Person,
	Chat,
	Direction,
	Warning,
	ScanTicket,
	Icon,
} from "../constants/icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import { SettingsButton } from "../Components/settingsButton";
import { ModalPopUp } from "../Components/Modal";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { Pressable } from "react-native";
const { width } = Dimensions.get("screen");
const QR = width / 2;

export const Profile = () => {
	
		const [actionTriggered, setActionTriggered] = useState("");
		const [action, setAction] = useState("");
	
		const [visible, setVisible] = useState(false);
          const [userInfo, setUserInfo] = useState(null)

  const  getData = async () => {
	try {
	  const value = await AsyncStorage.getItem('userInfo')
	  if(value !== null) {
		console.log(value)
		setUserInfo(JSON.parse(value))
	  }
	} catch(e) {
	  console.log(`${e}`)
	}
  }


   useEffect(()=>{
	getData()
	},[])



	const navigation = useNavigation();

  

	// here, i'm getting the whole userinfo to get the values
	return (

		<View style={styles.container}>
			<View
				style={{
					width: width - 20,
				}}
			>
				<View style={{ flexDirection: "row", marginLeft: 10 }}>
					<View style={styles.itemcontainer}>
						<Text style={{ fontWeight: "600", fontSize: 30, color: COLORS.white, fontFamily:"Poppins", color:"#ececec" }}>
						{userInfo?.firstname.charAt(0)}{userInfo?.lastname.charAt(0)}
						</Text>
					</View>
					<View style={{ paddingBottom: 10, paddingLeft: 10 }}>
						<Text style={{ fontSize: 24, fontWeight: "600", fontFamily:"Poppins", color:"#363636" }}>{userInfo?.firstname} {userInfo?.lastname}</Text>
						<Text style={styles.email}>{userInfo?.email}</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("AccountScreen")}
					>
						<SettingsButton
							iconLeft={Direction}
							icon={Person}
							ButtonName={"Account"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("NotificationScreen")}
					>
						<SettingsButton
							iconLeft={Direction}
							icon={Notification}
							ButtonName={"Notification"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setVisible(true);
							// setActionTriggered("Action_3")
							setActionTriggered("Action_1");
						}}
					>
						<SettingsButton icon={TicketIcon} ButtonName={"Ticket"} />
					</TouchableOpacity>
					
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setVisible(true);
							setActionTriggered("Action_2");
						}}
					>
						<SettingsButton icon={Chat} ButtonName={"Feedback"} />
					</TouchableOpacity>
                     
					 
					 { userInfo?.role === 0?
					 
					 (
						<>
					 <TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setVisible(true);
							 setActionTriggered("Action_3")}}
					>
						
                         <SettingsButton
							icon={ScanTicket}
							ButtonName={"Scan QR Code"}
						/>
					</TouchableOpacity>

					<View style={{width:55, height:55, backgroundColor:"#004fc7", borderRadius:50, position:"absolute", bottom:-200, right:15}}>
                     <Pressable
					onPress={() => {
						setVisible(true);
						setActionTriggered("Action_4");
					}}
					>
                     <Text style={{bottom:7, fontFamily:"Poppins", alignSelf:"center", fontSize:48, color:"#fff"}}>+</Text>
					</Pressable>
					</View>
					</>
	)
					:
		null
}

         

					<ModalPopUp visible={visible}>
						<View 
						// style={{ alignItems: "center" }}
						>
							<View style={styles.header}>
								<TouchableOpacity onPress={() => setVisible(false)}>
									<Image
										source={require("../assets/x.png")}
										style={{ height: 20, width: 20 }}
									/>
								</TouchableOpacity>
							</View>
						</View>

						{actionTriggered === "Action_1" ? (
							<>
								<View style={{ alignItems: "center" }}>
									<Text
										style={{
											fontSize: 20,
											fontWeight: "600",
											color: "rgba(47.66, 47.66, 47.66, 1)",
											fontFamily:"Poppins2"
										}}
									>
										BUSA Game Show
									</Text>
									<Text
										style={{
											fontSize: 12,
											textAlign: "center",
											color: "rgba(112.62, 112.62, 112.62, 1)",
											fontFamily:"Poppins"
										}}
									>
										Scan this code to gain entry into BUSA game show
									</Text>
								</View>
								<Image
									source={require("../assets/qrcode.jpg")}
									style={{ height: QR, width: QR, alignSelf: "center" }}
								/>
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
							</>
						) : null}



						{actionTriggered === "Action_2" ? (
							<>
								<View
									style={{
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: 26,
											fontWeight: "400",
											color: "rgba(39, 46, 57, 1)",
											fontFamily:"Poppins3"
										}}
									>
										Feedback
									</Text>
									<Text
										style={{
											// width: width / 3,
											width:"90%",
											fontSize: 12,
											fontWeight: "300",
											textAlign: "center",
											color: "rgba(112.62, 112.62, 112.62, 1)",
											fontFamily:"Poppins"
										}}
									>
										Let us know what we can do to improve your experience in
										this app
									</Text>
								</View>
								<TextInput
									placeholder="Your message here"
									multiline={true}
									style={{
										borderColor: "gray",
										width: "100%",
										borderWidth: 1,
										borderRadius: 10,
										padding: 10,
										height: 95,
										marginBottom: 15,
										fontFamily:"Poppins",
										top:3
									}}
									selectionColor={"blue"}
								/>
								<TouchableOpacity activeOpacity={0.7}>
									<View
										style={{
											alignSelf: "center",
											height: 30,
											width: 80,
											backgroundColor: "rgba(0, 79.41, 198.53, 1)",
											borderRadius: 5,
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "500",
												textAlign: "center",
												color: "white",
												fontFamily:"Poppins3"
											}}

										>
											Post
										</Text>
									</View>
								</TouchableOpacity>
							</>
						) : null}


						{actionTriggered === "Action_3" ?
						 (
<>
								<View
									style={{
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: 26,
											fontWeight: "400",
											color: "rgba(39, 46, 57, 1)",
											fontFamily:"Poppins3"
										}}
									>
										Hello Admin
									</Text>
									<Text
										style={{
											// width: width / 3,
											width:"90%",
											fontSize: 12,
											fontWeight: "300",
											textAlign: "center",
											color: "rgba(112.62, 112.62, 112.62, 1)",
											fontFamily:"Poppins"
										}}
									>
								  Please enter the secured password given to you
									</Text>
								</View>
								<TextInput
									placeholder="*********"
									multiline={true}
									style={{
										borderColor: "gray",
										width: "100%",
										borderWidth: 1,
										borderRadius: 10,
										padding: 10,
										height: 60,
										marginBottom: 15,
										fontFamily:"Poppins",
										top:3
									}}
									selectionColor={"blue"}
								/>
								<TouchableOpacity activeOpacity={0.7}
								
								onPress={()=>{setVisible(false); navigation.navigate("ScanTicketScreen")}}
								
								>
									<View
										style={{
											alignSelf: "center",
											height: 30,
											width: 80,
											backgroundColor: "rgba(0, 79.41, 198.53, 1)",
											borderRadius: 5,
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "500",
												textAlign: "center",
												color: "white",
												fontFamily:"Poppins3"
											}}

										>
										Verify
										</Text>
									</View>
								</TouchableOpacity>
							</>

						 )
						:
						null }

                       {actionTriggered === "Action_4"
						?  
						(
						 <View style={{ width:width, height:200, }}>

							<View>
							<Text style={{fontWeight:"600", fontFamily:"Poppins2", fontSize:30}}>Create</Text>
                              
							  <View style={{paddingVertical:10}}>
                                 <View style={{flexDirection:"row",}}>
							  <Icon name={"newspaper-outline"} size={20}/>
							  <TouchableOpacity
							  onPress={()=> { setVisible(false); navigation.navigate("UploadPostScreen")}}
							  >
							<Text style={styles.text}>New Post</Text>
							</TouchableOpacity>
							</View>
                            
							<View style={{flexDirection:"row", top:15}}>
							<Icon name={"calendar-outline"} size={20}/>
							<TouchableOpacity
							onPress={()=>{setVisible(false); navigation.navigate("UploadEventScreen")}}
							>
							<Text style={styles.text}>New Event</Text>
							</TouchableOpacity>
							</View>
							</View>

						 </View>

						 </View>
						)
						
						:
						null
						} 

					</ModalPopUp>	
				</View>
			</View>
		</View>


    
	);
};




const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		flex: 1,
		paddingTop: 80,
	},
	itemcontainer: {
		backgroundColor: "#004FC7",
		height: 59,
		width: 59,
		borderRadius: 59,
		alignItems: "center",
		justifyContent: "center",
	},
	email: { fontWeight: "500", color: "#717171", fontSize: 12, opacity: 0.5, fontFamily:"Roboto" },
	modalBackGround: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: COLORS.white,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		elevation: 20,
	},
	header: {
		width: "100%",
		height: 20,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	text:{fontFamily:"Poppins", fontSize: 20, fontWeight:"300", lineHeight:30, alignItems:"center", color:"#363636", left:5, top:-2}
});
