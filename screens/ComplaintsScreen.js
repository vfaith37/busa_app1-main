// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ComingSoon from '../Components/ComingSoon'

// const ComplaintsScreen = () => {
//   return (
//     <View>
//         <ComingSoon/>
//     </View>
//   )
// }

// export default ComplaintsScreen

// const styles = StyleSheet.create({});
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { FormInput } from "../Components/FormInput";
import { FormSubmitBtn } from "../Components/FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation, StackActions } from "@react-navigation/native";
import client from "../api/client";
import { COLORS } from "../constants/theme";
import ErrorButton from "../Components/ErrorButton";
import { Eye } from "../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("screen");

const validationSchema = Yup.object({
  complaint: Yup.string()
    .trim()
    .min(20, "Minimum of 20 characters")
    .required("Field can't be left blank"),
});

const ComplaintsScreen = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const userInfo = {
    complaint: "",
  };

  const submit = async (values) => {
    try {
      setIsLoading(true);
      const res = await client.post("/sendFeedBack", {
        ...values,
      });

      console.log(res);
      if (res.data.success && res.status === 200) {
        // navigation.dispatch(
        //   StackActions.replace("verify", {
        //     email: values.email,
        //     password: values.password,
        //   })
        // );

        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
      setError(true);
      setErrorMessage(
        e.message ? e.message : "Oops! something went wrong, pls try again"
      );
      onError && onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
    console.log(values);
  };
  return (
    <View  style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "400",
                color: COLORS.extra,
                fontFamily: "Poppins3",
              }}
            >
              Feedback & Complaint
            </Text>
            <Text
              style={{
                width: "70%",
                fontSize: 15,
                fontWeight: "300",
                textAlign: "center",
                color: COLORS.text,
                fontFamily: "Poppins",
              }}
            >
              Let us know what we can do to improve your experience in this app
            </Text>
          </View>
          <View style={{ width: width * 0.8, alignSelf: "center" }}>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => {
                const { complaint } = values;
                return (
                  <>
                    <FormInput
                      onChangeText={handleChange("complaint")}
                      onBlur={handleBlur("complaint")}
                      error={touched.complaint && errors.complaint}
                      value={complaint}
                      // label={"Complaint"}
                      style={styles.text}
                      TextInputStyle={styles.textInput}
                      multiline
                    />
                    {isLoading ? (
                      <View>
                        <ActivityIndicator
                          size="large"
                          color={COLORS.primaryblue}
                        />
                      </View>
                    ) : (
                      <FormSubmitBtn
                        Submitting={isSubmitting}
                        onPress={handleSubmit}
                        title={"Submit Complaint"}
                      />
                    )}
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default ComplaintsScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 13.5,
    fontFamily: "Poppins",
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray3,
    borderRadius: 5,
    height: Platform.OS !== "android" ? 200 : null,
    marginBottom: 2,
    paddingLeft: 5,
    fontSize: 14,
    fontFamily: "Poppins",
  },
});
