import { StyleSheet, Text, View, Button } from "react-native";
import React, { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import BottomSheet from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Utils";

const ShowMap = () => {
  const navigation = useNavigation();
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = ["25%", "50%", "90%"];
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
      </MapView>

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Điểm làm việc</Text>
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
              onChangeText: (value) => {},
            }}
          />
        </View>
      </BottomSheet>
      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

export default ShowMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100,
  },
});
