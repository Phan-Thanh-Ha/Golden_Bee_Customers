import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import Header from "../../components/Header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "@ui-kitten/components";
import { requestLocationPermission } from "../../Utils/UtilsPermissions";
import { GOOGLE_API_KEY } from "../../Utils";

import { colors } from "../../styles/Colors";
import ShowMap from "../../components/ShowMap";
const AddressSearch = () => {
  const [CustomerLocation, setCustomerLocation] = React.useState({});
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await requestLocationPermission();
      if (location) {
        console.log("-----> 👿👿👿 <-----  location:", location);
        setCustomerLocation(location.coords);
      }
    };
    fetchLocation();
  }, []);
  const [isMapReady, setIsMapReady] = React.useState(5);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <Header title="Chọn vị trí làm việc" />
        <GooglePlacesAutocomplete
          placeholder="Địa chỉ hiện tại"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log("-----> 👿👿👿 <-----  details:", details);
            console.log("-----> 👿👿👿 <-----  data:", data);
            // 'details' is provided when fetchDetails = true
          }}
          onfail={(error) => console.log("error", error)}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
            region: "VN",
          }}
          textInputProps={{
            onChangeText: (value) => {
              if (value !== "") {
                setIsMapReady(1);
              } else {
                setIsMapReady(5);
              }
            },
          }}
        />
      </View>
      <View styles={{ flex: 1 }}>
        <ShowMap />
      </View>

      {/* <MapView
        style={{ flex: isMapReady }}
        initialRegion={{
          latitude: CustomerLocation.latitude
            ? CustomerLocation.latitude
            : 10.345,
          longitude: CustomerLocation.longitude
            ? CustomerLocation.longitude
            : 107.0843,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        // showsUserLocation={true}
      >
        {CustomerLocation.latitude && CustomerLocation.longitude && (
          <Marker
            coordinate={{
              latitude: 10.345,
              longitude: 107.0843,
            }}
          />
        )}
      </MapView> */}
    </>
  );
};

export default AddressSearch;

const styles = StyleSheet.create({});
