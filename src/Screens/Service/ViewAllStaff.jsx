import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const ViewAllStaff = ({ route }) => {
  const { bookingCode } = route.params;
  const [staffInformation, setStaffInformation] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const customerLocation = {
    latitude: 10.8827167830537,
    longitude: 106.6448357887566,
  };

  // const fetchStaffInformation = useCallback(async () => {
  //   try {
  //     const staffInfoList = await OVG_GetStaffInformationByBookingCode(bookingCode);
  //     setStaffInformation(staffInfoList);
  //   } catch (error) {
  //     console.error("Error fetching staff information:", error);
  //   }
  // }, [bookingCode]);

  // useEffect(() => {
  //   fetchStaffInformation();
  //   const interval = setInterval(fetchStaffInformation, 5000);

  //   return () => clearInterval(interval);
  // }, [fetchStaffInformation]);

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: customerLocation.latitude,
          longitude: customerLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={customerLocation} title="Customer Location" />
        {staffInformation.map((staff, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: staff.LatitudeStaff, longitude: staff.LongitudeStaff }}
            title={staff.StaffName}
            description={staff.StaffPhone}
            pinColor={selectedStaff === staff.StaffId ? 'blue' : 'red'}
            onPress={() => setSelectedStaff(staff.StaffId)}
          />
        ))}
        {selectedStaff && (
          <Polyline
            coordinates={[
              {
                latitude: staffInformation.find(staff => staff.StaffId === selectedStaff).LatitudeStaff,
                longitude: staffInformation.find(staff => staff.StaffId === selectedStaff).LongitudeStaff
              },
              customerLocation
            ]}
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
        {!selectedStaff && staffInformation.map((staff, index) => (
          <Polyline
            key={index}
            coordinates={[
              { latitude: staff.LatitudeStaff, longitude: staff.LongitudeStaff },
              customerLocation
            ]}
            strokeColor="red"
            strokeWidth={1}
          />
        ))}
      </MapView>
      <View style={styles.staffList}>
        {staffInformation.map((staff, index) => (
          <TouchableOpacity key={index} style={styles.staffItem} onPress={() => setSelectedStaff(staff.StaffId)}>
            <Text style={styles.staffName}>{staff.StaffName}</Text>
            <Text style={styles.staffPhone}>{staff.StaffPhone}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  staffList: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  staffItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  staffPhone: {
    fontSize: 14,
    color: '#666',
  },
});

export default ViewAllStaff;
