import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FormRequirementInfomation from "./FormRequirementInfomation";
import { UseInset } from "../../Hooks";
import { colors } from "../../styles/Colors";
import ItemAddress from "../../components/ItemAddress";
import { dataLocation } from "../data";

const CheckForm = () => {
  const handlePress = () => {
    console.log("test");
  };
  const prss = () => {
    console.log("test");
  };
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
