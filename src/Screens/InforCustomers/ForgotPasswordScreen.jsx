import { Text } from "react-native";
import React from "react";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyles from "../../styles/MainStyle";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}
        >
          <Text style={MainStyles.pageTitle}>Quên mật khẩu</Text>
          <ForgotPasswordForm navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </>
  );
};

export default ForgotPasswordScreen;
