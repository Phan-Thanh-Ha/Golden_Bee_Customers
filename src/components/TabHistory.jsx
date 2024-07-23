// import { dataJobDone } from "../Screens/data";
import CardJobDone from "./CardJobDone";
import { FlatList, StyleSheet, View } from "react-native";
import CardDefault from "./CardDefault";
import { useDispatch, useSelector } from "react-redux";
import { GroupUserId } from "../Utils";
import { mainAction } from "../Redux/Action";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../styles/MainStyle";

const TabHistory = ({ modalJobDoneRef }) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [dataJobDone, setDataJobDone] = useState([]);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      OVG_spBookingServices_List();
    }, [])
  );
  const OVG_spBookingServices_List = async () => {
    try {
      const pr = {
        Id: 0,
        OfficerId: 0,
        CustomerId: userLogin.Id,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spBookingServices_List",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setDataJobDone(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Result: ", dataJobDone);
  const renderFooter = () => <View style={{ height: SCREEN_HEIGHT * 0.05 }} />;
  return (
    dataJobDone?.length > 0 ? (
      <FlatList
        style={styles.flatList}
        data={dataJobDone}
        renderItem={({ item }) => (
          <CardJobDone data={item} modalRef={modalJobDoneRef} />
        )}
        keyExtractor={(item) => item?.BookingServiceCode}
        ListFooterComponent={renderFooter}
      />
    ) : (
      <CardDefault title={"Chưa có dịch vụ đã đặt"} />
    )
  );
}
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default TabHistory;