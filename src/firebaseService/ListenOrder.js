import { firebase } from "@react-native-firebase/database";
import BookingsListMiddleware from "../Utils/BookingsListMiddleware";

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
  setModalOrderRemoveVisible
) => {
  if (!customerId) {
    // console.error("Invalid value for customerId:");
    return;
  }

  let initialLoadComplete = false;

  const handleOrderChange = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
    const orderChanged = { ...order, orderId };
    if (orderChanged?.StatusOrder === 1) {
      setOrderChange({ ...order, orderId });
    }
    if (orderChanged?.StatusOrder === 1) {
      setModalOrderChangeVisible(true);
    }
    setMyOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.OrderId === orderId
      );

      if (existingOrderIndex > -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = { ...order, OrderId: orderId };
        return updatedOrders;
      } else {
        return prevOrders;
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

      if (
        order?.StatusOrder === 1 ||
        order?.StatusOrder === 2 ||
        order?.StatusOrder === 3
      ) {
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
        // console.log("Initial orders loaded:", initialOrders);
      } else {
        setMyOrders([]);
        console.log("No initial orders found.");
      }

      initialLoadComplete = true;

      myOrdersRef.on("child_changed", handleOrderChange);
      myOrdersRef.on("child_removed", handleOrderRemove);
    });

    return () => {
      myOrdersRef.off("child_changed", handleOrderChange);
      myOrdersRef.off("child_removed", handleOrderRemove);
    };
  } catch (error) {
    console.error("Error listening for orders: ", error);
  }
};

export const OVG_GetOrdersByBookingCode = (bookingCode, callback) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return;
  }

  if (typeof callback !== "function") {
    console.error("Invalid callback function.");
    return;
  }

  try {
    databaseOrder.on("value", (snapshot) => {
      const orders = snapshot.val();
      const filteredOrders = [];

      if (orders) {
        for (const orderId in orders) {
          if (orders[orderId].BookingCode === bookingCode) {
            filteredOrders.push(orders[orderId]);
          }
        }
      }

      callback(BookingsListMiddleware(filteredOrders));
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const OVG_FBRT_ListenOrderUpdate = (
  orderId,
  onOrderUpdate,
  onOrderRemoved
) => {
  if (!orderId) {
    console.error("Order ID is required for listening to updates.");
    return null;
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
        console.error("Error handling order update:", error);
      }
    };

    const handleOrderRemoved = () => {
      try {
        onOrderRemoved();
      } catch (error) {
        console.error("Error handling order removal:", error);
      }
    };

    orderRef.on("value", handleOrderUpdate);
    orderRef.on("child_removed", handleOrderRemoved);

    // Return unsubscribe function
    return () => {
      try {
        orderRef.off("value", handleOrderUpdate);
        orderRef.off("child_removed", handleOrderRemoved);
      } catch (error) {
        console.error("Error removing listeners:", error);
      }
    };
  } catch (error) {
    console.error("Error setting up Firebase listener:", error);
    throw new Error("Unable to set up Firebase listener");
  }
};

export const OVG_FBRT_ListentOrderById = (orderId, callback) => {
  const orderRef = databaseOrder.child(orderId);

  orderRef.on("value", (snapshot) => {
    const orderData = snapshot.val();
    if (orderData) {
      callback(orderData);
    }
  });

  // Trả về hàm để hủy bỏ lắng nghe khi component unmount
  return () => orderRef.off();
};

// Hàm lắng nghe danh sách đơn hàng theo CustomerId
export const OVG_FBRT_ListentOrderByCustomerId = (customerId, callback) => {
  const myOrdersRef = databaseOrder
    .orderByChild("ClientId")
    .equalTo(customerId);

  myOrdersRef.once(
    "value",
    (snapshot) => {
      const ordersData = snapshot.val();

      const ordersList = ordersData
        ? Object.keys(ordersData).map((orderId) => ({
            ...ordersData[orderId],
            OrderId: orderId,
          }))
        : [];
      callback(ordersList);
    },
    (error) => {
      console.error("Error fetching orders: ", error);
      callback([]);
    }
  );

  // Trả về hàm để hủy bỏ lắng nghe khi component unmount
  return () => myOrdersRef.off();
};

export const OVG_FBRT_PlaceOrder = async (
  clientId,
  bookingCode,
  dataBooking,
  latitudeCustomer,
  longitudeCustomer
) => {
  const newOrder = {
    ClientId: clientId,
    OrderId: bookingCode,
    DataService: dataBooking,
    StaffId: "",
    StaffName: "",
    StaffPhone: "",
    LatitudeCustomer: latitudeCustomer,
    LongitudeCustomer: longitudeCustomer,
    CreateAt: Date.now(),
    BookingCode: bookingCode,
    StatusOrder: 0,
  };
  try {
    await databaseOrder.child(bookingCode).set(newOrder);
    console.log("Order placed successfully:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error placing order: ", error);
    return null;
  }
};

// Xóa đơn hàng sau 10 phút
export const deleteOrderIfNotAccepted = (orderId, createAt) => {
  const currentTime = Date.now();
  if (currentTime - createAt > 10 * 60 * 1000) {
    databaseOrder.child(orderId).remove();
    console.log("Order deleted due to timeout:", orderId);
  }
};

// Kiểm tra và xóa đơn hàng chưa nhận sau 10 phút
export const checkAndDeleteExpiredOrders = () => {
  console.log("Checking and deleting expired orders");
  databaseOrder.on("value", (snapshot) => {
    const orders = snapshot.val();
    console.log("Orders snapshot received for deletion check:", orders);
    if (orders) {
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        if (order.StaffId === "") {
          deleteOrderIfNotAccepted(orderId, order.createAt);
        }
      });
    }
  });
};
