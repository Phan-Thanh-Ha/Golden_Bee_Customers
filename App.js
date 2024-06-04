import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Store } from "./src/Redux";
import { LogBox, Platform } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import RootNavigator from "./src/Navigation/RootNavigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import SplashScreen from "react-native-splash-screen";

const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hide();
    }
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MenuProvider>
          <RootNavigator />
          <Toast />
        </MenuProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
