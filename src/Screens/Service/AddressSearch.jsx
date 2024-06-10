import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import Header from "../../components/Header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "@ui-kitten/components";
import { GOOGLE_API_KEY } from "../../Utils";

import { colors } from "../../styles/Colors";
import ShowMap from "../../components/ShowMap";
import { getLocation } from "../../Utils/getLocaltion";
import MapView from "react-native-maps";
const AddressSearch = () => {
  useEffect(() => {
    getLocation();
  }, []);
  const [CustomerLocation, setCustomerLocation] = React.useState({});

  const [isMapReady, setIsMapReady] = React.useState(5);
  return (
    <View style={{ flex: 1 }}>
      <Header title="Map" />

      <ShowMap />
    </View>
  );
  // {/* <GooglePlacesAutocomplete
  //     placeholder="Địa chỉ hiện tại"
  //     fetchDetails={true}
  //     onPress={(data, details = null) => {
  //       console.log("-----> 👿👿👿 <-----  details:", details);
  //       console.log("-----> 👿👿👿 <-----  data:", data);
  //       // 'details' is provided when fetchDetails = true
  //     }}
  //     onfail={(error) => console.log("error", error)}
  //     query={{
  //       key: GOOGLE_API_KEY,
  //       language: "en",
  //       region: "VN",
  //     }}
  //     textInputProps={{
  //       onChangeText: (value) => {
  //         if (value !== "") {
  //           setIsMapReady(1);
  //         } else {
  //           setIsMapReady(5);
  //         }
  //       },
  //     }}
  //   /> */}
  // {/* <ShowMap /> */}
};

export default AddressSearch;

const styles = StyleSheet.create({});
