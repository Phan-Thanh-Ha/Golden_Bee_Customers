import CardJobDone from "./CardJobDone";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import CardDefault from "./CardDefault";
import { useDispatch, useSelector } from "react-redux";
import { GroupUserId } from "../Utils";
import { mainAction } from "../Redux/Action";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../styles/MainStyle";
import React from "react";

const TabHistory = ({ modalJobDoneRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);
  const [dataJobDone, setDataJobDone] = useState([]);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      OVG_spBookingServices_By_Customer();
    }, [])
  );
  const OVG_spBookingServices_By_Customer = async () => {
    setIsLoading(true);
    try {
      const pr = {
        CustomerId: userLogin.Id,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spBookingServices_By_Customer",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      // console.log("🚀 ~ ---------------------------", result);
      if (result) {
        setDataJobDone(result);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };
  const renderFooter = () => <View style={{ height: SCREEN_HEIGHT * 0.05 }} />;
  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : dataJobDone?.length > 0 ? (
    <FlatList
      style={styles.flatList}
      data={dataJobDone}
      renderItem={({ item, index }) => (
        <CardJobDone data={item} modalRef={modalJobDoneRef} key={index} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
    />
  ) : (
    <CardDefault title={"Chưa có dịch vụ đã đặt"} />
  );
};
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default TabHistory;
