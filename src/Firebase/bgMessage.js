import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async () => {
  return Promise.resolve();
});
