import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/Colors";
import { PropTypes } from "prop-types";

const LayoutBottom = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    justifyContent: "center",
    backgroundColor: colors.WHITE,
  },
});

LayoutBottom.defaultProps = {
  children: null,
};
LayoutBottom.propTypes = {
  children: PropTypes.node,
};

export default LayoutBottom;
