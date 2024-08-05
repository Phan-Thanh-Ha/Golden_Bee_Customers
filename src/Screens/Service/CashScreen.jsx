import React, { useState } from "react";
import { Text, View, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import LogoBeeBox from "../../components/LogoBeeBox";
import { colors } from "../../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import CustomLabel from "../../components/forms/CustomLabel";
import {
  ic_clearning,
  ic_clearning_basic,
  ic_coin,
  ic_glass,
  ic_human,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_phone_call,
  ic_schedule,
} from "../../assets";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { dateTimeFormat, FormatMoney, parseTimeBE } from "../../Utils";
import BackButton from "../../components/BackButton";
import InputCheckBox from "../../components/InputCheckBox";
import Box from "../../components/Box";
import { Icon, Spinner } from "@ui-kitten/components";
import Button from "../../components/buttons/Button";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { GenerateStatusOrder } from "../../Utils/GenerateStatusOrder";

const CashScreen = ({ route }) => {
  const { data } = route.params || {};
  const [selectedValues, setSelectedValues] = useState([]);
  const handleChange = (item) => {
    setSelectedValues((prevSelected) => {
      const isSelected = prevSelected.some(
        (value) => value.ServiceDetailId === item.ServiceDetailId
      );
      if (isSelected) {
        return prevSelected.filter(
          (value) => value.ServiceDetailId !== item.ServiceDetailId
        );
      } else {
        return [...prevSelected, item];
      }
    });
  };
  return (
    <LayoutGradientBlue>
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text
        style={{
          textAlign: "center",
          color: colors.MAIN_BLUE_CLIENT,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Thông tin dịch vụ
      </Text>
      <ScrollView>
        <View
          style={[
            MainStyles.containerTabPayment,
            {
              backgroundColor: colors.WHITE,
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
            },
          ]}
        >
          {data ? (
            <View>
              <View style={MainStyles.cardJob}>
                <View style={MainStyles.flexRowCenter}>
                  <Text
                    style={[MainStyles.titleCardJob, { textAlign: "center" }]}
                  >
                    Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
                  </Text>
                </View>
                {data?.BookingCode && (
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
                )}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Thông tin dịch vụ
                </Text>
                {data?.DataService?.TotalRoom && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill="#3366FF"
                        name="share-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số phòng : {data?.DataService?.TotalRoom} Phòng
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
                        Loại công việc :{" "}
                        {data?.DataService?.SelectOption[0]?.OptionName}
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
                        Làm việc trong{" "}
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
                      Dịch vụ thêm :{" "}
                      {data?.DataService?.OtherService?.length > 0
                        ? ""
                        : "Không kèm dịch vụ thêm"}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0 &&
                    data?.DataService?.OtherService.map((item) => (
                      <View key={item?.ServiceDetailId?.toString()}>
                        <Text
                          style={[MainStyles.textCardJob, { paddingLeft: 10 }]}
                        >
                          🔸{item?.ServiceDetailName}
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
                      Địa chỉ : {data?.DataService?.Address}
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
                      <Text style={MainStyles.textCardJob}>Đã sử dụng voucher :</Text>
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
                              : FormatMoney(item?.Discount) + " đ"}
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
                      Thời gian tạo :{dateTimeFormat(data?.CreateAt, 2)}
                    </Text>
                  </View>
                </View>

                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Nhân viên nhận đơn
                </Text>
                {data?.DataService?.TotalStaff && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill="#3366FF"
                        name="people-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số lượng nhân viên : {data?.StaffInformation?.length || 1} Nhân viên
                      </Text>
                    </View>
                  </View>
                )}
                {
                  data?.StaffInformation?.length > 0
                  && data?.StaffInformation?.map((item, index) => (
                    <View style={MainStyles.cardStaff} key={index}>
                      {item?.StaffName && (
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill="#3366FF"
                              name="person-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              Tên nhân viên :
                              {item?.StaffName || "Chưa có nhân viên nhận đơn"}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item?.StaffPhone && (
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill="#3366FF"
                              name="phone-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              Số điện thoại : {item?.StaffPhone || "Chưa có thông tin"}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item?.StatusOrder && (
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill="#3366FF"
                              name="flash-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              Trạng thái: {GenerateStatusOrder(item.StatusOrder || 0)}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item?.StaffPhone && (
                        <View style={MainStyles.flexRowCenter}>
                          {
                            item?.StatusOrder === 1 ||
                              item?.StatusOrder === 2 ? (
                              <TouchableOpacity
                                onPress={() => {
                                }}
                              >
                                <View style={[MainStyles.flexRowCenter, MainStyles.cardBtnViewLocation]}>
                                  <Icon
                                    style={MainStyles.CardIcon}
                                    fill="#FFFFFFFF"
                                    name="navigation-2-outline"
                                  />
                                  <Text style={MainStyles.textCardPhoneCall}>Xem vị trí</Text>
                                </View>
                              </TouchableOpacity>
                            ) : null
                          }
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(`tel:${item?.StaffPhone}`);
                            }}
                          >
                            <View style={[MainStyles.flexRowCenter, MainStyles.cardPhoneCall]}>
                              <Icon
                                style={MainStyles.CardIcon}
                                fill="#FFFFFFFF"
                                name="phone-outline"
                              />
                              <Text style={MainStyles.textCardPhoneCall}>Gọi nhân viên</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ))
                }
              </View>
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLabel color={colors.WHITE}>Thanh toán tiền mặt </CustomLabel>
        </View>
        <View
          style={[
            MainStyles.cardContentJob,
            {
              backgroundColor: colors.MAIN_BLUE_CLIENT,
              paddingVertical: 8,
              borderRadius: 10,
            },
          ]}
        >
          <View style={MainStyles.flexRowCenter}>
            <View>
              <Text
                style={{
                  color: colors.WHITE,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Tổng tiền
              </Text>
              <View style={MainStyles.flexRowCenter}>
                <Image source={ic_coin} style={{ width: 22, height: 22 }} />
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
          </View>
        </View>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};

export default CashScreen;
