import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import { useSelector } from 'react-redux';
import CardJobDone from '../../components/CardJobDone';
import CardNewJob from '../../components/CardNewJob';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import JobDetailsModal from '../../components/JobDetailsModal';
import CardDefault from '../../components/CardDefault';
import { useFocusEffect } from '@react-navigation/native';
import { mainAction } from '../../Redux/Action';
import { GroupUserId } from '../../Utils';
import { dataJobDone } from '../data';
import JobDoneModal from '../../components/JobDoneModal';

const History = () => {
  const [selectedTab, setSelectedTab] = useState('Đang làm việc');
  const myOrdersAccepted = useSelector((state) => state.main.myOrdersAccepted);
  const userLogin = useSelector((state) => state.main.userLogin);
  const modalRef = useRef(null);
  const modalJobDoneRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      if (modalRef.current) {
        modalRef.current.closeModal();
      }
      if (modalJobDoneRef.current) {
        modalJobDoneRef.current.closeModal();
      }
    }, [])
  );
  // const [dataJobDone, setDataJobDone] = useState([]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     OVG_spOfficer_Booking_Done();
  //   }, [])
  // );
  // const OVG_spOfficer_Booking_Done = async () => {
  //   try {
  //     const pr = {
  //       CustomerId: userLogin.Id,
  //       GroupUserId: GroupUserId,
  //     };
  //     const params = {
  //       Json: JSON.stringify(pr),
  //       func: "OVG_spOfficer_Booking_Done",
  //     };

  //     const result = await mainAction.API_spCallServer(params, dispatch);
  //     if (result) {
  //       console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
  //       setDataJobDone(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  dataJobDone:", dataJobDone);
  const renderContent = () => {
    if (selectedTab === 'Đang làm việc') {
      return (
        myOrdersAccepted?.length > 0 ? (
          <FlatList
            style={styles.flatList}
            data={myOrdersAccepted}
            renderItem={({ item }) => (
              <CardNewJob data={item} modalRef={modalRef} />
            )}
            keyExtractor={(item) => item?.orderId}
          />
        ) : (
          <CardDefault title={"Bạn chưa đặt dịch vụ nào"} />
        )

      );
    } else if (selectedTab === 'Dịch vụ đã đặt') {
      return (
        dataJobDone?.length > 0 ? (
          <FlatList
            style={styles.flatList}
            data={dataJobDone}
            renderItem={({ item }) => (
              <CardJobDone data={item} modalRef={modalJobDoneRef} />
            )}
            keyExtractor={(item) => item?.BookingServiceCode}
          />
        ) : (
          <CardDefault title={"Chưa có dịch vụ đã đặt"} />
        )
      );
    }
  };

  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <View style={{ height: SCREEN_HEIGHT * 0.73, width: SCREEN_WIDTH }}>
        <View style={styles.container}>
          <View style={styles.tabHeader}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Đang làm việc' && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab('Đang làm việc')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'Đang làm việc' && styles.selectedTabButtonText,
                ]}
              >
                Đang làm việc
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Dịch vụ đã đặt' && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab('Dịch vụ đã đặt')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'Dịch vụ đã đặt' && styles.selectedTabButtonText,
                ]}
              >
                Dịch vụ đã đặt
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </View>
      </View>
      <JobDetailsModal ref={modalRef} />
      <JobDoneModal ref={modalJobDoneRef} />
    </LayoutGradientBlue>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTabButton: {
    borderBottomColor: colors.WHITE,
    borderRadius: 5,
  },
  tabButtonText: {
    color: colors.WHITE,
    fontSize: 18,
  },
  selectedTabButtonText: {
    fontWeight: 'bold',
    color: colors.MAIN_BLUE_CLIENT,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default History;
