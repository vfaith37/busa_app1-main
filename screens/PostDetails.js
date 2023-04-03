import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, {useState, useRef} from 'react'
import { COLORS } from '../constants/theme'

const {width, height}= Dimensions.get("screen")

const imageW = width
const imageH = height/2.3

const PostDetails = ({route}) => {

  return (
      <View style={styles.container}>
  <About route ={route}/>
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
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / imageW);
    setCurrentSlideIndex(index);
  };

  return(
  <View>
   <View style={{top:10, height:imageH, width:imageW, backgroundColor:COLORS.transparent,}}>
        <FlatList
        data={props.image}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled
					onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, id)=>(
          <View>
          <TouchableOpacity
          activeOpacity={1}
          >
              <Image
                  style={{
                    height:height/2.3, width:width, 
                    resizeMode: Platform.OS === "android"? "cover" :null
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
<ScrollView
showsVerticalScrollIndicator
bounces={false}
contentContainerStyle={{height:height*1.9}}
// scrollIndicatorInsets={{width:10}}
// indicatorStyle={"red"}
>
    <View 
    >
    <Text style={{fontWeight:"600", fontSize:19, color:COLORS.black, width:322, height:25, lineHeight:24.7, fontFamily:"Poppins3"}}>{props.title}</Text>
    <Text style={{fontWeight:"300", color:COLORS.darkblack, fontSize:10, lineHeight:13, fontFamily:"Poppins", top:4}}>{props.date}</Text>
    </View>

<View
>


<Text style={{
  fontWeight:"400", fontSize:10, lineHeight:15, color:COLORS.mgray,fontFamily:"Poppins2",
top:13, textTransform:"capitalize"
}}

>{props.content}
</Text>

</View>

</ScrollView>
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