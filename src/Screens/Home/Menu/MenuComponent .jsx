import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../Constants";
import { getIconById } from "../../../Utils/RoutingService";
import { SCREEN_WIDTH } from "../../../styles/MainStyle";
import { colors, themeColors } from "../../../styles/Colors";

export const MenuComponent = () => {
  const data = useSelector((state) => state.main.menuService);

  const navi = useNavigation();
  return (
    <View style={styles.container} >
      {
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navi.navigate(ScreenNames.ADDRESS_SEARCH, {
                service: item,
              });
            }}
            style={styles.itemContainer}
          >
            <FastImage
              style={styles.image}
              source={
                getIconById(item.ServiceId)
                  ? getIconById(item.ServiceId)
                  : { uri: "https://picsum.photos/200" }
              }
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.ServiceName}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
    backgroundColor: themeColors.lightBackground,
    // backgroundColor: colors.OFF_GREEN_WHITE,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.20,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.20,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
  },
});
