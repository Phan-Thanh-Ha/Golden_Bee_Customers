import React, { useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import BackButton from "../../components/BackButton";
import MainStyles from "../../styles/MainStyle";
import { UseInset } from "../../Hooks";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import FormServiceRepairPipe from "./FormServiceRepairPipe";
import ModalInformationDetail from "../../components/ModalInformationDetail";
import CardPremiumInfomation from "../../components/CardPremiumInfomation";
import { useRoute } from "@react-navigation/native";
import { FormatMoney } from "../../Utils";
import { priceClearningMachine, priceRepairPipe } from "../../Utils/PriceService";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import ButtonInfo from "../../components/buttons/ButtonInfo";
import ArrowRight from "../../components/svg/ArrowRight";

const ServiceRepairPipeScreen = () => {
  const route = useRoute();
  const { service } = route.params || {};
  const price = service.ServicePrice;
  const workingTime = service.ServiceTime;
  const [time, setTime] = useState(workingTime);
  const inset = UseInset();
  const formikSubmitRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const [modalOpen, setModalOpen] = useState(false);
  const modalOnClose = () => {
    setModalOpen(false);
  };
  const handleNext = () => {
    formikSubmitRef.current?.submitForm();
  };
  const handleFormChange = (values) => {
    // console.log(values);
    values.people ? setTime(workingTime / values.people) : setTime(workingTime);
    setTotalPrice(priceRepairPipe(values, price, time));
    values.premium ? setModalOpen(true) : setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Sửa chữa ống nước</Text>
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <FormServiceRepairPipe
            ref={formikSubmitRef}
            timeWorking={time}
            onChange={handleFormChange}
            Service={service}
            TotalPrice={totalPrice}
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
                " VNĐ / " +
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
      {modalOpen && (
        <ModalInformationDetail
          isOpen={modalOpen}
          onClose={modalOnClose}
          snapPoints={["60%", "80%"]}
          initialIndex={1}
        >
          <CardPremiumInfomation />
        </ModalInformationDetail>
      )}
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
export default ServiceRepairPipeScreen;