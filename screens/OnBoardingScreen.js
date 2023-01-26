import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
	Image,
	Animated,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");
const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const Posts = [
	{
		key: "3571572",
		title: "Connecting the Babcock Space",
		image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
	},
	{
		key: "3571747",
		title: "Get Trusted Information",
		description:
			"Use the optical SAS system, then you can navigate the auxiliary alarm!",
		image: "https://image.flaticon.com/icons/png/256/3571/3571747.png",
	},
	{
		key: "3571680",
		title: "Meet Trusted Sellers",
		description:
			"The ADP array is down, compress the online sensor so we can input the HTTP panel!",
		image: "https://image.flaticon.com/icons/png/256/3571/3571680.png",
	},
	{
		key: "3571603",
		title: "Get your E-tickets",
		image: require("../assets/animations/tickets.json"),
	},
];

const Indicator = ({ scrollx }) => {
	return (
		<View style={{ position: "absolute", flexDirection: "row", bottom: 100 }}>
			{Posts.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

				const scale = scrollx.interpolate({
					inputRange,
					outputRange: [0.6, 0.9, 0.6],
					extrapolate: "clamp",
				});
				return (
					<Animated.View
						key={`indicator-${i}`}
						style={{
							height: 10,
							width: 10,
							borderRadius: 5,
							backgroundColor: "#fff",
							margin: 10,
							transform: [
								{
									scale,
								},
							],
						}}
					/>
				);
			})}
		</View>
	);
};

const Backdrop = ({ scrollx }) => {
	const backgroundColor = scrollx.interpolate({
		inputRange: bgs.map((_, i) => i * width),
		outputRange: bgs.map((bg) => bg),
	});
	return (
		<Animated.View
			style={[
				StyleSheet.absoluteFillObject,
				{
					backgroundColor,
				},
			]}
		/>
	);
};
const Square = ({ scrollx }) => {
	const YOLO = Animated.modulo(
		Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
		1
	);

	const rotate = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ["35deg", "0deg", "-35deg"],
	});
	return (
		<Animated.View
			style={{
				width: height,
				height: height,
				backgroundColor: "#fff",
				borderRadius: 86,
				position: "absolute",
				top: -height * 0.6,
				left: -height * 0.3,
				transform: [
					{
						rotate,
					},
				],
			}}
		/>
	);
};

export default function OnBoardingScreen() {
	const scrollx = React.useRef(new Animated.Value(0)).current;
	return (
		<View style={styles.container}>
			<Backdrop scrollx={scrollx} />
			<Square scrollx={scrollx} />
			<Animated.FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
				data={Posts}
				scrollEventThrottle={18}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollx } } }],
					{ useNativeDriver: false }
				)}
				// snapToAlignment="center"
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<View style={{ width, alignItems: "center", padding: 20 }}>
						<View style={{ flex: 0.7, justifyContent: "center" }}>
							<Image
								source={item.image}
								style={{
									width: width / 2,
									height: height / 2,
									resizeMode: "cover",
								}}
							/>
						</View>
						<View style={{ flex: 0.3 }}>
							<Text
								style={{
									fontWeight: "800",
									fontSize: 24,
									marginBottom: 10,
									color: "#fff",
								}}
							>
								{item.title}
							</Text>
							{/* this means that on the last page of the array, show the get started button */}
							{Posts[Posts.length - 1] && (
								<TouchableOpacity
									onPress={() => navigation.navigate("AdScreen")}
									activeOpacity={0.5}
								>
									<Text
										style={{ color: "#000", fontweight: "600", fontSize: 24 }}
									>
										Get Started
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				)}
			/>

			<Indicator scrollx={scrollx} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
