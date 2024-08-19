import React from "react";
import { Text } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import FormActiveAccount from "../../components/forms/FormActiveAccount";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyles from "../../styles/MainStyle";

const ActiveAccount = () => {
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={MainStyles.pageTitle}>Kích hoạt tài khoản</Text>
          <FormActiveAccount />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </>
  );
};

export default ActiveAccount;
