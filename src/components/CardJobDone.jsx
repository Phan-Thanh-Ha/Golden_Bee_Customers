import React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles, { SCREEN_HEIGHT } from '../styles/MainStyle';
import { cirtificate, coin_icon, ic_chronometer, ic_clearning, ic_clearning_basic, ic_coin, ic_glass, ic_living_room, ic_location, ic_note, ic_person, ic_schedule } from '../assets';
import Rating from './Rating';
import { FormatMoney, parseTimeSql } from '../Utils';
import BtnDouble from './BtnDouble';
import Box from './Box';
import ModalAlertSelectOption from './modal/ModalAlertSelectOption';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../Constants';
import { getRouterById } from '../Utils/RoutingService';
import { useSelector } from 'react-redux';

export default CardJobDone = ({ data, modalRef }) => {
  const navi = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);
  const useBeforeLocation = () => {
    navi.navigate(getRouterById(data?.Service?.ServiceId), {
      service: {
        ...data?.Service,
        Address: data?.Address,
        CustomerId: userLogin.Id,
        CustomerName: userLogin.CustomerName,
        Latitude: data?.LatitudeCustomer,
        Longitude: data?.LongitudeCustomer,
      }
    }
    )
  };
  const useNewLocation = () => {
    navi.navigate(ScreenNames.ADDRESS_SEARCH, {
      service: data?.Service,
    });
  };
  const openModal = () => {
    modalRef.current?.openModal(data);
  };

  return (
    <View>

      <View style={MainStyles.cardJob}>
        <Pressable onPress={openModal}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
              Dịch vụ {data?.ServiceName?.toLowerCase()}
            </Text>
          </View>
          {data?.BookingServiceCode && (
            <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary[700], fontWeight: 'bold' }}>
              {data?.BookingServiceCode}
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
                <Text style={MainStyles.textCardJob}>{data?.TotalStaff} nhân viên</Text>
              </View>
              {data?.TotalRoom && (
                <View style={MainStyles.flexRowFlexStart}>
                  <Image source={ic_living_room} style={{ width: 22, height: 22 }} />
                  <Text style={MainStyles.textCardJob}>{data?.TotalRoom} phòng</Text>
                </View>
              )}
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image source={ic_glass} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}> trong {data?.TimeWorking} giờ</Text>
              </View>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image source={ic_chronometer} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>làm ngay</Text>
              </View>
            </View>
          </View>
          {data?.IsPremium ? (
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
                Dịch vụ thêm : {data?.Detail?.length > 0 ? '' : 'Không kèm dịch vụ thêm'}
              </Text>
            </View>
            {data?.Detail?.length > 0 &&
              data?.Detail.map((item) => (
                <View key={item?.ServiceDetailName}>
                  <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>🔸{item.ServiceDetailName}</Text>
                </View>
              ))}
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_location} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>Địa chỉ: {data?.Address}</Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_note} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                {data?.NoteBooking ? 'Ghi chú: ' + data?.NoteBooking.trim() : 'Không có ghi chú'}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_schedule} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>Thời gian tạo :{parseTimeSql(data?.BookingTime, 1)}</Text>
            </View>
          </View>
          {
            data?.Rating ? (
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.textCardJob}>
                  Đã đánh giá :
                </Text>
                <Rating rating={data?.Rating} fontSize={[25, 25]} />
              </View>
            ) : null
          }
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={[MainStyles.cardContentJob, { backgroundColor: colors.primary[100], borderRadius: 10 }]}>
            <Text style={{ color: colors.MAIN_BLUE_CLIENT, marginLeft: 10, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
              Tổng tiền
            </Text>
            <View style={MainStyles.flexRowCenter}>
              <Image source={ic_coin} style={{ width: 22, height: 22 }} />
              <Text style={{ color: colors.MAIN_COLOR_CLIENT, marginLeft: 10, fontSize: 18, fontWeight: '700' }}>
                {FormatMoney(data?.TotalMoney)} vnđ
              </Text>
            </View>
          </View>
        </Pressable >
        <Box height={SCREEN_HEIGHT * 0.01} />
        <BtnDouble
          title1={"Đặt lại đơn"}
          btn2Visible={false}
          onConfirm1={() => { setIsModalVisible(true) }}
        />
      </View>
      <Box height={SCREEN_HEIGHT * 0.01} />
      <ModalAlertSelectOption
        title={"Bạn có muốn đặt lại đơn dịch vụ này tại vị trí trước đó bạn đã đặt hay không ?"}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm1={useBeforeLocation}
        onConfirm2={useNewLocation}
      />
    </View >

  )
}