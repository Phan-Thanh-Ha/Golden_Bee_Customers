import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import LogoBee from "../components/LogoBee";
import { colors } from "../styles/Colors";
import { useEffect } from "react";
import { image_banner_1 } from "../assets/icons";
import { ScreenNames, StorageNames } from "../Constants";
import { getData, setData } from "../Utils";
import { useNavigation } from "@react-navigation/native";
import { mainAction } from "../Redux/Action";
import { useDispatch } from "react-redux";
import React from "react";
const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getRouter = async () => {
      try {
        const isOld = await getData(StorageNames.IS_OLD_USER);
        if (isOld) {
          const userLogin = await getData(StorageNames.USER_PROFILE);
          mainAction.userLogin(userLogin, dispatch);
          await ensureMenuData();
          if (userLogin) {
            navi.reset({
              index: 0,
              routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
            })
          } else {
            navi.reset({
              index: 0,
              routes: [{ name: ScreenNames.HOME }],
            })
          }
        } else {
          navi.reset({
            index: 0,
            routes: [{ name: ScreenNames.ABOUT }],
          })
        }
      } catch (error) {
        console.error("Failed to fetch the user from AsyncStorage:", error);
      }
    };

    const ensureMenuData = async () => {
      const menuData = await getData(StorageNames.MENU_SERVICE);
      await fetchMenuData();

      if (menuData) {
        mainAction.menuService(menuData, dispatch);
      } else {
        await fetchMenuData();
      }
    };

    const fetchMenuData = async () => {
      try {
        const pr = {
          ServiceId: 0,
          GroupUserId: 0,
        };
        const params = {
          Json: JSON.stringify(pr),
          func: "OVG_spService_List_Menu",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        // console.log("🚀 ~ fetchMenuData ~ result:", result);
        if (result.length > 0) {
          mainAction.menuService(result, dispatch);
          await setData(StorageNames.MENU_SERVICE, result);
        }
      } catch {
        // console.error("Failed to fetch menu data from API:", error);
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
