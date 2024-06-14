import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BookingCard from '../../components/BookingCard';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/Colors';
import LogoBeeBox from '../../components/LogoBeeBox';
import Box from '../../components/Box';
import { dataBooing } from '../data';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const History = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [tab, setTab] = useState(1);
  const bottomModalRef = useRef(null);

  const openBottomSheet = (booking) => {
    console.log("click")
    setSelectedBooking(booking);
    bottomModalRef.current.present();
  };

  const renderTabContent = () => {
    switch (tab) {
      case 1:
        return <TabContent1 openBottomSheet={openBottomSheet} />;
      case 2:
        return <TabContent2 openBottomSheet={openBottomSheet} />;
      default:
        return <TabContent1 openBottomSheet={openBottomSheet} />;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Box height={SCREEN_HEIGHT * 0.01} />
      <LogoBeeBox color={colors.WHITE} sizeImage={SCREEN_WIDTH / 5} sizeText={20} />
      {/* Tab Header */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.btnTab, tab === 1 ? styles.btnTabActive : null]}
          onPress={() => setTab(1)}>
          <Text style={[styles.tabText, tab === 1 ? styles.tabTextActive : null]}>
            Đang diễn ra
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnTab, tab === 2 ? styles.btnTabActive : null]}
          onPress={() => setTab(2)}>
          <Text style={[styles.tabText, tab === 2 ? styles.tabTextActive : null]}>
            Gần đây
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
      {/* Modal Detail */}
      <BottomSheetModal
        ref={bottomModalRef}
        index={1}
        snapPoints={['40%', '60%', '80%']}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      >
        {selectedBooking && <>hi</>}
      </BottomSheetModal>
    </View>
  );
};

/* Nội dung Tab 1 */
const TabContent1 = ({ openBottomSheet }) => (
  <View style={styles.tabContent}>
    {/* Thêm */}
    <FlatList
      data={dataBooing.slice(0, 1)}
      renderItem={({ item }) => (
        <BookingCard data={item} onPress={openBottomSheet} />
      )}
      keyExtractor={(item) => item.ServiceId.toString()}
    />
    <Box height={SCREEN_HEIGHT * 0.05} />
  </View>
);

/* Nội dung Tab 2 */
const TabContent2 = ({ openBottomSheet }) => (
  <View style={styles.tabContent}>
    {/* Thêm */}
    <FlatList
      data={dataBooing}
      renderItem={({ item }) => (
        <BookingCard data={item} onPress={openBottomSheet} />
      )}
      keyExtractor={(item) => item.ServiceId}
    />
    <Box height={SCREEN_HEIGHT * 0.05} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    paddingVertical: SCREEN_HEIGHT * 0.01,
  },
  btnTab: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.005,
  },
  btnTabActive: {
    backgroundColor: colors.MAIN_COLOR_CLIENT,
  },
  tabText: {
    color: colors.MAIN_COLOR_CLIENT,
    fontSize: SCREEN_WIDTH * 0.04,
  },
  tabTextActive: {
    color: colors.WHITE,
  },
  tabContent: {
    padding: 10,
  },
  tabContentText: {
    fontSize: SCREEN_WIDTH * 0.05,
    color: colors.MAIN_COLOR_CLIENT,
  },
  scrollView: {
    flex: 1,
  },
});

export default History;
