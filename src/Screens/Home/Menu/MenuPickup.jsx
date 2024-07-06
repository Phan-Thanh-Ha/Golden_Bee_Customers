import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { DataMenu, dataMenuApi } from "../../data";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../../styles/MainStyle";
import { units } from "../../../Utils";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../Constants";
import { getIconById } from "../../../Utils/RoutingService";
import { useSelector } from "react-redux";
import ModalAlertSelectOption from "../../../components/modal/ModalAlertSelectOption";
import ModalRequired from "../../../components/modal/ModalRequired";

export const MenuPickup = ({ onPress = () => { } }) => {
  const data = useSelector((state) => state.main.menuService);
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            onPress(item);
            navi.navigate(ScreenNames.ADDRESS_SEARCH, {
              service: item,
            });
          }}
        >
          <View
            style={{
              width: units.width("16%"),
            }}
          >
            <FastImage
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={
                getIconById(item.ServiceId)
                  ? getIconById(item.ServiceId)
                  : "https://picsum.photos/200"
              }
            />
            <View
              style={{
                textAlign: "center",
                marginVertical: 5,
                width: (SCREEN_WIDTH / 5) * 0.8,
              }}
            >
              <Text
                style={{ textAlign: "center", flexWrap: "wrap", fontSize: 12 }}
              >
                {item.ServiceName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={5}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 3,
    margin: 3,
    height: Dimensions.get("window").width / 5, // approximate a square
  },
});
