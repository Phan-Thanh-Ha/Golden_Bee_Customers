if (__DEV__) {
  const { connectToDevTools } = require("react-devtools-core");
  connectToDevTools({
    host: "localhost",
    port: 8081,
  });
}

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import bgMessaging from "./src/Firebase/bgMessage";

AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => bgMessaging
);
AppRegistry.registerComponent(appName, () => App);
