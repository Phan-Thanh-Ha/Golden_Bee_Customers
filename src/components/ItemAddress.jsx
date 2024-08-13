import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/Colors";
import { ic_placeholder } from "../assets";

const ItemAddress = ({ data = [], onPress = () => {} }) => {
  // Giới hạn số lượng item hiển thị tối đa là 7
  const itemsToShow = data.slice(0, 7);
  return (
    <View>
      {itemsToShow.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.container}
          onPress={() => onPress(item)}
        >
          <Image source={ic_placeholder} style={styles.iconLeft} />
          <View style={styles.containerContent}>
            <Text style={styles.title}>{item?.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

ItemAddress.defaultProps = {
  data: [],
  onPress: () => {},
};

ItemAddress.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
  },
  iconLeft: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  containerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.BLACK,
  },
});

export default ItemAddress;
