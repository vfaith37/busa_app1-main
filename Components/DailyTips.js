import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const DailyTips = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	useEffect(() => {
		axios
			.get("https://type.fit/api/quotes")
			.then((response) => {
				const quotes = response.data;
				const randomIndex = Math.floor(Math.random() * quotes.length);
				const randomQuote = quotes[randomIndex];
				setQuote(randomQuote.text);
				setAuthor(randomQuote.author);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={{ paddingBottom: 10 }}>
			<Image
				source={require("../assets/background.jpg")}
				style={{
					height: 120,
					borderRadius: 10,
					width: width - 20,
					alignSelf: "center",
				}}
				// resizeMode={"contain"}
			/>
			<View style={{ position: "absolute", paddingLeft: 15 }}>
				<Text
					style={{
						color: "white",
						width: width - 30,
						fontSize: 12,
						fontFamily: "Poppins",
						paddingBottom: 15,
						paddingTop: 15,
					}}
				>
					{'"' + quote + '"'}
				</Text>
				{author !== null ? (
					<Text style={{ color: "white", fontSize: 15, fontFamily: "Poppins" }}>
						{"- " + author}
					</Text>
				) : null}
			</View>
		</View>
	);
};

export default DailyTips;
