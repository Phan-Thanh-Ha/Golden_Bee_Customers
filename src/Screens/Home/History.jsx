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

const History = () => {
  const [selectedTab, setSelectedTab] = useState('Đang Làm Việc');
  const myOrdersAccepted = useSelector((state) => state.main.myOrdersAccepted);
  const modalRef = useRef(null);

  console.log("myOrdersAccepted redux : ", myOrdersAccepted);
  const renderContent = () => {
    if (selectedTab === 'Đang Làm Việc') {
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
          <CardDefault title={"Bạn chưa có đơn dịch vụ nào"} />
        )

      );
    } else if (selectedTab === 'Dịch Vụ Đã Đặt') {
      return (
        <FlatList
          style={styles.flatList}
          data={[]}
          renderItem={({ item }) => (
            <CardJobDone data={item} />
          )}
          keyExtractor={(item) => item?.id}
        />
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
                selectedTab === 'Đang Làm Việc' && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab('Đang Làm Việc')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'Đang Làm Việc' && styles.selectedTabButtonText,
                ]}
              >
                Đang Làm Việc
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Dịch Vụ Đã Đặt' && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab('Dịch Vụ Đã Đặt')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'Dịch Vụ Đã Đặt' && styles.selectedTabButtonText,
                ]}
              >
                Dịch Vụ Đã Đặt
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </View>
      </View>
      <JobDetailsModal ref={modalRef} />
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
