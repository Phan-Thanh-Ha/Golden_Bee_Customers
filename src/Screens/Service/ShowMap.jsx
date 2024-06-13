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
import React, { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { CardLocation } from "../../components";
import { useRoute } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import Button from "../../components/buttons/Button";

const ShowMap = () => {
  const route = useRoute();
  const dataAddress =
    route.params && route.params.data ? route.params.data : undefined;
  const [dataAddressSearch, setDataAddressSearch] = React.useState("");
  useEffect(() => {
    if (dataAddress) {
      console.log("dataAddress", dataAddress);
      setDataAddressSearch(dataAddress);
    }
  });
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
            {console.log("312312312", dataAddressSearch.address)}
            <Marker
              coordinate={{
                latitude: 10.8093,
                longitude: 106.6641,
              }}
              title={dataAddressSearch.address}
            >
              <View style={styles.markerContainer}>
                <Icon name="pin-outline" width={32} height={32} fill="#000" />
              </View>
            </Marker>
          </MapView>
          <View style={styles.topBar}>
            {/* <BackButton onPress={onClickBack} /> */}
            <Text>Back</Text>
            <CardLocation location={dataAddressSearch} />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliverytext}>{dataAddressSearch.address}</Text>
            <Text style={styles.toText}>Ong vàng</Text>
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>Delivered your order</Text>
              <Text style={styles.detailSubTitle}>
                We deliver your goods to you in the shortes possible time.
              </Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Button>đâsdas</Button>
            <View style={styles.driverContainer}>
              {/* <Image
                source={require("../../assets/images/driverDefault.png")}
              /> */}
              {/* <View style={{ marginStart: SCREEN_WIDTH / 31 }}>
                <Text style={styles.driverText}>Johan Hawn</Text>
                <Text style={styles.driverStatus}>Personal Courier</Text>
              </View> */}
            </View>
            {/* <TouchableOpacity
              style={styles.phoneContainer}
            >
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
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
});
