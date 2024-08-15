import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { FormatMoney, GOOGLE_API_KEY, dateTimeFormat } from "../../Utils";
import Loading from "../../components/Loading";
import BtnDouble from "../../components/BtnDouble";
import {
  delivery_Golden,
  ic_coin,
  logo_bee_blue,
  pin_outline,
} from "../../assets";
import { colors } from "../../styles/Colors";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { ScreenNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { OVG_FBRT_ListentOrderById } from "../../firebaseService/ListenOrder";
import { Avatar, Icon } from "@ui-kitten/components";
import { GenerateStatusOrder } from "../../Utils/GenerateStatusOrder";
import { APIImage } from "../../Config/Api";

const ViewStaffScreen = () => {
  const navi = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};
  const [timeOut, setTimeOut] = useState({ distance: 0, duration: 0 });
  const [clientOrder, setClientOrder] = useState({});
  const [flag, setFlag] = useState(false);
  // Fetch order based on OrderId
  const getOrder = useCallback(() => {
    if (data?.OrderId) {
      const unsubscribe = OVG_FBRT_ListentOrderById(
        data?.OrderId,
        setClientOrder
      );
      return () => {
        unsubscribe();
      };
    }
  }, [data?.OrderId]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navi.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
          })
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navi])
  );
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getOrder();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [getOrder])
  );

  useEffect(() => {
    if (clientOrder.StatusOrder === 1) {
      setFlag(true);
    }
    if (flag && !clientOrder) {
      navi.replace(ScreenNames.MAIN_NAVIGATOR);
    }
  }, [clientOrder.StatusOrder]);

  // Memoize the MapView component to avoid unnecessary re-renders
  const mapView = useMemo(
    () =>
      clientOrder?.LatitudeCustomer &&
      clientOrder?.LongitudeCustomer && (
        <MapView
          style={styles.map}
          region={{
            latitude: clientOrder?.LatitudeCustomer,
            longitude: clientOrder?.LongitudeCustomer,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          zoomEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: clientOrder?.LatitudeCustomer,
              longitude: clientOrder?.LongitudeCustomer,
            }}
            title={clientOrder?.DataService?.Address}
          >
            <View style={styles.markerContainer}>
              <Loading source={pin_outline} style={{ width: 64, height: 64 }} />
            </View>
          </Marker>
          {clientOrder?.LatitudeStaff && (
            <>
              <Marker
                coordinate={{
                  latitude: clientOrder?.LatitudeStaff,
                  longitude: clientOrder?.LongitudeStaff,
                }}
              >
                <View style={styles.markerContainer}>
                  <Loading
                    source={delivery_Golden}
                    style={{ width: 64, height: 64 }}
                  />
                </View>
              </Marker>
              <MapViewDirections
                origin={{
                  latitude: clientOrder?.LatitudeStaff,
                  longitude: clientOrder?.LongitudeStaff,
                }}
                destination={{
                  latitude: clientOrder?.LatitudeCustomer,
                  longitude: clientOrder?.LongitudeCustomer,
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor={colors.SUCCESS}
                onReady={(result) => {
                  setTimeOut({
                    distance: result?.distance,
                    duration: result?.duration,
                  });
                }}
              />
            </>
          )}
        </MapView>
      ),
    [clientOrder]
  );

  const renderOrderDetails = useCallback(
    () => (
      <View style={[MainStyles.contentContainerClient, { paddingBottom: 0 }]}>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
            Dịch vụ {clientOrder?.DataService?.ServiceName.toLowerCase()}
          </Text>
        </View>
        {clientOrder?.BookingCode ? (
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: colors.primary[700],
              fontWeight: "bold",
            }}
          >
            {clientOrder?.BookingCode}
          </Text>
        ) : null}
        <View style={MainStyles.flexRowCenter}>
          <View style={MainStyles.line} />
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill="#3366FF"
              name="people-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Số lượng nhân viên: {clientOrder?.DataService?.StaffTotal || 0} nhân viên
            </Text>
          </View>
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill="#3366FF"
              name="pin-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Địa chỉ: {clientOrder?.DataService?.Address}
            </Text>
          </View>
        </View>
        {
          clientOrder?.CreateAt && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="calendar-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Thời gian tạo: {dateTimeFormat(clientOrder?.CreateAt, 2)}
                </Text>
              </View>
            </View>
          )
        }

      </View>
    ),
    [clientOrder]
  );
  const renderStaffInfo = useCallback(
    () =>
      clientOrder && clientOrder?.StaffId !== "" ? (
        <View style={{ padding: 10, paddingTop: 0 }}>
          <View
            style={[
              MainStyles.cardStaff,
              { borderWidth: 0, backgroundColor: colors.WHITE },
            ]}
          >
            <View style={MainStyles.flexRowCenter}>
              <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
                Thông tin nhân viên
              </Text>
            </View>
            <View
              style={[
                MainStyles.flexRowFlexStart,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              {clientOrder?.StaffAvatar ? (
                <Avatar
                  source={{ uri: APIImage + clientOrder?.StaffAvatar }}
                  size="giant"
                  style={{ marginRight: 10 }}
                />
              ) : (
                <Avatar
                  source={logo_bee_blue}
                  size="giant"
                  style={{ marginRight: 10 }}
                />
              )}
              <View>
                {clientOrder?.StaffName && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill="#3366FF"
                        name="person-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Tên nhân viên:{" "}
                        {clientOrder?.StaffName || "Không xác định"}
                      </Text>
                    </View>
                  </View>
                )}
                {clientOrder?.StaffPhone && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill="#3366FF"
                        name="phone-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số điện thoại:{" "}
                        {clientOrder?.StaffPhone || "Chưa có thông tin"}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="flash-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      {GenerateStatusOrder(clientOrder.StatusOrder || 0)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[{ alignContent: "center" }, MainStyles.cardConfirmContainer]}
        >
          <Loading />
          <Text style={[MainStyles.textCardJob, { textAlign: "center" }]}>
            Đang tìm Nhân viên
          </Text>
        </View>
      ),
    [clientOrder, timeOut]
  );

  if (!clientOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <LayoutBottom>
          <BtnDouble
            style={MainStyles.btnConfirm}
            onConfirm1={() => navi.navigate(ScreenNames.MAIN_NAVIGATOR)}
            title1="Về trang chính"
            btn2Visible={false}
          />
        </LayoutBottom>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {clientOrder && (
        <>
          {/* <BackButton color={colors.MAIN_BLUE_CLIENT} /> */}
          <ScrollView>
            <View style={styles.mapContainer}>{mapView}</View>
            {renderOrderDetails()}
            {renderStaffInfo()}
          </ScrollView>
          <LayoutBottom>
            <View
              style={[
                MainStyles.cardConfirmContainer,
                MainStyles.flexRowCenter,
              ]}
            >
              <Image source={ic_coin} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "700",
                }}
              >
                {FormatMoney(clientOrder?.DataService?.PriceAfterDiscount)} VND
              </Text>
            </View>
            <BtnDouble
              style={MainStyles.btnConfirm}
              onConfirm1={() =>
                navi.reset({
                  routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
                })
              }
              title1="Về trang chính"
              btn2Visible={false}
            />
          </LayoutBottom>
          {/* <ModalConfirm
            title={`Nhân viên ${clientOrder?.StaffName}  đã bắt đầu làm việc, quay về trang chủ !`}
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            onConfirm={() => {
              setIsModalVisible(false);
              navi.navigate(ScreenNames.MAIN_NAVIGATOR);
            }}
            backdropClose={false}
          /> */}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mapContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});

export default ViewStaffScreen;
