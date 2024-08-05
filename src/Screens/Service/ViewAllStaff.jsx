import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../Utils";
import { colors } from "../../styles/Colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { OVG_GetOrdersByBookingCode } from "../../firebaseService/ListenOrder";

const ViewAllStaff = () => {
  const BookingCode = "OVG-03082402424669";
  const [booking, setBooking] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  useEffect(() => {
    OVG_GetOrdersByBookingCode(BookingCode, setBooking);
  }, []);

  const mapView = useMemo(() => {
    if (!booking) return null;

    const { LatitudeCustomer, LongitudeCustomer, StaffInformation } = booking[0];

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(LatitudeCustomer),
          longitude: parseFloat(LongitudeCustomer),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(LatitudeCustomer),
            longitude: parseFloat(LongitudeCustomer),
          }}
          title="Khách hàng"
          pinColor={colors.MAIN_COLOR_CLIENT}
        />

        {StaffInformation.map((staff, index) => (
          <Marker
            key={staff.StaffId}
            coordinate={{
              latitude: parseFloat(staff.LatitudeStaff),
              longitude: parseFloat(staff.LongitudeStaff),
            }}
            title={staff.StaffName}
            pinColor={colors.SUCCESS}
          />
        ))}

        {(showAllRoutes ? StaffInformation : selectedStaff ? [selectedStaff] : []).map((staff) => (
          <MapViewDirections
            key={staff.StaffId}
            origin={{
              latitude: parseFloat(staff.LatitudeStaff),
              longitude: parseFloat(staff.LongitudeStaff),
            }}
            destination={{
              latitude: parseFloat(LatitudeCustomer),
              longitude: parseFloat(LongitudeCustomer),
            }}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor={colors.MAIN_COLOR_CLIENT}
          />
        ))}
      </MapView>
    );
  }, [booking, selectedStaff, showAllRoutes]);

  const renderStaffItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.staffItem,
        selectedStaff?.StaffId === item.StaffId && styles.selectedStaffItem,
      ]}
      onPress={() => setSelectedStaff(item)}
    >
      <Text style={styles.staffName}>{item.StaffName}</Text>
      <Text style={styles.staffPhone}>{item.StaffPhone}</Text>
      <Text style={styles.staffStatus}>
        Trạng thái: {item.StatusOrder === 1 ? "Đang chuẩn bị" : "Đang di chuyển"}
      </Text>
    </TouchableOpacity>
  );

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>{mapView}</View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => setShowAllRoutes(!showAllRoutes)}
        >
          <Text style={styles.showAllButtonText}>
            {showAllRoutes ? "Ẩn tất cả lộ trình" : "Xem tất cả lộ trình"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={booking[0].StaffInformation}
          renderItem={renderStaffItem}
          keyExtractor={(item) => item.StaffId.toString()}
          contentContainerStyle={styles.staffList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mapContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
  },
  showAllButton: {
    backgroundColor: colors.MAIN_COLOR_CLIENT,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  showAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  staffList: {
    padding: 10,
  },
  staffItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedStaffItem: {
    backgroundColor: colors.LIGHT_BLUE,
  },
  staffName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  staffPhone: {
    color: colors.GRAY,
  },
  staffStatus: {
    marginTop: 5,
    color: colors.SUCCESS,
  },
});

export default ViewAllStaff;