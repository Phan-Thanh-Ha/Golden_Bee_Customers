import { StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { colors, themeColors } from "../../styles/Colors";
import FormActiveAccount from "../../components/forms/FormActiveAccount";
import { useState } from "react";
import Footer from "../../components/Footer";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

const ActiveAccount = () => {
  const [isSubmit, setIsSubmit] = useState();
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            Kích hoạt tài khoản
          </Text>
          <FormActiveAccount isSubmit={setIsSubmit} />
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
    fontWeight: 'bold',
    color: themeColors.primary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})
export default ActiveAccount;
