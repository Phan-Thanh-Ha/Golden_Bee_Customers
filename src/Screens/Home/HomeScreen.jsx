import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Platform,
} from "react-native";
import { colors } from "../../styles/Colors";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import UserHeader from "../../components/UserHeader";
import ServiceCarousel from "../../components/ServiceCarousel";
import BtnDouble from "../../components/BtnDouble";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { ScreenNames, StorageNames } from "../../Constants";
import { mainAction } from "../../Redux/Action";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { getData, removeData, setData } from "../../Utils";
import { dataNewServiceDefault, dataSliderDefault } from "../data";
import { MenuComponent } from "./Menu/MenuComponent ";
import AlertModalFaceId from "../../components/AlertModalFaceId";
import TouchID from "react-native-touch-id";
import { OVG_FBRT_GEtTotalOrders } from "../../firebaseService/ListenOrder";
import Geolocation from "@react-native-community/geolocation";

const HomeScreen = () => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const dispatch = useDispatch();
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  const customerId = useSelector((state) => state.main.customerId);

  const [dataNewService, setDataNewService] = React.useState(
    dataNewServiceDefault
  );
  const [isVisiableModalFace, setIsVisiableModalFace] = React.useState(false);
  const [dataCarousel, setDataCarousel] = React.useState(dataSliderDefault);

  useEffect(() => {
    Shop_spWeb_Slides_List();
    Shop_spWeb_News_List();
    handlePendingService();
    updateLocation();
    handleBiometricAuthentication();
  }, []);
  const handleBiometricAuthentication = () => {
    checkBiometric();
    // if (Platform.OS === "ios") {
    //   checkBiometric();
    // } else {
    //   authenticateFaceID();
    // }
  };

  useFocusEffect(() => {
    OVG_FBRT_GEtTotalOrdersGet();
  });

  // Get total order
  const OVG_FBRT_GEtTotalOrdersGet = useCallback(async () => {
    const total = await OVG_FBRT_GEtTotalOrders(userLogin?.Id);
    if (total !== acceptedOrder) {
      mainAction.acceptedOrder(total, dispatch);
    }
  }, []);

  const authenticateFaceID = async () => {
    const checkFaceId = await getData(StorageNames.CHECK_FACE_ID_ENABLED);
    console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  checkFaceId:", checkFaceId);
    try {
      TouchID.authenticate(
        "\nVui lòng xác thực tài khoản",
        handleAuthentication
      )
        .then(async (success) => {
          customerId !== null && checkFaceId !== true
            ? setIsVisiableModalFace(true)
            : setIsVisiableModalFace(false);
        })
        .catch((err) => {
          if (Platform.OS == "android") {
            if (
              err.code == "NOT_SUPPORTED" ||
              err.code == "NOT_AVAILABLE" ||
              err.code == "NOT_PRESENT" ||
              err.code == "NOT_ENROLLED"
            ) {
              Alert.alert(
                "Xác thực Sinh Trắc Học không khả dụng",
                "\nVui lòng nhập mật khẩu để đăng nhập."
              );
            } else if (
              err.code == "AUTHENTICATION_FAILED" ||
              err.code == "AUTHENTICATION_CANCELED"
            ) {
              return;
            } else if (
              err.code == "FINGERPRINT_ERROR_LOCKOUT" ||
              err.code == "FINGERPRINT_ERROR_LOCKOUT_PERMANENT"
            ) {
              Alert.alert(
                "Không tìm thấy dữ liệu Xác thực Sinh Trắc Học",
                "\nVui lòng nhập mật khẩu để đăng nhập."
              );
            } else {
              Alert.alert("Lỗi !!!", `\nLỗi bất ngờ. (${err.code})`);
            }
          }
        });
    } catch (error) {
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  error:", error);
    }
  };

  // Check Face ID

  const checkBiometric = () => {
    TouchID.isSupported()
      .then(async (biometryType) => {
        const checkFaceId = await getData(StorageNames.CHECK_FACE_ID_ENABLED);
        if (Platform.OS === "ios" && biometryType === "FaceID") {
          customerId !== null && checkFaceId !== true
            ? setIsVisiableModalFace(true)
            : setIsVisiableModalFace(false);
        } else if (
          Platform.OS === "android" &&
          biometryType === "Fingerprint"
        ) {
          customerId !== null && checkFaceId !== true
            ? setIsVisiableModalFace(true)
            : setIsVisiableModalFace(false);
        }
      })
      .catch((error) => {
        // Alert.alert("Face ID is not supported", error.message);
      });
  };
  // Update location
  const updateLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords) {
            const location = {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            };
            mainAction.locationUpdate(location, dispatch);
          }
        },

        { enableHighAccuracy: false, timeout: 20000 }
      );
    } catch {
      //
    }
  };
  // Save service
  const OVG_spService_BookingService_Save = async (pr) => {
    const calling = async () => {
      try {
        const params = {
          Json: JSON.stringify(pr),
          func: "OVG_spService_BookingService_Save_V2",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        if (result?.Status === "OK") {
          await removeData(StorageNames.SERVICE_PENDING);
          return;
        } else {
          OVG_spService_BookingService_Save_Not_Officer(pr);
          await removeData(StorageNames.SERVICE_PENDING);
        }
      } catch {
        await removeData(StorageNames.SERVICE_PENDING);
      }
    };
    calling();
  };

  // Save service not officer
  const OVG_spService_BookingService_Save_Not_Officer = async (pr) => {
    try {
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spService_BookingService_Save_Not_Officer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === "OK") {
        await removeData(StorageNames.SERVICE_PENDING);
      }
    } catch {
      await removeData(StorageNames.SERVICE_PENDING);
    }
  };

  // Handle pending service
  const handlePendingService = async () => {
    try {
      const serviceParams = await getData(StorageNames.SERVICE_PENDING);
      if (serviceParams) {
        OVG_spService_BookingService_Save(serviceParams);
      }
    } catch {
      // console.error("Error pending service:", error);
    }
  };

  // Shop_spWeb_Slides_List
  const Shop_spWeb_Slides_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_Slides_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataCarousel(result);
      }
    } catch {
      //
    }
  };

  // Shop_spWeb_News_List
  const Shop_spWeb_News_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_News_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataNewService(result);
      }
    } catch {
      //
    }
  };

  // Modal Face ID
  const modalFaceId = async () => {
    setIsVisiableModalFace(false);
  };

  // Handle Authentication
  const handleAuthentication = () => {
    const optionalConfigObject = {
      title: "Authentication Required",
      imageColor: "#e00606",
      imageErrorColor: "#ff0000",
      sensorDescription: "Touch sensor",
      sensorErrorDescription: "Failed",
      cancelText: "Cancel",
      fallbackLabel: "Show Passcode",
      unifiedErrors: false,
      passcodeFallback: false,
    };

    TouchID.authenticate("", optionalConfigObject)
      .then(async (success) => {
        await setData(StorageNames.CHECK_FACE_ID_ENABLED, success);
        setIsVisiableModalFace(false);
      })
      .catch((error) => {
        Alert.alert("Lỗi kích hoạt vui lòng kiểm tra lại", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <UserHeader totalService={acceptedOrder} />
      <ScrollView>
        <View
          style={{
            borderRadius: 10,
            padding: 10,
          }}
        >
          <CarouselItem dataCarousel={dataCarousel} />
        </View>

        <MenuComponent />

        <ServiceCarousel
          dataNewService={dataNewService}
          onItemPress={(item) => {
            navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, {
              article: item,
            });
          }}
        />

        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      {!customerId ? (
        <LayoutBottom>
          <View style={{ backgroundColor: colors.WHITE }}>
            <BtnDouble
              title1={"Đăng nhập"}
              title2={"Đăng ký"}
              onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
              onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
            />
            <View style={MainStyles.flexRowCenter}>
              <Text
                style={[
                  styles.title,
                  {
                    marginBottom: 10,
                    width: SCREEN_WIDTH * 0.7,
                    textAlign: "center",
                  },
                ]}
              >
                Bạn cần đăng nhập để sử dụng dịch vụ của Ong Vàng
              </Text>
            </View>
          </View>
        </LayoutBottom>
      ) : null}
      <AlertModalFaceId
        Header={"Mở khoá bằng gương mặt"}
        isVisible={isVisiableModalFace}
        Title={"Sử dụng gương mặt để mở khoá ứng dụng"}
        onpressLeftButton={() => {
          modalFaceId();
        }}
        onpressRightButton={() => {
          handleAuthentication();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
