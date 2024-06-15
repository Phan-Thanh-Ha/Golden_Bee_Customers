import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../styles/Colors";
import LogoBeeBox from "../../components/LogoBeeBox";
import { Card } from "@ui-kitten/components";
import { GetUserProfile, responsivescreen, units } from "../../Utils";
import { MenuPickup } from "./Menu";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import ProductMust from "./Menu/ProductMust";
import InputSearch from "../../components/InputSeach";
import { useNavigation } from "@react-navigation/native";
import { mainAction } from "../../Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { ScreenNames } from "../../Constants";
import Geolocation from "@react-native-community/geolocation";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navi = useNavigation();
  const menuData = useSelector((state) => state.main.menuService);

  // Lấy vị trí của khách hàng
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position.coords) {
          OVG_spCustomer_Location_Update(
            position?.coords?.latitude,
            position?.coords?.longitude
          );
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  // Hàm cập nhật vị trí của khách hàng
  const OVG_spCustomer_Location_Update = async (latitude, longitude) => {
    const userLogin = await GetUserProfile();
    try {
      const pr = {
        CustomerId: userLogin.Id,
        Lat: latitude,
        Lng: longitude,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Location_Update",
        API_key: "netcoAPIkey2020",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        dispatch({
          type: mainTypes.LOCATION_TIME,
          payload: result.Result,
        });
        // setDataMenu("LOCATION_TIME", result.Result);
      }
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View>
        <View
          style={{
            margin: 15,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <LogoBeeBox />
        </View>
        <InputSearch
          style={{
            marginHorizontal: 25,
            marginVertical: 15,
          }}
        />

        <ScrollView style={{ height: units.height("55%") }}>
          <Card
            style={{
              backgroundColor: colors.TEXT_WHITE_CLIENT,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 10,
              borderWidth: 0,
              alignSelf: "center",
              width: units.width("90%"),
            }}
          >
            <MenuPickup
              data={menuData}
              onPress={(item) => {
                navi.navigate(ScreenNames.ADDRESS_SEARCH, { service: item });
              }}
            />
          </Card>
          <View style={{ marginVertical: 20 }}>
            <CarouselItem />
          </View>
          <View>
            <ProductMust />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
