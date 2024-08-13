import React from "react";
import { Image, Pressable, View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { colors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles/MainStyle";
import { ic_coin } from "../assets";
import { FormatDateJsonPro, FormatMoney } from "../Utils";
import BtnDouble from "./BtnDouble";
import Box from "./Box";
import ModalAlertSelectOption from "./modal/ModalAlertSelectOption";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { getRouterById } from "../Utils/RoutingService";
import { useSelector } from "react-redux";
import { dataMenu } from "../Screens/data";
import Rating from "./Rating";
import { PropTypes } from "prop-types";

const CardJobDone = ({ data }) => {
  const navi = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);
  const useBeforeLocation = () => {
    const service = dataMenu.find((item) => item?.ServiceId === 9);
    navi.navigate(getRouterById(service?.ServiceId), {
      service: {
        ...service,
        Address: data?.AddressService,
        CustomerId: userLogin.Id,
        CustomerName: userLogin.CustomerName,
        Latitude: data?.LatService,
        Longitude: data?.LngService,
      },
    });
  };

  const useNewLocation = () => {
    const service = dataMenu.find(
      (item) => item?.ServiceId === data?.ServiceId
    );

    navi.navigate(ScreenNames.ADDRESS_SEARCH, {
      service: service,
    });
  };

  const handleRating = () => {
    navi.navigate(ScreenNames.RATING_SERVICE, {
      data: {
        OrderId: data?.Id,
        CustomerId: userLogin?.Id,
        ListOfficer: data?.OfficerServiceDetail,
      },
    });
  };
  return (
    <View>
      <View style={MainStyles.cardJob}>
        <Pressable>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
              Dịch vụ {data?.ServiceName?.toLowerCase()}
            </Text>
          </View>
          {data?.BookingServiceCode && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: colors.primary[700],
                fontWeight: "bold",
              }}
            >
              {data?.BookingServiceCode}
            </Text>
          )}
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <Text style={MainStyles.titleContentModal}>Thông tin nhân viên</Text>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="person-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Số lượng nhân viên: {data?.TotalStaff} Nhân viên
              </Text>
            </View>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill="#3366FF"
              name="person-done-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Nhân viên đã làm việc:
              {data?.OfficerServiceDetail?.length > 0 ? "" : "Không có dữ liệu"}
            </Text>
          </View>
          {data?.OfficerServiceDetail?.length > 0 &&
            data?.OfficerServiceDetail?.map((item) => (
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
                  {item?.OfficerName}
                </Text>
              </View>
            ))}
          <Text style={MainStyles.titleContentModal}>Thông tin dịch vụ</Text>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="pin-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Địa chỉ: {data?.AddressService}
              </Text>
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
                {data?.DataService?.length > 0 ? "" : "Không kèm dịch vụ thêm"}
              </Text>
            </View>
            {data?.DataService?.length > 0 &&
              data?.DataService.map((item) => (
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
                name="message-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                {data?.NoteBooking
                  ? "Ghi chú: " + data?.NoteBooking.trim()
                  : "Không có ghi chú"}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo: {FormatDateJsonPro(data?.BookingTime, 21)}
              </Text>
            </View>
          </View>
          {data?.RatingNote && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="message-square-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  {data?.RatingNote
                    ? "Feedback: " + data?.RatingNote?.trim()
                    : " Khách hàng không để lại Feedback"}
                </Text>
              </View>
            </View>
          )}
          {data?.RatingNote && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="star-outline"
                />
                <Text style={MainStyles.textCardJob}>Được đánh giá: </Text>
                <Rating rating={data?.Star || 5} />
              </View>
            </View>
          )}
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View
            style={[
              MainStyles.cardContentJob,
              { backgroundColor: colors.primary[100], borderRadius: 10 },
            ]}
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
              <Image source={ic_coin} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {FormatMoney(data?.TotalMoney)} VND
              </Text>
            </View>
          </View>
        </Pressable>
        <Box height={SCREEN_HEIGHT * 0.01} />
        <BtnDouble
          title1={"Đặt lại đơn"}
          title2={"Đánh giá "}
          btn2Visible={!data?.RatingNote}
          onConfirm1={() => {
            setIsModalVisible(true);
          }}
          onConfirm2={handleRating}
        />
      </View>
      <Box height={SCREEN_HEIGHT * 0.01} />
      <ModalAlertSelectOption
        title={
          "Bạn có muốn đặt lại đơn dịch vụ này tại vị trí trước đó bạn đã đặt hay không ?"
        }
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm1={useBeforeLocation}
        onConfirm2={useNewLocation}
      />
    </View>
  );
};

CardJobDone.defaultProps = {
  data: {},
  modalRef: {},
};
CardJobDone.propTypes = {
  data: PropTypes.object,
  modalRef: PropTypes.object,
};

export default CardJobDone;
