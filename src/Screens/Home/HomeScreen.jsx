import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../../styles/Colors";
import LogoBeeBox from "../../components/LogoBeeBox";
import { Card, Text } from "@ui-kitten/components";
import { GetUserProfile, GroupUserId, units } from "../../Utils";
import { MenuPickup } from "./Menu";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import ProductMust from "./Menu/ProductMust";
import InputSearch from "../../components/InputSeach";
import { useNavigation } from "@react-navigation/native";
import { mainAction, mainTypes } from "../../Redux/Action";
import { useDispatch } from "react-redux";
import { ScreenNames } from "../../Constants";
import Geolocation from "@react-native-community/geolocation";
import Box from "../../components/Box";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import Label from "../../components/Label";
import ArrowRight from "../../components/svg/ArrowRight";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navi = useNavigation();

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

  const OVG_spBooking_Service_List = async () => {
    const userLogin = await GetUserProfile();
    try {
      const pr = {
        CustomerId: userLogin.Id,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spBooking_Service_List",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        // mainAction.serviceList(result, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const OVG_spCustomer_Location_Update = async (
    latitude,
    longitude,
    CustomerId
  ) => {
    try {
      const pr = {
        CustomerId: 582,
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
        if (result.Status === "OK") {
          dispatch({
            type: mainTypes.LOCATION_TIME,
            payload: result.Result,
          });
        }
      }
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Box height={SCREEN_HEIGHT * 0.01} />
      <LogoBeeBox
        color={colors.WHITE}
        sizeImage={SCREEN_WIDTH / 5}
        sizeText={20}
      />
      <InputSearch
        style={{
          marginHorizontal: 25,
          marginVertical: 15,
        }}
      />
      <Card
        style={{
          width: SCREEN_WIDTH - 20,
          alignSelf: "center",
          height: SCREEN_HEIGHT / 15,
        }}
      >
        <Text>Bạn đang có 1 booking đang thực hiện</Text>
      </Card>
      <ScrollView style={{ height: units.height("50%") }}>
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
            width: units.width("95%"),
          }}
        >
          <MenuPickup
            onPress={(item) => {
              navi.navigate(ScreenNames.ADDRESS_SEARCH, { service: item });
            }}
          />
        </Card>
        <View style={{ marginTop: 10, borderRadius: 10 }}>
          <CarouselItem />
        </View>
        <TouchableOpacity
          style={[
            MainStyles.flexRowFlexStart,
            { paddingHorizontal: 20, paddingVertical: 10 },
          ]}
        >
          <Label>Có thể bạn sẽ thích</Label>
          <ArrowRight size={20} />
        </TouchableOpacity>
        <View>
          <ProductMust />
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
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
