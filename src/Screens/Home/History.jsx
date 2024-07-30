import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import JobDetailsModal from '../../components/JobDetailsModal';
import JobDoneModal from '../../components/JobDoneModal';
import TabPending from '../../components/TabPending';
import TabHistory from '../../components/TabHistory';
import { useSelector } from 'react-redux';
import MyOrders from '../../components/firebaseListen/MyOrders';

const History = () => {
  const [selectedTab, setSelectedTab] = useState('Đang làm việc');
  const modalRef = useRef(null);
  const userLogin = useSelector((state) => state.main.userLogin);
  const modalJobDoneRef = useRef(null);
  const [dataPending, setDataPending] = useState([]);
  const renderContent = () => {
    if (selectedTab === 'Đang làm việc') {
      return (
        <TabPending modalRef={modalRef} dataPending={dataPending} />
      );
    } else if (selectedTab === 'Dịch vụ đã đặt') {
      return (
        <TabHistory modalRef={modalJobDoneRef} />
      );
    }
  };

  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.MAIN_COLOR_CLIENT} sizeImage={SCREEN_WIDTH * 0.15} sizeText={18} />
      <View style={{ height: SCREEN_HEIGHT * 0.74, width: SCREEN_WIDTH }}>
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
      {
        userLogin ? (
          <>
            <MyOrders setOrders={setDataPending} isListen={false} />
          </>
        ) : null
      }
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
    color: colors.MAIN_COLOR_CLIENT,
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
