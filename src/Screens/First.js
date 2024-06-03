import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { getData } from "../Utils/localStore";
import { ScreenNames } from "../Constants";
import StorageNames from "../Constants/StorageNames";
import { useNavigation } from "@react-navigation/native";

export const First = () => {
  const navi = useNavigation();
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    try {
      const value = await getData(StorageNames.USER_PROFILE);
      if (value !== null) {
        // value previously stored
        console.log("User is logged in");
      } else {
        navi.navigate(ScreenNames.SPLASH);
        console.log("User is not logged in");
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  return (
    <View>
      <Text>Hello Firet</Text>
    </View>
  );
};
