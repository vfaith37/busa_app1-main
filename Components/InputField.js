import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {COLORS} from "../constants/theme"

export const InputField = (props)=>{
  const  {
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
  } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
        {...props}
          style={{flex: 1, paddingVertical: 0, fontFamily:"Poppins"}}
          selectionColor={'#363BE8'}
				cursorColor={"#363be8"}
        />
      ) : (
        <TextInput
        {...props}
          style={{flex: 1, paddingVertical: 0, fontFamily:"Poppins"}}
        selectionColor={'#363BE8'}
				cursorColor={"#363be8"}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction} activeOpacity={0.8}>
        <Text style={{color: COLORS.lightblue, fontFamily:"Poppins3", fontSize:13.5, top:3}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}