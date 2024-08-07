import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Datepicker, Tab, TabView } from "@ui-kitten/components";
import CardNewJob from "./CardNewJob";
import CardJobDone from "./CardJobDone";
import CardDefault from "./CardDefault";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { GroupUserId } from "../Utils";
import { mainAction } from "../Redux/Action";

export const TabCustom = ({ modalRef, modalJobDoneRef, height }) => {
  const myOrdersAccepted = useSelector((state) => state.main.myOrdersAccepted);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [dataDoing, setDataDoing] = useState([]);
  const [dataJobDone, setDataJobDone] = useState([]);
  console.log("acceptedOrder redux : ", myOrdersAccepted);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      OVG_spBooking_Service_List();
    }, [])
  );
  const OVG_spBooking_Service_List = async () => {
    try {
      const pr = {
        CustomerId: userLogin.Id,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spBooking_Service_List",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setDataDoing(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ height, padding: 10 }}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={styles.tabView}
      >
        <Tab style={{ height: 40 }} title="Đang làm việc">
          {myOrdersAccepted?.length > 0 ? (
            <>
              <FlatList
                data={myOrdersAccepted}
                renderItem={({ item, index }) => (
                  <CardNewJob data={item} modalRef={modalRef} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          ) : (
            <CardDefault title={"Bạn chưa có đơn dịch vụ nào"} />
          )}
        </Tab>
        <Tab style={{ height: 40 }} title="Dịch vụ đã đặt">
          {dataJobDone?.length > 0 ? (
            <>
              <FlatList
                data={dataJobDone}
                renderItem={({ item, index }) => (
                  <CardJobDone
                    key={index}
                    data={item}
                    modalRef={modalJobDoneRef}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          ) : (
            <CardDefault title="Chưa có dịch vụ đã đặt" />
          )}
        </Tab>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
});

export default TabCustom;
