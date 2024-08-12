import { StyleSheet, Text } from "react-native";
import React from "react";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { themeColors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { PropTypes } from "prop-types";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}
        >
          <Text style={styles.title}>Quên mật khẩu</Text>
          <ForgotPasswordForm navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: themeColors.primary,
    textAlign: "center",
  },
});
export default ForgotPasswordScreen;
