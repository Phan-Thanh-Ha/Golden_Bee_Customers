import React from "react";
import { Text, View } from "react-native";
import MainStyles from "../../styles/MainStyle";
import ModalSelectOption from "./ModalSelectOption";
import { PropTypes } from "prop-types";

const ModalAlertSelectOption = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm1,
  onConfirm2,
}) => {
  const handleConfirm1 = () => {
    onConfirm1();
    setModalVisible(false);
  };
  const handleConfirm2 = () => {
    onConfirm2();
    setModalVisible(false);
  };

  return (
    <ModalSelectOption
      titleBtn1={"Dùng vị trí cũ"}
      titleBtn2={"Vị trí mới"}
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      title="Xác nhận yêu cầu"
      backdropCloseable={true}
      onConfirm1={handleConfirm1}
      onConfirm2={handleConfirm2}
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
    </ModalSelectOption>
  );
};

ModalAlertSelectOption.defaultProps = {
  title: "Bạn có chắc chắn muốn thực hiện hành động này?",
  isModalVisible: false,
  setModalVisible: () => {},
  onConfirm1: () => {},
  onConfirm2: () => {},
};
ModalAlertSelectOption.propTypes = {
  title: PropTypes.string,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm1: PropTypes.func,
  onConfirm2: PropTypes.func,
};

export default ModalAlertSelectOption;
