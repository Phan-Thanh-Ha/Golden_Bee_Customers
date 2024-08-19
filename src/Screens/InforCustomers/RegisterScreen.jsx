import React from "react";
import { StyleSheet, Text } from "react-native";
import FormRegister from "../../components/forms/RegisterForm";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { colors, themeColors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import { ScreenNames } from "../../Constants";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import MainStyles from "../../styles/MainStyle";

const RegisterScreen = ({ navigation }) => {
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit === true) {
      navigation.navigate(ScreenNames.ACTIVE_ACCOUNT);
      setSubmit(false);
    }
  }, [submit]);

  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={MainStyles.pageTitle}>Đăng ký</Text>
          <FormRegister setSubmit={setSubmit} navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </>
  );
};

export default RegisterScreen;
