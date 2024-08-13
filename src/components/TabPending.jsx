import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import CardNewJob from "./CardNewJob";
import Modal from "react-native-modal";
import CardDefault from "./CardDefault";
import MainStyles from "../styles/MainStyle";
import { useState } from "react";
import { Icon } from "@ui-kitten/components";
import { GenerateStatusOrder } from "../Utils/GenerateStatusOrder";
import { ScrollView } from "react-native-gesture-handler";
import Box from "./Box";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import PropTypes from "prop-types";
import React from "react";

const TabPending = ({ dataPending = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [StaffInformation, setStaffInformation] = useState(null);
  const navi = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      {dataPending?.length > 0 ? (
        <FlatList
          style={MainStyles.mdBottom_flatList}
          data={dataPending}
          renderItem={({ item }) => (
            <CardNewJob
              data={item}
              setModalVisible={setModalVisible}
              setStaffInformation={setStaffInformation}
            />
          )}
          keyExtractor={(item) => item?.BookingId}
        />
      ) : (
        <CardDefault title={"Bạn chưa đặt dịch vụ nào"} />
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        backdropOpacity={0.3}
        style={MainStyles.mdBottom_modal}
      >
        <View style={MainStyles.mdBottom_modalContent}>
          <View style={MainStyles.mdBottom_dragHandle} />
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
              Thông tin nhân viên
            </Text>
          </View>
          <Box style={{ marginBottom: 10 }} />
          <ScrollView>
            {StaffInformation?.length > 0 &&
              StaffInformation?.map((item, index) => (
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
                          Số điện thoại :{" "}
                          {item?.StaffPhone || "Chưa có thông tin"}
                        </Text>
                      </View>
                    </View>
                  )}
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
                  {item?.StaffPhone && (
                    <View style={MainStyles.flexRowCenter}>
                      {item?.StatusOrder === 1 || item?.StatusOrder === 2 ? (
                        <TouchableOpacity
                          onPress={() => {
                            navi.navigate(ScreenNames.VIEW_STAFF, {
                              data: { OrderId: item?.OrderId },
                            });
                            // navi.navigate(
                            //   ScreenNames.VIEW_ALL_STAFF,
                            //   {
                            //     data: { OrderId: item?.OrderId },
                            //   }
                            // )
                          }}
                        >
                          <View
                            style={[
                              MainStyles.flexRowCenter,
                              MainStyles.cardBtnViewLocation,
                            ]}
                          >
                            <Icon
                              style={MainStyles.CardIcon}
                              fill="#FFFFFFFF"
                              name="navigation-2-outline"
                            />
                            {/* <Text style={MainStyles.textCardPhoneCall}>Xem vị trí</Text> */}
                          </View>
                        </TouchableOpacity>
                      ) : null}
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`tel:${item?.StaffPhone}`);
                        }}
                      >
                        <View
                          style={[
                            MainStyles.flexRowCenter,
                            MainStyles.cardPhoneCall,
                          ]}
                        >
                          <Icon
                            style={MainStyles.CardIcon}
                            fill="#FFFFFFFF"
                            name="phone-outline"
                          />
                          {/* <Text style={MainStyles.textCardPhoneCall}>Gọi nhân viên</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
          {/* <TouchableOpacity
            style={MainStyles.mdBottom_closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={MainStyles.mdBottom_closeButtonText}>Đóng</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

TabPending.defaultProps = {
  dataPending: [],
};
TabPending.propTypes = {
  dataPending: PropTypes.array,
};

export default TabPending;
