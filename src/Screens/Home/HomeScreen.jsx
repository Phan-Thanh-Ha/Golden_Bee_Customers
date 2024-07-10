import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { colors } from "../../styles/Colors";
import { CarouselItem } from "../../components/ImageSliderBox";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import UserHeader from "../../components/UserHeader";
import ServiceCarousel from "../../components/ServiceCarousel";
import { MenuScroll } from "./Menu/MenuScroll";
import MyOrders from "../../components/firebaseListen/MyOrders";
import BtnDouble from "../../components/BtnDouble";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { ScreenNames } from "../../Constants";
import { mainAction } from "../../Redux/Action";

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
            margin: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <CarouselItem dataCarousel={dataCarousel} />
        </View>
        {/* <MenuComponent /> */}
        <MenuScroll />
        <ServiceCarousel dataNewService={dataNewService} />
        {userLogin ? (
          <>
            <MyOrders />
            <Box height={SCREEN_HEIGHT * 0.1} />
          </>
        ) : (
          <View style={styles.container}>
            <BtnDouble
              title1={"Đăng nhập"}
              title2={"Đăng ký"}
              onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
              onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
            />
            <View style={MainStyles.flexRowCenter}>
              <Text
                style={[
                  styles.title,
                  {
                    marginBottom: 10,
                    width: SCREEN_WIDTH * 0.7,
                    textAlign: "center",
                  },
                ]}
              >
                Bạn cần đăng nhập để sử dụng dịch vụ của Ong Vàng
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {/* {
        (userLogin && (acceptedOrder > 0)) ? (
          <TouchableOpacity
            onPress={() => navi.navigate(ScreenNames.HISTORY)}
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              width: SCREEN_WIDTH - 20,
              alignSelf: "center",
              height: SCREEN_HEIGHT * 0.05,
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "700",
                color: colors.MAIN_BLUE_CLIENT,
              }}
            >🔔   Bạn đang đặt {acceptedOrder} dịch vụ   🔔</Text>
          </TouchableOpacity>
        ) : null
      } */}
      {/* <ScrollView style={{ height: units.height("50%") }}>
        <TouchableOpacity
          style={[
            MainStyles.flexRowFlexStart,
            { paddingHorizontal: 20, paddingVertical: 10 },
          ]}
        >
          <Label>Có thể bạn sẽ thích</Label>
        </TouchableOpacity>
        <View>
          <ProductMust />
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView> */}
      {/* {
        userLogin ? (
          <MyOrders />
        ) : (
          <LayoutBottom>
            <BtnDouble
              title1={"Đăng nhập"}
              title2={"Đăng ký"}
              onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
              onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
            />
          </LayoutBottom>
        )
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    marginTop: 40,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
