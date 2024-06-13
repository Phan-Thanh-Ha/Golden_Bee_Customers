import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY, getData, setData } from "../../Utils";
import Label from "../../components/Label";
import ItemAddress from "../../components/ItemAddress";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";
import axios from "axios";
import { ScreenNames } from "../../Constants";
const AddressSearch = () => {
  const navi = useNavigation();
  const API_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const route = useRoute();
  const [dataAddressSearch, setDataAddressSearch] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataAddressLocal = async () => {
    const dataAddress = await getData("ADDRESS_SEARCH");
    if (dataAddress) {
      setDataAddressSearch(dataAddress);
    }
  };

  // Hàm nhập địa chỉ tìm kiếm từ Google
  const handleChangeText = async (text) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          input: text,
          key: GOOGLE_API_KEY,
          components: "country:vn",
        },
      });

      const data = response.data;

      if (data.predictions.length > 0) {
        const dataSeachLocation = data.predictions.map((item) => ({
          name: item.description,
        }));
        console.log(
          "-----> 👿👿👿 <-----  dataSeachLocation:",
          dataSeachLocation
        );

        setDataAddressSearch(dataSeachLocation);

        // LocalStore
        await setData("ADDRESS_SEARCH", dataSeachLocation);
        setIsLoading(false);
      } else {
        setDataAddressSearch([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data from Google Places API:", error);
      setIsLoading(false);
    }
  };
  const [statusAddressSearch, setStatusAddressSearch] = React.useState("basic");
  const [txtWarning, setTxtWarning] = React.useState("");
  const checkInputSearch = (e) => {
    if (e !== "") {
      handleChangeText(e);
    } else {
      setStatusAddressSearch("danger");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <Header title="Chọn vị trí làm việc" />
      <KeyboardAwareScrollView enableOnAndroid extraHeight={200}>
        <InputComponent
          placeholder={"Nhập địa chỉ"}
          iconRight="map-outline"
          inputStatus={statusAddressSearch}
          txtWarning="Vui lòng nhập địa chỉ"
          style={{
            width: "98%",
            alignSelf: "center",
          }}
          onRightIconPress={() => {
            console.log(
              "🚀 ~ file: ShowMap.jsx ~ line 55 ~ onIconPress ~ onIconPress"
            );
          }}
          onChangeText={(e) => {
            setStatusAddressSearch("basic");
            setTxtWarning("");
          }}
          onFinishText={(e) => {
            checkInputSearch(e);
          }}
        />
        {isLoading && <Loading />}
        <ItemAddress
          data={dataAddressSearch}
          onPress={(item) => {
            console.log(
              "🚀 ~ file: AddressSearch.jsx ~ line 91 ~ AddressSearch ~ item",
              item
            );
            // navi.navigate("ShowMap", { address: item.name });
            navi.navigate(ScreenNames.SHOW_MAP, {
              data: { address: item.name },
            });
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressSearch;

const styles = StyleSheet.create({});
