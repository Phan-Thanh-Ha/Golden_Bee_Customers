import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputNumber from "../../components/InputNumber";
import BtnToggle from "../../components/BtnToggle";
import InputCheckBox from "../../components/InputCheckBox";
import TextArea from "../../components/TextArea";
import Label from "../../components/Label";
import { colors } from "../../styles/Colors";
import MainStyles from "../../styles/MainStyle";
import { ic_premium } from "../../assets";
import { dataOtherService1 } from "../data";
import { PropTypes } from "prop-types";

const validationSchema = Yup.object().shape({
  room: Yup.string().required("Vui lòng nhập số phòng"),
});

const FormRequirementInfomation = ({ onSubmit, onChange, timeWorking }) => (
  <View style={styles.container}>
    <Formik
      initialValues={{
        room: 1,
        people: 1,
        premium: false,
        otherService: [],
        note: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (onSubmit && typeof onSubmit === "function") {
          onSubmit(values);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
        onSubmit.current = handleSubmit;
        if (onChange && typeof onChange === "function") {
          onChange(values);
        }
        return (
          <View>
            <Label style={styles.title}>Số phòng</Label>
            <InputNumber
              placeholder="Nhập số phòng"
              value={values.room}
              setFieldValue={setFieldValue}
              fieldName="room"
            />
            <Label style={styles.title}>Số lượng nhân viên</Label>
            <InputNumber
              placeholder="Nhập số nhân sự"
              value={values.people}
              setFieldValue={setFieldValue}
              fieldName="people"
            />
            <View
              style={[MainStyles.flexRowFlexStart, { alignItems: "center" }]}
            >
              <Label style={[{ marginRight: 10 }, styles.title]}>
                Làm việc trong:
              </Label>
              <Text
                style={{ color: colors.MAIN_COLOR_CLIENT, fontWeight: "bold" }}
              >
                Trong {timeWorking} giờ
              </Text>
            </View>
            <View style={[MainStyles.flexRowSpaceBetween, styles.premium]}>
              <View
                style={[MainStyles.flexRowFlexStart, { alignItems: "center" }]}
              >
                <Image
                  source={ic_premium}
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <Label fontSize={18}>Dịch vụ Premium</Label>
              </View>
              <BtnToggle
                value={values.premium}
                onChange={(checked) => setFieldValue("premium", checked)}
              />
            </View>
            <Label style={styles.title}>Dịch vụ thêm</Label>
            <InputCheckBox
              data={dataOtherService1}
              selectedValues={values.otherService}
              onChange={(id) => {
                const newSelectedValues = values.otherService.includes(id)
                  ? values.otherService.filter((value) => value !== id)
                  : [...values.otherService, id];
                setFieldValue("otherService", newSelectedValues);
              }}
            />
            <Label style={styles.title}>Ghi chú</Label>
            <TextArea
              placeholder="Thêm lưu ý cho dịch vụ hoặc các dụng cụ cần thiết khác"
              value={values.note}
              onChangeText={handleChange("note")}
              onBlur={handleBlur("note")}
            />
          </View>
        );
      }}
    </Formik>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 10,
    margin: 2,
    borderRadius: 5,
  },
  premium: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderColor: colors.GRAY,
    borderWidth: 1,
  },
  title: {
    margin: 10,
  },
});

FormRequirementInfomation.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  timeWorking: PropTypes.number,
};

export default FormRequirementInfomation;
