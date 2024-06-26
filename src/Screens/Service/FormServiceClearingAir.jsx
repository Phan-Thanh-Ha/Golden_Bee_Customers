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
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../Constants";
import SelectOption from "../../components/SelectOption";

const validationSchema = Yup.object().shape({
  people: Yup.number()
    .required("Vui lòng nhập số lượng nhân sự")
    .min(1, "Số lượng nhân sự phải lớn hơn 0"),
});

const FormServiceClearingAir = ({
  onSubmit,
  onChange,
  timeWorking,
  Service,
  TotalPrice,
}) => {
  const navi = useNavigation();
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          serviceOption: Service?.ServiceOption[0], // Sử dụng đối tượng đầu tiên từ mảng
          people: 1,
          premium: false,
          otherService: [],
          note: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navi.navigate(ScreenNames.CONFIRM_BOOKING, {
            dataConfirmService: {
              ...Service,
              TotalPrice: TotalPrice,
              workingTime: timeWorking,
              ...values,
            },
          });
          if (onSubmit && typeof onSubmit === "function") {
            onSubmit(values);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          onSubmit.current = handleSubmit;
          if (onChange && typeof onChange === "function") {
            onChange(values);
          }
          return (
            <View>
              <Label style={styles.title}>Loại máy lạnh</Label>
              <SelectOption
                data={Service?.ServiceOption}
                value={values.serviceOption}
                onChange={(value) => {
                  setFieldValue("serviceOption", value); // Cập nhật đối tượng đã chọn
                  if (onChange && typeof onChange === "function") {
                    onChange({ ...values, serviceOption: value });
                  }
                }}
              />
              <Label style={styles.title}>Số lượng nhân sự</Label>
              <InputNumber
                value={values.people}
                setFieldValue={setFieldValue}
                fieldName="people"
                min={0}
              />
              {errors.people && touched.people && (
                <Text style={MainStyles.textErr}>{errors.people}</Text>
              )}
              <View
                style={[MainStyles.flexRowFlexStart, { alignItems: "center" }]}
              >
                <Label style={[{ marginRight: 10 }, styles.title]}>
                  Thời lượng :
                </Label>
                <Text
                  style={{
                    color: colors.MAIN_COLOR_CLIENT,
                    fontWeight: "bold",
                  }}
                >
                  Trong {RoundUpNumber(timeWorking, 0)} giờ{" "}
                </Text>
              </View>
              <View style={[MainStyles.flexRowSpaceBetween, styles.premium]}>
                <View
                  style={[
                    MainStyles.flexRowFlexStart,
                    { alignItems: "center" },
                  ]}
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
              {Service?.Detail.length > 0 && (
                <Label style={styles.title}>Dịch vụ thêm</Label>
              )}
              <InputCheckBox
                data={Service?.Detail}
                selectedValues={values.otherService}
                onChange={(item) => {
                  const newSelectedValues = values.otherService.some(
                    (value) => value.ServiceDetailId === item.ServiceDetailId
                  )
                    ? values.otherService.filter(
                      (value) =>
                        value.ServiceDetailId !== item.ServiceDetailId
                    )
                    : [...values.otherService, item];
                  setFieldValue("otherService", newSelectedValues);
                  if (onChange && typeof onChange === "function") {
                    onChange({ ...values, otherService: newSelectedValues });
                  }
                }}
              />
              <Label style={styles.title}>Ghi chú</Label>
              <TextArea
                placeholder="Thêm ghi chú ở đây"
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
};

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

export default FormServiceClearingAir;