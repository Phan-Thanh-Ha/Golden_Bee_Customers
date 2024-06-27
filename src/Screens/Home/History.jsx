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
import { LayoutComponent } from "../../components/history";
import { Layout, Tab, TabBar } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import { GetUserProfile, GroupUserId } from "../../Utils";
import { mainAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";

// const bookingData = useSelector((state) => state.bookingData);

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const History = () => {
  const dispatch = useDispatch();
  const [dataDoing, setDataDoing] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      OVG_spBooking_Service_List();
    }, [])
  );
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
        console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
        setDataDoing(result);
        // mainAction.serviceList(result, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UsersScreen = () => (
    <Layout style={{ backgroundColor: "red" }}>
      <LayoutComponent data={dataDoing} />
    </Layout>
  );

  const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">ORDERS</Text>
    </Layout>
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderCurrentScreen = () => {
    switch (selectedIndex) {
      case 0:
        return <UsersScreen />;
      case 1:
        return <OrdersScreen />;
      default:
        return null;
    }
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
        sizeImage={SCREEN_WIDTH / 10}
        sizeText={20}
      />
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="Đang thực hiện" />
        <Tab title="Đã hoàn thành" />
      </TabBar>
      {renderCurrentScreen()}
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
