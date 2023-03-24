import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, Platform} from 'react-native'
import React, {useState, useRef, useCallback} from 'react'
import { COLORS } from '../constants/theme'

const {width, height}= Dimensions.get("window")



const PostDetails = ({route}) => {


  return (
      <View style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        >
  <About route ={route}/>
  </ScrollView>
      </View>
  )
}


const About=(props)=>{
const {image, title, date, content}= props.route.params
  return(
    <View>
<PostImage image={image}/>
<PostAbout title={title} date={date} content={content}/>
    </View>
  )


}

const PostImage=(props)=>{
  const [currentSlideIndex, setCurrentSlideIndex]= useState(0)
  const onViewableItemsChanged = useRef((item)=>{
    const index = item.viewableItems[0].index
    setCurrentSlideIndex(index)
    console.log(index)
  })
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold:50,
  })

  return(
  <View>
   <View style={{top:20, height:height/2.3, width:width, backgroundColor:COLORS.transparent,}}>
        <FlatList
        data={props.image}
        horizontal
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={32}
        scrollEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, id)=>(
          <View>
          <TouchableOpacity
          activeOpacity={1}
          >
              <Image
                  style={{
                    height:height/2.3, width:width, 
                    resizeMode: Platform.OS === "android"? "stretch" :null
                  }}
                  key={id}
                  source={{uri:item}}

                  />
                  </TouchableOpacity>
                  </View>
  
  )}
/>
</View> 

{props.image.length >1 ? 
<View style={styles.pagination}>
   {props.image.map((_, index) => {
      return (
         <View
         key={index}
         style={[
           styles.dot,
           currentSlideIndex == index && {
             backgroundColor: COLORS.black,
             width: 7,
             height:7,
             borderRadius:10,
           }
         ]}
       />
       ) 
      })} 
      </View>
:null}
  </View>
  )

  
}


const PostAbout=(props)=>{
 
return(
<>
<View 
style={{padding:25, top:10}}
>
    <View 
    >
    <Text style={{fontWeight:"600", fontSize:19, color:COLORS.black, width:322, height:25, lineHeight:24.7, fontFamily:"Poppins3"}}>{props.title}</Text>
    <Text style={{fontWeight:"300", color:COLORS.darkblack, fontSize:10, lineHeight:13, fontFamily:"Poppins", top:4}}>{props.date}</Text>
    </View>

<View
>

<ScrollView
showsVerticalScrollIndicator
bounces={false}
contentContainerStyle={{height:height }}
>
<Text style={{
  fontWeight:"400", fontSize:10, lineHeight:15, color:COLORS.mgray,fontFamily:"Poppins2",
top:13, textTransform:"capitalize"
}}

>{props.content}</Text>

</ScrollView>
</View>

</View>
</>

)



}


export default PostDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    top:50,
  },
  dot:{
    borderRadius:10, height:7, width:7, backgroundColor:COLORS.gray, marginBottom:3, marginHorizontal:3, justifyContent:"center" 
  },
  pagination:{
    bottom:-6,
    left:(width)/2,
    position:"absolute",
    flexDirection:"row",
    // justifyContent:"center",
    // width:40,
    
  },
})