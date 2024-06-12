import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import FormRequirementInfomation from "./FormRequirementInfomation";
import Header from "../../components/Header";
import MainStyles from "../../styles/MainStyle";
import { UseInset } from "../../Hooks";
import BtnPrimary from "../../components/buttons/BtnPrimary";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { CardLocation } from "../../components";
import ButtonInfo from "../../components/buttons/ButtonInfo";
import { FormatMoney } from "../../Utils";
import ArrowRight from "../../components/svg/ArrowRight";
import { ScrollView } from "react-native-gesture-handler";
import FormServiceMachine from "./FormServiceMachine";
import FormServiceClearingAir from "./FormServiceClearingAir";

const ServiceClearningAirScreen = () => {
  const navigation = useNavigation();
  const inset = UseInset();
  const formikSubmitRef = useRef(null);
  const timeWorking = 2;
  const price = 30000;
  const [formData, setFormData] = useState({
    room: 1,
    people: 1,
    premium: false,
    otherService: [],
    note: '',
  });
  const handleFormChange = (values) => {
    setFormData(values);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Header color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Thông tin công việc</Text>
      <CardLocation location={"12, Đường Nguyễn Văn Lượng, Quận gò vấp, TP Hồ Chí Minh, Việt Nam"} />
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <FormServiceClearingAir
            onSubmit={formikSubmitRef}
            timeWorking={timeWorking}
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
          <View style={[MainStyles.flexRowSpaceBetween, { backgroundColor: 'transparent' }]}>
            <Text style={styles.btnTitle}>{FormatMoney(price * timeWorking / parseInt(formData.people))} VND / {timeWorking}H</Text>
            <View style={[MainStyles.flexRow, { alignItems: 'center' }]}>
              <Text style={[styles.btnTitle, { marginRight: 10 }]}>Tiếp theo</Text>
              <ArrowRight color={colors.WHITE} />
            </View>
          </View>
        </ButtonInfo>

      </View>
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
    color: colors.WHITE
  }
});

export default ServiceClearningAirScreen;