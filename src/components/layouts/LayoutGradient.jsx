import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import { PropTypes } from "prop-types";

const LayoutGradient = ({ children }) => {
  return (
    <LinearGradient
      colors={[colors.MAIN_COLOR_CLIENT, colors.Amber["100"]]}
      style={styles.container}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

LayoutGradient.defaultProps = {
  children: null,
};
LayoutGradient.propTypes = {
  children: PropTypes.node,
};

export default LayoutGradient;
