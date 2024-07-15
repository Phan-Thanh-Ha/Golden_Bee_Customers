import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
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
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { cirtificate, ic_coin, ic_premium, logo_bee_blue } from "../../assets";
import Box from "../../components/Box";
import LinearGradient from "react-native-linear-gradient";
import Button from "../../components/buttons/Button";
import ModalConfirm from "../../components/ModalConfirm";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(userLogin);

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      await removeData(StorageNames.SERVICE_CONFIRM);
      mainAction.userLogin(null, dispatch);
      navi.reset({
        routes: [{ name: ScreenNames.ABOUT }],
      });
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
  const user = {
    level: 1,
    point: 2000,
  };
  return (
    <View>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Text style={MainStyles.screenTitle}>Thông tin tài khoản</Text>
      <ScrollView>

        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Thông tin</Text>
          <View style={[MainStyles.flexRowFlexStart, { paddingHorizontal: 20, alignItems: "center" }]}>
            <Image
              source={logo_bee_blue}
              style={{
                width: 80,
                height: 120,
                resizeMode: "contain",
                marginRight: 40,
              }}
            />
            <View>
              <View style={MainStyles.flexRow}>
                <Text
                  style={[MainStyles.labelTitle, { width: SCREEN_WIDTH * 0.4 }]}
                >
                  Mã khách hàng : {userLogin?.Id}
                </Text>
              </View>
              <View style={MainStyles.flexRow}>
                <Text
                  style={[MainStyles.labelTitle, { width: SCREEN_WIDTH * 0.4 }]}
                >
                  Họ tên : {userLogin?.CustomerName}
                </Text>
              </View>
              <View style={MainStyles.flexRow}>
                <Text
                  style={[MainStyles.labelTitle, { width: SCREEN_WIDTH * 0.4 }]}
                >
                  SĐT :  {userLogin?.Phone}
                </Text>
              </View>
            </View>
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Box height={SCREEN_HEIGHT * 0.02} />
        </View>
        <View style={MainStyles.contentContainer}>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
              Điểm ưu đãi
            </Text>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={cirtificate}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
                {FormatMoney(user.point)} point
              </Text>
            </View>
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Hành trình</Text>
            <Text style={[MainStyles.labelTitle, { color: colors.RED }]}>
              Cấp {user.level}
            </Text>
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
        </View>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Liên hệ tổng đài</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text
              style={{
                marginRight: 10,
                paddingLeft: 10,
                fontSize: 15,
                color: colors.MAIN_BLUE_CLIENT,
                marginVertical: 10,
              }}>
              Liên hệ tổng đài để dược hỗ trợ các thắc mắc liên quan trong quá trình hoạt động và sử dụng ứng dụng.
            </Text>
          </View>
          <Button
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={() => {
              Linking.openURL(`tel:${'0922277782'}`);
            }}>
            Gọi tổng đài
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button
            onPress={handleLogout}
            textColor={colors.WHITE}
            bgColor={colors.MAIN_BLUE_CLIENT}
            paddingVertical={5}>
            Đăng xuất
          </Button>
        </View>
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => setIsModalVisible(true)}
            textColor={colors.WHITE}
            bgColor={'#F44336'}
            paddingVertical={5}>
            Xóa tài khoản
          </Button>
        </View>
        <Box height={SCREEN_HEIGHT * 0.2} />
      </ScrollView>
      <ModalConfirm
        title={"Bạn  có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
        backdropClose={true}
      />
      <Box height={SCREEN_HEIGHT * 0.1} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
