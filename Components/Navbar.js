import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native'
import React from 'react'
import { FilterOutline, Person } from '../constants/icons'
import { COLORS } from '../constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Navbar = ({userInfo}) => {
    const navigation = useNavigation()
  return (
    <View>
            <View style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:5}}>
                <View style={{paddingTop:20, paddingLeft:-10}}>
                    <TouchableOpacity activeOpacity={0.5}>
                <FilterOutline 
                // style={{transform: [{rotateY: '500deg'}]}}
                 color={COLORS.black} size={40} onPress={()=>navigation.openDrawer()}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop:12}}>
      <Image source={require("../assets/image1.png")} style={{width:73, height:73,}}/>
                </View>
            </View>
            {/* <NameSection userInfo={userInfo}/> */}
    </View>
  )
}

const NameSection =({userInfo})=>{
    return(
        <View>
            <View style={{marginVertical:5}}>
        <Text style={{fontSize:17, fontFamily:"Poppins", fontWeight:"400", color:"#07081E"}}>Welcome Back,</Text>
        <Text style={{fontFamily:"Poppins3", fontSize:28, color:"#07081E", width:208, height:42, fontWeight:"400"}}>{userInfo.lastname}</Text>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({})