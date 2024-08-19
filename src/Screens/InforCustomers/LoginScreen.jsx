import React from "react";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { StyleSheet, Text, View } from "react-native";
import MainStyles from "../../styles/MainStyle";
import { themeColors } from "../../styles/Colors";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={200}
          enableOnAndroid={true}
        >
          <Text style={MainStyles.pageTitle}>Đăng nhập</Text>
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </View>
  );
};

export default LoginScreen;
