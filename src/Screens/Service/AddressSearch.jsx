import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { CommonActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY, GroupUserId, getData, setData } from "../../Utils";
import ItemAddress from "../../components/ItemAddress";
import axios from "axios";
import { ScreenNames } from "../../Constants";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import getAddressFromCurrentLocation from "../../Utils/getAddressFromCurrentLocation";
import { limitTitle } from "../../Utils/LimitTitle";
import BackButton from "../../components/BackButton";
import MainStyles from "../../styles/MainStyle";

const AddressSearch = () => {
  const navi = useNavigation();
  const API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const route = useRoute();
  const { service } = route.params || {};
  const [dataAddressSearch, setDataAddressSearch] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [oldAddressSearch, setOldAddressSearch] = useState([]);
  const [statusAddressSearch, setStatusAddressSearch] = useState("basic");
  const userLogin = useSelector((state) => state.main.userLogin);
  const [initAddress, setInitAddress] = useState({});

  useEffect(() => {
    OVG_spAddress_List_By_Customer();
    GetInitialAddress();
  }, []);
  const GetInitialAddress = async () => {
    const result = await getAddressFromCurrentLocation();
    if (result) {
      setInitAddress(result);
    }
  }

  const OVG_spAddress_List_By_Customer = async () => {
    try {
      const pr = {
        CustomerId: userLogin?.Id
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spAddress_List_By_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setOldAddressSearch(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      // console.error("Lỗi khi lấy dữ liệu từ Google Places API:", error);
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
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Thêm vị trí của bạn</Text>
      <InputComponent
        placeholder={limitTitle(initAddress?.address || "", 30) || "Nhập địa chỉ"}
        iconRight="pin"
        inputStatus={statusAddressSearch}
        txtWarning="Vui lòng nhập địa chỉ"
        style={{
          width: "98%",
          alignSelf: "center",
        }}
        onRightIconPress={() => {
          navi.navigate(ScreenNames.SHOW_MAP, {
            service: {
              ...service,
              Address: initAddress?.address,
              place_id: "",
              latitude: initAddress?.latitude,
              longitude: initAddress?.longitude,
            },
          });
        }}
        onLeftIconPress={() => { }}
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
