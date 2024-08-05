import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import BackButton from "../../components/BackButton";
import MainStyles from "../../styles/MainStyle";
import { UseInset } from "../../Hooks";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import FormServiceMachine from "./FormServiceMachine";
import ModalInformationDetail from "../../components/ModalInformationDetail";
import CardPremiumInfomation from "../../components/CardPremiumInfomation";
import { useRoute } from "@react-navigation/native";
import { FormatMoney } from "../../Utils";
import { priceClearningMachine, priceRepairAirConditioner, priceRepairElectricity } from "../../Utils/PriceService";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import ButtonInfo from "../../components/buttons/ButtonInfo";
import ArrowRight from "../../components/svg/ArrowRight";
import FormServiceRepairElectricity from "./FormServiceRepairElectricity";
import { useDispatch } from "react-redux";
import { mainAction } from "../../Redux/Action";
import { Icon } from "@ui-kitten/components";

const ServiceRepairElectricityScreen = () => {
  const route = useRoute();
  const { service } = route.params || {};
  const price = service.ServicePrice || 11;
  const workingTime = service.ServiceTime || 11;
  const [time, setTime] = useState(workingTime);
  const inset = UseInset();
  const formikSubmitRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailContent, setDetailContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    OVG_spStepContent_Service();
  }, [])
  const OVG_spStepContent_Service = async () => {
    try {
      const pr = {
        ServiceId: service?.ServiceId || 7,
        GroupId: 10060,
      }
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spStepContent_Service",
      }
      const result = await mainAction.API_spCallServer(params, dispatch);
      setDetailContent(result[0]);
    } catch (error) { }
  }
  const modalOnClose = () => {
    setModalOpen(false);
  };
  const handleNext = () => {
    formikSubmitRef.current?.submitForm();
  };
  const handleFormChange = (values) => {
    // console.log(values);
    values.people ? setTime(workingTime / values.people) : setTime(workingTime);
    setTotalPrice(priceRepairElectricity(values, price, time));
    values.premium ? setModalOpen(true) : setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Sửa điện</Text>
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <FormServiceRepairElectricity
            ref={formikSubmitRef}
            timeWorking={time}
            onChange={handleFormChange}
            Service={service}
            TotalPrice={totalPrice}
          />
        </KeyboardAwareScrollView>
        <View style={MainStyles.flexRowCenter}>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
            }}
            style={MainStyles.flexRowCenter}
          >
            <Icon
              style={[MainStyles.CardIcon, { marginRight: 0 }]}
              fill={colors.MAIN_BLUE_CLIENT}
              name="plus-outline"
            />
            <Text
              style={{
                fontSize: 16,
                margin: 10,
                fontWeight: "600",
                color: colors.MAIN_BLUE_CLIENT,
              }}
            >Chi tiết dịch vụ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: inset.bottom,
          zIndex: 10,
          elevation: 10,
          backgroundColor: colors.PRIMARY_GREEN,
          width: "95%",
          margin: 10,
          padding: 10,
          borderRadius: 7,
        }}
      >
        <ButtonInfo
          style={{
            width: "98%",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={handleNext}
        >
          <View
            style={[
              MainStyles.flexRowSpaceBetween,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={styles.btnTitle}>
              {FormatMoney(totalPrice) +
                " VND / " +
                RoundUpNumber(time, 0) +
                " giờ"}
            </Text>
            <View style={[MainStyles.flexRow, { alignItems: "center" }]}>
              <Text style={[styles.btnTitle, { marginRight: 10 }]}>
                Tiếp theo
              </Text>
              <ArrowRight color={colors.WHITE} />
            </View>
          </View>
        </ButtonInfo>
      </View>
      <ModalInformationDetail
        isOpen={modalOpen}
        onClose={modalOnClose}
        snapPoints={["60%", "80%"]}
        initialIndex={1}
        content={detailContent}
      >
      </ModalInformationDetail>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  btnTitle: {
    fontSize: 18,
    color: colors.WHITE,
  },
});

export default ServiceRepairElectricityScreen;

