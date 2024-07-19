import React, { useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles, { SCREEN_HEIGHT } from '../../styles/MainStyle';
import CustomLabel from '../../components/forms/CustomLabel';
import { cirtificate, ic_chronometer, ic_clearning, ic_clearning_basic, ic_coin, ic_glass, ic_living_room, ic_location, ic_note, ic_person } from '../../assets';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import { FormatMoney } from '../../Utils';
import BackButton from '../../components/BackButton';
import InputCheckBox from '../../components/InputCheckBox';
import Box from '../../components/Box';

const CashScreen = ({ route }) => {
  const { data } = route.params || {};
  const [selectedValues, setSelectedValues] = useState([]);
  const handleChange = (item) => {
    setSelectedValues((prevSelected) => {
      const isSelected = prevSelected.some((value) => value.ServiceDetailId === item.ServiceDetailId);
      if (isSelected) {
        return prevSelected.filter((value) => value.ServiceDetailId !== item.ServiceDetailId);
      } else {
        return [...prevSelected, item];
      }
    });
  };
  return (
    <LayoutGradientBlue>
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <LogoBeeBox color={colors.MAIN_BLUE_CLIENT} sizeImage={70} sizeText={20} />
      <Text style={{ textAlign: 'center', color: colors.MAIN_BLUE_CLIENT, fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Thông tin thanh toán dịch vụ</Text>
      <ScrollView>
        <View style={[MainStyles.containerTabPayment, { backgroundColor: colors.WHITE, padding: 10, marginHorizontal: 10, borderRadius: 10 }]}>
          <View style={MainStyles.layoutTabPayment}>
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
                <View style={MainStyles.rowMargin}>
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
                  data?.DataService?.OtherService.map(item => (
                    <View key={item.ServiceDetailId.toString()}>
                      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>🔸{item.ServiceDetailName}</Text>
                    </View>
                  ))
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
          </View>
        </View>

        {
          data?.DataService?.ServiceDetaiil?.length > 0 && (
            <View style={[MainStyles.containerTabPayment, { backgroundColor: colors.WHITE, padding: 10, margin: 10, borderRadius: 10 }]}>
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
          )
        }
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
          <CustomLabel color={colors.WHITE}>Thanh toán tiền mặt </CustomLabel>
        </View>
        <View style={[MainStyles.cardContentJob, { backgroundColor: colors.MAIN_BLUE_CLIENT, paddingVertical: 8, borderRadius: 10 }]}>
          <View style={MainStyles.flexRowCenter}>
            <View>
              <Text style={
                {
                  color: colors.WHITE,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }
              }>Tổng tiền</Text>
              <View style={MainStyles.flexRowCenter}>
                <Image
                  source={ic_coin}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={
                  {
                    color: colors.MAIN_COLOR_CLIENT,
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: '700',
                  }
                }>{FormatMoney(data?.DataService?.PriceAfterDiscount)} vnđ</Text>
              </View>
            </View>
          </View>
        </View>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};

export default CashScreen;