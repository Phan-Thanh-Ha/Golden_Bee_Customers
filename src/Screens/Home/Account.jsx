import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../styles/Colors";
import { ScreenNames, StorageNames } from "../../Constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FormatMoney,
  GetUserProfile,
  GroupUserId,
  removeData,
} from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import { ic_coin, ic_premium, logo_bee_blue } from "../../assets";
import Rating from "../../components/Rating";
import Box from "../../components/Box";
import BtnToggle from "../../components/BtnToggle";
import LinearGradient from "react-native-linear-gradient";
import ButtonResize from "../../components/buttons/ButtonResize";
import Button from "../../components/buttons/Button";
import ModalConfirm from "../../components/ModalConfirm";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogin(null, dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) { }
  };
  const handleClearAccount = async () => {
    await removeData(StorageNames.USER_PROFILE);
    mainAction.userLogin(null, dispatch);
    navi.navigate(ScreenNames.AUTH_HOME);
  }
  useFocusEffect(
    React.useCallback(() => {
      OVG_spCustomer_Booking_Total_Point();
    }, [])
  );
  const [totalPoint, setTotalPoint] = useState(0);
  const OVG_spCustomer_Booking_Total_Point = async () => {
    const userLogin = await GetUserProfile();
    try {
      const pr = {
        CustomerId: userLogin.Id,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Booking_Total_Point",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setTotalPoint(result);
      }
    } catch (error) {
      console.log(error);
    }
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
                {FormatMoney(0)} đ
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
              {FormatMoney(totalPoint[0]?.TotalPoint || 0)} point
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
        <View style={{ marginHorizontal: 10 }}>
          <ButtonResize
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={handleLogout}
            textColor={colors.WHITE}
            bgColor={colors.MAIN_BLUE_CLIENT}
          >
            Đăng xuất
          </ButtonResize>
        </View>
        <View style={{ margin: 10 }}>
          <ButtonResize
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={() => setIsModalVisible(true)}
            textColor={colors.WHITE}
            bgColor={'#F44336'}
          >
            Xóa tài khoản
          </ButtonResize>
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <ModalConfirm
        title={"Bạn đnag muốn xóa tài khoản này ! bạn có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
      />
      <Box height={SCREEN_HEIGHT * 0.1} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
