import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import MainStyles from "../../styles/MainStyle";
import { UseInset } from "../../Hooks";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { CardLocation } from "../../components";
import ButtonInfo from "../../components/buttons/ButtonInfo";
import { priceRepairElectricity } from "../../Utils";
import ArrowRight from "../../components/svg/ArrowRight";
import { ScrollView } from "react-native-gesture-handler";
import { typeAir, typeElectricity } from "../data";
import FormServiceRepairAir from "./FormServiceRepairAir";
import FormServiceRepairElectricity from "./FormServiceRepairElectricity";
import CardPremiumInfomation from "../../components/CardPremiumInfomation";
import ModalInformationDetail from "../../components/ModalInformationDetail";

const ServiceRepairElectricityScreen = () => {
  const navigation = useNavigation();
  const inset = UseInset();
  const [time, setTime] = useState(2);
  const formikSubmitRef = useRef(null);
  const timeWorking = 2;
  const price = 30000;
  const [formData, setFormData] = useState({
    typeMc: typeElectricity[0],
    people: 1,
    premium: false,
    otherService: [],
    note: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const modalOnClose = () => {
    setModalOpen(false);
  };
  const handleFormChange = (values) => {
    setFormData(values);
    setTime(timeWorking / values.people);
    values.premium ? setModalOpen(true) : setModalOpen(false);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Thông tin công việc</Text>
      <CardLocation
        location={
          "12, Đường Nguyễn Văn Lượng, Quận gò vấp, TP Hồ Chí Minh, Việt Nam"
        }
      />
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <FormServiceRepairElectricity
            onSubmit={formikSubmitRef}
            timeWorking={time}
            onChange={handleFormChange}
          />
        </KeyboardAwareScrollView>
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
          onPress={() => formikSubmitRef.current && formikSubmitRef.current()}
        >
          <View
            style={[
              MainStyles.flexRowSpaceBetween,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={styles.btnTitle}>
              {priceRepairElectricity(formData, price, time)}
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
        snapPoints={["40%", "60%", "80%"]}
        initialIndex={1}
      >
        <CardPremiumInfomation />
      </ModalInformationDetail>
    </View>
  );
};
export default ServiceRepairElectricityScreen;

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
