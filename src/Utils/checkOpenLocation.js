import { Platform } from "react-native";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export const CheckOpenLocation = async () => {
  const permission = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  const result = await check(permission);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      return RESULTS.UNAVAILABLE;
    case RESULTS.DENIED:
      return RESULTS.DENIED;
    case RESULTS.GRANTED:
      return RESULTS.GRANTED;
    case RESULTS.BLOCKED:
      return RESULTS.BLOCKED;
    default:
      return null;
  }
};
