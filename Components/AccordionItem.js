import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Dimensions,
} from "react-native";
const { width } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AccordionItem = () => {
	const [showContent, setShowContent] = React.useState(false);
	const [actionTriggered, setActionTriggered] = useState("");
	const [action, setAction] = useState("");

	const [visible, setVisible] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("userInfo");
			if (value !== null) {
				console.log(value);
				setUserInfo(JSON.parse(value));
			}
		} catch (e) {
			console.log(`${e}`);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.1}
				onPress={() => setShowContent(!showContent)}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Personal Details</Text>
				</View>
			</TouchableOpacity>
			{showContent && (
				<View style={styles.body}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<View>
							<Text style={styles.text}>First Name</Text>
							<View style={[styles.textInput, { width: 135 }]}>
								<Text style={styles.info}>
									{userInfo?.firstname.toUpperCase()}
								</Text>
							</View>
						</View>
						<View>
							<Text style={styles.text}>Last Name</Text>
							<View style={[styles.textInput, { width: 155 }]}>
								<Text style={styles.info}>
									{userInfo?.lastname.toUpperCase()}
								</Text>
							</View>
						</View>
					</View>
					<View>
						<Text style={styles.text}>Email</Text>
						<View style={[styles.textInput, { width: 295 }]}>
							<Text style={styles.info}>{userInfo?.email}</Text>
						</View>
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<View>
							<Text style={styles.text}>Course of study</Text>
							<TextInput
								editable={false}
								placeholder={userInfo?.course}
								style={[styles.textInput, { width: 205 }]}
								placeholderTextColor="#717171"
							/>
						</View>
						<View>
							<Text style={styles.text}>Gender</Text>
							<TextInput
								editable={false}
								placeholder= {userInfo?.gender}
								style={[styles.textInput, { width: 75 }]}
								placeholderTextColor="#717171"
							/>
						</View>
					</View>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		width: width - 30,
		padding: 10,
		borderRadius: 12,
		backgroundColor: "white",
		marginBottom: "2%",
		overflow: "hidden",
		borderColor: "rgba(113,113,113,0.2)",
		borderWidth: 1,
	},
	textInput: {
		fontSize: 15,
		borderColor: "rgba(113,113,113,0.2)",
		backgroundColor: "#D9D9D9",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: 5,
		fontFamily: "Poppins",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		color: "#2d2d2d",
		fontFamily: "Poppins2",
	},
	body: {
		paddingHorizontal: "2%",
		paddingVertical: "3%",
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		fontFamily: "Poppins",
	},
	info: {
		alignSelf: "flex-start",
		fontWeight: "200",
		color: "#717171",
		fontSize: 15,
		fontFamily: "Poppins",
	},
});
