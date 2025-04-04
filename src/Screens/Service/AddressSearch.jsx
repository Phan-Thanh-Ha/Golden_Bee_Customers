import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY, setData } from "../../Utils";
import ItemAddress from "../../components/ItemAddress";
import axios from "axios";
import { ScreenNames } from "../../Constants";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import { limitTitle } from "../../Utils/LimitTitle";
import BackButton from "../../components/BackButton";
import MainStyles from "../../styles/MainStyle";

const AddressSearch = () => {
  const navi = useNavigation();
  const API_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const route = useRoute();
  const { service } = route.params || {};
  const [dataAddressSearch, setDataAddressSearch] = useState([]);
  const dispatch = useDispatch();
  const [oldAddressSearch, setOldAddressSearch] = useState([]);
  const [statusAddressSearch, setStatusAddressSearch] = useState("basic");
  const userLogin = useSelector((state) => state.main.userLogin);
  const locationTime = useSelector((state) => state.main.locationTime);
  const [inputValue, setInputValue] = useState(locationTime?.address || "");

  useEffect(() => {
    OVG_spAddress_List_By_Customer();
  }, []);

  const OVG_spAddress_List_By_Customer = async () => {
    try {
      const pr = {
        CustomerId: userLogin?.Id,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spAddress_List_By_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setOldAddressSearch(result);
      }
    } catch {
      //
    }
  };

  // Hàm gọi API tìm kiếm địa chỉ từ Google
  const handleSearch = async (text) => {
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
    } catch {
      //
    }
  };

  // Hàm debounce để hạn chế số lần gọi API
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  // Hàm kiểm tra và gọi tìm kiếm
  const handleChangeText = (text) => {
    setStatusAddressSearch(text === "" ? "danger" : "basic");
    setInputValue(text);
    debouncedHandleSearch(text);
  };

  return (
    <View style={{ backgroundColor: colors.WHITE }}>
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Thêm vị trí của bạn</Text>
      <InputComponent
        placeholder={
          limitTitle(locationTime?.address || "", 30) || "Nhập địa chỉ"
        }
        iconRight="navigation-2"
        inputStatus={statusAddressSearch}
        txtWarning="Vui lòng nhập địa chỉ"
        style={{
          width: "98%",
          alignSelf: "center",
        }}
        value={inputValue}
        onRightIconPress={() => {
          navi.navigate(ScreenNames.SHOW_MAP, {
            service: {
              ...service,
              Address: inputValue,
              place_id: "",
              latitude: locationTime?.latitude,
              longitude: locationTime?.longitude,
            },
          });
        }}
        onLeftIconPress={() => {}}
        onChangeText={handleChangeText}
      />
      <ItemAddress
        data={dataAddressSearch?.length ? dataAddressSearch : oldAddressSearch}
        onPress={(item) => {
          navi.navigate(ScreenNames.SHOW_MAP, {
            service: {
              ...service,
              Address: item?.name,
              place_id: item?.place_id,
              latitude: item?.latitude,
              longitude: item?.longitude,
            },
          });
        }}
      />
    </View>
  );
};

export default AddressSearch;
