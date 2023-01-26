// import React, { useState } from "react";
// import {
// 	ActivityIndicator,
// 	Button,
// 	FlatList,
// 	Image,
// 	StyleSheet,
// 	Text,
// 	useWindowDimensions,
// 	View,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

// export const MIP = () => {
// 	const [images, setImages] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { width, height } = useWindowDimensions();

// 	const pickImages = async () => {
// 		// No permissions request is necessary for launching the image library
// 		setIsLoading(true);
// 		let result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ImagePicker.MediaTypeOptions.All,
// 			// allowsEditing: true,
// 			allowsMultipleSelection: true,
// 			selectionLimit:5,
// 			aspect: [4, 3],
// 			quality: 1,
// 		});
// 		setIsLoading(false);
// 		// console.log(result);

// 		if (!result.canceled) {
// 			// setImages(result.assets ? [result.assets] : result.selected)
// 			setImages(result.assets[0].uri)
// 		}

// 		// if(!result.canceled){
// 		// 	setImages(result.assets.uri)
// 		// }
		
// 	return (
// 		<View
// 			style={{
// 				width: width - 40,
// 				height: height / 4.8,
// 				// backgroundColor: "rgba(217, 217, 217, 1)",
// 				marginTop: 15,
// 				borderRadius: 3.5,
// 				borderStyle:"dashed",
// 				borderColor:"#d9d9d9",
// 				borderWidth:2,
// 				borderRadius:20
// 			}}
// 		>
// 			<View style={{ padding: 60, flexDirection: "row", justifyContent:"flex-end", marginHorizontal:40}}>
// 				{isLoading ? (
// 					<View>
// 						<ActivityIndicator size="large" color="#0000ff" />
// 					</View>
// 				) : (
// 					<Pressable onPress={pickImages}>
// 						<View
// 							style={{
// 								height: 30,
// 								width: 30,
// 								// backgroundColor: "rgba(217, 217, 217, 1)",
// 								borderRadius: 20,
// 								alignSelf: "flex-end",
// 								marginLeft: width - 190,
// 								marginBottom: 5
// 							}}
// 						>
// 							<View style={{backgroundColor:"blue", height:50, width:50, borderRadius:50}}>
// 							<Text
// 								style={{
// 									fontSize: 40,
// 									fontWeight: "400",
// 									color: "#ffff",
// 									alignSelf: "center",
// 									bottom:3,
// 									// fontFamily:"Poppins"

// 								}}
// 							>
// 								+
// 							</Text>
// 							</View>
// 						</View>
// 					</Pressable>
// 				)}
// 				<Text style={{ fontSize: 18, left:30, alignSelf:"center", top:5, lineHeight:27, fontWeight:"400"
			
// 			// ,fontFamily:"Poppins"
// 			}}>Upload here</Text>
// 			</View>
// 			<FlatList
// 				data={images}
// 				horizontal
// 				renderItem={({ item }) => (
// 					// export const img = item.uri
// 					<Image
// 						source={{ uri: item.uri }}
// 						style={{ width: 106, height: 134, marginLeft: 10, borderRadius: 6 }}
// 					/>
// 				)}
// 				keyExtractor={(item) => item.uri}
// 				contentContainerStyle={{}}
// 			/>
// 		</View>
// 	);
// };
// }


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import { Ionicons } from '@expo/vector-icons';


// export const MIP = ()=> {
// 	const [image, setImage] = useState(null);
  
// 	const handleSelectImage = () => {
// 	  ImagePicker.showImagePicker({
// 		title: 'Select Image',
// 	  }, (response) => {
// 		if (response.didCancel) {
// 		  console.log('User cancelled image picker');
// 		} else if (response.error) {
// 		  console.log('ImagePicker Error: ', response.error);
// 		} else {
// 		  setImage(response);
// 		}
// 	  });
// 	};
  
// 	return (
// 	  <View style={styles.container}>
// 		<TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
// 		  <Ionicons name="ios-camera" size={40} color="#888" />
// 		  <Text style={styles.selectButtonText}>Select Image</Text>
// 		</TouchableOpacity>
// 		{image && <Image source={{ uri: image.uri }} style={styles.preview} />}
// 	  </View>
// 	);
//   }
  

//   const styles = StyleSheet.create({
// 	container: {
// 	  flex: 1,
// 	  alignItems: 'center',
// 	  justifyContent: 'center',
// 	},
// 	selectButton: {
// 	  borderRadius: 5,
// 	  backgroundColor: '#0084ff',
// 	  padding: 10,
// 	  margin: 20,
// 	  alignItems: 'center',
// 	},
// 	selectButtonText: {
// 	  color: 'white',
// 	  fontWeight: 'bold',
// 	  fontSize: 16,
// 	},
// 	preview: {
// 	  width: '100%',
// 	  height: '100%',
// 	  position: 'absolute',
// 	  top: 0,
// 	  left: 0,
// 	},
//   });


export const MIP = ()=> {
	const [images, setImages] = useState([]);
  
	const handleSelectImage = () => {
	  ImagePicker.showImagePicker({
		title: 'Select Image',
		maxImagesCount: 5,
		storageOptions: {
		  skipBackup: true,
		  path: 'images',
		},
	  }, (response) => {
		if (response.didCancel) {
		  console.log('User cancelled image picker');
		} else if (response.error) {
		  console.log('ImagePicker Error: ', response.error);
		} else {
		  setImages([...images, response]);
		}
	  });
	};
  
	return (
	  <View style={styles.container}>
		<TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
		  <Text style={styles.selectButtonText}>Select Images</Text>
		</TouchableOpacity>
		{images.map((image, index) => (
		  <Image key={index} source={{ uri: image.uri }} style={styles.preview} />
		))}
	  </View>
	);
  }
  

  










  

















