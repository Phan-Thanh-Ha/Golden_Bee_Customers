import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../components/buttons/Button";
import { colors } from "../../styles/Colors";
import { ScreenNames, StorageNames } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import { removeData } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogout(dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) {
    }
  };
  return (
    <View>
      <Text>{JSON.stringify(userLogin)}</Text>
      <Button onPress={handleLogout} textColor={colors.RED} bgColor={colors.WHITE} paddingVertical={5}>Đăng xuất</Button>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
