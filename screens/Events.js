import {
	Dimensions,
	Text,
	View,
	TouchableOpacity,
	Image,
	Platform,
	FlatList,
	StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { COLORS } from "../constants/theme";

const { width, height } = Dimensions.get("screen");

const imageH = height * 0.417
const imageW = width * 0.85

const Events = ({ event }) => {
	const navigation = useNavigation();
	return (
		<View>
			<EventImage event={event} navigation={navigation} />
			<EventItems event={event} />
			</View>
	);
};

const EventImage = ({ event, navigation }) => {
	return (
		<>
			<View
				style={{
					backgroundColor: "transparent",
					alignSelf: "center",
					marginBottom: 22,
					height: height * 0.417,
					width: width * 0.85,
					borderRadius: 20,
					alignItems: "center",
				}}
			>
				<FlatList
					data={event.images}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					scrollEnabled
					keyExtractor={(index) => index.toString()}
					renderItem={({ item }, id) => (
						<View>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() =>
									navigation.navigate("EventDetails", {
										image: event.images,
										title: event.title,
										date: event.date,
										time: event.time,
										venue: event.venue,
										ticketPrice: event.ticketPrice,
										content: event.content,
									})
								}
							>
								<Image
									style={{
										height: imageH,
										width: imageW,
										borderRadius: 20,
										resizeMode: Platform.OS === "android" ? "contain" : "cover",
										alignSelf: "center",
										//  backgroundColor:
										// "linear-gradient(180deg, rgba(0, 0, 0, 0) 43.23%, rgba(0, 0, 0, 0.4) 56.25%, rgba(0, 0, 0, 0.722222) 81.83%, #000000 100%)",
									}}
									// blurRadius={1.8}
									key={id}
									source={{ uri: item }}
								/>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
		</>
	);
};

const EventItems = ({ event }) => {
	const newDate = event.date;
	const changedDate = moment(newDate, "DD/MM/YYYY"); // parse the date string using the specified format

	const formattedDay = changedDate.format("DD"); // format the date as "Friday, 17 February"
	const formattedDMonth = changedDate.format("MMM");

	return (
		<>
			<View
				style={{
					width: width*0.16,
					height:height*0.09,
					borderRadius: 20,
					backgroundColor: COLORS.white,
					position: "absolute",
					right: 40,
					top: 20,
				}}
			>
				<Text
					style={{
						alignSelf: "center",
						fontWeight: "800",
						paddingTop: 5,
						fontSize: 27,
						fontFamily: "Poppins2",
						color: COLORS.black,
					}}
				>
					{formattedDay}
				</Text>
				<Text
					style={{
						fontWeight: "600",
						fontSize: 14,
						color: COLORS.offgray,
						alignSelf: "center",
						bottom: 5,
						fontFamily: "Poppins3",
					}}
				>
					{formattedDMonth}
				</Text>
			</View>

			{/* <View>
				<Text
					style={{
						color: "#ffff",
						fontWeight: "400",
						fontSize: 23,
						lineHeight: 29.9,
						fontFamily: "Poppins2",
						left: 40,
						bottom: imageH*0.22,
						position:"absolute"
					}}
				>
					{event.title}
				</Text>
			</View> */}

			{/* <View style={{ flexDirection: "row", top: -imageH*0.05, left: 50 }}>
				<View>
					<Icon
						name="time-outline"
						size={16}
						style={{
							position: "absolute",
							color: "#fff",
							top: -44,
							left: -8,
						}}
					/>
					<Text
						style={{
							color: "#fff",
							fontFamily: "Poppins2",
							fontSize: 14,
							position: "absolute",
							bottom: 23,
							left: 9,
						}}
					>
						{event.time} {"|"}
					</Text>
				</View>

				<View style={{ flexDirection: "row", left: 3 }}>
					<Icon
						name="location-outline"
						size={16}
						style={{
							position: "absolute",
							color: "#fff",
							left: 70,
							bottom: 28,
						}}
					/>
					<Text
						style={{
							color: "#fff",
							fontFamily: "Poppins2",
							fontSize: 14,
							textTransform: "uppercase",
							position: "absolute",
							bottom: 23,
							left: 85,
						}}
					>
						{event.venue}
					</Text>
				</View>
			</View> */}
		</>
	);
};

export default Events;
