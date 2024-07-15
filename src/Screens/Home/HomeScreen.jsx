import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { colors } from "../../styles/Colors";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box";
import MainStyles, {
  SCREEN_HEIGHT,
} from "../../styles/MainStyle";
import UserHeader from "../../components/UserHeader";
import ServiceCarousel from "../../components/ServiceCarousel";
import { MenuScroll } from "./Menu/MenuScroll";
import MyOrders from "../../components/firebaseListen/MyOrders";
import BtnDouble from "../../components/BtnDouble";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { ScreenNames } from "../../Constants";
import { mainAction } from "../../Redux/Action";
import LayoutBottom from "../../components/layouts/LayoutBottom";

const HomeScreen = () => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  const dispatch = useDispatch();
  const [dataCarousel, setDataCarousel] = React.useState([]);
  const [dataNewService, setDataNewService] = React.useState([]);

  useEffect(() => {
    Shop_spWeb_Slides_List();
    Shop_spWeb_News_List();
  }, []);

  const Shop_spWeb_Slides_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_Slides_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataCarousel(result);
      }
    } catch {
      //
    }
  };

  const Shop_spWeb_News_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_News_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataNewService(result);
        // setDataCarousel(result);
      }
    } catch {
      //
    }
  };

  // console.log("dataNewService", dataNewService);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <UserHeader totalService={acceptedOrder} />
      <ScrollView>
        <View
          style={{
            borderRadius: 10,
            padding: 10,
          }}
        >
          <CarouselItem dataCarousel={dataCarousel} />
        </View>
        {/* <MenuComponent /> */}
        <MenuScroll />
        {/* <ServiceCarousel /> */}
        <ServiceCarousel dataNewService={dataNewService} />
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      {
        userLogin ? (
          <>
            <MyOrders />
          </>
        ) : (
          <LayoutBottom>
            <View style={{ backgroundColor: colors.WHITE }}>
              <BtnDouble
                title1={"Đăng nhập"}
                title2={"Đăng ký"}
                onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
                onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
              />
              <View style={MainStyles.flexRowCenter}>
                <Text style={[styles.title, { marginBottom: 10, width: SCREEN_WIDTH * 0.7, textAlign: 'center' }]}>Bạn cần đăng nhập để sử dụng dịch vụ của Ong Vàng</Text>
              </View>
            </View>
          </LayoutBottom>
        )
      }
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
