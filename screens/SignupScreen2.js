import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import client from "../api/client";
import { COLORS } from "../constants/theme";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorButton from "../Components/ErrorButton";
import { Person, Man, School, Home } from "../constants/icons";

const { width, height } = Dimensions.get("screen");

const DropdownComponent = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const navigation = useNavigation();

	const getUserId = async () => {
		try {
			const value = await AsyncStorage.getItem("userInfo");
			const userToken = await AsyncStorage.getItem(`userToken`);

			if (value !== null && userToken !== null) {
				setUserInfo(JSON.parse(value));
				setUserToken(userToken);
			}
		} catch (e) {
			console.log(`${e}`);
		}
	};
	useEffect(() => {
		getUserId();
	}, []);

	const Gender = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];

	const Level = [
		{
			label: "100",
			value: "100",
		},
		{
			label: "200",
			value: "200",
		},
		{ label: "300", value: "300" },
		{ label: "400", value: "400" },
		{ label: "500", value: "500" },
		{ label: "600", value: "600" },
	];

	const campus = [
		{
			label: "Main",
			value: "Main",
		},
		{ label: "Iperu", value: "Iperu" },
	];

	const course = [
		{
			label: "Software Enginnering",
			value: "Software Engineering",
		},
		{
			label: "Computer Science",
			value: "Computer Science",
		},
	];
	const hall = [
		{
			label: "Samuel Akande",
			value: "Samuel Akande",
		},
		{
			label: "Winslow",
			value: "Winslow",
		},
		{
			label: "Welch",
			value: "Welch",
		},
		{
			label: "Nelson Mandela",
			value: "Nelson Mandela",
		},
	];

	const formik = useFormik({
		initialValues: {
			gender: "",
			campus: "",
			course: "",
			level: "",
			hall: "",
		},

		validate: (values) => {
			const errors = {};
			if (!values.gender) {
				errors.gender = "gender required";
			}
			if (!values.campus) {
				errors.campus = "campus required";
			}
			if (!values.course) {
				errors.course = "course required";
			}
			if (!values.level) {
				errors.level = "level required";
			}
			if (!values.hall) {
				errors.hall = "hall required";
			}

			return errors;
		},

		onSubmit: async (values) => {
			console.log("gender:", values.gender.value);
			console.log("level:", values.level.value);
			console.log("course:", values.course.value);
			console.log("campus:", values.campus.value);
			console.log("hall:", values.hall.value);

			const gender = values.gender.value;
			const level = values.level.value;
			const campus = values.campus.value;
			const course = values.course.value;
			const hall = values.hall.value;

			const token = userToken;
			const config = {
				headers: { Authorization: `Bearer ${token}` },
				"content-type": "multipart/form-data",
			};

			setIsLoading(true);

			await client
				.put(
					`/user/${userInfo?._id}`,
					{
						gender: gender,
						level: level,
						campus: campus,
						course: course,
						hall: hall,
					},
					config
				)
				.then(async (res) => {
					console.log(res);

					if (res.status === 201) {
						console.log(res.data.data);
						// get the response. if it conatins all the userdata,

						let userData = res.data.data;
						//await the async storage and update the userInfo to get the current userdata.

						try {
							// stringify the userData object
							await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
						} catch (e) {
							console.log(`Async Storage error: ${e}`);
							setIsLoading(false);
						}
						// if succesful, dispatch to homescreen
						navigation.dispatch(StackActions.replace("Tab"));
					}
				})
				.catch((e) => {
					console.log(`${e}`);
					setErrorMessage(
						e.message
							? e.message
							: "Oops! Something went wrong. Please try again later."
					);
					setIsLoading(false);
				});
			setIsLoading(false);
		},
	});

	const handleDropdownValueChange = (value) => {
		formik.setFieldValue("gender", value);
	};

	const handleDropdownValueChange2 = (value) => {
		formik.setFieldValue("level", value);
	};
	const handleDropdownValueChange3 = (value) => {
		formik.setFieldValue("campus", value);
	};
	const handleDropdownValueChange4 = (value) => {
		formik.setFieldValue("course", value);
	};
	const handleDropdownValueChange5 = (value) => {
		formik.setFieldValue("hall", value);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={{ width: width * 0.97, alignSelf: "center" }}>
				<View style={{ paddingTop: 100 }}>
					<Text
						style={{
							fontSize: 35,
							fontWeight: "700",
							textAlign: "center",
							color: COLORS.primary,
							fontFamily:"Poppins"
						}}
					>
						Details
					</Text>
					<Text
						style={{
							fontFamily: "Poppins",
							color: COLORS.gray,
							alignSelf: "center",
							fontSize: 15,
							paddingBottom: 20,
						}}
					>
						Just a few more details
					</Text>
					<View style={{ flexDirection: "row" }}>
						<View>
							<Text style={styles.error}>
								{JSON.stringify(formik.errors.gender)}
							</Text>
							<Dropdown
								style={[
									styles.dropdown,
									{
										width: 140,
									},
								]}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								iconStyle={styles.iconStyle}
								itemTextStyle={styles.textItem}
								data={Gender}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder="Gender"
								value={formik.values.gender}
								errorMessage={
									formik.touched.gender && formik.errors.gender
										? formik.errors.gender
										: undefined
								}
								onChange={(value) => handleDropdownValueChange(value)}
								onChangeText={formik.handleChange("gender")}
								renderLeftIcon={() => Man}
							/>
							{/* <Text style={{fontFamily:"Poppins", fontSize:5}}>{JSON.stringify(formik.touched)}</Text> */}
						</View>

						<View>
							<Text style={styles.error}>
								{JSON.stringify(formik.errors.level)}
							</Text>
							<Dropdown
								style={[
									styles.dropdown,
									{
										width: 140,
									},
								]}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								iconStyle={styles.iconStyle}
								itemTextStyle={styles.textItem}
								data={Level}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder="Level"
								value={formik.values.level}
								onChange={(value) => handleDropdownValueChange2(value)}
								onChangeText={formik.handleChange("level")}
								renderLeftIcon={() => School}
								showsVerticalScrollIndicator={false}
							/>
						</View>
					</View>

					<View>
						<Text style={styles.error}>
							{JSON.stringify(formik.errors.course)}
						</Text>
						<Dropdown
							style={styles.dropdown}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							itemTextStyle={styles.textItem}
							data={course}
							maxHeight={300}
							search
							searchPlaceholder="Search..."
							labelField="label"
							valueField="value"
							placeholder="Course"
							value={formik.values.course}
							onChange={(value) => handleDropdownValueChange4(value)}
							onChangeText={formik.handleChange("course")}
							renderLeftIcon={() => Man}
						/>
					</View>

					<View>
						<Text style={styles.error}>
							{JSON.stringify(formik.errors.campus)}
						</Text>
						<Dropdown
							style={styles.dropdown}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							itemTextStyle={styles.textItem}
							data={campus}
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder="Campus"
							value={formik.values.campus}
							onChange={(value) => handleDropdownValueChange3(value)}
							onChangeText={formik.handleChange("campus")}
							renderLeftIcon={() => Home}
						/>
					</View>

					<View>
						<Text style={styles.error}>
							{JSON.stringify(formik.errors.hall)}
						</Text>
						<Dropdown
							style={styles.dropdown}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							itemTextStyle={styles.textItem}
							data={hall}
							maxHeight={300}
							search
							searchPlaceholder="Search..."
							labelField="label"
							valueField="value"
							placeholder="Hall"
							value={formik.values.hall}
							onChange={(value) => handleDropdownValueChange5(value)}
							onChangeText={formik.handleChange("hall")}
							renderLeftIcon={() => Home}
						/>
					</View>
					{/* <Button title="Continue" onPress={formik.handleSubmit} /> */}

					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primaryblue} />
					) : (
						<FormSubmitBtn title={"Update"} onPress={formik.handleSubmit} />
					)}
				</View>
				{error && (
					<ErrorButton
						onPress={() => {
							setError(false);
						}}
						message={errorMessage}
						style={{ paddingTop: height / 35 }}
						color={COLORS.red}
						borderRadius={10}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		backgroundColor: "white",
		borderRadius: 5,
		borderBottomWidth: 3,
		borderBottomColor: COLORS.primary,
		backgroundColor: COLORS.lightGray,
		padding: 12,
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	icon: {
		marginRight: 5,
		color: COLORS.primaryblue,
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textItem: {
		flex: 1,
		fontSize: 16,
		fontFamily: "Poppins",
		color: "gray",
	},
	placeholderStyle: {
		fontSize: 16,
		fontFamily: "Poppins",
		color: "#ccc",
    marginLeft: 10
	},
	selectedTextStyle: {
		fontSize: 16,
		color: COLORS.primaryblue,
		fontFamily: "Poppins",
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: COLORS.primaryblue,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		fontFamily: "Poppins",
	},
	error: {
		fontFamily: "Poppins",
		fontSize: 15,
		color: COLORS.red,
		right: 25,
		position: "absolute",
		top: -6,
	},
});
