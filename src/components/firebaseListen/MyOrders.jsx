import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ListenOrderChange from "./ListenOrderChange";
import ListenOrderRemove from "./ListenOrderRemove"; // Sửa import này
import ListenOrderAdd from "./ListenOrderAdd"; // Sửa import này
import { mainAction } from "../../Redux/Action";
import { OVG_FBRT_ListenMyOrders } from "../../firebaseService/ListenOrder";
import { useNavigation } from "@react-navigation/native";

const MyOrders = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const myOrdersAccepted = useSelector((state) => state.main.myOrdersAccepted);
  const [myOrders, setMyOrders] = useState(myOrdersAccepted);
  const navi = useNavigation();
  /* change */
  const [orderChange, setOrderChange] = useState({});
  const [modalOrderChangeVisible, setModalOrderChangeVisible] = useState(false);

  const handleConfirmOrderChange = () => {
    // console.log("handleConfirmOrderChange");
  };

  /* remove */
  const [orderRemove, setOrderRemove] = useState({});
  const [modalOrderRemoveVisible, setModalOrderRemoveVisible] = useState(false);

  const handleConfirmOrderRemove = () => {
    // console.log("handleConfirmOrderRemove");
  };

  /* Add */
  const [orderAdd, setOrderAdd] = useState({});
  const [modalOrderAddVisible, setModalOrderAddVisible] = useState(false);

  const handleConfirmOrderAdd = () => {
    // console.log("handleConfirmOrderAdd");
  };

  useEffect(() => {
    const unsubscribe = OVG_FBRT_ListenMyOrders(
      userLogin?.Id,
      setMyOrders,
      setOrderChange,
      setModalOrderChangeVisible,
      setOrderRemove,
      setModalOrderRemoveVisible,
      setOrderAdd,
      setModalOrderAddVisible
    );
    return () => {
      unsubscribe ? unsubscribe() : null;
    };
  }, [userLogin?.Id]);

  useEffect(() => {
    if (myOrders?.length > 0) {
      mainAction.acceptedOrder(myOrders?.length, dispatch);
    } else {
      mainAction.acceptedOrder(0, dispatch);
    }
  }, [myOrders?.length]);
  // console.log("myOrders", myOrders);
  // console.log("-----------------------------------------------------");
  // console.log("myOrders", myOrders);
  // console.log("check order remove", orderRemove);
  // console.log("check order remove on ", modalOrderRemoveVisible);
  // console.log("-----------------------------------------------------");

  return userLogin ? (
    <>
      <View>
        <ListenOrderChange
          orderChange={orderChange}
          isModalVisible={modalOrderChangeVisible}
          setModalVisible={setModalOrderChangeVisible}
          onConfirm={handleConfirmOrderChange}
        />
        <ListenOrderRemove
          orderRemove={orderRemove}
          isModalVisible={modalOrderRemoveVisible}
          setModalVisible={setModalOrderRemoveVisible}
          onConfirm={handleConfirmOrderRemove}
          navi={navi}
        />
        <ListenOrderAdd
          orderAdd={orderAdd}
          isModalVisible={modalOrderAddVisible}
          setModalVisible={setModalOrderAddVisible}
          onConfirm={handleConfirmOrderAdd}
        />
      </View>
    </>
  ) : null;
};

export default MyOrders;
