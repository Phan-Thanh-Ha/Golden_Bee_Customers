import { StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import BackButton from "../../components/BackButton";
import { colors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import MainStyle from "../../styles/MainStyle";
import Box from "../../components/Box";

const LoginScreen = () => {
  const [dataLogin, setDataLogin] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyle.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={160}
          enableOnAndroid={true}
        >
          <Box height={80} />
          <LoginForm
            setSubmit={setIsSubmit}
          />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

export default LoginScreen;
