import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/Colors";
import { ic_placeholder } from "../assets";
import ArrowRight from "./svg/ArrowRight";

const ItemAddress = ({ data = [], onPress = () => { } }) => {
  // Giới hạn số lượng item hiển thị tối đa là 7
  const itemsToShow = data.slice(0, 7);
  // console.log("🚀 ~ file: ItemAddress.jsx:ItemAddress ~ data", data)
  return (
    <View>
      {itemsToShow.map((item) => (
        <TouchableOpacity
          key={item?.place_id} // Giả sử item có thuộc tính id là duy nhất
          style={styles.container}
          onPress={() => onPress(item)}
        >
          <Image source={ic_placeholder} style={styles.iconLeft} />
          <View style={styles.containerContent}>
            <Text style={styles.title}>{item?.name}</Text>
          </View>
          <View style={styles.iconRight}>
            <ArrowRight color={colors.MAIN_COLOR_CLIENT} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ItemAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 12,
    borderRadius: 5,
    width: "98%",
  },
  containerContent: {
    width: "80%",
  },
  title: {
    color: colors.BLACK,
    fontSize: 16,
  },
  iconLeft: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  iconRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
