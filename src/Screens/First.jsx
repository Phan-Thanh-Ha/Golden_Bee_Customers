import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import LogoBee from "../components/LogoBee";
import { colors } from "../styles/Colors";
import { useEffect } from "react";
import { image_banner_1 } from "../assets/icons";
import { ScreenNames, StorageNames } from "../Constants";
import { getData } from "../Utils";
import { useNavigation } from "@react-navigation/native";
import { mainAction } from "../Redux/Action";
import { useDispatch } from "react-redux";
// import {
//   RequestPermission,
//   requestLocationPermission,
//   requestLocationPermissionBackground,
// } from "../Utils";
// import { RESULTS } from "react-native-permissions";

const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // RequestPermission().then(result => {
    //   console.log(result); // In kết quả ra console
    //   // Tiếp tục xử lý dựa trên kết quả
    //   if (result === RESULTS.GRANTED) {
    //     // Quyền đã được cấp
    //   } else {
    //     console.log('Quyền bị từ chối hoặc không khả dụng');
    //     // Quyền bị từ chối hoặc không khả dụng
    //   }
    // });
    const getRouter = async () => {
      try {
        // Thông tin kiểm tra
        const userLogin = await getData(StorageNames.USER_PROFILE);
        console.log("user open app:", userLogin);
        mainAction.userLogin(userLogin, dispatch);
        if (userLogin === null || userLogin?.Phone === "") {
          navi.navigate(ScreenNames.ABOUT);
          return;
        } else {
          navi.navigate(ScreenNames.MAIN_NAVIGATOR);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch the user from AsyncStorage:", error);
      }
    };
    getRouter();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LogoBee />
        <View style={styles.imageContainer}>
          <Image source={image_banner_1} style={styles.image} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.WHITE,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});

export default First;
