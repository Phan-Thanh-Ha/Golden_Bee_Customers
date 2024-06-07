import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
const ShowMap = () => {
  return (
    <View>
      <MapView
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
      </MapView>
    </View>
  );
};

export default ShowMap;
