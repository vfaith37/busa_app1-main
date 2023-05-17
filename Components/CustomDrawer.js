import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Exit } from '../constants/icons';
import { COLORS } from '../constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';


const CustomDrawer = props => {

    const navigation = useNavigation()

    // console.log(props)

    // {props.state.routes.map((route)=>{
    //   if(route.name !== "Feed"){
    //     return null;
    //   }
    // })}

  return (
    <View style={{flex: 1}}>

{props.state.routes.map((route)=>{
  if(route.name === "Maps" || route.name==="Learn" || route.name==="Handbook" || route.name==="Complaints" || route.name==="Settings"){
    // console.log(props)
    return (
     null
    )
  }
  else{
    return(
      <DrawerContentScrollView
      key={route.key}
        {...props}
        contentContainerStyle={{backgroundColor: '#ffff'}}>
        <View style={{flex: 1, backgroundColor: '#f9f9f9', paddingTop: 20,}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
        source={require('../assets/busa.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Exit style={{paddingTop:20, paddingRight:25}} size={30} color={COLORS.black} onPress={()=>navigation.goBack()}/>
            </View>
      <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    )
  }
})}

      {/* <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default CustomDrawer;