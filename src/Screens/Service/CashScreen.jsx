import React, { useState } from "react";
import { Text, View, Image, ScrollView, Linking } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import LogoBeeBox from "../../components/LogoBeeBox";
import { colors } from "../../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import CustomLabel from "../../components/forms/CustomLabel";
import {
  cirtificate,
  ic_chronometer,
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
import { Spinner } from "@ui-kitten/components";
import Button from "../../components/buttons/Button";

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
  const checkStatus = (status) => {
    if (status === 0) {
      return { status: "Chưa có nhân viên nhận đơn" };
    } else if (status === 1) {
      return { status: "Nhân viên đã nhận đơn" };
    } else if (status === 2) {
      return { status: "Nhân viên đang tới" };
    } else if (status === 3) {
      return { status: "Đang làm việc" };
    }
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
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_person}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {data?.DataService?.TotalStaff} Nhân viên
                      </Text>
                    </View>
                    {/* {
                      data?.DataService?.RoomTotal && (
                        <View style={MainStyles.flexRowFlexStart}>
                          <Image source={ic_living_room} style={{ width: 22, height: 22 }} />
                          <Text style={MainStyles.textCardJob}>{"data?.DataService?.RoomTotal"} Phòng</Text>
                        </View>
                      )
                    } */}
                    {data?.DataService?.SelectOption?.length ? (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={MainStyles.textCardJob}>
                          ⚙️ {data?.DataService?.SelectOption[0]?.OptionName}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image
                        source={ic_glass}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {" "}
                        Trong {data?.DataService?.TimeWorking} giờ
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
                      <Image
                        source={cirtificate}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Dịch vụ Premium
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_clearning_basic}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Dịch vụ thông thường
                      </Text>
                    </View>
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_clearning}
                      style={{ width: 22, height: 22 }}
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
                    <Image
                      source={ic_location}
                      style={{ width: 22, height: 22 }}
                    />
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
                        ? "Ghi chú: " + data?.DataService?.NoteBooking?.trim()
                        : "Không có ghi chú"}
                    </Text>
                  </View>
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
                              style={[
                                MainStyles.textCardJob,
                                { paddingLeft: 10 },
                              ]}
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
                    <Image
                      source={ic_schedule}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Thời gian tạo :{parseTimeBE(data?.CreateAt, 1)}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    {/* <Image source={ic_human} style={{ width: 22, height: 22 }} /> */}
                    <Text>⚡</Text>
                    <Text style={MainStyles.textCardJob}>
                      Trạng thái : {checkStatus(data?.StatusOrder).status}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Nhân viên nhận đơn
                </Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_human}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Tên nhân viên :{" "}
                      {data?.StaffName || "Chưa có nhân viên nhận đơn"}
                    </Text>
                  </View>
                </View>
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
                {data?.StaffPhone &&
                (data?.StatusOrder === 1 || data?.StatusOrder === 2) ? (
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Button
                        fontSize={14}
                        paddingHorizontal={10}
                        paddingVertical={8}
                        bgColor={colors.RED}
                        onPress={() => {
                          Linking.openURL(`tel:${data?.StaffPhone}`);
                        }}
                      >
                        📞 Gọi cho nhân viên
                      </Button>
                    </View>
                  </View>
                ) : null}
              </View>
              <Box height={SCREEN_HEIGHT * 0.2} />
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </View>
        {data?.DataService?.ServiceDetaiil?.length > 0 && (
          <View
            style={[
              MainStyles.containerTabPayment,
              {
                backgroundColor: colors.WHITE,
                padding: 10,
                margin: 10,
                borderRadius: 10,
              },
            ]}
          >
            <View style={MainStyles.layoutTabPayment}>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_clearning}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>Đặt thêm dịch vụ :</Text>
                </View>
                <InputCheckBox
                  data={data?.DataService?.ServiceDetaiil}
                  selectedValues={selectedValues}
                  onChange={handleChange}
                />
              </View>
            </View>
          </View>
        )}
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
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
