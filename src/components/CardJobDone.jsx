import React from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { colors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import {
  cirtificate,
  coin_icon,
  ic_chronometer,
  ic_clearning,
  ic_clearning_basic,
  ic_coin,
  ic_glass,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_schedule,
} from "../assets";
import Rating from "./Rating";
import { FormatMoney, parseTimeSql } from "../Utils";
import BtnDouble from "./BtnDouble";
import Box from "./Box";
import ModalAlertSelectOption from "./modal/ModalAlertSelectOption";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { getRouterById } from "../Utils/RoutingService";
import { useSelector } from "react-redux";

export default CardJobDone = ({ data, modalRef }) => {
  const navi = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);
  const menu = useSelector((state) => state.main.menuService);

  const useBeforeLocation = () => {
    const service = menu.find((item) => item?.ServiceId === data?.ServiceId);
    navi.navigate(getRouterById(data?.ServiceId), {
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
    const service = menu.find((item) => item?.ServiceId === data?.ServiceId);

    navi.navigate(ScreenNames.ADDRESS_SEARCH, {
      service: service,
    });
  };
  const openModal = () => {
    modalRef.current?.openModal(data);
  };
  const renderItem = ({ item }) => (
    <View>
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
        🔸{item.ServiceDetailName}
      </Text>
    </View>
  );

  const renderItemOfficer = ({ item }) => (
    <View>
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
        🔸{item.OfficerName}
      </Text>
    </View>
  );
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
          <Text style={MainStyles.titleContentModal}>Thông tin dịch vụ</Text>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="person-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Số lượng nhân viên : {data?.TotalStaff}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="pin-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Địa chỉ : {data?.AddressService}
              </Text>
            </View>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill="#3366FF"
              name="plus-square-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Dịch vụ thêm :
              {data?.DataService?.length > 0 ? "" : "Không kèm dịch vụ thêm"}
            </Text>
          </View>
          {data?.DataService?.length > 0 ? (
            <FlatList
              data={data?.DataService}
              renderItem={renderItem}
              keyExtractor={(item) => item?.ServiceDetailId?.toString()}
            />
          ) : null}

          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill="#3366FF"
              name="plus-square-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Nhân viên thực hiện :
              {data?.OfficerServiceDetail?.length > 0
                ? ""
                : "Không kèm dịch vụ thêm"}
            </Text>
          </View>
          {data?.OfficerServiceDetail?.length > 0 ? (
            <FlatList
              data={data?.OfficerServiceDetail}
              renderItem={renderItemOfficer}
              keyExtractor={(item) => item?.OfficerID?.toString()}
            />
          ) : null}
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
                Thời gian tạo :{parseTimeSql(data?.BookingTime, 1)}
              </Text>
            </View>
          </View>
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
          btn2Visible={false}
          onConfirm1={() => {
            setIsModalVisible(true);
          }}
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
