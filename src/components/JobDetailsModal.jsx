import React, { forwardRef, useImperativeHandle, useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MainStyles, { SCREEN_HEIGHT } from '../styles/MainStyle';
import { colors } from '../styles/Colors';
import { Spinner } from '@ui-kitten/components';
import { ic_person, ic_living_room, ic_glass, ic_chronometer, cirtificate, ic_clearning_basic, ic_clearning, ic_location, ic_note, ic_schedule, ic_human, ic_phone_call, ic_coin } from '../assets';
import Box from './Box';
import { FormatMoney, FormatTime } from '../Utils';

const JobDetailsModal = forwardRef((_, ref) => {
  const [data, setData] = useState(null);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const checkStatus = (status) => {
    if (status === 0) {
      return { status: 'Chưa có nhân viên nhận đơn' };
    } else if (status === 1) {
      return { status: 'Nhân viên đang tới' };
    } else if (status === 2) {
      return { status: 'Đang làm việc' };
    }
  };

  useImperativeHandle(ref, () => ({
    openModal(data) {
      setData(data);
      bottomSheetRef.current?.expand();
    },
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.bottomSheet}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <ScrollView>
        <View style={styles.modalContent}>
          {data ? (
            <View>
              <View style={MainStyles.cardJob}>
                <View style={MainStyles.flexRowCenter}>
                  <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
                    Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
                  </Text>
                </View>
                {data?.BookingCode && (
                  <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary[700], fontWeight: 'bold' }}>
                    {data?.BookingCode}
                  </Text>
                )}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>Thông tin dịch vụ</Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image source={ic_person} style={{ width: 22, height: 22 }} />
                      <Text style={MainStyles.textCardJob}>{data?.DataService?.TotalStaff} nhân viên</Text>
                    </View>
                    {data?.DataService?.TotalRoom && (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Image source={ic_living_room} style={{ width: 22, height: 22 }} />
                        <Text style={MainStyles.textCardJob}>{data?.DataService?.TotalRoom} phòng</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image source={ic_glass} style={{ width: 22, height: 22 }} />
                      <Text style={MainStyles.textCardJob}> trong {data?.DataService?.TimeWorking} giờ</Text>
                    </View>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image source={ic_chronometer} style={{ width: 22, height: 22 }} />
                      <Text style={MainStyles.textCardJob}>làm ngay</Text>
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
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image source={ic_clearning_basic} style={{ width: 22, height: 22 }} />
                      <Text style={MainStyles.textCardJob}>Dịch vụ thông thường</Text>
                    </View>
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_clearning} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm : {data?.DataService?.OtherService?.length > 0 ? '' : 'Không kèm dịch vụ thêm'}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0 &&
                    data?.DataService?.OtherService.map((item) => (
                      <View key={item.ServiceDetailId.toString()}>
                        <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>🔸{item.ServiceDetailName}</Text>
                      </View>
                    ))}
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_location} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>Địa chỉ: {data?.DataService?.Address}</Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_note} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      {data?.DataService?.NoteBooking ? 'Ghi chú: ' + data?.DataService?.NoteBooking.trim() : 'Không có ghi chú'}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_schedule} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>Thời gian tạo :{FormatTime(data?.CreateAt, 1)}</Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>Nhân viên nhận đơn</Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_human} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>Tên nhân viên : {data?.StaffName}</Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_phone_call} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>Số điện thoại : {data?.StaffPhone}</Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_human} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>Trạng thái : {checkStatus(data?.StatusOrder).status}</Text>
                  </View>
                </View>
                <View style={[MainStyles.cardContentJob, { backgroundColor: colors.primary[100], borderRadius: 10 }]}>
                  <Text style={{ color: colors.MAIN_BLUE_CLIENT, marginLeft: 10, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
                    Tổng tiền
                  </Text>
                  <View style={MainStyles.flexRowCenter}>
                    <Image source={ic_coin} style={{ width: 22, height: 22 }} />
                    <Text style={{ color: colors.MAIN_COLOR_CLIENT, marginLeft: 10, fontSize: 18, fontWeight: '700' }}>
                      {FormatMoney(data?.DataService?.TotalPrice)} vnđ
                    </Text>
                  </View>
                </View>
              </View>
              <Box height={SCREEN_HEIGHT * 0.2} />
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: colors.MAIN_BLUE_CLIENT,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: 'bold',
  },
  sectionSubTitle: {
    color: colors.MAIN_BLUE_CLIENT,
  },
  additionalFields: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: colors.MAIN_COLOR_CLIENT,
    color: colors.WHITE,
    padding: 5,
    borderRadius: 5,
  },
});

export default JobDetailsModal;
