import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles/Colors";
import { ScreenNames, StorageNames } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import { FormatMoney, removeData } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import MainStyles from "../../styles/MainStyle";
import { ic_coin, ic_premium, logo_bee_blue } from "../../assets";
import Rating from "../../components/Rating";
import Box from "../../components/Box";
import BtnToggle from "../../components/BtnToggle";
import LinearGradient from "react-native-linear-gradient";
import ButtonResize from "../../components/buttons/ButtonResize";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogout(dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) {}
  };
  return (
    <View>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Text style={MainStyles.screenTitle}>Thông tin tài khoản</Text>
      <ScrollView>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Thông tin</Text>
          <View style={MainStyles.flexRowCenter}>
            <Image
              source={logo_bee_blue}
              style={{
                width: 80,
                height: 120,
                resizeMode: "contain",
                marginRight: 10,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 40 }}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  fontSize: 15,
                  width: 120,
                }}
              >
                Họ tên :
              </Text>
              <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                {userLogin?.CustomerName}
              </Text>
            </View>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  fontSize: 15,
                  width: 120,
                }}
              >
                SĐT :
              </Text>
              <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                {userLogin?.Phone}
              </Text>
            </View>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  fontSize: 15,
                  width: 120,
                }}
              >
                Mã khách hàng :
              </Text>
              <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                {userLogin?.Id || "0123456789"}
              </Text>
            </View>
          </View>
          <Box height={10} />
          <View
            style={[
              MainStyles.flexRowCenter,
              {
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                borderRadius: 10,
                padding: 5,
              },
            ]}
          >
            <Text style={{ color: colors.WHITE, fontSize: 17, marginRight: 5 }}>
              Cộng tác viên cao cấp
            </Text>
            <Rating rating={5} fontSize={[17, 17]} />
          </View>
          <Box height={10} />
          <Text style={MainStyles.labelTitle}>Tài chính</Text>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: colors.MAIN_BLUE_CLIENT,
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Tài khoản chính
            </Text>
            <View style={MainStyles.flexRowCenter}>
              <Image source={ic_coin} style={{ width: 27, height: 27 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {FormatMoney(400000)} đ
              </Text>
            </View>
          </View>
          <ButtonResize
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
          >
            Nạp thêm tiền
          </ButtonResize>
          <Box height={10} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Hành trình</Text>
            <Text style={[MainStyles.labelTitle, { color: colors.RED }]}>
              Cấp {userLogin?.level || 5}
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
              Điểm ưu đãi
            </Text>
            <Image
              source={ic_premium}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
              }}
            />
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
              {FormatMoney(userLogin?.point || 7)} point
            </Text>
          </View>
          <Box height={10} />
          <Text style={[MainStyles.labelTitle]}>Báo cáo tuần</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}
            >
              Thu nhập tuần này :
            </Text>
            <Text
              style={[
                MainStyles.labelTitle,
                { marginRight: 10, color: colors.MAIN_COLOR_CLIENT },
              ]}
            >
              {FormatMoney(2000000)} đ
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}
            >
              Công việc tuần này :
            </Text>
            <Text
              style={[
                MainStyles.labelTitle,
                { marginRight: 10, color: colors.MAIN_BLUE_CLIENT },
              ]}
            >
              {10} task đã hoàn thành
            </Text>
          </View>
          <Box height={10} />
          <Text style={[MainStyles.labelTitle]}>Hỗ trợ</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}
            >
              Thứ 2 đến thứ 7 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              Chủ nhật
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}
            >
              08:00 - 12:00 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              09:00 - 12:00
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}
            >
              08:00 - 12:00 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              09:00 - 12:00
            </Text>
          </View>

          <ButtonResize
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
          >
            Gọi tổng đài
          </ButtonResize>
        </View>
        <ButtonResize
          onPress={handleLogout}
          textColor={colors.RED}
          bgColor={colors.WHITE}
          paddingVertical={5}
        >
          Đăng xuất
        </ButtonResize>
        <Box height={10} />
        <ButtonResize
          onPress={handleLogout}
          textColor={colors.BLACK}
          bgColor={colors.GRAY}
          paddingVertical={5}
        >
          Xóa tài khoản
        </ButtonResize>
      </ScrollView>
      <Box height={40} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
