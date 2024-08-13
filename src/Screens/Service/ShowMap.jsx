import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { GOOGLE_API_KEY } from "../../Utils";
import { CardLocation } from "../../components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import Loading from "../../components/Loading";
import { pin_outline } from "../../assets";
import { getRouterById } from "../../Utils/RoutingService";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import ArrowRight from "../../components/svg/ArrowRight";
import BackButton from "../../components/BackButton";

const ShowMap = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params || {};
  const [region, setRegion] = useState({
    latitude: service?.latitude || 0,
    longitude: service?.longitude || 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [region1, setRegion1] = useState({
    latitude: service?.latitude || 0,
    longitude: service?.longitude || 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    if (!service.latitude || !service.longitude) {
      getLatLong(service?.place_id);
    } else {
      setRegion({
        ...region,
        latitude: service?.latitude,
        longitude: service?.longitude,
      });
    }
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
      const location = response.data.result.geometry.location;
      setRegion({
        ...region,
        latitude: location.lat,
        longitude: location.lng,
      });
    } catch (error) {
      // console.error("Error fetching place details:", error);
      // Handle error gracefully
    }
  };

  const handleNext = () => {
    navigation.navigate(getRouterById(service.ServiceId), {
      service: {
        ...service,
        Latitude: region.latitude,
        Longitude: region.longitude,
      },
    });
  };

  const onRegionChangeComplete = (newRegion) => {
    console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  newRegion:", newRegion);
    setRegion1(newRegion);
    // setRegion(newRegion);
  };
  const onMapMarkerDragEnd = (newRegion) => {
    console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  location:", newRegion);
    // const region = location.nativeEvent.coordinate;
    // setRegion(region);
    // onLocationChange(region);
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton color={colors.BLACK} />
      <ScrollView>
        <View>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChangeComplete}
            zoomEnabled={true}
            // onPanDrag={(e) => console.log("onPanDrag", e)}
          >
            <Marker
              coordinate={{
                latitude: region1.latitude,
                longitude: region1.longitude,
              }}
              onDragEnd={onMapMarkerDragEnd}
              title={service.Address}
              draggable={true}
            >
              <View style={styles.markerContainer}>
                <Loading
                  source={pin_outline}
                  style={{ width: 64, height: 64 }}
                />
              </View>
            </Marker>
          </MapView>
          {/* Center marker icon */}
          <View style={styles.markerFixed}>
            <Image source={pin_outline} style={{ width: 64, height: 64 }} />
          </View>
          {/* <View style={styles.topBar}>
            <CardLocation
              onPress={() => navigation.goBack()}
              location={service.Address}
            />
          </View> */}
        </View>
        <CardLocation
          onPress={() => navigation.goBack()}
          location={service.Address}
        />
        <View style={styles.bodyContainer}>
          <Box height={80} />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
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
    height: SCREEN_HEIGHT / 1.3,
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
  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: SCREEN_WIDTH / 13,
    flex: 1,
    marginTop: SCREEN_HEIGHT / -81,
    backgroundColor: colors.WHITE,
  },
  topBar: {
    position: "absolute",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 81,
    marginHorizontal: SCREEN_WIDTH / 110,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -32,
    marginTop: -32,
    position: "absolute",
    top: "50%",
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
