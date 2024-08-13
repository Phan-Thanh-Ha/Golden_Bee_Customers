import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import React from "react";
import { PropTypes } from "prop-types";

const BtnDouble = ({
  isLoading1,
  isLoading2,
  title1,
  title2,
  onConfirm1,
  onConfirm2,
  btn1Visible = true,
  btn2Visible = true,
  bgColor1 = "#4CAF50",
  bgColor2 = "#F44336",
}) => {
  return (
    <View style={styles.buttonContainer}>
      {btn1Visible && (
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: bgColor1 }]}
          onPress={onConfirm1}
        >
          {isLoading1 ? (
            <Spinner />
          ) : (
            <Text style={styles.buttonText}>{title1}</Text>
          )}
        </TouchableOpacity>
      )}

      {btn2Visible && (
        <TouchableOpacity
          style={[styles.cancelButton, { backgroundColor: bgColor2 }]}
          onPress={onConfirm2}
        >
          {isLoading2 ? (
            <Spinner />
          ) : (
            <Text style={styles.buttonText}>{title2}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

BtnDouble.defaultProps = {
  isLoading1: false,
  isLoading2: false,
  title1: "",
  title2: "",
  onConfirm1: () => {},
  onConfirm2: () => {},
  btn1Visible: true,
  btn2Visible: true,
  bgColor1: "#4CAF50",
  bgColor2: "#F44336",
};
BtnDouble.propTypes = {
  isLoading1: PropTypes.bool,
  isLoading2: PropTypes.bool,
  title1: PropTypes.string,
  title2: PropTypes.string,
  onConfirm1: PropTypes.func,
  onConfirm2: PropTypes.func,
  btn1Visible: PropTypes.bool,
  btn2Visible: PropTypes.bool,
  bgColor1: PropTypes.string,
  bgColor2: PropTypes.string,
};

export default BtnDouble;
