import React from 'react';
import {
  View,
  Image,
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
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#ffff'}}>
        <View style={{flex: 1, backgroundColor: '#f9f9f9', paddingTop: 20,}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
        source={require('../assets/image1.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Exit style={{paddingTop:20, paddingRight:25}} size={30} color={COLORS.black} onPress={()=>navigation.goBack()}/>
            </View>
{/* <DrawerItemList {...props} /> */}
              {props.state.routes.map((route, index)=>{
if(route.name === "Maps" || route.name==="Learn" || route.name==="Handbook" || route.name==="Complaints" || route.name==="Settings"){
  return null;
} else{
  return(
    // <DrawerItem
    // key={route.key}
    // label={route.name}
    // // onPress={()=>navigation.navigate(props.state.routes.name)}
    // />
  
    <DrawerItemList {...props} key={route.key} />

  )
}

// route.name === "Feed" && <DrawerItemList {...props} key={route.key} />


              })}
        </View>
      </DrawerContentScrollView>
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