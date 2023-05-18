import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { COLORS } from "../constants/theme";

const { width, height } = Dimensions.get("screen");

const imageH = height * 0.37;
const imageW = width * 0.9;
const imageHfeed = height*0.21;
const imageWfeed = width*0.8;

const Posts = ({ post, component }) => {
  const navigation = useNavigation();
  const time = post.addedAt;
  const date = moment(time).format("MMM D, YYYY");
  const feedDate = moment(time).format("D/MM/YYYY");
  return (
    <>
      {component === "Feeds" ? (
        <View style={{ height: height*0.32, width: width*0.84, flex: 1 }}>
          <View style={{ height: height*0.32, width: width*0.8 }}>
            <PostFooter post={post} date={feedDate} component={component} />
            <PostImage
              post={post}
              navigation={navigation}
              date={date}
              component={component}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ height: height / 1.94 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <PostImage
            post={post}
            navigation={navigation}
            date={date}
            component={component}
          />
          <PostFooter post={post} date={date} />
        </ScrollView>
      )}
    </>
  );
};

const PostImage = memo(({ post, navigation, date, component }) => {
  const [isRecent, setIsRecent] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / imageW);
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    const postDate = new Date(post.addedAt);
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the post date and the current date
    const diffInMs = currentDate.getTime() - postDate.getTime();

    // Check if the post is less than 1 hour old
    if (diffInMs < 3600000) {
      setIsRecent(true);
      // Remove the "recent" text after 1 hour
      const timerId = setTimeout(() => setIsRecent(false), 3600000 - diffInMs);
      return () => clearTimeout(timerId);
    }
  }, [post.addedAt]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
    // }).start(()=>fadeOut());
  }, [fadeAnim]);

  const keyExtractor = useCallback(
    (_, index) => `${post._id}_${index}`,
    [post._id]
  );

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.transparent,
          alignSelf: "center",
          top: 20,
          height: component === "Feeds" ? imageHfeed : imageH,
          width: component === "Feeds" ? imageWfeed : imageW,
          borderRadius: component === "Feeds" ? 5 : 20,
          alignItems: "center",
        }}
      >
        <FlatList
          data={post.images}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled
          // keyExtractor={(index) => index.toString()}
          keyExtractor={keyExtractor}
          onScroll={handleScroll}
          renderItem={({ item }, id) => (
            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate("PostDetails", {
                    image: post.images,
                    title: post.title,
                    date: date,
                    content: post.content,
                  })
                }
              >
                <Image
                  style={{
                    height: component === "Feeds" ? imageHfeed : imageH,
                    width: component === "Feeds" ? imageWfeed : imageW,
                    borderRadius: component === "Feeds" ? 5 : 20,
                    // resizeMode: Platform.OS === "android"? "contain":null ,
                    alignSelf: "center",
                  }}
                  key={id}
                  source={{ uri: item }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {post.images.length > 1 ? (
        <View style={styles.pagination}>
          {post.images.map((_, index) => {
            const isActive = index === currentSlideIndex;
            const imageId = `${post._id}_${index}`;
            return (
              <React.Fragment key={imageId}>
                <View
                  style={[
                    styles.dot,
                    isActive && {
                      backgroundColor: COLORS.black,
                      width: 7,
                      height: 7,
                      borderRadius: 10,
                    },
                  ]}
                />

                {currentSlideIndex == index && (
                  <Animated.View
                    style={{
                      backgroundColor: COLORS.offwhite,
                      width: 33,
                      height: 17,
                      borderRadius: 20,
                      bottom: imageH * 0.83,
                      position: "absolute",
                      right: -imageW / 2.7,
                      opacity: fadeAnim,
                    }}
                    key={imageId}
                  >
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: "Poppins",
                        alignSelf: "center",
                        top: -2,
                        position: "absolute",
                      }}
                    >
                      {index + 1}/{post.images.length}
                    </Text>
                  </Animated.View>
                )}
              </React.Fragment>
            );
          })}
        </View>
      ) : null}

      {isRecent && (
        <View
          style={{
            width: 55,
            height: 18,
            backgroundColor: COLORS.white,
            borderRadius: 2,
            left: component === "Feeds" ? 4 : 30,
            position: "absolute",
            top: component === "Feeds" ? imageHfeed * 0.43 : imageH * 0.13,
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 10,
              fontFamily: "Poppins3",
              alignSelf: "center",
              fontWeight: "200",
            }}
          >
            Recent
          </Text>
        </View>
      )}
      {/* <PostFooter post ={post} date ={date}/> */}
    </>
  );
});

const PostFooter = ({ post, date, component }) => {
  return (
    <View>
      {component === "Feeds" ? (
        <View>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 14.53,
              fontWeight: "400",
              color: COLORS.feedcolor,
              fontFamily: "Montserrat",
            }}
          >
            BUSA
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 16,
              lineHeight: 19.5,
              fontWeight: "500",
              color: COLORS.feedcolor,
              fontFamily: "Montserrat2",
              width: imageWfeed - 30,
              height: 20,
            }}
          >
            {post.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 14.63,
              fontWeight: "300",
              color: COLORS.feedcolor,
              fontFamily: "Montserrat",
            }}
          >
            {date}
          </Text>
        </View>
      ) : (
        <View
          style={{
            paddingTop: imageH / 10,
            position: "absolute",
            paddingLeft: 20,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              color: COLORS.black,
              fontSize: 16,
              fontWeight: "600",
              fontFamily: "Poppins3",
              width: component === "Feeds" ? imageWfeed : imageW,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {post.title}
          </Text>
          <Text
            style={{
              fontWeight: "200",
              fontSize: 10,
              color: COLORS.darkblack,
              fontFamily: "Poppins3",
              lineHeight: 13,
              paddingTop: 2,
            }}
          >
            {date}
          </Text>
          <View>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 11,
                color: COLORS.mgray,
                width: component === "Feeds" ? imageWfeed : imageW,
                paddingTop: 7,
                fontFamily: "Poppins",
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {post.content}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 80,
  },
  pagination: {
    top: imageH * 0.98,
    left: imageW / 2,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    width: 40,
  },
  dot: {
    borderRadius: 10,
    height: 7,
    width: 7,
    backgroundColor: COLORS.gray,
    marginBottom: 3,
    marginHorizontal: 3,
    justifyContent: "center",
  },
});

export default memo(Posts);

{
  /* {post.content.length > 125
  ? post.content.charAt(0).toUpperCase() +
    post.content.slice(1, 124).toLowerCase() +
    "..."
  : post.content.charAt(0).toUpperCase() +
    post.content.slice(1, `${post.content.length}`).toLowerCase() 
} */
}

// ///for tips of the day;
// {
//   /* <View>
//           <View style={{height:210, width:375, backgroundColor:"#f6f6f6"}}>
//             <Text style={{fontWeight:"300", color:"#717171", fontSize:12, textAlign:"center", textTransform:"uppercase", top:10}}>Tip of the Day</Text>
//             <View >

//             <View style={{top:30, alignItems:"flex-start", right:-165}}>
//             <Text style={{fontWeight:"600", fontSize:14, lineHeight:18.2, color:"#000",
//              maxWidth:"45%"
//              }}>Start your day with a glass of water</Text>
//             <Text style={{fontWeight:"300", fontSize:10, lineHeight:18,color:"#717171", maxWidth:"53%", maxHeight:"80%", top:10}}>Your body goes quite a few hours without hydration as you sleep.
//               Drinking a full glass of water in the morning can aid digestion, flush out toxins, enhance skin health and give you an energy boost.
//             </Text>
//                 <Image
//                 style={{width:130, height:140, shadowColor:"#717171", opacity:1.2, bottom:125, right:143}}
//                 source={require("../assets/images/shirt.jpg")}
//                 />
//             </View>

//             </View>
//           </View>
//         </View>  */
// }
