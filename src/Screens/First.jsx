import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import LogoBee from "../components/LogoBee";
import { colors } from "../styles/Colors";
import { useCallback, useEffect } from "react";
import { image_banner_1 } from "../assets/icons";
import { ScreenNames, StorageNames } from "../Constants";
import { getData, setData } from "../Utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { mainAction } from "../Redux/Action";
import { useDispatch } from "react-redux";
import Geolocation from '@react-native-community/geolocation';

const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();

  const OVG_spCustomer_Location_Update = async (
    latitude,
    longitude,
    CustomerId
  ) => {
    try {
      const pr = {
        CustomerId: 582,
        Lat: latitude,
        Lng: longitude,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Location_Update",
        API_key: "netcoAPIkey2020",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        if (result.Status === "OK") {
          dispatch({
            type: mainTypes.LOCATION_TIME,
            payload: result.Result,
          });
        }
      }
    } catch (e) { }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position.coords) {
          OVG_spCustomer_Location_Update(
            position?.coords?.latitude,
            position?.coords?.longitude
          );
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();
    }, []),
  );
  useEffect(() => {
    const getRouter = async () => {
      try {
        const userLogin = await getData(StorageNames.USER_PROFILE);
        mainAction.userLogin(userLogin, dispatch);
        if (userLogin === null || userLogin?.Phone === "") {
          await ensureMenuData();
          navi.navigate(ScreenNames.ABOUT);
        } else {
          await ensureMenuData();
          navi.navigate(ScreenNames.MAIN_NAVIGATOR);
        }
      } catch (error) {
        console.error("Failed to fetch the user from AsyncStorage:", error);
      }
    };

    const ensureMenuData = async () => {
      const menuData = await getData(StorageNames.MENU_SERVICE);
      await fetchMenuData();

      if (menuData) {
        console.log("Menu data from AsyncStorage:", menuData);
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
        if (result.length > 0) {
          mainAction.menuService(result, dispatch);
          await setData(StorageNames.MENU_SERVICE, result);
        } else {
          Alert.alert("Error", "Lỗi dữ liệu");
        }
      } catch (error) {
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
