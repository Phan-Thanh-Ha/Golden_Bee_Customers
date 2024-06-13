import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GOOGLE_API_KEY, getData } from "../Utils";
import { InputComponent } from "./Input";
import BtnPrimary from "./buttons/BtnPrimary";
import { UseInset } from "../Hooks";
import { colors } from "../styles/Colors";
import { getLocation } from "../Utils/getLocaltion";
import { useSelector } from "react-redux";
const ShowMap = ({
  onIconPress,
  onChangeText,
  placeholder,
  style,
  userLocation = {},
}) => {
  // const locationTime = useSelector((state) => state?.main?.locationTime);
  // const route = useRoute();
  // const props =
  //   route.params && route.params.data ? route.params.data : undefined;
  const [value, setValue] = useState("");
  const inset = UseInset();
  const navigation = useNavigation();
  const [CustomerLocation, setCustomerLocation] = React.useState({
    latitude: 10.345,
    longitude: 107.0843,
  });
  const [cusAddress, setCusAddress] = React.useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef(null);
  useEffect(() => {
    const fetchLocation = async () => {
      let location = await getData("LOCATION_TIME");
      // console.log("-----> 👿👿👿 <-----  location:", location);
    };

    fetchLocation();
  }, []);

  // ref
  // const bottomSheetRef = useRef(null);
  // useEffect(() => {
  //   if (bottomSheetRef.current) {

  //     bottomSheetRef.current.expand(); // or bottomSheetRef.current.snapTo(1);
  //   }
  // }, []);
  // variables
  const snapPoints = ["40%"];
  const handleChangeText = async (text) => {
    setValue(text);
    // console.log("-----> 👿👿👿 <-----  text:", text);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:vn`
      );
      const data = await response.json();
      const dataSeachLocation = data.results.map((item) => ({
        name: item.formatted_address,
        lat: item.geometry.location.lat,
        lng: item.geometry.location.lng,
      }));
      // console.log(data.dataSeachLocation); // Danh sách gợi ý vị trí từ Google
    } catch (error) {
      console.error("Error fetching data from Google Places API:", error);
    }
  };

  const getUserLocation = async () => {
    try {
      const coords = await getLocation();
      // console.log("-----> 👿👿👿 <-----  coords:", coords);
      setCustomerLocation(coords);

      // console.log(
      //   `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`
      // );
      getAdressFromCoords(coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  // useEffect(() => {
  //   getUserLocation();
  // }, []);
  // useEffect(() => {
  //   getAdressFromCoords(CustomerLocation);
  // }, [CustomerLocation]);

  // TODO 2: Hàm lấy địa chỉ từ tọa độ
  const getAdressFromCoords = async (coords) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      // console.log("-----> 👿👿👿 <-----  data:", data);

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address; // Địa chỉ được trả về từ Google
        setCusAddress(address);
        // console.log(address);
        return address;
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching data from Google Geocoding API:", error);
    }
  };
  const handleDragEnd = (e) => {
    // console.log("-----> 👿👿👿 <-----  e:", e);
    setCustomerLocation(e.nativeEvent.coordinate);
  };
  return (
    <View style={styles.container}>
      <MapView
        zoomEnabled={true}
        style={styles.map}
        ref={mapRef}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setCustomerLocation({ latitude, longitude });
        }}
        // showsUserLocation={true}
        // followUserLocation={true}
        // showsMyLocationButton={true}
        initialRegion={{
          latitude: 10.345,
          longitude: 10.345,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 10.345,
            longitude: 10.345,
          }}
        // draggable
        // onDragEnd={handleDragEnd}
        >
          <Callout>
            <View>
              <Text>{cusAddress}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.inputContainer}>
        <InputComponent
          value={cusAddress}
          iconRight="map-outline"
          style={{ width: "98%", height: 550 }}
          onRightIconPress={() => {
            getUserLocation();
            // console.log(
            //   "🚀 ~ file: ShowMap.jsx ~ line 55 ~ onIconPress ~ onIconPress"
            // );
          }}
          disabled={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Get Current Location" onPress={getUserLocation} />
      </View>
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Địa chỉ đặt dịch vụ</Text>
          <InputComponent
            placeholder="Thay đổi địa chỉ"
            style={{ width: "90%", height: 250 }}
            onIconPress={() => {
              // console.log(
              //   "🚀 ~ file: ShowMap.jsx ~ line 55 ~ onIconPress ~ onIconPress"
              // );
            }}
            onChangeText={handleChangeText}
          />
        </View>
      </BottomSheet>
      <View
        style={{
          position: "absolute",
          bottom: inset.bottom,
          zIndex: 10,
          elevation: 10,
          backgroundColor: colors.WHITE,
          width: "98%",
        }}
      >
        <BtnPrimary
          onPress={() => navigation.goBack()}
          style={{
            width: "98%",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Chọn vị trí này
        </BtnPrimary>
      </View>
      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

export default ShowMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: "absolute", // Đặt vị trí của InputComponent là absolute
    top: 50, // Đặt InputComponent ở vị trí 10 pixels từ đỉnh của bản đồ
    width: "90%", // Đặt chiều rộng của InputComponent là 90% chiều rộng của bản đồ
  },
});
