import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../styles/Colors";
import Box from "../../components/Box";
import LogoBeeBox from "../../components/LogoBeeBox";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { ic_gift, ic_group } from "../../assets";
import { FormatMoney, GroupUserId } from "../../Utils";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import RankProgress from "../../components/RankProgress";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../Constants";

const Welfare = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const navi = useNavigation();
  const dispatch = useDispatch();
  const [benefitValue, setBenefitValue] = useState({});

  useEffect(() => {
    OVG_spCustomer_Total_Point();
  }, []);

  const OVG_spCustomer_Total_Point = async () => {
    try {
      const pr = {
        CustomerId: userLogin?.Id,
        GroupUserId: GroupUserId
      }
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Total_Point",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (benefitValue) {
        if (benefitValue?.TotalPoint !== result[0]?.TotalPoint) {
          setBenefitValue(result[0]);
        }
      } else {
        setBenefitValue(result[0]);
      }
    } catch (error) { }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Box height={Platform.OS === "android" ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.07} />
      <LogoBeeBox color={colors.MAIN_COLOR_CLIENT} sizeImage={SCREEN_WIDTH * 0.15} sizeText={18} />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 8,
              padding: 10,
              marginVertical: 10,
            }}
          >
            <View style={MainStyles.flexRowFlexStart}>
              <View style={[{ width: SCREEN_WIDTH * 0.49 }]}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Text style={[styles.text1]}>Điểm tích lũy: </Text>
                  <Text style={[styles.text2]}>{FormatMoney(benefitValue?.TotalPoint)} Điểm</Text>
                </View>
              </View>
            </View>
            <View style={MainStyles.flexRowFlexStart}>
              <View style={[{ width: SCREEN_WIDTH * 0.49 }]}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Text style={[styles.text1]}>Hạng: </Text>
                  <Text style={[styles.text2]}>{benefitValue?.CustomerRank || "Chưa xếp hạng"}</Text>
                </View>
              </View>
            </View>
          </View>
          <RankProgress points={benefitValue?.TotalPoint} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginRight: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                }}
              >
                Quà tặng
              </Text>
              <Image
                source={ic_gift}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Nhận vô vàn quà tặng khi tích điểm trên ứng dụng và đổi quà cùng Ong Vàng !
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginLeft: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => {
                navi.navigate(ScreenNames.CONTRIBUTIONS_DETAIL);
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Trở thành đối tác
              </Text>
              <Image
                source={ic_group}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Cơ hội hợp tác và quảng bá thương hiệu của bạn trên ứng dụng Ong Vàng ngay hôm nay !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
    </View>
  );
};

export default Welfare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text1: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.MAIN_BLUE_CLIENT,
  },
  text2: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.MAIN_COLOR_CLIENT,
  }
});
