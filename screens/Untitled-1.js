{taskData.length === 0 && !isLoading ? (
    <View>
      <TouchableOpacity activeOpacity={0.6}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 13,
            paddingTop: 10,
          }}
        >
          loading.....
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    // length of all the arrays = 0 show this else then show filtered data
//               isLoading
//                    ?
//                    <View>
// {/* this means that until a user interacts with a filter he sees all this data */}
//                 <InitialLanding/>
//                 </View>
//                   : 

        // else if any of the lengths is false that means the user has clicked a filter
        ((todos.length>=1 && tomorrowtasks.length >=1 && otherdaysTasks.length >=1) ||(todos.length>=1 || tomorrowtasks.length >=1 || otherdaysTasks.length >=1) || (todos.length=== 0 && tomorrowtasks.length===0 && otherdaysTasks.length===0) )

        ?
        (
              <View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 40,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins3",
            fontSize: 24,
            fontWeight: "400",
            lineHeight: 36,
          }}
        >
          Today
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            lineHeight: 21,
            color: COLORS.black,
            paddingRight: 20,
            paddingTop: 8,
          }}
        >
          {todaysDate}
        </Text>
      </View>

      {todos.map((item) => {
        return <ListItem todo={item} key={item._id} />;
      })}

      {todos.length === 0 && !isLoading && (
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            // onPress={()=>{
            // navigation.dispatch(
            //   CommonActions.navigate({
            //     name: "Task",
            //     params: {
            //       screen: "TasksScreen",
            //     },
            //   })
            // );
            //   }
            // }
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                paddingTop: 3,
              }}
            >
               no tasks set, click to set tasks
               
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          // bottom: 90,
          paddingTop: 30,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins3",
            fontSize: 24,
            fontWeight: "400",
            lineHeight: 36,
          }}
        >
          Tommorow
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            lineHeight: 21,
            color: COLORS.black,
            paddingRight: 20,
            paddingTop: 8,
          }}
        >
          {nextDate}
        </Text>
      </View>

      {tomorrowtasks.map((item) => {
        return <ListItem todo={item} key={item._id} />;
      })}

      {tomorrowtasks.length === 0 && !isLoading && (
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                paddingTop: 3,
              }}
            >
              no tasks for tomorrow, click to set tasks
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          paddingTop: 40,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins3",
            fontSize: 24,
            fontWeight: "400",
            lineHeight: 36,
          }}
        >
          Coming Days
        </Text>
        {/* <Text
      style={{
        fontFamily: "Poppins",
        fontSize: 14,
        lineHeight: 21,
        color: COLORS.black,
        paddingRight: 20,
        paddingTop: 8,
      }}
    >
    </Text> */}
      </View>
      {otherdaysTasks.map((item) => {
        return <ListItem todo={item} key={item._id} />;
      })}

      {otherdaysTasks.length === 0 && !isLoading && (
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            // onPress={()=>{
            // navigation.dispatch(
            //   CommonActions.navigate({
            //     name: "Task",
            //     params: {
            //       screen: "TasksScreen",
            //     },
            //   })
            // );
            //   }
            // }
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                paddingTop: 3,
              }}
            >
              no tasks for coming days, click to set tasks
            </Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
        )
      :
       null
  )}