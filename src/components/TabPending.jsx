import { FlatList, StyleSheet } from "react-native";
import CardNewJob from "./CardNewJob";
import CardDefault from "./CardDefault";
import { useCallback, useEffect, useState } from "react";
import { OVG_FBRT_ListentOrderByCustomerId } from "../firebaseService/ListenOrder";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const TabPending = ({ modalRef }) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   // Khởi tạo lắng nghe dữ liệu từ Firebase
  //   const unsubscribe = OVG_FBRT_ListentOrderByCustomerId(userLogin?.Id, setOrders);
  //   // Hủy lắng nghe khi component unmount
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  const updateOrders = useCallback(() => {
    if (userLogin?.Id) {
      const unsubscribe = OVG_FBRT_ListentOrderByCustomerId(userLogin.Id, (ordersList) => {
        if (JSON.stringify(ordersList) !== JSON.stringify(orders)) {
          setOrders(ordersList);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [userLogin?.Id, orders]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = updateOrders();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [updateOrders])
  );
  console.log(orders);

  return (
    orders?.length > 0 ? (
      <FlatList
        style={styles.flatList}
        data={orders}
        renderItem={({ item }) => (
          <CardNewJob data={item} modalRef={modalRef} />
        )}
        keyExtractor={(item) => item?.orderId}
      />
    ) : (
      <CardDefault title={"Bạn chưa đặt dịch vụ nào"} />
    )

  );
  // <View>
  //   {orders.map(order => (
  //     <Text key={order.id}>{order.BookingCode}</Text>
  //   ))}
  // </View>
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default TabPending;