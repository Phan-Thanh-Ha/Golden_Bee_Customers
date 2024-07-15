import React, { useState } from "react";
import { Input, Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Keyboard } from "react-native";
import { colors } from "../styles/Colors";

const RightIcon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon {...props} name={props.iconName || "close"} />
  </TouchableOpacity>
);
const LeghtIcon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon {...props} name={props.iconName || "search"} />
  </TouchableOpacity>
);
export const InputComponent = ({
  placeholder,
  value,
  onChangeText = () => { },
  onLeftIconPress,
  onRightIconPress,
  style = {},
  iconLeft,
  iconRight,
  disabled,
  onFinishText = () => { },
  inputStatus = "basic",
  sizeInput = "large",
  colorText = colors.BLACK,
  KeyboardOpen = false,
  txtWarning = "",
}) => {
  return (
    <Input
      style={[styles.container, style]} // Style của input
      placeholder={placeholder} // Placeholder của input
      value={value} // Giá trị của input
      onChangeText={onChangeText} // Sử dụng hàm handleTextChange thay vì onChangeText
      editable={!disabled} // Không cho phép chỉnh sửa input
      status={inputStatus} // Trạng thái của input
      caption={txtWarning !== "" ? inputStatus === "danger" : txtWarning} // Cảnh báo nếu inputStatus là danger
      accessoryLeft={(props) => (
        <LeghtIcon {...props} onPress={onLeftIconPress} iconName={iconLeft} />
      )}
      textStyle={colorText} // Màu chữ
      autoFocus={KeyboardOpen} // Mở bàn phím khi mở màn hình
      accessoryRight={(props) => (
        <RightIcon
          {...props}
          onPress={onRightIconPress}
          iconName={iconRight}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    margin: 10
  },
});
