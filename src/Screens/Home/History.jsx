import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import BookingCard from "../../components/BookingCard";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import LogoBeeBox from "../../components/LogoBeeBox";
import Box from "../../components/Box";
import { dataBooing } from "../data";
import TopTabs from "../../components/TopTabs";
import { Layout } from "@ui-kitten/components";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const History = () => {
  const tabs = [
    {
      title: "Đang diễn ra",
      content: () => <Text category="h5">ORDERS CONTENT</Text>,
    },
    {
      title: "Hoàn thành",
      content: () => <Text category="h5">ORDERS CONTENT</Text>,
    },
  ];
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
      <Layout>
        <TopTabs tabs={tabs} />
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    paddingVertical: SCREEN_HEIGHT * 0.01,
  },
  btnTab: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    marginHorizontal: SCREEN_WIDTH * 0.005,
  },
  btnTabActive: {
    backgroundColor: colors.MAIN_COLOR_CLIENT,
  },
  tabText: {
    color: colors.MAIN_COLOR_CLIENT,
    fontSize: SCREEN_WIDTH * 0.04,
  },
  tabTextActive: {
    color: colors.WHITE,
  },
  tabContent: {
    padding: 10,
  },
  tabContentText: {
    fontSize: SCREEN_WIDTH * 0.05,
    color: colors.MAIN_COLOR_CLIENT,
  },
  scrollView: {
    flex: 1,
  },
});

export default History;
