import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { CardLocation } from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import { UseInset } from "../../Hooks";
import ArrowRight from "../../components/svg/ArrowRight";
import { useSelector } from "react-redux";
import { getRouterById } from "../../Utils/RoutingService";
import { dataBooing } from "../data";
import { ic_location, logo_bee_blue } from "../../assets";
import Loading from "../../components/Loading";

const WaitingStaffScreen = () => {
  const navi = useNavigation();
  const route = useRoute();
  const inset = UseInset();
  const [confirm, setConfirm] = useState(false);
  const [staff, setStaff] = useState({});
  const { dataBooking } = route.params || {};
  // const dataBooking = dataBooing;
  console.log("dataBooking in waiting staff screen", dataBooking);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 10.8093,
              longitude: 106.6641,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
          >
            {/* 10.8093, 106.6641 */}
            {console.log("312312312", dataBooking?.Address)}
            <Marker
              coordinate={{
                latitude: 10.8093,
                longitude: 106.6641,
              }}
              title={dataBooking?.Address}
            >
              <View style={styles.markerContainer}>
                <Icon name="pin-outline" width={32} height={32} fill="#000" />
              </View>
            </Marker>
          </MapView>
          <View style={styles.topBar}>
            <CardLocation
              onPress={() => navi.goBack()}
              location={dataBooking?.Address}
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={MainStyles.contentContainerClient}>
            <Text style={MainStyles.cardLabelConfirm}>Vị trí làm việc</Text>
            <View style={MainStyles.cardConfirmContainer}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_location}
                  style={{ width: 20, height: 20 }}
                />
                <View>
                  <Text style={MainStyles.cardTitleConfirm}>{dataBooking?.Address}</Text>
                </View>
              </View>
            </View>
            <Text style={MainStyles.cardSubLabelConfirm}>Thời gian làm việc</Text>
            <View style={MainStyles.cardConfirmContainer}>
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Ngày làm việc</Text>
                <Text style={MainStyles.cardTitleConfirm}>Ngay bây giờ</Text>
              </View>
              <Box height={10} />
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Loại dịch vụ</Text>
                <Text style={MainStyles.cardTitleConfirm}>{dataBooking?.premium ? "Dịch vụ Premium" : "Dịch vụ thường"}</Text>
              </View>
            </View>
            <Text style={MainStyles.cardSubLabelConfirm}>Nhân viên</Text>
            {
              !confirm ? (
                <>
                  <View style={[MainStyles.flexRowFlexStart, { alignContent: 'center' }, MainStyles.cardConfirmContainer]}>
                    <Image
                      source={logo_bee_blue}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: 'contain',
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>Họ tên :</Text>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{staff?.OfficerName || "Nhật Linh"}</Text>
                      </View>
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>SĐT :</Text>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{staff?.Phone || "0123456789"}</Text>
                      </View>
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>CMND/CCCD :</Text>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{staff?.PostOfficeId || "0123456789"}</Text>
                      </View>
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>Mã nhân viên :</Text>
                        <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{staff?.PostOfficeId || "0123456789"}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[MainStyles.flexRowCenter, { alignContent: 'center' }, MainStyles.cardConfirmContainer]}>
                    <Image
                      source={ic_location}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        marginRight: 10,
                      }}
                    />
                    <Text>Nhân viên sẽ đến trong 5 phút</Text>
                  </View>
                </>
              ) : (
                <Loading />
              )
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT / 2,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  deliverytext: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.DARK,
  },
  deliveryContainer: {
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 30,
  },
  toText: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: SCREEN_HEIGHT / 135,
  },
  progressLine: {
    height: 4,
    width: SCREEN_WIDTH / 5.3,
    backgroundColor: colors.SUCCESS,
    borderRadius: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: SCREEN_HEIGHT / 25,
  },
  bodyContainer: {

  },
  detailContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 14,
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT / 58,
    paddingHorizontal: SCREEN_WIDTH / 23,
    marginTop: SCREEN_HEIGHT / 55,
  },
  motorContaniner: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 12,
    paddingHorizontal: SCREEN_WIDTH / 25,
    paddingVertical: SCREEN_HEIGHT / 54,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.DARK,
  },
  detailSubTitle: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: SCREEN_HEIGHT / 102,
  },
  detailTextContainer: {
    flex: 1,
    marginStart: SCREEN_WIDTH / 31,
  },
  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverText: {
    fontWeight: "600",
    color: colors.DARK,
  },
  driverStatus: {
    color: colors.GRAY,
    fontSize: 12,
    marginTop: SCREEN_HEIGHT / 101,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 41,
    justifyContent: "space-between",
  },
  phoneContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.CANCEL2,
    borderRadius: 14,
    paddingHorizontal: SCREEN_WIDTH / 31,
    paddingVertical: SCREEN_HEIGHT / 67,
    backgroundColor: colors.CANCEL2,
  },
  markerContainer: {
    // backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH / 47,
    paddingVertical: SCREEN_HEIGHT / 101,
  },
  topBar: {
    position: "absolute",
    // left: SCREEN_WIDTH / 28,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 81,
    // right: SCREEN_WIDTH / 100,
    marginHorizontal: SCREEN_WIDTH / 110,
  },
  btnTitle: {
    fontSize: 18,
    color: colors.WHITE
  }
});


export default WaitingStaffScreen;