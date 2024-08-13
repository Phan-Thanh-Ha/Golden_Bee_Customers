import React from "react";
import { Toggle } from "@ui-kitten/components";
import { PropTypes } from "prop-types";

const BtnToggle = ({ value, onChange }) => {
  return <Toggle checked={value} onChange={onChange} />;
};

BtnToggle.defaultProps = {
  value: false,
  onChange: () => {},
};
BtnToggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default BtnToggle;
