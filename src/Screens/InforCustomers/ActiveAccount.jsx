import React from "react";
import { StyleSheet, Text } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { themeColors } from "../../styles/Colors";
import FormActiveAccount from "../../components/forms/FormActiveAccount";
import Footer from "../../components/Footer";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

const ActiveAccount = () => {
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Kích hoạt tài khoản</Text>
          <FormActiveAccount />
          <Footer />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: themeColors.primary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
export default ActiveAccount;
