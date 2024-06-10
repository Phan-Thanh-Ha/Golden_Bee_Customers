import React, { useEffect, useState } from "react";
import { View } from "react-native";
import RNPermissions, {
  check,
  PERMISSIONS,
  RESULTS,
  request,
} from "react-native-permissions";
export const RequestPermission = () => {
  const androidWriteStorage = async () => {
    const statusAndroid = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    );
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(() => {
        androidCamera();
      });
    } else {
      androidCamera();
    }
  };
  const androidCamera = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.CAMERA);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.CAMERA).then(() => {
        androidReadStorage();
      });
    } else {
      androidReadStorage();
    }
    const androidReadStorage = async () => {
      const statusAndroid = await check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
      if (statusAndroid !== RESULTS.GRANTED) {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
          androidRecordAudio();
        });
      } else {
        androidRecordAudio();
      }
    };
    const androidRecordAudio = async () => {
      const statusAndroid = await check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
      if (statusAndroid !== RESULTS.GRANTED) {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
          androidFineLocation();
        });
      } else {
        androidFineLocation();
      }
    };
    const androidFineLocation = async () => {
      const statusAndroid = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (statusAndroid !== RESULTS.GRANTED) {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(() => {
          // androidRecordVideo();
        });
      } else {
        // androidRecordVideo();
      }
    };
  };
  useEffect(() => {
    Platform.OS === "android" && androidWriteStorage();
    // Platform.OS === "ios" && iosCamera();
  }, []);

  return <View />;
};
