import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles/Colors";
import Box from "../../components/Box";
import LogoBeeBox from "../../components/LogoBeeBox";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { ic_coin, ic_gift, ic_premium } from "../../assets";
import { FormatMoney } from "../../Utils";
import StepsBar from "../../components/StepsBar";
import LinearGradient from "react-native-linear-gradient";

const Welfare = () => {
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
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                }}
              >
                Thưởng tháng
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.MAIN_BLUE_CLIENT,
                  }}
                >
                  Mức tiếp theo{" "}
                </Text>
                <Image source={ic_coin} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    color: colors.MAIN_COLOR_CLIENT,
                    marginLeft: 10,
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  {FormatMoney(400000)} đ
                </Text>
              </View>
            </View>
            <Box height={10} />
            {/* <View>
              <Text>Vàng</Text>
            </View> */}
            <StepsBar rating={1} fontSize={[24, 24]} />
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: colors.MAIN_BLUE_CLIENT,
              }}
            >
              Cần thêm {59} giờ trong tuần này để đạt mức được thưởng tiếp theo
              trong tháng này
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
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
                Nhận vô vàn quà tặng khi tích điểm và đổi quà cùng Ong Vàng !
              </Text>
            </View>
            <View
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
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                }}
              >
                Premium
              </Text>
              <Image
                source={ic_premium}
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
                Hãy cùng phấn đấu để trở thành cộng tác viên cao cấp !
              </Text>
            </View>
          </View>
        </View>
        <Box height={100} />
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
});
