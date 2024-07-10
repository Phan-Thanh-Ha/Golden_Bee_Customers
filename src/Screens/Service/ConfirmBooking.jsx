import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import { ic_coin, ic_location } from "../../assets";
import Box from "../../components/Box";
import { FormatMoney, GroupUserId, removeData, setData } from "../../Utils";
import Button from "../../components/buttons/Button";
import React, { useCallback, useEffect, useState } from "react";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { ScreenNames, StorageNames } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import ArrowRight from "../../components/svg/ArrowRight";
import { placeOrder } from "../../firebaseService/HandleOrder";
import { AlertToaster } from "../../Utils/AlertToaster";
import VoucherComponent from "../../components/VoucherComponent";
import { calculateDiscount } from "../../Utils/calculateDiscount";
import Modal from "react-native-modal";
import Loading from "../../components/Loading";
import ModalRequired from "../../components/modal/ModalRequired";

const ConfirmBooking = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const { dataConfirmService } = route.params || {};
  const navi = useNavigation();
  const [payment, setPayment] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(
    dataConfirmService?.TotalPrice
  );
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAlertVisible, setIsModalAlertVisible] = useState(false);
  const [countdown, setCountdown] = useState(6);

  const handleBooking = () => {
    setIsModalVisible(false);
    OVG_spService_BookingService_Save();
    resetModalState();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetModalState();
  };

  const showConfirmModal = () => {
    if (userLogin) {
      setIsModalVisible(true);
    } else {
      if (dataConfirmService) {
        setIsModalAlertVisible(true);
      }
    }
  };

  const resetModalState = () => {
    setCountdown(6);
    setSelectedVouchers([]);
  };
  const removeStorage = async () => {
    await removeData(StorageNames.SERVICE_CONFIRM);
  };
  //vouvher
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const limit = 100;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = async () => {
        await removeStorage();
        navi.goBack();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navi])
  );
  useFocusEffect(
    useCallback(() => {
      OVG_spVoucher_List();
    }, [])
  );
  useEffect(() => {
    if (isModalVisible) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleBooking();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isModalVisible]);
  useEffect(() => {
    setPriceAfterDiscount(
      calculateDiscount(selectedVouchers, dataConfirmService?.TotalPrice)
        .finalAmount
    );
    setTotalDiscount(dataConfirmService?.TotalPrice - priceAfterDiscount);
  }, [selectedVouchers, priceAfterDiscount]);

  // Lưu booking
  const OVG_spService_BookingService_Save = async () => {
    setLoading(true);
    try {
      const pr = {
        CustomerId: userLogin?.Id, // Id KH
        CustomerName: userLogin?.CustomerName, // Tên KH
        Lat: dataConfirmService?.Latitude, // Lat
        Lng: dataConfirmService?.Longitude, // Lng
        ServiceId: dataConfirmService?.ServiceId, // Id dịch vụ
        ServiceName: dataConfirmService?.ServiceName, // Tên dịch vụ
        TotalMoney: dataConfirmService?.TotalPrice, // Tổng tiền
        Payment: payment ? 1 : 0, // 1: chuyển khoản, 0: tiền mặt
        StaffTotal: dataConfirmService?.people, // Số nhân sự
        RoomTotal: dataConfirmService?.room || 0, // Số phòng
        Premium: dataConfirmService?.premium ? 1 : 0, // 1: premium, 0: normal
        TimeService: RoundUpNumber(dataConfirmService?.workingTime, 0), // Thời gian làm việc
        ServiceCode: dataConfirmService?.ServiceCode, // Mã dịch vụ
        Note: dataConfirmService?.note, // Ghi chú
        ListServiceAdditional: dataConfirmService.otherService,
        AddressService: dataConfirmService?.Address, // Địa chỉ,
        SelectOption: dataConfirmService?.serviceOption
          ? dataConfirmService?.serviceOption
          : {}, // Loại dịch vụ
        // SelectOption: {},// Loại dịch vụ
        UsedVoucher: selectedVouchers.length > 0 ? 1 : 0, // có sử dụng voucher
        Voucher: selectedVouchers, // danh sách voucher áp mã
        PriceAfterDiscount: priceAfterDiscount, // tổng tiền sau khi áp mã
        TotalDiscount: totalDiscount, // số tiền giảm giá
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spService_BookingService_Save",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.Status === "OK") {
        if (result?.BookingId) {
          await handleNext(result.BookingId, result.BookingCode);
        }
      }
    } catch {
      setLoading(false);
    }
  };

  // theem voucher
  const OVG_spVoucher_List = async () => {
    try {
      const pr = {
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spVoucher_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      // console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
      setVouchers(result);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  // Lưu bookingService lên firebase
  const handleNext = async (BookingId, BookingCode) => {
    // lưu dữ liệu booking
    const dataBooking = {
      CustomerName: userLogin?.CustomerName, // Tên KH
      CustomerPhone: userLogin?.Phone, // SĐT KH
      ServiceDetaiil: dataConfirmService?.Detail,
      ServiceId: dataConfirmService?.ServiceId,
      ServiceCode: dataConfirmService?.ServiceCode,
      CustomerId: dataConfirmService?.CustomerId,
      Address: dataConfirmService?.Address,
      ServiceName: dataConfirmService?.ServiceName,
      SelectOption: dataConfirmService?.serviceOption,
      ServicePrice: dataConfirmService?.ServicePrice,
      ServiceTime: dataConfirmService?.ServiceTime,
      TotalPrice: dataConfirmService?.TotalPrice,
      NoteBooking: dataConfirmService?.note,
      OtherService: dataConfirmService?.otherService,
      TotalStaff: dataConfirmService?.people,
      IsPremium: dataConfirmService?.premium,
      TotalRoom: dataConfirmService?.room,
      TimeWorking: dataConfirmService?.workingTime,
      Latitude: dataConfirmService?.Latitude,
      Longitude: dataConfirmService?.Longitude,
      Payment: payment,
      UsedVoucher: 1, // có sử dụng voucher
      Voucher: selectedVouchers, // danh sách voucher áp mã
      PriceAfterDiscount: priceAfterDiscount, // tổng tiền sau khi áp mã
      TotalDiscount: totalDiscount, // số tiền giảm giá
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
      navi.navigate(ScreenNames.VIEW_STAFF, {
        data: {
          OrderId: BookingId,
        },
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
            {dataConfirmService?.serviceOption?.OptionName ? (
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Loại</Text>
                <Text style={MainStyles.cardTitleConfirm}>
                  {dataConfirmService?.serviceOption?.OptionName || ""}
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
          <Text style={MainStyles.cardLabelConfirm}>Thêm mã giảm giá</Text>
          <VoucherComponent
            vouchers={vouchers}
            selectedVouchers={selectedVouchers}
            setSelectedVouchers={setSelectedVouchers}
            limit={limit}
          />
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
              {FormatMoney(priceAfterDiscount)} vnđ
            </Text>
          </View>
          {totalDiscount > 0 ? (
            <Text>Đã giảm : {FormatMoney(totalDiscount)} vnđ</Text>
          ) : null}

          <Text style={MainStyles.cardLabelConfirm}>
            Phương thức thanh toán
          </Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: payment
                      ? colors.WHITE
                      : colors.MAIN_COLOR_CLIENT,
                    borderColor: payment
                      ? colors.MAIN_BLUE_CLIENT
                      : colors.MAIN_COLOR_CLIENT,
                    borderWidth: payment ? 1 : 0,
                  },
                ]}
                onPress={() => setPayment(false)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: payment ? colors.MAIN_BLUE_CLIENT : colors.WHITE,
                    },
                  ]}
                >
                  Tiền mặt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: payment
                      ? colors.MAIN_COLOR_CLIENT
                      : colors.WHITE,
                    borderColor: payment
                      ? colors.MAIN_COLOR_CLIENT
                      : colors.MAIN_BLUE_CLIENT,
                    borderWidth: payment ? 0 : 1,
                  },
                ]}
                onPress={() => setPayment(true)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: payment ? colors.WHITE : colors.MAIN_BLUE_CLIENT,
                    },
                  ]}
                >
                  Chuyển khoản
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.03} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={[MainStyles.flexRowSpaceBetween, { paddingHorizontal: 20 }]}
        >
          <Text style={MainStyles.txtTotalPrice}>Tổng cộng</Text>
          <Text style={MainStyles.txtTotalPrice}>
            {FormatMoney(priceAfterDiscount)} VNĐ
          </Text>
        </View>
        <Button
          onPress={showConfirmModal}
          isLoading={loading}
          disable={loading}
          bgColor={colors.PRIMARY_GREEN}
          icon={() => <ArrowRight color={colors.WHITE} />}
        >
          <Text>Đặt đơn</Text>
        </Button>
        <Modal
          transparent={true}
          isVisible={isModalVisible}
          onBackdropPress={() => {}}
          onBackButtonPress={() => {}}
          backdropOpacity={0.3}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.dragHandle} />
              <View style={[MainStyles.flexRowCenter, { marginBottom: 20 }]}>
                <Text style={styles.headerTitle}>Đã xác nhận đặt dịch vụ</Text>
              </View>
              <Text style={MainStyles.cardLabelConfirm}>
                Thông tin công việc
              </Text>
              <View style={MainStyles.cardConfirmContainer}>
                <Text style={MainStyles.cardSubLabelConfirm}>Dịch vụ</Text>

                <View style={MainStyles.flexRowSpaceBetween}>
                  <Text style={MainStyles.cardTitleConfirm}>Tên dịch vụ</Text>
                  <Text style={MainStyles.cardTitleConfirm}>
                    {dataConfirmService?.ServiceName}
                  </Text>
                </View>
                {dataConfirmService?.serviceOption?.OptionName ? (
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <Text style={MainStyles.cardTitleConfirm}>Loại</Text>
                    <Text style={MainStyles.cardTitleConfirm}>
                      {dataConfirmService?.serviceOption?.OptionName || ""}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={MainStyles.cardLabelConfirm}>Tổng tiền</Text>
              <View
                style={[
                  MainStyles.cardConfirmContainer,
                  MainStyles.flexRowCenter,
                ]}
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
                  {FormatMoney(priceAfterDiscount)} vnđ
                </Text>
              </View>
              {/* <Text style={styles.modalCountdown}>Thời gian còn lại: {countdown} giây</Text> */}
              <Text style={styles.modalCountdown}>
                {countdown > 4
                  ? "Đặt dịch vụ thành công"
                  : "Đơn dịch vụ đã sẵn sàng, vui lòng đợi nhân viên nhận đơn !"}
              </Text>
              <Loading isLoading={true} />
              {countdown > 4 && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.modalButtonText}>Hủy đơn dịch vụ</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </LayoutBottom>
      <ModalRequired
        title={"Bạn cần đăng nhập để sử dụng chức năng này"}
        isModalVisible={isModalAlertVisible}
        setModalVisible={setIsModalAlertVisible}
        onConfirm1={() => {
          setData(StorageNames.SERVICE_CONFIRM, dataConfirmService);
          navi.replace(ScreenNames.LOGIN);
        }}
        onConfirm2={() => setIsModalAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dragHandle: {
    width: 90,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalContent: {},
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCountdown: {
    fontSize: 14,
    color: colors.MAIN_COLOR_CLIENT,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  topLine: {
    height: 4, // Chiều cao của thanh line
    backgroundColor: "#007BFF", // Màu sắc của thanh line
    width: "100%", // Đảm bảo thanh line rộng toàn bộ modal
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ConfirmBooking;
