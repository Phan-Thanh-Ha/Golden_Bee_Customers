import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyle from "../../styles/MainStyle";
import Box from "../../components/Box";
import { View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
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
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </View>
  );
};

export default LoginScreen;
