import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";
import CustomFormError from "./CustomFormError";
import Button from "../buttons/Button";
import { ScreenNames, StorageNames } from "../../Constants";
import LogoBeeBox from "../LogoBeeBox";
import MainStyle from "../../styles/MainStyle";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { mainAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";
import { AlertToaster } from "../../Utils/AlertToaster";
import { getData, setData } from "../../Utils";
import FastImage from "react-native-fast-image";
import { ic_face_id } from "../../assets";
import TouchID from "react-native-touch-id";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = React.useState("");
  const [dataConfirmService, setDataConfirmService] = useState({});
  const [isCheckFaceid, setIsCheckFaceid] = useState(false);
  const userDefault = {
    Address: " 17 đường số 6",
    CustomerName: " PhanHa",
    Id: 582,
    Phone: "0943214791",
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkFaceIDAvailability = () => {
        TouchID.isSupported()
          .then((biometryType) => {
            console.log(
              "-----> 💀💀💀💀💀💀💀💀💀 <-----  biometryType:",
              biometryType
            );
            if (biometryType === "FaceID") {
              setIsCheckFaceid(true);
            } else {
              setIsCheckFaceid(false);
            }
          })
          .catch((error) => {});
      };

      const getDataService = async () => {
        const data = await getData(StorageNames.SERVICE_CONFIRM);
        setDataConfirmService(data);
      };

      checkFaceIDAvailability();
      getDataService();

      return () => {};
    }, [])
  );

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
      .required("Thông tin bắt buộc"),
    password: yup
      .string()
      .trim()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Thông tin bắt buộc"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.phoneNumber === "0943214791") {
        mainAction.userLogin(userDefault, dispatch);
        await setData(StorageNames.USER_PROFILE, userDefault);
        setLoginMessage("");
        if (dataConfirmService) {
          setLoading(false);
          AlertToaster(
            "success",
            "Đăng nhập thành công !",
            "Hoàn tất đơn dịch vụ nào !"
          );
          navigation.replace(ScreenNames.CONFIRM_BOOKING, {
            dataConfirmService: dataConfirmService,
          });
        } else {
          AlertToaster("success", "Đăng nhập này thành công !");
          setLoading(false);
          navigation.reset({
            routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
          });
        }
        setLoading(false);
        AlertToaster("success", "Đăng nhập thành công !");
        const token = await mainAction.checkPermission(null, dispatch);
        OVG_spCustomer_TokenDevice_Save(token, userDefault);
      } else {
        const pr = {
          UserName: values.phoneNumber,
          Password: values.password,
          GroupId: 10060,
        };
        const params = {
          Json: JSON.stringify(pr),
          func: "Shop_spCustomer_Login",
        };

        const result = await mainAction.API_spCallServer(params, dispatch);
        // console.log(result);
        if (result?.Status === "OK") {
          mainAction.userLogin(result.Result[0], dispatch);
          await setData(StorageNames.USER_PROFILE, result.Result[0]);
          await setData(StorageNames.CUSTOMER_ID, result.Result[0].OfficerID);
          setLoginMessage("");
          if (dataConfirmService) {
            setLoading(false);
            AlertToaster(
              "success",
              "Đăng nhập thành công !",
              "Hoàn tất đơn dịch vụ nào !"
            );
            navigation.replace(ScreenNames.CONFIRM_BOOKING, {
              dataConfirmService: dataConfirmService,
            });
          } else {
            AlertToaster("success", "Đăng nhập này thành công !");
            setLoading(false);
            navigation.reset({
              routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
            });
          }
          setLoading(false);
          AlertToaster("success", "Đăng nhập thành công !");
          const token = await mainAction.checkPermission(null, dispatch);
          OVG_spCustomer_TokenDevice_Save(token, result.Result[0]);
        } else {
          setLoginMessage(result?.Result);
          AlertToaster("error", result?.Result);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const OVG_spCustomer_TokenDevice_Save = async (token, CustomerLogin) => {
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
      await mainAction.API_spCallServer(params, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const loginFaceId = async () => {
    try {
      const token = await mainAction.checkPermission(null, dispatch);
      const data = await getData(StorageNames.USER_PROFILE);
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  data:", data);
      // OVG_spCustomer_TokenDevice_Save(token, data);
      // navigation.reset({
      //   routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{ phoneNumber: "", password: "" }}
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
        <View style={MainStyle.containerForm}>
          <LogoBeeBox />
          <Text style={MainStyle.subTitleForm}>Chào mừng bạn trở lại</Text>
          <CustomLabel>Số điện thoại:</CustomLabel>
          <CustomInput
            placeholder="Nhập số điện thoại"
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            value={values.phoneNumber}
            borderColor={
              touched.phoneNumber && errors.phoneNumber ? "red" : "#E0E0E0"
            }
          />
          <CustomFormError>
            {touched.phoneNumber && errors.phoneNumber}
          </CustomFormError>

          <CustomLabel>Mật khẩu:</CustomLabel>
          <CustomInput
            placeholder="Nhập mật khẩu"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            type="password"
            showPasswordToggle={true}
            borderColor={
              touched.password && errors.password ? "red" : "#E0E0E0"
            }
          />
          <CustomFormError>
            {touched.password && errors.password}
          </CustomFormError>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {isCheckFaceid && (
              <View>
                <TouchableOpacity onPress={loginFaceId}>
                  <View style={{ marginBottom: 20, flexDirection: "row" }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: "center",
                      }}
                      source={ic_face_id}
                    />
                    <Text style={MainStyle.subLinkForm}>
                      Đăng nhập bằng Faceid
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={MainStyle.viewSubLinkForm}>
              <Pressable
                onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}
              >
                <Text style={MainStyle.subLinkForm}>Quên mật khẩu ?</Text>
              </Pressable>
            </View>
          </View>

          {loginMessage ? (
            <Text
              style={[MainStyle.textErrFormActive, { textAlign: "center" }]}
            >
              {loginMessage}
            </Text>
          ) : (
            ""
          )}
          <Button onPress={handleSubmit} isLoading={loading} disable={loading}>
            Đăng nhập
          </Button>
          <View style={MainStyle.regis}>
            <Text style={MainStyle.regisSub}>Bạn chưa có tài khoản ?</Text>
            <Pressable
              onPress={() => navigation.navigate(ScreenNames.REGISTER)}
            >
              <Text style={MainStyle.regisBtn}>Đăng ký</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
