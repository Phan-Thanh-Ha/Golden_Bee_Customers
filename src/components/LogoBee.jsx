import { logo_bee_blue } from "../assets";
import { colors } from "../styles/Colors";
import { Image, Text, View } from "react-native";
import React from "react";

const LogoBee = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 35,
        }}
      >
        <Image
          source={logo_bee_blue}
          style={{
            with: 120,
            height: 120,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: colors.MAIN_COLOR_CLIENT,
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Ong Vàng
        </Text>
      </View>
    </>
  );
};

export default LogoBee;
