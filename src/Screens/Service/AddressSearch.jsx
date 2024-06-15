import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY, setData } from "../../Utils";
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
  const { service } = route.params;
  const [dataAddressSearch, setDataAddressSearch] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusAddressSearch, setStatusAddressSearch] = React.useState("basic");

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
          place_id: item.place_id,
          name: item.description,
        }));
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
  const checkInputSearch = (e) => {
    if (e !== "") {
      handleChangeText(e);
    } else {
      setStatusAddressSearch("danger");
    }
  };
  return (
    <View style={{ backgroundColor: colors.WHITE }}>
      <Header title="Chọn vị trí làm việc" />
      <InputComponent
        placeholder={"Nhập địa chỉ"}
        iconRight="map-outline"
        inputStatus={statusAddressSearch}
        txtWarning="Vui lòng nhập địa chỉ"
        style={{
          width: "98%",
          alignSelf: "center",
        }}
        onRightIconPress={() => {}}
        onChangeText={(e) => {
          setStatusAddressSearch("basic");
        }}
        onFinishText={(e) => {
          checkInputSearch(e);
        }}
      />
      <KeyboardAwareScrollView enableOnAndroid extraHeight={200}>
        {isLoading && <Loading />}
        <ItemAddress
          data={dataAddressSearch}
          onPress={(item) => {
            navi.navigate(ScreenNames.SHOW_MAP, {
              service: {
                ...service,
                Address: item.name,
                place_id: item.place_id,
              },
            });
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressSearch;
