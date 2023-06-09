import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
 import { FilterOutline, Person } from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const Navbar = ({ userInfo }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
          marginTop: 10,
        }}
      >
        <FilterOutline color={COLORS.black} size={42} onPress={()=>navigation.openDrawer()} style={{paddingTop:10}}/>

               
        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}
          style={{ marginTop: 25 }}
        > */}
          {/* <Image
            source={require("../assets/hamburger.png")}
            style={{ height: 30, width: 30 }}
          /> */}
        {/* </TouchableOpacity> */}

        <Image
          source={require("../assets/busa.png")}
          style={{ width: 73, height: 73 }}
        />
      </View>
      {/* <NameSection userInfo={userInfo} /> */}
    </View>
  );
};

const NameSection = ({ userInfo }) => {
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins",
            fontWeight: "400",
            color: "#07081E",
          }}
        >
          Welcome Back,
        </Text>
        <Text
          style={{
            fontFamily: "Poppins3",
            fontSize: 28,
            color: "#07081E",
            width: 208,
            height: 42,
            fontWeight: "400",
          }}
        >
          {userInfo.lastname}
        </Text>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
