import React, { useCallback } from 'react';
import { FlatList, Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../Constants';
import { cirtificate, coin_icon, ic_chronometer, ic_clearning, ic_clearning_basic, ic_glass, ic_hourse_clearning, ic_living_room, ic_location, ic_note, ic_person, ic_schedule } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { FormatMoney } from '../Utils';
import Button from './buttons/Button';

const CardNewJob = ({ data, modalRef }) => {
  const navi = useNavigation();
  const handleGoViewStaff = () => {
    navi.navigate(ScreenNames.VIEW_LOCATION_STAFF, { data: data });
  };

  const HandlePayment = () => {
    if (data?.DataService?.Payment === true) {
      navi.navigate(ScreenNames.PAYMENT_SCREEN, { data: data });
    } else {
      navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
    }
  }
  const openModal = () => {
    modalRef.current?.openModal(data);
  };
  const renderItem = ({ item }) => (
    <View >
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>🔸{item.ServiceDetailName}</Text>
    </View>
  );
  return (
    <View style={{ marginBottom: 10 }}>
      <Pressable onPress={openModal}>
        <View style={MainStyles.cardJob}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}</Text>
          </View>
          {
            data?.BookingCode ? (
              <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary[700], fontWeight: 'bold' }}>{data?.BookingCode}</Text>
            ) : null
          }
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_person}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>{data?.DataService?.TotalStaff} nhân viên</Text>
              </View>
              {data?.DataService?.TotalRoom ? (
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_living_room}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>{data?.DataService?.TotalRoom} phòng</Text>
                </View>
              ) : null
              }
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image
                  source={ic_glass}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}> trong {data?.DataService?.TimeWorking} giờ</Text>
              </View>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image
                  source={ic_chronometer}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>làm ngay</Text>
              </View>
            </View>
          </View>
          {
            data?.DataService?.IsPremium ? (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={cirtificate}
                    style={{ width: 22, height: 22 }}
                  />
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
            )
          }

          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_clearning}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>Dịch vụ thêm : {data?.DataService?.OtherService?.length > 0 ? "" : "Không kèm dịch vụ thêm"}</Text>
            </View>
            {
              data?.DataService?.OtherService?.length > 0 ? (
                <FlatList
                  data={data?.DataService?.OtherService}
                  renderItem={renderItem}
                  keyExtractor={item => item.ServiceDetailId.toString()}
                />
              ) : null
            }
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_location}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>Địa chỉ: {data?.DataService?.Address}</Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_note}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>{data?.DataService?.NoteBooking ? "Ghi chú: " + data?.DataService?.NoteBooking.trim() : "Không có ghi chú"}</Text>
            </View>
          </View>
          <View style={MainStyles.cardContentJob} onPress={() => navi.navigate(ScreenNames.PAYMENT_SCREEN)}>
            <Text style={
              {
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
              }
            }>Tổng tiền</Text>
            <View style={MainStyles.flexRowCenter}>
              <Image
                source={coin_icon}
                style={{ width: 22, height: 22 }}
              />
              <Text style={
                {
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                }
              }>{FormatMoney(data?.DataService?.TotalPrice)} vnđ</Text>
            </View>
          </View>
        </View>
      </Pressable>
      {data?.StatusOrder === 0 ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              disable={true}
              fontSize={14}
              paddingHorizontal={10}
              paddingVertical={8}
              bgColor={colors.CONFIRM2}
            >
              Đơn chưa có nhân viên nhận
            </Button>
          </View>
        </View>
      ) : null
      }
      {
        data?.StatusOrder === 1 ? (
          <View style={{ flexDirection: 'row' }}>
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
        ) : null
      }
      {
        data?.StatusOrder === 2 ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={colors.CONFIRM2}
                onPress={HandlePayment}
              >
                Thông tin thanh toán
              </Button>
            </View>
          </View>
        ) : null
      }
    </View>
  );
};

export default CardNewJob;
