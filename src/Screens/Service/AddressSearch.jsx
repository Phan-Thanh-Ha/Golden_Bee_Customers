import React, { useCallback, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { CommonActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY, getData, setData } from "../../Utils";
import ItemAddress from "../../components/ItemAddress";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { ScreenNames } from "../../Constants";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";

const AddressSearch = () => {
  const navi = useNavigation();
  const API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const route = useRoute();
  const { service } = route.params || {};
  const [dataAddressSearch, setDataAddressSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusAddressSearch, setStatusAddressSearch] = useState("basic");
  const userLogin = useSelector((state) => state.main.userLogin);

  // Hàm gọi API tìm kiếm địa chỉ từ Google
  const handleSearch = async (text) => {
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
        const dataSearchLocation = data.predictions.map((item) => ({
          place_id: item.place_id,
          name: item.description,
        }));
        setDataAddressSearch(dataSearchLocation);
        // Lưu trữ cục bộ
        await setData("ADDRESS_SEARCH", dataSearchLocation);
      } else {
        setDataAddressSearch([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ Google Places API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm debounce để hạn chế số lần gọi API
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  // Hàm kiểm tra và gọi tìm kiếm
  const handleChangeText = (text) => {
    setStatusAddressSearch(text === "" ? "danger" : "basic");
    debouncedHandleSearch(text);
  };
  const onBackPress = () => {
    console.log("test", userLogin);
    if (userLogin) {
      navi.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
        })
      );
      return true;
    } else {
      navi.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNames.HOME }],
        })
      );
    }
    return true;
  };


  return (
    <View style={{ backgroundColor: colors.WHITE }}>
      <Header title="Chọn vị trí làm việc" onBack={onBackPress} isGoBack={false} />
      <InputComponent
        placeholder={"Nhập địa chỉ"}
        iconRight="map-outline"
        inputStatus={statusAddressSearch}
        txtWarning="Vui lòng nhập địa chỉ"
        style={{
          width: "98%",
          alignSelf: "center",
        }}
        onRightIconPress={() => { }}
        onChangeText={handleChangeText}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        {/* {isLoading && <Loading />} */}
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
