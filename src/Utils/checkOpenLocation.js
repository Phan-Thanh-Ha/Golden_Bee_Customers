import { Platform } from "react-native";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export const CheckOpenLocation = async () => {
  try {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    const result = await check(permission);
    return result; // Trả về trạng thái quyền trực tiếp
  } catch (error) {
    console.error("Error checking location permission", error);
    return RESULTS.UNAVAILABLE; // Hoặc xử lý lỗi theo cách khác phù hợp với ứng dụng
  }
};
