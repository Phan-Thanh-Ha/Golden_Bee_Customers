import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, themeColors } from "../../styles/Colors";
import { ScreenNames, StorageNames } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import { removeData } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import { logo_bee_blue } from "../../assets";
import Box from "../../components/Box";
import LinearGradient from "react-native-linear-gradient";
import Button from "../../components/buttons/Button";
import ModalConfirm from "../../components/ModalConfirm";
import EditUser from "../../components/svg/EditUser";
import ModalEditUser from "../../components/modal/ModalEditUser";
import { APIImage } from "../../Config/Api";
import { Avatar, Card, Icon } from "@ui-kitten/components";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.CUSTOMER_ID);
      await removeData(StorageNames.SERVICE_CONFIRM);
      mainAction.userLogin(null, dispatch);
      navi.reset({
        routes: [{ name: ScreenNames.LOGIN }],
      });
    } catch (error) {}
  };
  const handleClearAccount = async () => {
    await removeData(StorageNames.USER_PROFILE);
    mainAction.userLogin(null, dispatch);
    navi.navigate(ScreenNames.LOGIN);
  };

  return (
    <View>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Text style={MainStyles.screenTitle}>Thông tin tài khoản</Text>
      <ScrollView>
        <Card style={styles.card}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Thông tin</Text>
            <TouchableOpacity onPress={() => setModalEditUser(true)}>
              <EditUser size={25} />
            </TouchableOpacity>
          </View>
          <Box height={SCREEN_HEIGHT * 0.02} />
          <View style={styles.content}>
            {userLogin?.Avatar ? (
              <Avatar
                source={{ uri: APIImage + userLogin?.Avatar }}
                size="giant"
                style={styles.avatar}
              />
            ) : (
              <Avatar
                source={logo_bee_blue}
                size="giant"
                style={styles.avatar}
              />
            )}
            <View style={styles.info}>
              <View style={styles.infoRow}>
                <Icon
                  style={styles.icon}
                  fill="#3366FF"
                  name="bookmark-outline"
                />
                <Text category="s1" style={styles.textT}>
                  Mã khách hàng: {userLogin?.Id}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon
                  style={styles.icon}
                  fill="#3366FF"
                  name="person-outline"
                />
                <Text category="s1" style={styles.textT}>
                  Tên khách hàng: {userLogin?.CustomerName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon style={styles.icon} fill="#3366FF" name="phone-outline" />
                <Text category="s1" style={styles.textT}>
                  Số điện thoại: {userLogin?.Phone}
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Liên hệ tổng đài</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text
              style={{
                marginRight: 10,
                paddingLeft: 10,
                fontSize: 15,
                color: colors.MAIN_BLUE_CLIENT,
                marginVertical: 10,
              }}
            >
              Liên hệ tổng đài để được hỗ trợ các thắc mắc liên quan trong quá
              trình hoạt động và sử dụng ứng dụng.
            </Text>
          </View>
          <Button
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={() => {
              Linking.openURL(`tel:${"0922277782"}`);
            }}
          >
            Gọi tổng đài
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button
            onPress={handleLogout}
            textColor={colors.WHITE}
            bgColor={colors.MAIN_BLUE_CLIENT}
            paddingVertical={5}
          >
            Đăng xuất
          </Button>
        </View>
        {userLogin?.Phone === "0943214791" && (
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => setIsModalVisible(true)}
              textColor={colors.WHITE}
              bgColor={"#F44336"}
              paddingVertical={5}
            >
              Xóa tài khoản
            </Button>
          </View>
        )}
        <Box height={SCREEN_HEIGHT * 0.2} />
      </ScrollView>
      <ModalConfirm
        title={
          "Bạn  có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"
        }
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
        backdropClose={true}
      />
      <ModalEditUser
        isModalVisible={modalEditUser}
        setModalVisible={setModalEditUser}
        onConfirm1={() => {}}
        onConfirm2={() => {}}
      />
      <Box height={SCREEN_HEIGHT * 0.1} bgColor={themeColors.background} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  textT: {
    marginRight: 10,
    paddingLeft: 10,
    fontSize: 15,
    color: colors.MAIN_BLUE_CLIENT,
    marginVertical: 4,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    // padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});
