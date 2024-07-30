import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@ui-kitten/components";
import { colors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import {
  cirtificate,
  coin_icon,
  ic_chronometer,
  ic_clearning,
  ic_clearning_basic,
  ic_glass,
  ic_hourse_clearning,
  ic_human,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_phone_call,
  ic_schedule,
} from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { dateTimeFormat, FormatMoney } from "../Utils";
import Button from "./buttons/Button";
import Box from "./Box";
import { RoundUpNumber } from "../Utils/RoundUpNumber";

const CardNewJob = ({ data, modalRef }) => {
  const navi = useNavigation();
  // const handleGoViewStaff = () => {
  //   navi.navigate(ScreenNames.VIEW_LOCATION_STAFF, { data: data });
  // };
  const handleGoViewStaff = () => {
    navi.navigate(ScreenNames.VIEW_STAFF, { data: data });
  };
  console.log("data------------------------", data);

  const HandlePayment = () => {
    if (data?.DataService?.Payment === true) {
      navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
    } else {
      navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
    }
  };
  const openModal = () => {
    modalRef.current?.openModal(data);
  };
  // console.log(data);
  const renderItem = ({ item }) => (
    <View>
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
        🔸{item.ServiceDetailName}
      </Text>
    </View>
  );
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={MainStyles.cardJob}>
        {/* <Pressable onPress={openModal}> */}
        <Pressable
          onPress={() => {
            navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
          }}
        >
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
              Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
            </Text>
          </View>
          {data?.BookingCode ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: colors.primary[700],
                fontWeight: "bold",
              }}
            >
              {data?.BookingCode}
            </Text>
          ) : null}
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image source={ic_person} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>
                  {data?.DataService?.TotalStaff} Nhân viên
                </Text>
              </View>
              {data?.DataService?.RoomTotal ? (
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_living_room}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>
                    {data?.DataService?.RoomTotal} Phòng
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image source={ic_glass} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>
                  {" "}
                  Trong {RoundUpNumber(data?.DataService?.TimeWorking, 0)} giờ
                </Text>
              </View>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image
                  source={ic_chronometer}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>Làm ngay</Text>
              </View>
            </View>
          </View>
          {data?.DataService?.IsPremium ? (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image source={cirtificate} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>Dịch vụ Premium</Text>
              </View>
            </View>
          ) : (
            <View View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_clearning_basic}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>Dịch vụ thông thường</Text>
              </View>
            </View>
          )}

          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_clearning} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                Dịch vụ thêm :{" "}
                {data?.DataService?.OtherService?.length > 0
                  ? ""
                  : "Không kèm dịch vụ thêm"}
              </Text>
            </View>
            {data?.DataService?.OtherService?.length > 0 ? (
              <FlatList
                data={data?.DataService?.OtherService}
                renderItem={renderItem}
                keyExtractor={(item) => item.ServiceDetailId?.toString()}
              />
            ) : null}
          </View>
          {data?.DataService?.Voucher?.length > 0 ? (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={MainStyles.textCardJob}>
                  🎁 Đã áp mã voucher :
                </Text>
              </View>
              {data?.DataService?.Voucher?.length > 0
                ? data?.DataService?.Voucher.map((item) => (
                    <View key={item?.VoucherId.toString()}>
                      <Text
                        style={[MainStyles.textCardJob, { paddingLeft: 10 }]}
                      >
                        🔸CODE : {item?.VoucherCode} - giảm{" "}
                        {item?.TypeDiscount === 1
                          ? item?.Discount + "%"
                          : FormatMoney(item?.Discount) + " VND"}
                      </Text>
                    </View>
                  ))
                : null}
            </View>
          ) : null}
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_location} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                Địa chỉ: {data?.DataService?.Address}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_note} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                {data?.DataService?.NoteBooking
                  ? "Ghi chú: " + data?.DataService?.NoteBooking.trim()
                  : "Không có ghi chú"}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_schedule} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo :{dateTimeFormat(data?.CreateAt, 2)}
              </Text>
            </View>
          </View>
          {data?.StaffName && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image source={ic_human} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>
                  Tên nhân viên :{" "}
                  {data?.StaffName || "Chưa có nhân viên nhận đơn"}
                </Text>
              </View>
            </View>
          )}
          {data?.StaffPhone && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_phone_call}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>
                  Số điện thoại : {data?.StaffPhone || "Chưa có thông tin"}
                </Text>
              </View>
            </View>
          )}
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Text>⚡</Text>
              {data?.StatusOrder === 0 && (
                <Text style={MainStyles.textCardJob}>
                  Trạng thái : Chưa có nhân viên nhận
                </Text>
              )}
              {data?.StatusOrder === 1 && (
                <Text style={MainStyles.textCardJob}>
                  Trạng thái : Nhân viên đã nhận đơn
                </Text>
              )}
              {data?.StatusOrder === 2 && (
                <Text style={MainStyles.textCardJob}>
                  Trạng thái : Nhân viên đang tới
                </Text>
              )}
              {data?.StatusOrder === 3 && (
                <Text style={MainStyles.textCardJob}>
                  Trạng thái : Đang làm việc
                </Text>
              )}
            </View>
          </View>
          <View
            style={MainStyles.cardContentJob}
            onPress={() => navi.navigate(ScreenNames.PAYMENT_SCREEN)}
          >
            <Text
              style={{
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Tổng tiền
            </Text>
            <View style={MainStyles.flexRowCenter}>
              <Image source={coin_icon} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {FormatMoney(data?.DataService?.PriceAfterDiscount)} VND
              </Text>
            </View>
          </View>
        </Pressable>
        <Box height={SCREEN_HEIGHT * 0.01} />
        {data?.StatusOrder === 0 ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                onPress={handleGoViewStaff}
                bgColor={colors.CONFIRM2}
              >
                Chưa có nhân viên nhận đơn
              </Button>
            </View>
          </View>
        ) : null}
        {data?.StatusOrder === 1 ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={colors.CONFIRM2}
                onPress={handleGoViewStaff}
              >
                Nhân viên đã nhận đơn
              </Button>
            </View>
          </View>
        ) : null}
        {data?.StatusOrder === 2 ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={colors.CONFIRM2}
                onPress={handleGoViewStaff}
              >
                Xem vị trí nhân viên
              </Button>
            </View>
          </View>
        ) : null}
        {data?.StatusOrder === 3 ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={colors.CONFIRM2}
                onPress={HandlePayment}
              >
                Xem hóa đơn thanh toán
              </Button>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CardNewJob;
