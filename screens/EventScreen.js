import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Events from './Events'
import { EVENTS } from '../data/eventData'

const EventsScreen = () => {
  // don't forget to run the get all events through axios
    const navigation = useNavigation()
    return (
      <SafeAreaView style={{flex:1, top:40}}>
     <FlatList
    //  onEndReachedThreshold={0.5}
    //  ref={ref}
    //  onMomentumScrollEnd={updateCurrentSlideIndex}
  // onEndReached={}

     showsVerticalScrollIndicator={false}
     vertical
     data={EVENTS}
     bounces={false}
     decelerationRate={"fast"}
    //  keyExtractor={item=>item.id}
     renderItem={({item, id}) => <Events event={item} key={id} navigation={navigation} />}
   />
     
     </SafeAreaView>

    )
}





 
export default EventsScreen

const styles = StyleSheet.create({})





















  {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {EVENTS.map((event, id)=>(
                 <TouchableOpacity
                 key={id}
                 activeOpacity={1}>
                   <Events event={event} key={id} navigation={navigation}/>
                 </TouchableOpacity>
              ))}
             </ScrollView> */}