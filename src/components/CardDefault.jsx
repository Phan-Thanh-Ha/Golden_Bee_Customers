import { Text, View } from "react-native";
import MainStyles from "../styles/MainStyle";
import BeeFlying from "./BeeFlying";
import { PropTypes } from "prop-types";
import React from "react";

const CardDefault = ({
  title = ">Hoặc chờ phiên bản tiếp theo để trò chuyện cùng nhau nhé !",
}) => {
  return (
    <View style={MainStyles.tabContainerDefault}>
      <BeeFlying />
      <Text style={MainStyles.textDefault}>{title}</Text>
    </View>
  );
};

CardDefault.defaultProps = {
  title: ">Hoặc chờ phiên bản tiếp theo để trò chuyện cùng nhau nhé !",
};
CardDefault.propTypes = {
  title: PropTypes.string,
};

export default CardDefault;
