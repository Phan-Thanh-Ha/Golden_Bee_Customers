import React from "react";
import LottieView from "lottie-react-native";
import { ic_Loading } from "../assets";
import { StyleSheet } from "react-native";
import { PropTypes } from "prop-types";

const Loading = ({
  source = ic_Loading,
  autoPlay = true,
  loop = true,
  style = {},
}) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={[styles.container, style]}
    />
  );
};

Loading.defaultProps = {
  source: ic_Loading,
  autoPlay: true,
  loop: true,
  style: {},
};
Loading.propTypes = {
  source: PropTypes.object,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  style: PropTypes.object,
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
  },
});
