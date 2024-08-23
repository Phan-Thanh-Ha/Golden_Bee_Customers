import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import MainStyles, { SCREEN_HEIGHT } from '../../styles/MainStyle';
import { Spinner } from '@ui-kitten/components';
import Loading from '../Loading';
import { colors, themeColors } from '../../styles/Colors';
import BeeFlying from '../BeeFlying';

const BlockModal = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm,
  onRetry,
  isConfirmable = true,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onRetry}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={MainStyles.flexRowCenter}>
          <View style={styles.line} />
        </View>
        <View style={MainStyles.flexRowCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <BeeFlying />

        {
          isConfirmable ? (
            <TouchableOpacity style={styles.confirmButton}
              onPress={() => {
                setLoading(true);
                onRetry();
                setTimeout(() => {
                  setLoading(false);
                }, 5000)
              }}>
              {
                loading ? (
                  <Spinner status="warning" />
                ) : (
                  <Text style={styles.confirmButtonText}>Kiểm tra lại</Text>
                )
              }
            </TouchableOpacity>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Loading />
            </View>
          )
        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: SCREEN_HEIGHT * 0.45,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  line: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    marginBottom: 15,
  },
  title: {
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: themeColors.confirm,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#6c757d",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BlockModal;
