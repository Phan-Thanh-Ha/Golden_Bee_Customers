import React from "react";
import PropTypes from "prop-types";
import { Input, Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { colors } from "../styles/Colors";

const RightIcon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon {...props} name={props.iconName || "close"} />
  </TouchableOpacity>
);

RightIcon.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
};

const LeghtIcon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon {...props} name={props.iconName || "search"} />
  </TouchableOpacity>
);

LeghtIcon.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
};

export const InputComponent = ({
  placeholder,
  value,
  onChangeText = () => {},
  onLeftIconPress,
  onRightIconPress,
  style = {},
  iconLeft,
  iconRight,
  disabled,
  inputStatus = "basic",
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
        <RightIcon {...props} onPress={onRightIconPress} iconName={iconRight} />
      )}
    />
  );
};

InputComponent.defaultProps = {
  placeholder: "",
  value: "",
  onChangeText: () => {},
  onLeftIconPress: () => {},
  onRightIconPress: () => {},
  style: {},
  iconLeft: "",
  iconRight: "",
  disabled: false,
  onFinishText: () => {},
  inputStatus: "basic",
  sizeInput: "medium",
  colorText: colors.BLACK,
  KeyboardOpen: false,
  txtWarning: "",
};

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onLeftIconPress: PropTypes.func,
  onRightIconPress: PropTypes.func,
  style: PropTypes.object,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  disabled: PropTypes.bool,
  onFinishText: PropTypes.func,
  inputStatus: PropTypes.string,
  sizeInput: PropTypes.string,
  colorText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  KeyboardOpen: PropTypes.bool,
  txtWarning: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    margin: 10,
  },
});
