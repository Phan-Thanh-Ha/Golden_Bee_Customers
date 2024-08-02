import { FlatList, StyleSheet } from "react-native";
import CardNewJob from "./CardNewJob";
import CardDefault from "./CardDefault";

const TabPending = ({ modalRef, dataPending = [] }) => {
  return (
    <>
      {dataPending?.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={dataPending}
          renderItem={({ item }) => (
            <CardNewJob data={item} modalRef={modalRef} />
          )}
          keyExtractor={(item) => item?.BookingId}
        />
      ) : (
        <CardDefault title={"Bạn chưa đặt dịch vụ nào"} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default TabPending;
