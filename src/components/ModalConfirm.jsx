import React from "react";
import { Text, View } from "react-native";
import MainStyles from "../styles/MainStyle";
import AlertModal from "./AlertModal";
import { PropTypes } from "prop-types";

const ModalConfirm = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm,
  modalTitle = "Xác nhận yêu cầu",
  btnConfirmTiTle = "Xác nhận",
  backdropClose = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    setModalVisible(false);
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      isAuto={false}
      onConfirm={handleConfirm}
      title={modalTitle}
      backdropCloseable={backdropClose}
      isCancelable={false}
      btnConfirmTiTle={btnConfirmTiTle}
    >
      <View>
        <View style={[MainStyles.cardJob]}>
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[{ textAlign: "center" }]}>{title}</Text>
          </View>
        </View>
      </View>
    </AlertModal>
  );
};

ModalConfirm.defaultProps = {
  title: "",
  isModalVisible: false,
  setModalVisible: () => {},
  onConfirm: () => {},
  modalTitle: "Xác nhận yêu cầu",
  btnConfirmTiTle: "Xác nhận",
  backdropClose: false,
};
ModalConfirm.propTypes = {
  title: PropTypes.string,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm: PropTypes.func,
  modalTitle: PropTypes.string,
  btnConfirmTiTle: PropTypes.string,
  backdropClose: PropTypes.bool,
};

export default ModalConfirm;
