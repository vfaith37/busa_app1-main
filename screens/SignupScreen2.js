// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import { Formik } from "formik";
// import axios from "axios";
// import { Picker } from "@react-native-picker/picker";
// const App = () => {
// 	const [selectedValue, setSelectedValue] = useState("option1");
// 	const level = [
// 		{ level: "100" },
// 		{ level: "200" },
// 		{ level: "300" },
// 		{ level: "400" },
// 		{ level: "500" },
// 		{ level: "600" },
// 		{ level: "700" },
// 	];
// 	// const options = [
// 	// 	{ label: "Option 1", value: "option1" },
// 	// 	{ label: "Option 2", value: "option2" },
// 	// 	{ label: "Option 3", value: "option3" },
// 	// ];
// 	return (
// 		<View style={{ alignContent: "center", justifyContent: "center", flex: 1 }}>
// 			<Formik
// 				initialValues={{
// 					level: "level",
// 					course: "course",
// 					hall: "hall of residence",
// 				}}
// 				onSubmit={(values) => {
// 					console.log(values);
// 					// setSelectedValue(values.level);
// 					// axios.post("http://yourserver.com/submit", { value: values.dropdown });
// 				}}
// 			>
// 				{({ handleChange, handleSubmit, values }) => (
// 					<View>
// 						{/* <Picker
// 							selectedValue={values.level}
// 							onValueChange={handleChange("level")}
// 						>
// 							<Picker.Item label="Select an option" value="" />
// 							<FlatList
// 								data={options}
// 								renderItem={({ item }) => (
// 									<Picker.Item label={item.label} value={item.value} />
// 								)}
// 								keyExtractor={(item) => item.value}
// 							/>
// 						</Picker> */}
// 						{/* <Picker
// 							selectedValue={selectedValue}
// 							onValueChange={(itemValue, itemIndex) => {
// 								setSelectedValue(itemValue);
// 								props.handleChange("dropdown")(itemValue);
// 							}}
// 						>
// 							<Picker.Item label="Select an option" value="" />
// 							<FlatList
// 								data={options}
// 								renderItem={({ item }) => (
// 									<Picker.Item label={item.label} value={item.value} />
// 								)}
// 								keyExtractor={(item) => item.value}
// 							/>
// 						</Picker> */}
// 						<Picker
// 							selectedValue={values.level}
// 							onValueChange={handleChange("level")}
// 						>
// 							<Picker.Item label="100" value="100" />
// 							<Picker.Item label="200" value="200" />
// 							<Picker.Item label="300" value="300" />
// 							<Picker.Item label="400" value="400" />
// 							<Picker.Item label="500" value="500" />
// 							<Picker.Item label="600" value="600" />
// 						</Picker>
// 						<Picker
// 							selectedValue={values.course}
// 							onValueChange={handleChange("course")}
// 							style={{ borderRadius: 30 }}
// 						>
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Accounting" value="Accounting" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Anatomy" value="Anatomy" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Agriculture" value="Agriculture" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Biochemistry" value="Biochemistry" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Biology" value="Biology" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Business Administration"
// 									value="Business Administration"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Business Education"
// 									value="Business Education"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Chemistry" value="Chemistry" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Christian Religious Knowledge"
// 									value="Christian Religious Knowledge"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Computer Engineering"
// 									value="Computer Engineering"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Computer Science"
// 									value="Computer Science"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Computer Information System"
// 									value="Computer Information System"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Computer Technology"
// 									value="Computer Technology"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Economics" value="Economics" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Economics Education"
// 									value="Economics Education"
// 								/>
// 							) : null}
// 							<Picker.Item
// 								label="Education and English Language"
// 								value="Education and English Language"
// 							/>
// 							<Picker.Item
// 								label="Education Administration and Planning"
// 								value="Education Administration and Planning"
// 							/>
// 							<Picker.Item
// 								label="English and Literary Studies"
// 								value="English and Literary Studies"
// 							/>
// 							<Picker.Item label="English Studies" value="English Studies" />
// 							<Picker.Item label="Finance" value="Finance" />
// 							{values.level <= 400 ? (
// 								<Picker.Item label="French" value="French" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="French and International Relations"
// 									value="French and International Relations"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Guidance and Counseling"
// 									value="Guidance and Counseling"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="History and International Studies"
// 									value="History and International Studies"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Information Resource Management"
// 									value="Information Resource Management"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Information Technology"
// 									value="Information Technology"
// 								/>
// 							) : null}
// 							<Picker.Item
// 								label="International Law and Diplomacy"
// 								value="International Law and Diplomacy"
// 							/>
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Law" value="Law" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Marketing" value="Marketing" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Mass Communication"
// 									value="Mass Communication"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Mathematics" value="Mathematics" />
// 							) : null}
// 							<Picker.Item
// 								label="Medical Labrorary Science"
// 								value="Medical Labrorary Science"
// 							/>
// 							<Picker.Item label="Medicine" value="Medicine" />
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Microbiology" value="Microbiology" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Music" value="Music" />
// 							) : null}
// 							<Picker.Item
// 								label="Nursing / Nursing Sciences"
// 								value="Nursing / Nursing Sciences"
// 							/>
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Nutrition and Dietetics"
// 									value="Nutrition and Dietetics"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Physics with Electronics"
// 									value="Physics with Electronics"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Public Administration"
// 									value="Public Administration"
// 								/>
// 							) : null}
// 							<Picker.Item label="Public Health" value="Public Health" />
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Religious Studies"
// 									value="Religious Studies"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Social Works" value="Social Works" />
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item
// 									label="Software Engineering"
// 									value="Software Engineering"
// 								/>
// 							) : null}
// 							{values.level <= 400 ? (
// 								<Picker.Item label="Social Works" value="Social Works" />
// 							) : null}
// 						</Picker>
// 						<Picker
// 							selectedValue={values.hall}
// 							onValueChange={handleChange("hall")}
// 						>
// 							<Picker.Item label="Welch" value="Welch" />
// 							<Picker.Item label="Samuel Akande" value="Samuel Akande" />
// 							<Picker.Item label="Nelson Mandela" value="Nelson Mandela" />
// 							<Picker.Item label="Neal Wilson" value="Neal Wilson" />
// 							<Picker.Item label="Bethel" value="Bethel" />
// 							<Picker.Item label="Gideon Troopers" value="Gideon Troopers" />
// 							<Picker.Item label="Winslow" value="Winslow" />
// 							<Picker.Item label="Queen Esther" value="Queen Esther" />
// 							<Picker.Item
// 								label="Felicia Adebisi Dada"
// 								value="Felicia Adebisi Dada"
// 							/>
// 							<Picker.Item label="Ameyo Adadevor" value="Ameyo Adadevor" />
// 							<Picker.Item label="Gamaliel" value="Gamaliel" />
// 						</Picker>
// 						<TouchableOpacity onPress={handleSubmit}>
// 							<View style={{ height: 20, width: 100, backgroundColor: "blue" }}>
// 								<Text style={{ color: "white" }}>Submit</Text>
// 							</View>
// 						</TouchableOpacity>
// 					</View>
// 				)}
// 			</Formik>
// 		</View>
// 	);
// };

// export default App;




import React from "react";
import { View, Text} from "react-native";
import { Formik } from "formik";
import axios from 'axios';
import Dropdown from "../Components/DropDown";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUpScreen2 = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('https://your-backend-url.com/submit-form', values);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ level: '', hallOfResidence: '', campus: '', gender: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <View>
            <Dropdown
              label="Level"
              name="level"
              items={[
                { label: '100', value: '100' },
                { label: '200', value: '200' },
                { label: '300', value: '300' },
                { label: '400', value: '400' },
                { label: '500', value: '500' },
                { label: '600', value: '600' },
              ]}
            />
            <Dropdown
              label="Hall of Residence"
              name="hallOfResidence"
              items={[
                { label: 'Mens Hostel', value: 'mens_hostel' },
                { label: 'Womens Hostel', value: 'womens_hostel' },
              ]}
            />
            <Dropdown
              label="Campus"
              name="campus"
              items={[
                { label: 'Main Campus', value: 'main_campus' },
                { label: 'City Campus', value: 'city_campus' },
              ]}
            />
            <Dropdown
              label="Gender"
              name="gender"
              items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
              />
              <TouchableOpacity
              onPress={handleSubmit}
              >
             <View>
             <Text>submit</Text>
            </View>
             </TouchableOpacity>

              </View>
              )}
              </Formik>
              </View>

  )
            }

            export default SignUpScreen2
