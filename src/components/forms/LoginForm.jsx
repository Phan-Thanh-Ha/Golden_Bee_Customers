import React from "react";
import { View, Text, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";
import CustomFormError from "./CustomFormError";
import Button from "../buttons/Button";
import { ScreenNames, StorageNames } from "../../Constants";
import LogoBeeBox from "../LogoBeeBox";
import MainStyle from "../../styles/MainStyle";
import { useNavigation } from "@react-navigation/native";
import { mainAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";
import { AlertToaster } from "../../Utils/AlertToaster";
import { setData } from "../../Utils";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navi = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const validationSchema = yup.object().shape({
    PhoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
      .required("Thông tin bắt buộc"),
    Password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Thông tin bắt buộc"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const pr = {
        UserName: values.PhoneNumber,
        Password: values.Password,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Login",
      };

      console.log("pr ", params);
      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log("rsult ", result);
      if (result?.Status === "OK") {
        mainAction.userLogin(result.Result[0], dispatch);
        await setData(StorageNames.USER_PROFILE, result.Result[0]);
        AlertToaster("success", "Đăng nhập thành công !");
        navi.navigate(ScreenNames.MAIN_NAVIGATOR);
        setLoading(false);
        const token = await mainAction.checkPermission(null, dispatch);
        console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  token:", token);
        OVG_spCustomer_TokenDevice_Save(token, result.Result[0]);
      } else {
        AlertToaster("error", result?.Result);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Upload Token Customer
  const OVG_spCustomer_TokenDevice_Save = async (token, CustomerLogin) => {
    console.log(
      "-----> 💀💀💀💀💀💀💀💀💀 <-----  CustomerLogin:",
      CustomerLogin
    );
    try {
      const pr = {
        CustomerId: CustomerLogin.Id,
        Token: token,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_TokenDevice_Save",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  result:", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ PhoneNumber: "", Password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <View style={MainStyle.containerForm}>
            <LogoBeeBox />
            <Text style={MainStyle.subTitleForm}>Chào mừng bạn trở lại</Text>
            <CustomLabel>Số điện thoại:</CustomLabel>
            <CustomInput
              placeholder="Nhập số điện thoại"
              onChangeText={handleChange("PhoneNumber")}
              onBlur={handleBlur("PhoneNumber")}
              value={values.PhoneNumber}
            />
            <CustomFormError>
              {touched.PhoneNumber && errors.PhoneNumber}
            </CustomFormError>

            <CustomLabel>Mật khẩu:</CustomLabel>
            <CustomInput
              placeholder="Nhập mật khẩu"
              onChangeText={handleChange("Password")}
              onBlur={handleBlur("Password")}
              value={values.Password}
              secureTextEntry
            />
            <CustomFormError>
              {touched.Password && errors.Password}
            </CustomFormError>
            <View style={MainStyle.viewSubLinkForm}>
              <Pressable
                onPress={() => navi.navigate(ScreenNames.FORGOT_PASSWORD)}
              >
                <Text style={MainStyle.subLinkForm}>Quên mật khẩu ?</Text>
              </Pressable>
            </View>
            <Button
              onPress={handleSubmit}
              isLoading={loading}
              disable={loading}
            >
              {"Đăng nhập"}
            </Button>
            <View style={MainStyle.regis}>
              <Text style={MainStyle.regisSub}>Bạn chưa có tài khoản ?</Text>
              <Pressable onPress={() => navi.navigate(ScreenNames.REGISTER)}>
                <Text style={MainStyle.regisBtn}>Đăng ký</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
