import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../styles/Colors";
import { PropTypes } from "prop-types";

function Home({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-home"
    >
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Path d="M9 22L9 12 15 12 15 22" />
    </Svg>
  );
}

Home.defaultProps = {
  color: colors.MAIN_BLUE_CLIENT,
  size: 32,
};
Home.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Home;
