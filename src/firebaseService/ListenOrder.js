import { firebase } from "@react-native-firebase/database";
import { deepEqualObject } from "../utils/Equals";

export const databaseOrder = firebase
  .app()
  .database(
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
  )
  .ref("/order");

export const OVG_FBRT_ListenMyOrders = (
  customerId,
  setMyOrders,
  setOrderChange,
  setModalOrderChangeVisible,
  setOrderRemove,
  setModalOrderRemoveVisible,
  setOrderAdd,
  setModalOrderAddVisible
) => {
  if (!customerId) {
    console.error("Invalid value for customerId:", customerId);
    return;
  }

  let initialLoadComplete = false;

  const handleOrderChange = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
    console.log("Order changed:", { ...order, orderId });

    setOrderChange({ ...order, orderId });

    setMyOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.OrderId === orderId
      );

      if (existingOrderIndex > -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = { ...order, OrderId: orderId };
        // setModalOrderChangeVisible(true);
        return updatedOrders;
      } else {
        return prevOrders;
      }
    });
  };

  const handleOrderAdd = (snapshot) => {
    if (!initialLoadComplete) return;

    const order = snapshot.val();
    const orderId = snapshot.key;

    setMyOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.OrderId === orderId
      );
      if (existingOrderIndex > -1) {
        return prevOrders;
      } else {
        const updatedOrders = [...prevOrders, { ...order, OrderId: orderId }];
        const orderAdded = { ...order, orderId };
        console.log("Order added:", orderAdded);

        if (
          orderAdded?.StatusOrder === 0 ||
          orderAdded?.StatusOrder === 1 ||
          !orderAdded?.StatusOrder
        ) {
          // setModalOrderAddVisible(true);
        }
        setOrderAdd(orderAdded);
        return updatedOrders;
      }
    });
  };

  const handleOrderRemove = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
    const orderRemoved = { ...order, orderId };
    console.log("Order removed:", orderRemoved);

    setMyOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((o) => o.OrderId !== orderId);

      if (order?.StatusOrder === 1 || order?.StatusOrder === 2) {
        setModalOrderRemoveVisible(true);
      }

      setOrderRemove(orderRemoved);
      return updatedOrders;
    });
  };

  try {
    console.log(
      "Initializing and listening for orders for customer:",
      customerId
    );

    const myOrdersRef = databaseOrder
      .orderByChild("ClientId")
      .equalTo(customerId);

    myOrdersRef.once("value", (snapshot) => {
      const orders = snapshot.val();
      if (orders) {
        const initialOrders = Object.keys(orders).map((orderId) => ({
          ...orders[orderId],
          OrderId: orderId,
        }));
        setMyOrders(initialOrders);
        console.log("Initial orders loaded:", initialOrders);
      } else {
        setMyOrders([]);
        console.log("No initial orders found.");
      }

      initialLoadComplete = true;

      myOrdersRef.on("child_changed", handleOrderChange);
      myOrdersRef.on("child_added", handleOrderAdd);
      myOrdersRef.on("child_removed", handleOrderRemove);
    });

    return () => {
      myOrdersRef.off("child_changed", handleOrderChange);
      myOrdersRef.off("child_added", handleOrderAdd);
      myOrdersRef.off("child_removed", handleOrderRemove);
    };
  } catch (error) {
    console.error("Error listening for orders: ", error);
  }
};
export const OVG_FBRT_ListenOrderUpdate = (
  orderId,
  onOrderUpdate,
  onOrderRemoved
) => {
  // Kiểm tra dữ liệu đầu vào
  if (typeof orderId !== "string" || orderId.trim() === "") {
    throw new Error("orderId phải là một chuỗi không rỗng");
  }

  if (typeof onOrderUpdate !== "function") {
    throw new Error("onOrderUpdate phải là một hàm");
  }

  if (typeof onOrderRemoved !== "function") {
    throw new Error("onOrderRemoved phải là một hàm");
  }

  try {
    const orderRef = firebase
      .app()
      .database(
        "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
      )
      .ref(`/order/${orderId}`);

    const handleOrderUpdate = (snapshot) => {
      try {
        const order = snapshot.val();
        if (order) {
          onOrderUpdate(order);
        } else {
          onOrderRemoved();
        }
      } catch (error) {
        console.error("Lỗi khi xử lý cập nhật đơn hàng:", error);
      }
    };

    const handleOrderRemoved = () => {
      try {
        onOrderRemoved();
      } catch (error) {
        console.error("Lỗi khi xử lý đơn hàng bị xóa:", error);
      }
    };

    orderRef.on("value", handleOrderUpdate);
    orderRef.on("child_removed", handleOrderRemoved);

    // Trả về hàm hủy lắng nghe để có thể sử dụng khi cần thiết
    return () => {
      try {
        orderRef.off("value", handleOrderUpdate);
        orderRef.off("child_removed", handleOrderRemoved);
      } catch (error) {
        console.error("Lỗi khi hủy lắng nghe:", error);
      }
    };
  } catch (error) {
    console.error("Lỗi khi thiết lập lắng nghe Firebase:", error);
    throw new Error("Không thể thiết lập lắng nghe Firebase");
  }
};
