import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import BlockModal from "../components/modal/BlockModal";

const HealthCheck = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Initial check for internet connection
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          setModalMessage(
            "Không có kết nối internet. Vui lòng kiểm tra kết nối của bạn."
          );
          setModalVisible(true);
        }
      });

      const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
        if (!state.isConnected) {
          setModalMessage(
            "Không có kết nối internet. Vui lòng kiểm tra kết nối của bạn."
          );
          setModalVisible(true);
        } else {
          setModalVisible(false);
        }
      });

      return () => {
        unsubscribeNetInfo();
      };
    }, 10000); // Start after 10 seconds

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  return (
    <BlockModal
      title={modalMessage}
      isModalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onConfirm={() => {}}
      isConfirmable={false}
    />
  );
};

export default HealthCheck;
