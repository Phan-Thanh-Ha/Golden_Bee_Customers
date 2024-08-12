import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import FormRequirementInfomation from "./FormRequirementInfomation";

const CheckForm = () => {
  return (
    <SafeAreaView style={styles.formContainer}>
      <FormRequirementInfomation />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
});
export default CheckForm;
