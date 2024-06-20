import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import MainStyles from "../../styles/MainStyle";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import { ic_coin, ic_location } from "../../assets";
import Box from "../../components/Box";
import { FormatMoney, GroupUserId, TitleSlice, setData } from "../../Utils";
import Button from "../../components/buttons/Button";
import { useState } from "react";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { ScreenNames, StorageNames } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import ArrowRight from "../../components/svg/ArrowRight";
import { placeOrder } from "../../firebaseService/HandleOrder";
import { AlertToaster } from "../../Utils/AlertToaster";

const ConfirmBooking = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const { dataConfirmService } = route.params || {};
  console.log(
    "-----> 💀💀💀💀💀💀💀💀💀 <-----  dataConfirmService:",
    dataConfirmService
  );
  const navi = useNavigation();
  const [payment, setPayment] = useState(false);

  // Lưu booking
  const OVG_spService_BookingService = async () => {
    try {
      const pr = {
        CustomerId: dataConfirmService?.CustomerId, // Id KH
        CustomerName: userLogin?.CustomerName, // Tên KH
        Lat: dataConfirmService?.Latitude, // Lat
        Lng: dataConfirmService?.Longitude, // Lng
        ServiceId: dataConfirmService?.ServiceId, // Id dịch vụ
        ServiceName: dataConfirmService?.ServiceName, // Tên dịch vụ
        TotalMoney: dataConfirmService?.TotalPrice, // Tổng tiền
        Payment: payment ? 1 : 0, // 1: chuyển khoản, 0: tiền mặt
        StaffTotal: dataConfirmService?.people, // Số nhân sự
        RoomTotal: dataConfirmService?.room, // Số phòng
        Premium: dataConfirmService?.premium ? 1 : 0, // 1: premium, 0: normal
        TimeService: dataConfirmService?.workingTime, // Thời gian làm việc
        ServiceCode: dataConfirmService?.ServiceCode, // Mã dịch vụ
        Note: dataConfirmService?.note, // Ghi chú
        ListServiceAdditional: dataConfirmService.otherService,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spService_BookingService",
      };
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  params:", params);
      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
      if (result.Status === "OK") {
        if (result?.BookingId) {
          await handleNext(result.BookingId, result.BookingCode);
        }
      }
    } catch (error) {
      // console.log("error", error);
      setLoading(false);
    }
  };

  // Lưu bookingService lên firebase
  const handleNext = async (BookingId, BookingCode) => {
    setLoading(true);
    // lưu dữ liệu booking
    const dataBooking = {
      CustomerName: userLogin?.CustomerName, // Tên KH
      CustomerPhone: userLogin?.Phone, // SĐT KH
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
      Latitude: dataConfirmService.Latitude,
      Longitude: dataConfirmService.Longitude,
      Payment: payment,
    };

    // Lưu đơn đặt lên firebase
    const saveOnFirebase = await placeOrder(
      userLogin.Id, // ClientId
      BookingId + "", // BookingId
      dataBooking, // DataService
      dataConfirmService.Latitude, // Lat KH
      dataConfirmService.Longitude, //Lng KH
      BookingCode
    );
    if (saveOnFirebase !== null) {
      setData(StorageNames.ORDER_SERVICE, saveOnFirebase);
      navi.navigate(ScreenNames.WAITING_STAFF, {
        dataBooking,
      });
      setLoading(false);
    } else {
      AlertToaster("error", "Hệ thống đang lỗi !", "Vui lòng thử lại sau !");
      setLoading(false);
    }
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
        <Button
          onPress={OVG_spService_BookingService}
          isLoading={loading}
          disable={loading}
          bgColor={colors.PRIMARY_GREEN}
          icon={() => <ArrowRight color={colors.WHITE} />}
        >
          <Text>Đặt đơn</Text>
        </Button>
      </LayoutBottom>
    </View>
  );
};

export default ConfirmBooking;
