import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import MainStyles from "../../styles/MainStyle";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import Label from "../../components/Label";
import { dataConfrirm } from "../data";
import { ic_coin, ic_location } from "../../assets";
import Box from "../../components/Box";
import { FormatMoney, TitleSlice } from "../../Utils";
import Button from "../../components/buttons/Button";
import { useState } from "react";
import { UseInset } from "../../Hooks";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import BtnPrimary from "../../components/buttons/BtnPrimary";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { ScreenNames } from "../../Constants";

const ConfirmBooking = () => {
  const route = useRoute();
  const { dataConfirmService } = route.params || {};
  const navi = useNavigation();
  const [payment, setPayment] = useState(false);
  console.log("payment in confirm booking", payment);
  const inset = UseInset();
  const handleNext = () => {
    navi.navigate(ScreenNames.WAITING_STAFF, {
      dataBooking: {
        ServiceDetaiil: dataConfirmService.Detail,
        ServiceId: dataConfirmService.ServiceId,
        ServiceCode: dataConfirmService.ServiceCode,
        CustomerId: dataConfirmService.CustomerId,
        Address: dataConfirmService.Address,
        ServiceName: dataConfirmService.ServiceName,
        ServiceOption: dataConfirmService.ServiceOption,
        ServicePrice: dataConfirmService.ServicePrice,
        ServiceTime: dataConfirmService.ServiceTime,
        TotalPrice: dataConfirmService.TotalPrice,
        NoteBooking: dataConfirmService.note,
        OtherService: dataConfirmService.otherService,
        TotalStaff: dataConfirmService.people,
        IsPremium: dataConfirmService.premium,
        TotalRoom: dataConfirmService.room,
        TimeWorking: dataConfirmService.workingTime,
        Payment: payment,
      },
    });
  };
  return (
    <View style={MainStyles.containerClient}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Xác nhận dịch vụ</Text>
      <ScrollView>
        <View style={MainStyles.contentContainerClient}>
          <Text style={MainStyles.cardLabelConfirm}>Vị trí làm việc</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_location} style={{ width: 20, height: 20 }} />
              <View>
                <Text style={MainStyles.cardTitleConfirm}>
                  {dataConfirmService?.Address}
                </Text>
              </View>
            </View>
          </View>
          <Text style={MainStyles.cardLabelConfirm}>Thông tin công việc</Text>

          <View style={MainStyles.cardConfirmContainer}>
            <Text style={MainStyles.cardSubLabelConfirm}>Dịch vụ</Text>

            <View style={MainStyles.flexRowSpaceBetween}>
              <Text style={MainStyles.cardTitleConfirm}>Tên dịch vụ</Text>
              <Text style={MainStyles.cardTitleConfirm}>
                {dataConfirmService?.ServiceName}
              </Text>
            </View>
            {dataConfirmService?.serviceOption?.OptionName !== null ? (
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Loại</Text>
                <Text style={MainStyles.cardTitleConfirm}>
                  {dataConfirmService?.serviceOption?.OptionName}
                </Text>
              </View>
            ) : null}
            <Text style={MainStyles.cardSubLabelConfirm}>
              Thời gian làm việc
            </Text>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text style={MainStyles.cardTitleConfirm}>Ngày làm việc</Text>
              <Text style={MainStyles.cardTitleConfirm}>Ngay bây giờ</Text>
            </View>
            <View style={MainStyles.flexRowFlexStart}>
              <Text style={MainStyles.cardTitleConfirm}>Làm trong : </Text>
              <Text style={MainStyles.cardTitleConfirm}>
                {RoundUpNumber(dataConfirmService?.workingTime, 0)} giờ
              </Text>
            </View>
            <Box height={10} />
            <Text style={MainStyles.cardSubLabelConfirm}>
              Chi tiết công việc
            </Text>
            <View style={MainStyles.flexRowSpaceBetween}>
              {dataConfirmService?.room && (
                <>
                  <Text style={MainStyles.cardTitleConfirm}>
                    Khối lượng công việc
                  </Text>
                  <Text style={MainStyles.cardTitleConfirm}>
                    {dataConfirmService?.room} phòng/
                    {dataConfirmService?.people} nhân sự
                  </Text>
                </>
              )}
            </View>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text style={MainStyles.cardTitleConfirm}>Loại dịch vụ</Text>
              <Text style={MainStyles.cardTitleConfirm}>
                {dataConfirmService?.premium
                  ? "Dịch vụ Premium"
                  : "Dịch vụ thường"}
              </Text>
            </View>
          </View>
          <Text style={MainStyles.cardLabelConfirm}>Tổng tiền</Text>
          <View
            style={[MainStyles.cardConfirmContainer, MainStyles.flexRowCenter]}
          >
            <Image source={ic_coin} style={{ width: 20, height: 20 }} />
            <Text
              style={{
                color: colors.MAIN_COLOR_CLIENT,
                marginLeft: 10,
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              {FormatMoney(dataConfirmService?.TotalPrice)} vnđ
            </Text>
          </View>
          <Text style={MainStyles.cardLabelConfirm}>
            Phương thức thanh tóan
          </Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Button
                bgColor={payment ? colors.WHITE : false}
                textColor={payment ? colors.MAIN_BLUE_CLIENT : colors.WHITE}
                onPress={() => setPayment(false)}
              >
                Tiền mặt
              </Button>
              <Button
                bgColor={payment ? false : colors.WHITE}
                textColor={payment ? colors.WHITE : colors.MAIN_BLUE_CLIENT}
                onPress={() => setPayment(true)}
              >
                Chuyển khoản
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <LayoutBottom>
        <View
          style={[MainStyles.flexRowSpaceBetween, { paddingHorizontal: 20 }]}
        >
          <Text style={MainStyles.txtTotalPrice}>Tổng cộng</Text>
          <Text style={MainStyles.txtTotalPrice}>
            {FormatMoney(dataConfirmService?.TotalPrice)} VNĐ
          </Text>
        </View>
        <BtnPrimary onPress={handleNext}>
          <Text>Đặt đơn</Text>
        </BtnPrimary>
      </LayoutBottom>
    </View>
  );
};

export default ConfirmBooking;
