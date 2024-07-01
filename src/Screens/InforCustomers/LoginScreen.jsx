import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyle from "../../styles/MainStyle";
import Box from "../../components/Box";
import { View } from "react-native";
import MainStyles from "../../styles/MainStyle";

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
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </View>
  );
};

export default LoginScreen;
