import React from "react";
import { Image, View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { colors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles/MainStyle";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { coin_icon } from "../assets";
import { dateTimeFormat, FormatMoney } from "../Utils";
import Box from "./Box";
import { RoundUpNumber } from "../Utils/RoundUpNumber";
import BtnDouble from "./BtnDouble";
import { PropTypes } from "prop-types";

const CardNewJob = ({
  data,
  setStaffInformation = () => { },
  setModalVisible = () => { },
}) => {
  const navi = useNavigation();

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={MainStyles.cardJob}>
        <View>
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
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="people-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Số lượng nhân viên: {data?.DataService?.StaffTotal || 0} nhân
                viên
              </Text>
            </View>
          </View>
          {data?.DataService?.TotalRoom && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="share-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Số phòng: {data?.DataService?.TotalRoom} phòng
                </Text>
              </View>
            </View>
          )}
          {data?.DataService?.SelectOption?.length && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="share-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Loại: {data?.DataService?.SelectOption[0]?.OptionName}
                </Text>
              </View>
            </View>
          )}
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="clock-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  {" "}
                  Làm việc trong:{" "}
                  {RoundUpNumber(data?.DataService?.TimeWorking, 0)} giờ
                </Text>
              </View>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="plus-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Dịch vụ thêm:{" "}
                {data?.DataService?.OtherService?.length > 0
                  ? ""
                  : "Không kèm dịch vụ thêm"}
              </Text>
            </View>
            {data?.DataService?.OtherService?.length > 0 &&
              data?.DataService?.OtherService.map((item) => (
                <View
                  key={item?.ServiceDetailId?.toString()}
                  style={MainStyles.flexRowFlexStart}
                >
                  <Icon
                    style={{
                      marginLeft: SCREEN_WIDTH * 0.07,
                      width: 20,
                      height: 20,
                    }}
                    fill="#3366FF"
                    name="plus-outline"
                  />
                  <Text style={[MainStyles.textCardJob]}>
                    {item?.ServiceDetailName}
                  </Text>
                </View>
              ))}
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="pin-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Địa chỉ: {data?.DataService?.Address}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="message-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                {data?.DataService?.NoteBooking
                  ? "Ghi chú: " + data?.DataService?.NoteBooking.trim()
                  : "Không có ghi chú"}
              </Text>
            </View>
          </View>
          {data?.DataService?.Voucher?.length > 0 && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="pricetags-outline"
                />
                <Text style={MainStyles.textCardJob}>Đã sử dụng voucher: </Text>
              </View>
              {data?.DataService?.Voucher?.length > 0
                ? data?.DataService?.Voucher.map((item) => (
                  <View
                    key={item?.VoucherId.toString()}
                    style={MainStyles.flexRowFlexStart}
                  >
                    <Icon
                      style={{
                        marginLeft: SCREEN_WIDTH * 0.07,
                        width: 20,
                        height: 20,
                      }}
                      fill="#3366FF"
                      name="plus-outline"
                    />
                    <Text style={[MainStyles.textCardJob]}>
                      CODE: {item?.VoucherCode} - giảm{" "}
                      {item?.TypeDiscount === 1
                        ? item?.Discount + "%"
                        : FormatMoney(item?.Discount) + " VND"}
                    </Text>
                  </View>
                ))
                : null}
            </View>
          )}
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo: {dateTimeFormat(data?.CreateAt, 2)}
              </Text>
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
          <Box height={SCREEN_HEIGHT * 0.01} />
          <BtnDouble
            title1={"Chi tiết dịch vụ"}
            title2={"Thông tin nhân viên"}
            onConfirm1={() => {
              navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
            }}
            onConfirm2={() => {
              setStaffInformation(data);
              setModalVisible(true);
            }}
            bgColor2="#3366FF"
          />
        </View>
        <Box height={SCREEN_HEIGHT * 0.01} />
      </View>
    </View>
  );
};

CardNewJob.defaultProps = {
  data: {},
  setStaffInformation: () => { },
  setModalVisible: () => { },
};
CardNewJob.propTypes = {
  data: PropTypes.object,
  setStaffInformation: PropTypes.func,
  setModalVisible: PropTypes.func,
};

export default CardNewJob;
