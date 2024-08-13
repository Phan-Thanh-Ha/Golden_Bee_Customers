import React from "react";
import { Text } from "react-native";
import { colors } from "../styles/Colors";
import { PropTypes } from "prop-types";

const Label = ({
  children,
  fontSize = 15,
  color = colors.MAIN_BLUE_CLIENT,
  fontWeight = "bold",
  style = {},
}) => {
  return (
    <Text
      style={[
        {
          fontWeight: fontWeight,
          marginBottom: 5,
          color: color,
          fontSize: fontSize,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

Label.defaultProps = {
  children: "",
  fontSize: 15,
  color: colors.MAIN_BLUE_CLIENT,
  fontWeight: "bold",
  style: {},
};

Label.propTypes = {
  children: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  style: PropTypes.object,
};

export default Label;
