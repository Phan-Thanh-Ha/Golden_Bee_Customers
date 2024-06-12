import React from "react";
import LottieView from "lottie-react-native";
import { ic_Loading } from "../assets";

const Loading = ({ source = ic_Loading, autoPlay = true, loop = true }) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={{ width: "100%", height: 100 }}
    />
  );
};

export default Loading;
