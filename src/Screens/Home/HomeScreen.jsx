import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../styles/Colors";
import LogoBeeBox from "../../components/LogoBeeBox";
import { Card } from "@ui-kitten/components";
import { responsivescreen } from "../../Utils";
import { MenuPickup } from "./Menu";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import ProductMust from "./Menu/ProductMust";
import InputSearch from "../../components/InputSeach";

const HomeScreen = () => {
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
        <ScrollView style={{ height: responsivescreen.height("55%") }}>
          <Card
            style={{
              backgroundColor: colors.TEXT_WHITE_CLIENT,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 10,
              alignSelf: "center",
              width: responsivescreen.width("90%"),
            }}
          >
            <MenuPickup />
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
