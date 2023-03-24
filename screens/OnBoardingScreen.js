

import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constants/theme';
const {width, height} = Dimensions.get('window');

const bgs = ['#A5BBFF', "#A5BBFF", "#000000", "#A5BBFF"];

const Posts = [
    {
      id: "1",
      title: "Connecting the Babcock Space",
      animation: require("../assets/animations/people.json")
    },
    {
      id: "2",
      title: "Get Trusted Information",
      animation: require("../assets/animations/animation2.json")
    },
    {
      // this would be a future update
      id: "3",
      title: "Meet Trusted Sellers",
      animation: require("../assets/animations/marketing.json")
    },
    {
      id: "4",
      title: "Get your E-tickets",
      animation: require("../assets/animations/tickets.json"),
  
    }
  ]
  


const Slide = ({item}) => {
  return (
    <View style={{width,alignItems: 'center', padding:20}}>
        <View style={{flex:.7, justifyContent:"center"}}>
      <LottieView
        source={item?.animation}
        style={{width: width/1.3,
        height: width/1.3,
        resizeMode:"cover",}}
        loop={true}
        autoPlay
        speed={0.5}
      />
      </View>
      <View>
        <Text style={styles.title}>{item?.title}</Text>
      </View>
    </View>
  );
};





const OnBoardingScreen = ({navigation}) => {

const scrollx = React.useRef(new Animated.Value(0)).current
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };


  const Backdrop=({scrollx})=>{

    const backgroundColor= scrollx.interpolate({
      inputRange: bgs.map((_,i)=> i*width),
      outputRange: bgs.map((bg)=>bg)
    })
  return <Animated.View
  style={[
    StyleSheet.absoluteFillObject,
    {
    backgroundColor,
  }]}
  />
  }

  const Square=({scrollx})=>{ 
    const YOLO = Animated.modulo(
      Animated.divide(Animated.modulo(scrollx, width), 
    new Animated.Value(width)), 1)
  
    const rotate = YOLO.interpolate({
      inputRange:[0,.5,1],
      outputRange:["45deg", "0deg", "-35deg"]
    })
    return <Animated.View
   style={{
    width:height,
    height:height,
    backgroundColor:COLORS.white,
    borderRadius:86,
    position:"absolute",
    top:-height*0.65,
    left:-height*0.25,
    transform:[
      {
        rotate,
      }
    ]
   }} 
    />
  }
  



  const Footer = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
      }).start()
      // }).start(()=>fadeOut());
    }, [fadeAnim]);


    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 70,
          }}>
          {/* Render indicator */}
          
          {Posts.map((_, index) => {
    return(

            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 10,
                  borderRadius:30,
                },
              ]}
            />
    )
    })}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == Posts.length - 1 ? (
            <Animated.View style={{height: 50, opacity:fadeAnim}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Sign-up')}>
                <Text style={{fontWeight: '600', fontSize: 15, fontFamily:"Poppins3", alignSelf:"center"}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
        <></>
          )
          
          }
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.white}/>
      <Backdrop scrollx={scrollx}/> 
      <Square scrollx={scrollx}/> 
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        // scrollEventThrottle={32}
        onScroll={Animated.event(
            [{nativeEvent: {contentOffset:{x:scrollx}}}],
            {useNativeDriver:false }
            )}
        data={Posts}
        pagingEnabled
        // decelerationRate={"fast"}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '500',
    marginTop: 100,
    top:70,
    textAlign: 'center',
    fontFamily:"Poppins3"
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.gray,
    marginHorizontal: 3,
    borderRadius: 25,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    width:150,
    alignSelf: 'center',
  },
});
export default OnBoardingScreen;

