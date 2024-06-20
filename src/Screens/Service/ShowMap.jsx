import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { CardLocation } from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import { UseInset } from "../../Hooks";
import ArrowRight from "../../components/svg/ArrowRight";
import { useSelector } from "react-redux";
import { getRouterById } from "../../Utils/RoutingService";
import { GOOGLE_API_KEY } from "../../Utils";
import axios from "axios";
import Loading from "../../components/Loading";
import { pin_outline } from "../../assets";

const ShowMap = () => {
  const user = useSelector((state) => state.main.userLogin);
  const route = useRoute();
  const navi = useNavigation();
  const { service } = route.params || {};
  const inset = UseInset();
  const [userProfile, setUserProfile] = React.useState({
    Latitude: 0,
    Longitude: 0,
  });

  const handleNext = () => {
    navi.navigate(getRouterById(service.ServiceId), {
      service: {
        ...service,
        CustomerId: user.Id,
        CustomerName: user.CustomerName,
        Latitude: userProfile.Latitude,
        Longitude: userProfile.Longitude,
      },
    });
  };
  useEffect(() => {
    getLatLong(service.place_id);
  }, []);

  const getLatLong = async (place_id) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: place_id,
            fields: "geometry",
            key: GOOGLE_API_KEY,
          },
        }
      );
      setUserProfile({
        Latitude: response.data.result.geometry.location.lat,
        Longitude: response.data.result.geometry.location.lng,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <MapView
            style={styles.map}
            region={{
              latitude: userProfile.Latitude,
              longitude: userProfile.Longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: userProfile.Latitude,
                longitude: userProfile.Longitude,
              }}
              title={service.Address}
            >
              <View style={styles.markerContainer}>
                <Loading
                  source={pin_outline}
                  style={{ width: 64, height: 64 }}
                />
              </View>
            </Marker>
          </MapView>
          <View style={styles.topBar}>
            <CardLocation
              onPress={() => navi.goBack()}
              location={service.Address}
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliverytext}>{service.Address}</Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{user.CustomerName}</Text>
            </View>
          </View>
          <Box height={80} />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: inset.bottom,
          zIndex: 10,
          elevation: 10,
          backgroundColor: colors.PRIMARY_GREEN,
          width: "95%",
          margin: 10,
          borderRadius: 7,
        }}
      >
        <Button
          icon={() => <ArrowRight color={colors.WHITE} />}
          onPress={handleNext}
          bgColor={colors.PRIMARY_GREEN}
        >
          Chọn vị trí này
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ShowMap;

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT / 1.5,
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
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: SCREEN_WIDTH / 13,
    flex: 1,
    marginTop: SCREEN_HEIGHT / -81,
    backgroundColor: colors.WHITE,
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
    color: colors.WHITE,
  },
});
