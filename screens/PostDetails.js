import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const imageW = width;
const imageH = height * .5;

const PostDetails = ({ route }) => {
	return (
		<SafeAreaView>
			<About route={route} />
		</SafeAreaView>
	);
};

const About = (props) => {
	const { image, title, date, content } = props.route.params;
	return (
		<>
			<PostImage image={image} />
			<PostAbout title={title} date={date} content={content} />
		</>
	);
};

const PostImage = (props) => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const handleScroll = (event) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / imageW);
		setCurrentSlideIndex(index);
	};

	return (
		<>
			<View>
				<FlatList
					data={props.image}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					scrollEnabled
					onScroll={handleScroll}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }, id) => (
						<Image
							style={{
								height: imageH,
								width: width,
								resizeMode: Platform.OS === "android" ? "cover" : null,
							}}
							key={id}
							source={{ uri: item }}
						/>
					)}
				/>
			</View>

			{props.image.length > 1 ? (
				<View style={styles.pagination}>
					{props.image.map((_, index) => {
						return (
							<View
								key={index}
								style={[
									styles.dot,
									currentSlideIndex == index && {
										backgroundColor: COLORS.black,
										width: 7,
										height: 7,
										borderRadius: 10,
									},
								]}
							/>
						);
					})}
				</View>
			) : null}
		</>
	);
};

const PostAbout = (props) => {
	return (
		<>
			<View style={{ marginLeft: 15, marginTop: 15 }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					bounces={false}
					contentContainerStyle={{ height: height * 1.9 }}
					// scrollIndicatorInsets={{width:10}}
					// indicatorStyle={"red"}
				>
					<View>
						<Text
							style={{
								fontWeight: "600",
								fontSize: 19,
								color: COLORS.black,
								width: 322,
								height: 25,
								lineHeight: 24.7,
								fontFamily: "Poppins3",
							}}
						>
							{props.title}
						</Text>
						<Text
							style={{
								fontWeight: "300",
								color: COLORS.darkblack,
								fontSize: 10,
								lineHeight: 13,
								fontFamily: "Poppins",
								top: 4,
							}}
						>
							{props.date}
						</Text>
					</View>

					<View>
						<Text
							style={{
								fontWeight: "normal",
								fontSize: 13,
								lineHeight: 15,
								color: COLORS.mgray,
								fontFamily: "Poppins2",
								top: 13,
								textTransform: "capitalize",
							}}
						>
							{props.content}
						</Text>
					</View>
				</ScrollView>
			</View>
		</>
	);
};

export default PostDetails;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// top: 32,
	},
	dot: {
		borderRadius: 10,
		height: 7,
		width: 7,
		backgroundColor: COLORS.gray,
		marginBottom: 3,
		marginHorizontal: 3,
		justifyContent: "center",
	},
	pagination: {
		bottom: -6,
		left: imageW / 2.3,
		position: "absolute",
		flexDirection: "row",
		// justifyContent:"center",
		// width:40,
	},
});
