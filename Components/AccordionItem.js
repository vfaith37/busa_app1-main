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
import { COLORS } from "../constants/theme";
import { ChevDown, ChevUp } from "../constants/icons";

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
        console.log("1", value);
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
        activeOpacity={1}
        onPress={() => setShowContent(!showContent)}
      >
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Personal Details</Text>
            {showContent === false ? (
              <View
                style={{
                  backgroundColor: COLORS.white2,
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChevUp />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: COLORS.white2,
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChevDown />
              </View>
            )}
          </View>
          {showContent && (
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.blendgray,
                paddingTop: 10,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={styles.body}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.vcontainer}>
              <Text style={styles.text}>First Name</Text>
              <View style={[styles.textInput, { width: 135 }]}>
                <Text style={styles.info}>
                  {userInfo?.firstname.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.vcontainer}>
              <Text style={styles.text}>Last Name</Text>
              <View style={[styles.textInput, { width: 155 }]}>
                <Text style={styles.info}>
                  {userInfo?.lastname.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.vcontainer]}>
            <Text style={styles.text}>Email</Text>
            <View
              style={[
                styles.textInput,
                {
                  width: 295,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={styles.info}>
                {userInfo?.email.split("@student.babcock.edu.ng")}
              </Text>
              <Text style={styles.info}>@student.babcock.edu.ng </Text>
            </View>
          </View>
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-between" },
              styles.vcontainer,
            ]}
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
                placeholder={userInfo?.gender}
                style={[styles.textInput, { width: 75 }]}
                placeholderTextColor={COLORS.lightGray}
              />
            </View>
          </View>
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-between" },
              styles.vcontainer,
            ]}
          >
            <View>
              <Text style={styles.text}>Level</Text>
              <TextInput
                editable={false}
                placeholder={userInfo?.level}
                style={[styles.textInput, { width: 40 }]}
                placeholderTextColor={COLORS.lightGray}
              />
            </View>
            <View>
              <Text style={styles.text}>Campus</Text>
              <TextInput
                editable={false}
                placeholder={"Iperu"}
                style={[styles.textInput, { width: 80 }]}
                placeholderTextColor={COLORS.lightGray}
              />
            </View>
            <View>
              <Text style={styles.text}>Hall of Residence</Text>
              <TextInput
                editable={false}
                placeholder={userInfo?.hall}
                style={[styles.textInput, { width: 150 }]}
                placeholderTextColor={COLORS.lightGray}
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
    borderColor: COLORS.blendgray,
    borderWidth: 1,
  },
  vcontainer: {
    paddingBottom: 5,
    // paddingTop: 5,
  },
  textInput: {
    fontSize: 15,
    borderColor: COLORS.blendgray,
    backgroundColor: COLORS.white2,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: "Poppins",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    color: "#2d2d2d",
    fontFamily: "Poppins3",
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
    fontSize: 14,
  },
  info: {
    // alignSelf: "center",
    fontWeight: "200",
    color: "#717171",
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
