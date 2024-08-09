import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
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
import { getData, removeData } from "../../Utils";
import { dataNewServiceDefault, dataSliderDefault } from "../data";
import { MenuComponent } from "./Menu/MenuComponent ";
import AlertModalFaceId from "../../components/AlertModalFaceId";
import TouchID from "react-native-touch-id";
import { OVG_FBRT_GEtTotalOrders } from "../../firebaseService/ListenOrder";

const HomeScreen = () => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const dispatch = useDispatch();
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  const [dataNewService, setDataNewService] = React.useState(
    dataNewServiceDefault
  );
  const [isVisiableModalFace, setIsVisiableModalFace] = React.useState(false);
  const [dataCarousel, setDataCarousel] = React.useState(dataSliderDefault);
  const [customerId, setCustomerId] = React.useState("");
  useEffect(() => {
    Shop_spWeb_Slides_List();
    Shop_spWeb_News_List();
    handlePendingService();
    checkFaceIDAvailability();
    getCustomerId();
  }, []);

  useFocusEffect(() => {
    OVG_FBRT_GEtTotalOrdersGet();
  });

  const getCustomerId = async () => {
    try {
      const officerId = await getData(StorageNames.CUSTOMER_ID);
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  officerId:", officerId);
      setCustomerId(officerId);
      return officerId;
    } catch {
      return null;
    }
  };

  // Get total order
  const OVG_FBRT_GEtTotalOrdersGet = useCallback(async () => {
    const total = await OVG_FBRT_GEtTotalOrders(userLogin?.Id);
    if (total !== acceptedOrder) {
      mainAction.acceptedOrder(total, dispatch);
    }
  }, []);

  // Check Face ID
  const checkFaceIDAvailability = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        if (biometryType === "FaceID") {
          setIsVisiableModalFace(false);
        } else {
          setIsVisiableModalFace(true);
        }
      })
      .catch((error) => {
        Alert.alert("Face ID is not supported", error.message);
      });
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
        console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
        setDataCarousel(result);
      }
    } catch {
      //
    }
  };

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
    } catch {}
  };

  const modalFaceId = async () => {
    setIsVisiableModalFace(false);
  };

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
      .then((success) => {
        setIsVisiableModalFace(false);
        Alert.alert("Kích hoạt thành công");
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
