import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../styles/Colors";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const Header = ({ title }) => {
  const navi = useNavigation();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navi.goBack()} />
  );

  return (
    <View>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={BackAction}
        style={{ backgroundColor: "transparent", marginTop: 30 }}
      />
    </View>
  );
};

export default Header;
