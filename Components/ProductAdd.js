import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Back } from "../constants/icons";
import { MIP } from "./MultipleImageUpload";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("screen");
export const Form = () => {
	const navigation = useNavigation();
	return (
		<View style={{ alignSelf: "center", width: width - 40, paddingTop: 100 }}>
			<View style={{ flexDirection: "row", paddingBottom: 15 }}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.goBack()}
				>
					<Back color={"#707070"} />
				</TouchableOpacity>
				<Text
					style={{
						fontSize: 23.5,
						fontWeight: "600",
						color: "rgba(39, 46, 57, 1)",
						marginLeft: 20,
					}}
				>
					Add new product
				</Text>
			</View>
			<View
				style={{
					borderBottomColor: "black",
					borderBottomWidth: StyleSheet.hairlineWidth,
				}}
			/>
			<Formik
				initialValues={{
					productname: "",
					productdescription: "",
					imageuri: "",
					negotiable: true,
					price: "",
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({
					values,
					errors,
					touched,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => (
					<View>
						<MIP/>
						<Text style={{ fontSize: 15, paddingTop: 10 }}>Product Name</Text>
						<TextInput
							style={styles.input}
							placeholder="Product Name"
							onChangeText={handleChange("productname")}
							value={values.productname}

						/>
						<Text style={{ fontSize: 15, paddingTop: 10 }}>
							Product Description
						</Text>
						<TextInput
							multiline
							style={{
								marginBottom: 20,
								borderWidth: 1,
								borderColor: "#B1AFAF",
								height: 120,
								paddingBottom: 100,
								marginTop: 10,
							}}
							placeholder="Your Description here..."
							onChangeText={handleChange("productdescription")}
							value={values.productdescription}
						/>
						<View
							style={{
								borderBottomColor: "black",
								borderBottomWidth: StyleSheet.hairlineWidth,
							}}
						/>
						<TextInput
							style={styles.input}
							placeholder="Price in Naira"
							onChangeText={handleChange("price")}
							value={values.price}
							keyboardType="numeric"
						/>

						{/* {values.price === ""
							? () => {
									
								
								return (
										<Pressable onPress={handleSubmit}>
											<View
												style={{
													backgroundColor: "blue",
													width: 60,
													justifyContent: "center",
													alignSelf: "center",
													alignItems: "center",
													borderRadius: 8,
													marginTop: 10,
													height: 30,
												}}
											>
												<Text
													style={{
														fontSize: 15,
														fontWeight: "500",
														color: "white",
													}}
												>
													Upload
												</Text>
											</View>
										</Pressable>
									)

							 }
							: null}  */}

							<Pressable
							onPress={handleSubmit}
							>
								<View>
									<Text>fsjffjsg</Text>
								</View>
							</Pressable>

					</View>
				)}
			</Formik>
		</View>

	);
};

const styles = StyleSheet.create({
	input: {
		height: 43,
		backgroundColor: "rgba(217, 217, 217, 1)",
		borderRadius: 5,
		marginTop: 10,
		paddingLeft: 10,
		fontSize: 14,
		textAlign: "left",
	},
	checkbox: {
		alignSelf: "center",
		width: 20,
		height: 20,
	},
	label: {
		fontSize: 16,
	},
	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 20,
		paddingTop: 15,
		justifyContent: "space-between",
	},
});
