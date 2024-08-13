import React, { useEffect, useCallback } from "react";
import { Platform, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import moment from "moment";

export const SetupNotification = () => {
  const parseDate = useCallback((date) => {
    return moment(new Date(parseInt(date))).format("DD-MM-YYYY hh:mm:ss");
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      showPermissions();
    }

    PushNotification.createChannel(
      {
        channelId: "rn-push-notification-channel-id-4-default-300",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Hiển thị thông báo
      if (Platform.OS === "android") {
        notiAndroid(remoteMessage);
      } else {
        notifyiOS(remoteMessage);
      }
    });

    PushNotification.configure({
      onNotification: function (notification) {
        // Process the notification here
        if (Platform.OS === "android") {
          notiAndroid(notification);
        } else {
          notifyiOS(notification);
        }

        // Required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", onRegistered);
      PushNotificationIOS.addEventListener(
        "registrationError",
        onRegistrationError
      );
      PushNotificationIOS.requestPermissions().then(
        (data) => console.log("PushNotificationIOS.requestPermissions", data),
        (data) =>
          console.log("PushNotificationIOS.requestPermissions failed", data)
      );

      return () => {
        PushNotificationIOS.removeEventListener("register");
        PushNotificationIOS.removeEventListener("registrationError");
      };
    }
  }, []);

  const notifyiOS = useCallback(async (remoteMessage) => {
    const noti = remoteMessage.notification;
    PushNotificationIOS.addNotificationRequest({
      id: "notificationWithSound",
      title: noti?.title || "",
      body: noti?.body || "",
      badge: 1,
    });
    PushNotificationIOS.setApplicationIconBadgeNumber(noti?.badge || 1);
  }, []);

  const onRegistered = useCallback((deviceToken) => {
    console.log(deviceToken);
  }, []);

  const onRegistrationError = useCallback((error) => {
    console.log(error.message);
  }, []);

  const showPermissions = useCallback(() => {
    PushNotificationIOS.checkPermissions((permissions) => {
      console.log(permissions);
    });
  }, []);

  const notiAndroid = useCallback(
    (remoteMessage) => {
      console.log("remoteMessage", remoteMessage);
      const noti = remoteMessage.notification;
      PushNotification.localNotification({
        channelId: "rn-push-notification-channel-id-4-default-300",
        autoCancel: true,
        id: Date.now().toString(),
        showWhen: true,
        largeIconUrl: noti?.android?.imageUrl,
        smallIcon: "ic_stat_name",
        vibrate: true,
        vibration: 600,
        invokeApp: true,
        alertAction: "view",
        category: "",
        userInfo: remoteMessage || {},
        title: noti?.title || "",
        message: noti?.body || "",
        onlyAlertOnce: false,
        playSound: true,
        priority: "max",
        soundName: "default",
        number: 1,
        largeIcon: "null",
        subText: parseDate(remoteMessage.sentTime),
        color: "#60a941",
      });
    },
    [parseDate]
  );

  return <View />;
};
