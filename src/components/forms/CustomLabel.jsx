import React from "react";
import { Text } from "react-native";
import { colors } from "../../styles/Colors";
import { PropTypes } from "prop-types";

const CustomLabel = ({ children }) => {
  return (
    <Text
      style={{
        fontWeight: "bold",
        marginBottom: 5,
        color: colors.MAIN_BLUE_CLIENT,
        fontSize: 15,
      }}
    >
      {children}
    </Text>
  );
};

CustomLabel.defaultProps = {
  children: null,
};
CustomLabel.propTypes = {
  children: PropTypes.node,
};

export default CustomLabel;
