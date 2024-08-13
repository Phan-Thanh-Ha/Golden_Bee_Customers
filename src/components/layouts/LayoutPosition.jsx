import React from "react";
import { View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";

const LayoutPosition = ({ children, style }) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    justifyContent: "center",
  },
});

LayoutPosition.defaultProps = {
  children: null,
  style: {},
};
LayoutPosition.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default LayoutPosition;
