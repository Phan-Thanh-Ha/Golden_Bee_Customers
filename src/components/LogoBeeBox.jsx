import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles/MainStyle";
import { Image, Platform, Text, View } from "react-native";
import { logo_bee_blue } from "../assets";
import { colors } from "../styles/Colors";
import React from "react";

const LogoBeeBox = ({
  color = colors.MAIN_BLUE_CLIENT,
  sizeImage = SCREEN_WIDTH * 0.2,
  sizeText = 28,
}) => {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? SCREEN_HEIGHT * 0.03 : 0,
        }}
      >
        <Image
          source={logo_bee_blue}
          style={{
            with: sizeImage,
            height: sizeImage,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: color,
            fontWeight: "bold",
            fontSize: sizeText,
          }}
        >
          Ong Vàng
        </Text>
      </View>
    </>
  );
};

LogoBeeBox.defaultProps = {
  color: colors.MAIN_BLUE_CLIENT,
  sizeImage: SCREEN_WIDTH * 0.2,
  sizeText: 28,
};
LogoBeeBox.propTypes = {
  color: colors.MAIN_BLUE_CLIENT,
  sizeImage: SCREEN_WIDTH * 0.2,
  sizeText: 28,
};

export default LogoBeeBox;
